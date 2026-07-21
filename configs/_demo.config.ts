import { ClientConfig } from '@/lib/client-config'

// Placeholder config — swap every field here for the agency's real copy/branding.
// This file also serves as the reference example: when starting a new client,
// copy this file to /configs/<client-slug>.config.ts and fill it in, then
// point /configs/active.ts at the new file.

export const demoConfig: ClientConfig = {
  slug: 'demo',
  theme: {
    bg: '#151313',
    bgAlt: '#1c1a19',
    ink: '#F4F1EA',
    inkMuted: 'rgba(244,241,234,0.65)',
    accent: '#D97757',
    accentInk: '#151313',
    line: 'rgba(244,241,234,0.14)',
    fontPairing: 'editorial',
    cornerStyle: 'sharp',
  },
  business: {
    name: 'Your Business Name',
    tagline: 'A one-line description of what you do',
    phone: '(555) 555-5555',
    email: 'hello@example.com',
    serviceArea: 'Your service area',
  },
  sectionOrder: ['hero', 'services', 'about', 'testimonials', 'contact'],
  hero: {
    eyebrow: 'LICENSED & INSURED',
    headline: 'A headline that names\nwhat you actually do',
    subhead: 'One clear sentence about who this is for and why they should call you instead of a competitor.',
    ctaLabel: 'Get a Free Quote',
    ctaHref: '#contact',
    secondaryCtaLabel: 'Call (555) 555-5555',
    secondaryCtaHref: 'tel:5555555555',
  },
  services: [
    { title: 'Service One', description: 'A short, specific description of this service — what it includes and who needs it.' },
    { title: 'Service Two', description: 'A short, specific description of this service — what it includes and who needs it.' },
    { title: 'Service Three', description: 'A short, specific description of this service — what it includes and who needs it.' },
  ],
  about: {
    headline: 'Why customers choose us',
    body: 'A short paragraph about the business — years of experience, what makes it different, the founder\'s story.\n\nSecond paragraph if needed.',
    stats: [
      { value: '15+', label: 'Years in business' },
      { value: '500+', label: 'Projects completed' },
    ],
  },
  testimonials: [
    { quote: 'Placeholder testimonial text goes here.', name: 'Client Name', location: 'Town, ST' },
    { quote: 'Placeholder testimonial text goes here.', name: 'Client Name', location: 'Town, ST' },
  ],
  contact: {
    formEnabled: true,
    formspreeId: 'REPLACE_WITH_FORMSPREE_ID',
  },
  footer: {
    copyrightName: 'Your Business Name',
  },
  seo: {
    title: 'Your Business Name — Tagline',
    description: 'One or two sentence SEO description.',
  },
}
