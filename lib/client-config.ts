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
  | 'foundations'
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

  /** 'craft' layers the handmade treatments — paper grain, hand-drawn heading
   *  underlines, pinned-card tilt, margin notes in the signature hand — on top
   *  of the base theme. Defaults to 'clean' so a client whose brand isn't
   *  handmade (a law firm, an HVAC company) doesn't inherit any of it. */
  texture?: 'craft' | 'clean'
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
  /** Omit entirely for email-only operators — the contact section and footer
   *  fall back to `email` rather than rendering an empty or fake tel: link. */
  phone?: string
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
  /** Optional margin note, rendered in the signature hand beside the card —
   *  the kind of thing you'd scribble next to a quote. Craft texture only. */
  note?: string
}

export interface AboutContent {
  headline: string
  body: string              // supports \n\n for paragraph breaks
  image?: string
  /** Short caption under the photo, rendered in the signature hand — e.g.
   *  "actually me". Omit for clients where a handwritten aside would jar. */
  imageCaption?: string
  /** A signed name closing out the section, in the signature hand. Suits a
   *  solo operator; leave unset for a company with a team. */
  signoff?: string
  stats?: { value: string; label: string }[]   // e.g. { value: "20+", label: "Years in business" }
}

export interface ComparisonRow {
  label: string
  diy: string        // what's true of Wix/GoDaddy/Squarespace on this point
  /** What's true of a traditional agency on this point. Optional — the agency
   *  column only renders when `agencyLabel` is set, so a two-column comparison
   *  keeps working untouched. */
  agency?: string
  us: string          // what's true of this build on the same point
}

export interface ComparisonContent {
  headline: string
  rows: ComparisonRow[]
  diyLabel?: string      // defaults to "DIY Builder" if omitted
  /** Set to add a third, middle column for the agency option. Omit for a
   *  straight two-way DIY-vs-us comparison. */
  agencyLabel?: string
  usLabel?: string       // defaults to your business name if omitted
  /** Short forms used on narrow screens, where the grid collapses and each
   *  value has to name its own column inline. Falls back to the full labels,
   *  which are usually too long to sit beside a value on a phone. */
  shortLabels?: { diy?: string; agency?: string; us?: string }
}

export interface FoundationItem {
  title: string
  body: string
  /** Optional margin note in the signature hand. Craft texture only. */
  note?: string
}

/**
 * The things that come with every build rather than being sold separately —
 * the answer to "what am I actually getting beyond pages?". Kept apart from
 * `services` because those are priced tiers you choose between, and these
 * apply to all of them.
 */
export interface FoundationsContent {
  headline: string
  intro?: string
  items: FoundationItem[]
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
  /** Shows a link to /pay in the footer, using this as the label. Omit to keep
   *  the payment page unlisted — which is the default, since a publicly linked
   *  open-amount form is a bigger target than one shared privately. */
  payLinkLabel?: string
}

/**
 * Section headings and intros that used to be hardcoded inside components.
 * They live here because they carry two things that vary per client: the
 * business's own wording, and its VOICE — a solo operator says "What I build",
 * a company with a crew says "What we build". Baking either into a shared
 * component forces a fork the first time a client doesn't match.
 *
 * Every field is optional; components fall back to neutral defaults.
 */
export interface SectionCopy {
  servicesHeading?: string       // default: "What we build"
  servicesIntro?: string         // no default — omitted entirely if unset
  contactHeading?: string        // default: "Get in touch"
  galleryHeading?: string        // default: "Our work"
  portfolioTitle?: string        // browser tab title; default: "Our Work — <name>"
  portfolioHeading?: string      // default: "What we've built"
  portfolioIntro?: string        // default: "Real, live products — not mockups…"
}

export interface ClientConfig {
  slug: string                   // used in the repo/domain, e.g. "smith-tree-care"
  theme: ThemeConfig
  business: BusinessInfo
  sectionOrder: SectionKey[]     // controls which sections render, and in what order
  sectionCopy?: SectionCopy      // headings/intros; also where first-person voice is set
  hero: HeroContent
  services: ServiceItem[]
  comparison?: ComparisonContent
  foundations?: FoundationsContent
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
