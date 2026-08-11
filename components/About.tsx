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
              <p className="about-signoff" aria-hidden="true">{about.signoff}</p>
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
              {/* The frame carries the tilt so the clip rotates with the photo
                  rather than sitting square against a tilted print. */}
              <div className="about-photo-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="about-photo"
                  src={about.image}
                  alt={`${activeConfig.business.logoSignature || activeConfig.business.name}, who builds the sites`}
                />
                {activeConfig.theme.texture === 'craft' && (
                  /* Flat line art, not a rendered metal clip — it has to read
                     as the same hand as the drawn underlines and the margin
                     notes. A shaded, shadowed clip would look pasted on. */
                  <svg
                    className="about-clip"
                    viewBox="0 0 36 100"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    {/* Drawn twice. The photo behind it is dark in places and
                        the page around it is light, so a single stroke either
                        vanishes into the trees or into the paper. The first
                        pass lays a page-coloured halo that separates the clip
                        from whatever is under it; over the paper itself the
                        halo is the same colour as the background and so is
                        invisible. */}
                    {[
                      { stroke: 'var(--bg)', width: 10, opacity: 0.92 },
                      { stroke: 'currentColor', width: 5.5, opacity: 0.72 },
                    ].map((pass) => (
                      <path
                        key={pass.stroke}
                        d="M12 78 L12 22 A10 10 0 0 1 32 22 L32 74 A14 14 0 0 1 4 74 L4 30"
                        stroke={pass.stroke}
                        strokeWidth={pass.width}
                        strokeOpacity={pass.opacity}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                  </svg>
                )}
              </div>
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
