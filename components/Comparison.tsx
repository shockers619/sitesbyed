import { activeConfig } from '@/configs/active'
import HandUnderline from '@/components/HandUnderline'

/**
 * An aligned comparison grid rather than side-by-side cards.
 *
 * The card version put each option's points in its own column, which meant the
 * same attribute sat at a different height in every column — so a reader
 * couldn't actually compare a value against its counterparts, and the row
 * labels were repeated once per column. Here each attribute is one row: the
 * label appears once, and the values line up beside each other, which is the
 * whole point of the section.
 *
 * One markup serves both layouts. On desktop it's a four-column grid with a
 * header row; below the breakpoint the grid collapses to blocks and each value
 * names its own column inline via `.cmp-who`.
 */
export default function Comparison() {
  const { comparison, business } = activeConfig
  if (!comparison) return null

  const usLabel = comparison.usLabel || business.name
  const short = comparison.shortLabels || {}

  const columns = [
    {
      label: comparison.diyLabel || 'DIY Builder',
      short: short.diy || comparison.diyLabel || 'DIY Builder',
      pick: (r: (typeof comparison.rows)[number]) => r.diy,
      highlight: false,
    },
    ...(comparison.agencyLabel
      ? [{
          label: comparison.agencyLabel,
          short: short.agency || comparison.agencyLabel,
          pick: (r: (typeof comparison.rows)[number]) => r.agency,
          highlight: false,
        }]
      : []),
    {
      label: usLabel,
      short: short.us || usLabel,
      pick: (r: (typeof comparison.rows)[number]) => r.us,
      highlight: true,
    },
  ]

  return (
    <section>
      {/* Wider than the standard wrap: three columns of prose plus a label
          column need more than 1140px to keep every value on one line. */}
      <div className="wrap cmp-wrap">
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '40px' }}>
          <HandUnderline>{comparison.headline}</HandUnderline>
        </h2>

        {/* Column count drives a class, not an inline grid-template — an
            inline style outranks the mobile media query and would silently
            defeat the collapse to a stacked layout. */}
        <div className={`cmp cmp-${columns.length}`}>
          {/* Header row. Hidden on narrow screens, where each cell labels
              itself instead. */}
          <div className="cmp-head cmp-head-corner" aria-hidden="true" />
          {columns.map((col) => (
            <div key={col.label} className={`cmp-head${col.highlight ? ' cmp-us' : ''}`}>
              {col.label}
            </div>
          ))}

          {comparison.rows.map((row, i) => {
            const last = i === comparison.rows.length - 1
            return (
              <div key={row.label} className={`cmp-row${last ? ' cmp-row-last' : ''}`}>
                <div className="cmp-label">{row.label}</div>
                {columns.map((col) => (
                  <div
                    key={col.label}
                    className={`cmp-cell${col.highlight ? ' cmp-us' : ''}`}
                  >
                    <span className="cmp-who">{col.short}</span>
                    <span>{col.pick(row)}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {comparison.postscript && (
          <div className="cmp-postscript">
            <h3>{comparison.postscript.heading}</h3>
            <p className="muted">{comparison.postscript.body}</p>
          </div>
        )}
      </div>
    </section>
  )
}
