import { activeConfig } from '@/configs/active'
import HandUnderline from '@/components/HandUnderline'

export default function About() {
  const { about } = activeConfig
  return (
    <section id="about" style={{ paddingTop: '40px' }}>
      <div className="wrap" style={{ maxWidth: about.image ? '980px' : '720px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '24px' }}>
          <HandUnderline>{about.headline}</HandUnderline>
        </h2>

        <div className={about.image ? 'about-grid' : undefined}>
          <div>
            {about.body.split('\n\n').map((p, i) => (
              <p key={i} className="muted" style={{ fontSize: '17px', lineHeight: 1.7, marginBottom: '16px' }}>{p}</p>
            ))}
            {about.signoff && (
              <p className="about-signoff" aria-hidden="true">
                {activeConfig.theme.texture === 'craft' && (
                  /* Drawn, not typed. Homemade Apple has no em dash glyph — a
                     literal "—" falls back to a system face and lands a crisp
                     typographic rule next to handwriting. This is the same
                     wobbling stroke as the heading underlines. */
                  <svg className="signoff-dash" viewBox="0 0 60 12" fill="none" focusable="false">
                    <path
                      d="M3 8 C15 4.4 30 9.2 44 5.1 C50 3.6 54.5 6.2 57 4.8"
                      stroke="currentColor"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}
                {about.signoff}
              </p>
            )}

            {about.stats && (
              <div style={{ display: 'flex', gap: '40px', marginTop: '32px', flexWrap: 'wrap' }}>
                {about.stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--accent)' }}>{s.value}</div>
                    <div className="muted" style={{ fontSize: '13px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {about.image && (
            <figure style={{ margin: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="about-photo"
                src={about.image}
                alt={`${activeConfig.business.logoSignature || activeConfig.business.name}, who builds the sites`}
              />
              {about.imageCaption && (
                <figcaption className="about-caption">{about.imageCaption}</figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
    </section>
  )
}
