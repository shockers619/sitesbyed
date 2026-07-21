import { activeConfig } from '@/configs/active'

export default function Testimonials() {
  const { testimonials } = activeConfig
  if (!testimonials || testimonials.length === 0) return null
  return (
    <section className="section-alt">
      <div className="wrap">
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '48px' }}>What people say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {testimonials.map((t, i) => (
            <div key={i} className="card">
              <p style={{ fontSize: '17px', lineHeight: 1.6, marginBottom: '20px', fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
              <p style={{ fontWeight: 600, fontSize: '14px' }}>{t.name}</p>
              {t.location && <p className="muted" style={{ fontSize: '13px' }}>{t.location}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
