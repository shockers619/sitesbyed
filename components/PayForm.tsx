'use client'
import { useEffect, useMemo, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { activeConfig } from '@/configs/active'
import {
  formatCents,
  parseDollarsToCents,
  validateCents,
  amountErrorMessage,
  MIN_CENTS,
  MAX_CENTS,
} from '@/lib/payment'

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

// loadStripe fetches Stripe.js — module scope so it happens once per page load
// rather than on every render. Null when unconfigured so the page can say so
// plainly instead of throwing.
const stripePromise = publishableKey ? loadStripe(publishableKey) : null

const fieldStyle: React.CSSProperties = {
  padding: '13px 16px',
  background: 'var(--bg)',
  border: '1px solid var(--line)',
  borderRadius: 'var(--radius)',
  color: 'var(--ink)',
  fontFamily: 'var(--font-body)',
  fontSize: '16px',
  width: '100%',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 600,
  marginBottom: '6px',
}

/** Step 2 — the card form, once we have a PaymentIntent to confirm against. */
function CardStep({ amountCents, onPaid }: { amountCents: number; onPaid: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setBusy(true)
    setError(null)

    // Cards confirm in place. Redirect methods — Klarna, Affirm, wallets —
    // hand off to the provider and come back to return_url, which is why it's
    // required even though most payments never use it. Without it, picking
    // Klarna fails outright.
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/pay` },
      redirect: 'if_required',
    })

    if (stripeError) {
      setError(stripeError.message ?? 'That payment could not be completed.')
      setBusy(false)
      return
    }
    if (paymentIntent?.status === 'succeeded') {
      onPaid()
      return
    }
    setError('That payment did not complete. Nothing has been charged.')
    setBusy(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <p style={{ marginTop: '20px', fontSize: '15px' }}>
        You&rsquo;re about to pay <strong>{formatCents(amountCents)}</strong>.
      </p>
      <button
        type="submit"
        className="btn btn-primary tap-target"
        disabled={busy || !stripe}
        style={{ marginTop: '12px' }}
      >
        {busy ? 'Processing…' : `Pay ${formatCents(amountCents)}`}
      </button>
      {error && (
        <p style={{ marginTop: '14px', fontSize: '15px', lineHeight: 1.6 }}>
          <strong>{error}</strong>{' '}
          <span className="muted">
            Nothing has been charged. Email {activeConfig.business.email} if it keeps failing.
          </span>
        </p>
      )}
    </form>
  )
}

export default function PayForm() {
  const [amount, setAmount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [reference, setReference] = useState('')

  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [confirmedCents, setConfirmedCents] = useState<number | null>(null)
  const [starting, setStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paid, setPaid] = useState(false)

  // Set while resolving a return from a redirect-based method, so the visitor
  // sees "checking" rather than an empty form.
  const [resolvingReturn, setResolvingReturn] = useState(false)

  const cents = useMemo(() => parseDollarsToCents(amount), [amount])
  const preview = cents !== null && cents > 0 ? formatCents(cents) : null

  // Klarna, Affirm and wallets bounce the customer to the provider and back to
  // return_url with the intent's client secret on the query string. Without
  // this, someone who genuinely paid returns to a blank form and has no idea
  // whether it worked — so they either pay twice or email you in a panic.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const secret = params.get('payment_intent_client_secret')
    if (!secret || !stripePromise) return

    setResolvingReturn(true)
    stripePromise
      .then((stripe) => stripe?.retrievePaymentIntent(secret))
      .then((result) => {
        const intent = result?.paymentIntent
        if (intent?.status === 'succeeded') {
          setConfirmedCents(intent.amount)
          setPaid(true)
        } else if (intent?.status === 'processing') {
          setConfirmedCents(intent.amount)
          setError('That payment is still processing. You’ll get a receipt once it clears — no need to pay again.')
        } else {
          setError('That payment didn’t complete. Nothing has been charged.')
        }
      })
      .catch(() => setError('Could not confirm that payment. Please check your email for a receipt before trying again.'))
      .finally(() => {
        setResolvingReturn(false)
        // Clear the query string so a refresh doesn't re-run this.
        window.history.replaceState({}, '', window.location.pathname)
      })
  }, [])

  // Match Stripe's iframe to the site rather than letting it look bolted on.
  const appearance = useMemo(
    () =>
      ({
        theme: 'stripe',
        variables: {
          colorPrimary: '#3F5D3A',
          colorBackground: '#EDE7D8',
          colorText: '#2A2620',
          borderRadius: '10px',
          fontFamily: 'Work Sans, sans-serif',
        },
      }) as const,
    []
  )

  async function startPayment(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const amountError = validateCents(cents)
    if (amountError) {
      setError(amountErrorMessage(amountError))
      return
    }

    setStarting(true)
    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountCents: cents, name, email, reference }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Could not start the payment.')
        return
      }
      setClientSecret(data.clientSecret)
      setConfirmedCents(cents)
    } catch {
      setError('Could not reach the payment service. Please try again.')
    } finally {
      setStarting(false)
    }
  }

  if (!stripePromise) {
    return (
      <p className="muted">
        Payments aren&rsquo;t set up yet. Please email{' '}
        {activeConfig.business.email}{' '}
        and I&rsquo;ll send an invoice.
      </p>
    )
  }

  if (resolvingReturn) {
    return <p className="muted">Checking that payment…</p>
  }

  if (paid && confirmedCents !== null) {
    return (
      <div>
        <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '18px' }}>
          Payment received — {formatCents(confirmedCents)}.
        </p>
        <p className="muted" style={{ marginTop: '10px' }}>
          A receipt is on its way to {email}. Thanks.
        </p>
      </div>
    )
  }

  if (clientSecret && confirmedCents !== null) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
        <CardStep amountCents={confirmedCents} onPaid={() => setPaid(true)} />
      </Elements>
    )
  }

  return (
    <form onSubmit={startPayment} style={{ display: 'grid', gap: '18px' }}>
      <p className="muted" style={{ fontSize: '17px', lineHeight: 1.6 }}>
        Enter the amount we agreed on. Card details are handled by Stripe and
        never touch this site.
      </p>

      <div>
        <label style={labelStyle} htmlFor="amount">Amount</label>
        <input
          id="amount"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={fieldStyle}
        />
        <p className="muted" style={{ fontSize: '13px', marginTop: '6px' }}>
          {preview
            ? `That's ${preview}.`
            : `Between ${formatCents(MIN_CENTS)} and ${formatCents(MAX_CENTS)}.`}
        </p>
      </div>

      <div>
        <label style={labelStyle} htmlFor="name">Your name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} style={fieldStyle} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="email">Your email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={fieldStyle}
        />
        <p className="muted" style={{ fontSize: '13px', marginTop: '6px' }}>
          Your receipt goes here.
        </p>
      </div>

      <div>
        <label style={labelStyle} htmlFor="reference">What&rsquo;s this for?</label>
        <input
          id="reference"
          placeholder="e.g. Deposit — new site"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          style={fieldStyle}
        />
      </div>

      <div>
        <button type="submit" className="btn btn-primary tap-target" disabled={starting}>
          {starting ? 'Starting…' : 'Continue to payment'}
        </button>
      </div>

      {error && <p style={{ color: '#8B2E2E', fontSize: '15px' }}>{error}</p>}

      <p className="muted" style={{ fontSize: '14px', marginTop: '10px', lineHeight: 1.6 }}>
        Not sure what to enter? Email {activeConfig.business.email}{' '}
        and I&rsquo;ll confirm the amount.
      </p>
    </form>
  )
}
