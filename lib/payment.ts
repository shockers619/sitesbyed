// ============================================================================
// PAYMENT BOUNDS AND FORMATTING
// ----------------------------------------------------------------------------
// Shared by the /pay form and the API route so the two can't drift. The form
// uses these for immediate feedback; the API route enforces them for real.
//
// NOTE: these are now Stripe's own hard limits, not business rules. Ed removed
// the $50 floor deliberately so small amounts can be taken. That floor was a
// fraud control — a public form accepting any amount invites card testing,
// where stolen numbers are run at small values to find the live ones. Stripe
// Radar is now the only thing standing in the way of that. Worth reinstating a
// business minimum once testing is done.
// ============================================================================

/** $0.50 — Stripe rejects anything smaller, so catching it here returns a
 *  readable message instead of a raw API error. */
export const MIN_CENTS = 50

/** $999,999.99 — Stripe's per-transaction ceiling. Not a business limit;
 *  it just stops obviously invalid values reaching the API. */
export const MAX_CENTS = 99_999_999

export const MIN_DOLLARS = MIN_CENTS / 100
export const MAX_DOLLARS = MAX_CENTS / 100

/** Cents to "$1,500.00". Intl handles the grouping and the fixed 2 decimals. */
export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

/**
 * Parse whatever the visitor typed into integer cents.
 *
 * Returns null for anything unusable rather than guessing — a wrong amount is
 * worse than a rejected one. Strips currency symbols, spaces and thousands
 * separators, then works in integers from the digit string so the classic
 * float error (19.99 * 100 === 1998.9999999999998) can't arise.
 */
export function parseDollarsToCents(input: string): number | null {
  const cleaned = input.replace(/[$,\s]/g, '')
  if (!/^\d*\.?\d*$/.test(cleaned) || cleaned === '' || cleaned === '.') return null

  const [whole = '', frac = ''] = cleaned.split('.')
  if (frac.length > 2) return null

  const cents = Number(whole || '0') * 100 + Number(frac.padEnd(2, '0') || '0')
  return Number.isSafeInteger(cents) ? cents : null
}

export type AmountError = 'missing' | 'invalid' | 'too_low' | 'too_high'

/** Single source of truth for whether an amount is acceptable. */
export function validateCents(cents: unknown): AmountError | null {
  if (cents === undefined || cents === null || cents === '') return 'missing'
  if (typeof cents !== 'number' || !Number.isInteger(cents)) return 'invalid'
  if (cents < MIN_CENTS) return 'too_low'
  if (cents > MAX_CENTS) return 'too_high'
  return null
}

export function amountErrorMessage(err: AmountError): string {
  switch (err) {
    case 'missing': return 'Enter an amount.'
    case 'invalid': return 'That doesn’t look like a valid amount.'
    case 'too_low': return `The smallest payment card networks accept is ${formatCents(MIN_CENTS)}.`
    case 'too_high': return 'That amount is too large to process. Please get in touch directly.'
  }
}
