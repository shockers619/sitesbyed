// ============================================================================
// LAUNCH GUARDS
// ----------------------------------------------------------------------------
// Cheap runtime checks that stop placeholder content from reaching a live site.
// Every client build starts as a copy of _demo.config.ts, so the failure mode
// isn't "someone typed the wrong thing" — it's "someone never got round to
// typing the right thing." These make that fail visibly instead of silently.
//
// Plain module (no 'use client') so both server and client components can use
// it — a client component's exports can't be imported by a server one.
// ============================================================================

/** A Formspree ID is a short alphanumeric token from the endpoint URL. Empty,
 *  or the REPLACE_WITH_FORMSPREE_ID placeholder, means the form would POST
 *  into the void — render a mailto fallback instead of a button that
 *  swallows every lead. */
export function isUsableFormspreeId(id: string | undefined): boolean {
  return !!id && /^[a-zA-Z0-9]{6,}$/.test(id) && !id.startsWith('REPLACE')
}

/** 555-01XX is the reserved fictional range and 555-5555 is the stock
 *  placeholder — neither should ever ship as a clickable tel: link. */
export function isRealPhone(phone: string | undefined): phone is string {
  if (!phone) return false
  const digits = phone.replace(/[^\d]/g, '').replace(/^1/, '')
  if (digits.length !== 10) return false
  return !/^555/.test(digits)
}
