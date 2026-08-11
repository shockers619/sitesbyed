import { activeConfig } from '@/configs/active'
import HandUnderline from '@/components/HandUnderline'

/**
 * What every build includes regardless of tier — the answer to "what am I
 * getting beyond pages?". Renders nothing if the config omits `foundations`.
 */
export default function Foundations() {
  const { foundations } = activeConfig
  if (!foundations) return null

  return (
    <section className="section-alt">
      <div className="wrap">
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: foundations.intro ? '12px' : '44px' }}>
          <HandUnderline>{foundations.headline}</HandUnderline>
        </h2>
        {foundations.intro && (
          <p className="muted" style={{ marginBottom: '44px', maxWidth: '720px' }}>{foundations.intro}</p>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
          {foundations.items.map((item, i) => (
            <div key={i} className="card stitched">
              <h3 style={{ fontSize: '20px', marginBottom: '14px' }}>{item.title}</h3>
              <p className="muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>{item.body}</p>
              {item.note && <p className="margin-note" style={{ marginTop: '16px' }}>{item.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
