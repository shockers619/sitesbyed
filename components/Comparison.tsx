import { activeConfig } from '@/configs/active'

export default function Comparison() {
  const { comparison, business } = activeConfig
  if (!comparison) return null
  const diyLabel = comparison.diyLabel || 'DIY Builder'
  const usLabel = comparison.usLabel || business.name

  return (
    <section>
      <div className="wrap">
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '44px' }}>{comparison.headline}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          <div className="card stitched">
            <p className="muted" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px', marginBottom: '20px' }}>{diyLabel}</p>
            {comparison.rows.map((row, i) => (
              <p key={i} style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '6px' }}>
                <span className="muted" style={{ fontWeight: 600 }}>{row.label}: </span>
                <span className="muted">{row.diy}</span>
              </p>
            ))}
          </div>
          <div className="card stitched" style={{ borderColor: 'var(--accent)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px', marginBottom: '20px', color: 'var(--accent)' }}>{usLabel}</p>
            {comparison.rows.map((row, i) => (
              <p key={i} style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '6px' }}>
                <span style={{ fontWeight: 600 }}>{row.label}: </span>
                <span>{row.us}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
