import { activeConfig } from '@/configs/active'
import HandUnderline from '@/components/HandUnderline'

export default function Services() {
  const { services, sectionCopy } = activeConfig
  const intro = sectionCopy?.servicesIntro
  return (
    <section className="section-alt" id="services">
      <div className="wrap">
        {/* Without an intro paragraph the heading needs to carry the full gap
            to the cards itself. */}
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: intro ? '12px' : '44px' }}>
          <HandUnderline>{sectionCopy?.servicesHeading || 'What we build'}</HandUnderline>
        </h2>
        {intro && <p className="muted" style={{ marginBottom: '44px' }}>{intro}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
          {services.map((s, i) => (
            <div key={i} className="card stitched card-tilt">
              <h3 style={{ fontSize: '20px', marginBottom: '14px', whiteSpace: 'pre-line' }}>{s.title}</h3>
              <p className="muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>{s.description}</p>
              {s.note && <p className="margin-note" style={{ marginTop: '16px' }}>{s.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
