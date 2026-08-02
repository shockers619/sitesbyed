import { activeConfig } from '@/configs/active'

export default function Nav() {
  const { business, hero } = activeConfig
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'var(--bg)', borderBottom: '1px solid var(--line)',
    }}>
      <div className="wrap" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 24px',
      }}>
        <a href="/" className="tap-target" style={{ textDecoration: 'none', color: 'inherit' }}>
          {business.logoPrefix && business.logoSignature ? (
            <span style={{ display: 'flex', alignItems: 'baseline', gap: '9px' }}>
              {/* Size lives in CSS, not inline — an inline fontSize outranks the
                  mobile media query and silently defeats it. */}
              <span className="logo-prefix">{business.logoPrefix}</span>
              <span className="signature">
                {business.logoSignature}
              </span>
            </span>
          ) : (
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px' }}>
              {business.name}
            </span>
          )}
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Outlined rather than plain text: the portfolio is the strongest
              proof on the site, and as bare text beside a filled button it read
              as an afterthought. Mirrors the hero's secondary/primary pairing. */}
          <a href="/portfolio" className="btn btn-secondary tap-target" style={{ padding: '10px 18px', fontSize: '13px', textDecoration: 'none' }}>
            Portfolio
          </a>
          <a href={`/${hero.ctaHref}`} className="btn btn-primary tap-target" style={{ padding: '10px 20px', fontSize: '13px', textDecoration: 'none' }}>
            {hero.ctaLabel}
          </a>
        </div>
      </div>
    </nav>
  )
}
