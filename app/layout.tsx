import './globals.css'
import { activeConfig } from '@/configs/active'
import { FONT_PAIRINGS } from '@/lib/client-config'

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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
