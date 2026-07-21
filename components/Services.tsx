import { activeConfig } from '@/configs/active'

export default function Services() {
  const { services } = activeConfig
  return (
    <section className="section-alt" id="services">
      <div className="wrap">
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '12px' }}>What we build</h2>
        <p className="muted" style={{ marginBottom: '44px' }}>Three ways to work together — no bloated packages, no upsell maze. One time fee for site, and optional hosting.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
          {services.map((s, i) => (
            <div key={i} className="card stitched">
              <h3 style={{ fontSize: '20px', marginBottom: '14px', whiteSpace: 'pre-line' }}>{s.title}</h3>
              <p className="muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
