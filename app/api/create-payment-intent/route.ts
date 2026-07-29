import Stripe from 'stripe'
import { validateCents, amountErrorMessage, formatCents } from '@/lib/payment'
import { activeConfig } from '@/configs/active'

/**
 * Creates a Stripe PaymentIntent for a client-supplied amount.
 *
 * The amount comes from the browser, so this route — not the form — is what
 * actually enforces the limits. Anyone can POST here directly and skip the UI
 * entirely, which is exactly why the same validation runs again on the server.
 */

// Instantiated lazily so a missing key surfaces as a clean 500 with a useful
// message rather than crashing the whole route module at import time.
function stripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key)
}

const MAX_FIELD = 200

/** Trim, cap length, and collapse newlines so nothing odd reaches Stripe's
 *  metadata (which has its own 500-char limit per value). */
function clean(value: unknown): string {
  return typeof value === 'string'
    ? value.replace(/\s+/g, ' ').trim().slice(0, MAX_FIELD)
    : ''
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Malformed request.' }, { status: 400 })
  }

  const { amountCents, name, email, reference } = (body ?? {}) as Record<string, unknown>

  const amountError = validateCents(amountCents)
  if (amountError) {
    return Response.json({ error: amountErrorMessage(amountError) }, { status: 400 })
  }

  const cleanName = clean(name)
  const cleanEmail = clean(email)
  const cleanReference = clean(reference)

  if (!cleanName) return Response.json({ error: 'Enter your name.' }, { status: 400 })
  if (!isEmail(cleanEmail)) return Response.json({ error: 'Enter a valid email address.' }, { status: 400 })
  if (!cleanReference) return Response.json({ error: 'Enter what this payment is for.' }, { status: 400 })

  try {
    const stripe = stripeClient()
    const intent = await stripe.paymentIntents.create({
      amount: amountCents as number,
      currency: 'usd',
      // Offers whatever is enabled in the Stripe dashboard, which is the right
      // control surface — toggling Klarna or Affirm on and off is a business
      // decision that shouldn't require a code change. Buy-now-pay-later is
      // worth having here: the lender pays in full immediately and carries the
      // default risk, which can turn a hesitant $3,000 quote into a yes.
      //
      // Redirect-based methods hand off to the provider and come back, so the
      // client MUST pass a return_url to confirmPayment. See PayForm.
      automatic_payment_methods: { enabled: true },
      // Shows on the Stripe payment row, so the dashboard reads as something
      // recognisable instead of an anonymous amount.
      description: `${cleanReference} — ${cleanName}`,
      receipt_email: cleanEmail,
      metadata: {
        name: cleanName,
        email: cleanEmail,
        reference: cleanReference,
        site: activeConfig.slug,
      },
    })

    return Response.json({ clientSecret: intent.client_secret })
  } catch (err) {
    // Never surface a raw Stripe error to the browser — it can leak account
    // detail. Log it for the Vercel function logs, return something plain.
    console.error('[create-payment-intent]', err)
    const message =
      err instanceof Error && err.message.includes('STRIPE_SECRET_KEY')
        ? 'Payments are not configured yet.'
        : `Could not start a payment for ${formatCents(amountCents as number)}. Please try again.`
    return Response.json({ error: message }, { status: 500 })
  }
}
