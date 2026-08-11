import { ClientConfig } from '@/lib/client-config'

export const sitesByEdConfig: ClientConfig = {
  slug: 'sitesbyed',
  theme: {
    bg: '#EDE7D8',
    bgAlt: '#E2DAC5',
    ink: '#2A2620',
    inkMuted: 'rgba(42,38,32,0.62)',
    accent: '#3F5D3A',
    accentInk: '#F5F1E6',
    line: 'rgba(42,38,32,0.18)',
    fontPairing: 'craft',
    cornerStyle: 'soft',
    texture: 'craft',
  },
  business: {
    name: 'Sites by Ed',
    logoPrefix: 'Sites by',
    logoSignature: 'Ed',
    tagline: 'A website built by hand, not pulled from a template.',
    // No public phone — email-only by choice. See BusinessInfo.phone.
    email: 'ed@sitesbyed.com',
    serviceArea: 'Small businesses & youth sports organizations — anywhere',
  },
  sectionOrder: ['hero', 'services', 'comparison', 'foundations', 'about', 'contact'],
  // First person singular throughout — the whole pitch is that one person
  // builds the site, so "we" would undercut it.
  sectionCopy: {
    servicesHeading: 'What I build',
    servicesIntro: 'Three ways to work together — no bloated packages, no upsell maze. One time fee for the site, and optional hosting.',
    contactHeading: 'Get in touch',
    portfolioTitle: 'My Work — Sites by Ed',
    portfolioHeading: 'What I’ve built',
    portfolioIntro: 'Real, live products — not mockups. Click through to see them running.',
  },
  hero: {
    eyebrow: 'HANDBUILT WEBSITES',
    headline: 'Built by hand.\nNot pulled from a kit.',
    subhead: 'No templates, no drag-and-drop builder, no outsourced dev team on the other side of the world. Just a real site, built by one person who cares whether it\u2019s right.',
    ctaLabel: 'Get a Free Quote',
    ctaHref: '#contact',
    secondaryCtaLabel: 'See What I\u2019ve Built',
    secondaryCtaHref: '/portfolio',
  },
  services: [
    {
      title: 'The Starter Build — $1,500',
      description: 'A home page plus up to 3 subpages, built to load fast and work perfectly on phones. Contact form wired straight to your inbox, plus the search and AI groundwork below. Two rounds of revisions included.',
      note: 'most small businesses start here',
    },
    {
      title: 'The Full Build — $3,000',
      description: 'A bigger site — up to 8 subpages — with real booking or payment built into it. Not a Calendly widget embedded on a page or a Stripe link bolted on, but scheduling and checkout designed as part of the site, so a customer goes from landing on it to booked or paid without ever leaving.',
      note: 'best if you take bookings and/or online payments',
    },
    {
      title: 'Keeping It Running —\n$49–$99/mo',
      description: 'Hosting, uptime monitoring, and security updates after launch, so your site stays fast and online without you thinking about it. Higher tier includes monthly content edits.',
      note: 'entirely optional',
    },
  ],
  comparison: {
    headline: 'What you\u2019re actually choosing between',
    diyLabel: 'A Wix or GoDaddy builder',
    agencyLabel: 'A web design agency',
    usLabel: 'Sites by Ed',
    shortLabels: { diy: 'Wix / GoDaddy', agency: 'An agency', us: 'Sites by Ed' },
    rows: [
      {
        label: 'What it costs',
        diy: '$200–$500 a year, forever, plus your weekends',
        agency: '$20,000–$25,000, then a monthly retainer',
        us: '$1,500–$3,000 once — the whole invoice',
      },
      {
        label: 'Who builds it',
        diy: 'You, alone, at 11pm',
        agency: 'A team you meet once, then whoever they assign',
        us: 'A person, start to finish',
      },
      {
        label: 'The code',
        diy: 'A template reused on thousands of sites',
        agency: 'Custom, but tied to their platform',
        us: 'Built for your business, and yours to keep',
      },
      {
        label: 'Load speed',
        diy: 'Often 3–5+ seconds with builder overhead',
        agency: 'Decent, until the plugins pile up',
        us: 'Typically under 1 second',
      },
      {
        label: 'Looks like',
        diy: 'A Wix site — because it is one',
        agency: 'Polished, like their last six clients',
        us: 'A site someone actually built for you',
      },
      {
        label: 'When something breaks',
        diy: 'A help center article',
        agency: 'A support ticket, and a place in line',
        us: 'A text, email, or call to Ed',
      },
      {
        label: 'Getting found',
        diy: 'Bolted on after the fact',
        agency: 'Built in, then billed monthly as “SEO”',
        us: 'Built in from page one, no added cost',
      },
      {
        label: 'After launch',
        diy: 'Keep paying, or the site goes away',
        agency: 'A proposal for phase two, then three',
        us: 'Optional hosting, or nothing at all',
      },
    ],
  },
  foundations: {
    headline: 'Getting found is part of the build',
    intro: 'Not a package you add on, and not a monthly fee. These come with every site I build, at both price points.',
    items: [
      {
        title: 'A logo, if you need one',
        body: 'Every product in my portfolio uses a mark I drew for it. If you already have a logo, I’ll build the site around it. If you don’t, you’ll have one by the time we’re done — not a separate invoice, and not something I farm out.',
        note: 'included, not an add-on',
      },
      {
        title: 'SEO that isn’t a plugin',
        body: 'Real page titles, clean semantic markup, structured data, and pages that load in under a second — because Google measures that. SEO isn’t something installed at the end. It’s how the site gets built in the first place.',
        note: 'no plugin, no retainer',
      },
      {
        title: 'Showing up in AI answers',
        body: 'More and more people ask ChatGPT or Google’s AI for a recommendation instead of scrolling a page of blue links. Those answers get assembled from text a machine can actually read — so a site whose content is locked inside drag-and-drop widgets, or baked into images, often isn’t even in the running. Yours is written in plain, structured HTML that both search engines and AI models can quote.',
        note: 'new, and most sites fail it',
      },
    ],
  },
  about: {
    headline: 'One person (Ed), start to finish',
    body: 'Whether you need a site built from scratch or an outdated one completely overhauled, you work directly with me. No account managers, no bloat, no agency overhead — just clean, user-friendly code built precisely to your specifications, at a price that actually makes sense for a small business or organization.\n\nReal-world products handling real user traffic. That\u2019s the actual bar every client site is held to.',
    image: '/about-ed.jpg',
    imageCaption: 'actually me',
    signoff: 'Ed',
    stats: [
      { value: '4', label: 'Live products built & shipped' },
      { value: '<1s', label: 'Typical page load time' },
    ],
  },
  contact: {
    formEnabled: true,
    formspreeId: 'mpqveajl',
    messagePlaceholder: 'How can I help?',
  },
  footer: {
    copyrightName: 'Sites by Ed',
    payLinkLabel: 'Client Payments',
  },
  seo: {
    title: 'Sites by Ed — Handbuilt Websites for Small Businesses & Youth Sports Organizations',
    description: 'Custom, handbuilt websites for small businesses and youth sports organizations — built by one person, not a template.',
  },
}
