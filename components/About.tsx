import { activeConfig } from '@/configs/active'

export default function About() {
  const { about } = activeConfig
  return (
    <section id="about" style={{ paddingTop: '40px' }}>
      <div className="wrap" style={{ maxWidth: '720px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '24px' }}>{about.headline}</h2>
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
    </section>
  )
}
