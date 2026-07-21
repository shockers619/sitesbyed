// ============================================================================
// CLIENT CONFIG SCHEMA
// ----------------------------------------------------------------------------
// This is the entire contract for a client site. One new client = one new
// object matching this shape (see /configs/_demo.config.ts for a filled-out
// example). Everything visual and content-wise routes through here — no
// client-specific edits should ever be needed inside /components.
//
// THEME: pick a palette + a font pairing per client so sites don't look like
// clones of each other despite sharing the same component code. Keep a small
// curated set of font pairings (see FONT_PAIRINGS below) rather than
// re-picking fonts from scratch each time — that's where the speed comes
// from without every site looking identical.
// ============================================================================

export type SectionKey =
  | 'hero'
  | 'services'
  | 'comparison'
  | 'about'
  | 'gallery'
  | 'testimonials'
  | 'contact'

export interface ThemeConfig {
  /** Named hex values — every component reads colors from these, never hardcoded. */
  bg: string          // page background
  bgAlt: string        // alternate section background (for visual rhythm between sections)
  ink: string          // primary text
  inkMuted: string     // secondary/muted text
  accent: string       // primary brand color (buttons, links, highlights)
  accentInk: string    // text color that sits ON TOP of the accent color (contrast-safe)
  line: string         // hairline border/divider color

  /** One of the curated pairings below — keeps sites visually distinct without a fresh type search per client. */
  fontPairing: keyof typeof FONT_PAIRINGS

  /** 'sharp' = 0 border-radius, editorial/premium. 'soft' = rounded corners, friendly/approachable. */
  cornerStyle: 'sharp' | 'soft'
}

export const FONT_PAIRINGS = {
  editorial: { display: "'Fraunces', serif", body: "'Inter', sans-serif" },
  workshop: { display: "'Space Grotesk', sans-serif", body: "'IBM Plex Sans', sans-serif" },
  heritage: { display: "'Playfair Display', serif", body: "'Source Sans 3', sans-serif" },
  modern: { display: "'Sora', sans-serif", body: "'Manrope', sans-serif" },
  craft: { display: "'Zilla Slab', serif", body: "'Work Sans', sans-serif" },
} as const

export interface BusinessInfo {
  name: string
  tagline: string
  phone: string
  email: string
  address?: string
  serviceArea: string      // e.g. "Chester County & surrounding areas"
  hours?: string
  /** Optional personal-signature logo treatment: renders `logoPrefix` in the
   *  normal display font followed by `logoSignature` in a cursive/signature
   *  font+accent color, e.g. "Sites by" + cursive "Ed". Omit both to just
   *  render `name` as plain text. */
  logoPrefix?: string
  logoSignature?: string
}

export interface HeroContent {
  eyebrow?: string          // small label above headline, e.g. "LICENSED & INSURED"
  headline: string          // supports \n for manual line breaks
  subhead: string
  ctaLabel: string
  ctaHref: string           // usually '#contact' or 'tel:...'
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  image?: string
}

export interface ServiceItem {
  title: string
  description: string
}

export interface AboutContent {
  headline: string
  body: string              // supports \n\n for paragraph breaks
  image?: string
  stats?: { value: string; label: string }[]   // e.g. { value: "20+", label: "Years in business" }
}

export interface ComparisonRow {
  label: string
  diy: string        // what's true of Wix/GoDaddy/Squarespace on this point
  us: string          // what's true of this build on the same point
}

export interface ComparisonContent {
  headline: string
  rows: ComparisonRow[]
  diyLabel?: string    // defaults to "DIY Builder" if omitted
  usLabel?: string     // defaults to your business name if omitted
}

export interface Testimonial {
  quote: string
  name: string
  location?: string
}

export interface ContactContent {
  formEnabled: boolean
  formspreeId: string          // the ID from your Formspree endpoint URL, e.g. "xrevqowj" — NOT an email address
  mapEmbedUrl?: string
  messagePlaceholder?: string   // defaults to "How can we help?" — override for solo operators, e.g. "How can I help?"
}

export interface FooterContent {
  socialLinks?: { platform: 'facebook' | 'instagram' | 'google'; url: string }[]
  copyrightName: string
}

export interface ClientConfig {
  slug: string                   // used in the repo/domain, e.g. "smith-tree-care"
  theme: ThemeConfig
  business: BusinessInfo
  sectionOrder: SectionKey[]     // controls which sections render, and in what order
  hero: HeroContent
  services: ServiceItem[]
  comparison?: ComparisonContent
  about: AboutContent
  gallery?: string[]             // image URLs; omit the section from sectionOrder if unused
  testimonials?: Testimonial[]
  contact: ContactContent
  footer: FooterContent
  seo: {
    title: string
    description: string
  }
}
