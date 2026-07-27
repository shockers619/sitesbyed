import './globals.css'
import { activeConfig } from '@/configs/active'
import { FONT_PAIRINGS } from '@/lib/client-config'

// Every family used by any pairing in FONT_PAIRINGS, plus the mono and
// signature faces. Loaded here rather than via @import in globals.css — see the
// note at the top of that file for why.
//
// NOTE: this ships all five pairings' fonts to every site, so a given build
// downloads roughly eight families it never renders. Worth generating from the
// active config instead, but that's a separate change.
const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2' +
  '?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700' +
  '&family=Inter:wght@400;500;600' +
  '&family=Space+Grotesk:wght@500;700' +
  '&family=IBM+Plex+Sans:wght@400;500' +
  '&family=Playfair+Display:wght@600;700' +
  '&family=Source+Sans+3:wght@400;500' +
  '&family=Sora:wght@600;700' +
  '&family=Manrope:wght@400;500' +
  '&family=JetBrains+Mono:wght@400;500;700' +
  '&family=Zilla+Slab:wght@500;700' +
  '&family=Work+Sans:wght@400;500' +
  '&family=Homemade+Apple' +
  '&display=swap'

export const metadata = {
  title: activeConfig.seo.title,
  description: activeConfig.seo.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = activeConfig.theme
  const fonts = FONT_PAIRINGS[t.fontPairing]
  const radius = t.cornerStyle === 'sharp' ? '0px' : '10px'

  const themeVars = `
    :root {
      --bg: ${t.bg};
      --bg-alt: ${t.bgAlt};
      --ink: ${t.ink};
      --ink-muted: ${t.inkMuted};
      --accent: ${t.accent};
      --accent-ink: ${t.accentInk};
      --line: ${t.line};
      --radius: ${radius};
      --font-display: ${fonts.display};
      --font-body: ${fonts.body};
    }
  `

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content={t.bg} />
        {/* Preconnect shaves the TLS handshake off the critical path; gstatic
            needs crossOrigin because font files are fetched anonymously. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
      </head>
      <body className={t.texture === 'craft' ? 'texture-craft' : undefined}>{children}</body>
    </html>
  )
}
