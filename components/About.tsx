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
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className="about-photo"
              src={about.image}
              alt={`${activeConfig.business.logoSignature || activeConfig.business.name}, who builds the sites`}
            />
          )}
        </div>
      </div>
    </section>
  )
}
