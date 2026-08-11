import { activeConfig } from '@/configs/active'
import HandUnderline from '@/components/HandUnderline'

export default function Comparison() {
  const { comparison, business } = activeConfig
  if (!comparison) return null

  // Built as a list of columns rather than hardcoded blocks so adding the
  // agency option didn't mean a third near-identical copy of the same JSX —
  // and so a client with only two alternatives to compare against still works.
  // Order is deliberate: cheapest-but-worst, most-expensive, then ours last,
  // which is the position the reader is left holding.
  const columns = [
    { label: comparison.diyLabel || 'DIY Builder', pick: (r: (typeof comparison.rows)[number]) => r.diy, highlight: false },
    ...(comparison.agencyLabel
      ? [{ label: comparison.agencyLabel, pick: (r: (typeof comparison.rows)[number]) => r.agency, highlight: false }]
      : []),
    { label: comparison.usLabel || business.name, pick: (r: (typeof comparison.rows)[number]) => r.us, highlight: true },
  ]

  return (
    <section>
      <div className="wrap">
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '44px' }}>
          <HandUnderline>{comparison.headline}</HandUnderline>
        </h2>
        {/* 300px keeps three columns on one row at the 1140px wrap; below that
            they reflow to two, then one, in reading order. */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {columns.map((col) => (
            <div
              key={col.label}
              className="card stitched"
              style={col.highlight ? { borderColor: 'var(--accent)' } : undefined}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '17px',
                  marginBottom: '20px',
                  color: col.highlight ? 'var(--accent)' : 'var(--ink-muted)',
                }}
              >
                {col.label}
              </p>
              {comparison.rows.map((row, i) => (
                <p
                  key={i}
                  className={col.highlight ? undefined : 'muted'}
                  style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '6px' }}
                >
                  <span style={{ fontWeight: 600 }}>{row.label}: </span>
                  <span>{col.pick(row)}</span>
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
