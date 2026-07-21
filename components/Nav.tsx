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
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          {business.logoPrefix && business.logoSignature ? (
            <span style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px' }}>
                {business.logoPrefix}
              </span>
              <span className="signature" style={{ fontSize: '30px', lineHeight: 1 }}>
                {business.logoSignature}
              </span>
            </span>
          ) : (
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px' }}>
              {business.name}
            </span>
          )}
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/portfolio" style={{ fontSize: '14px', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>
            Portfolio
          </a>
          <a href={`/${hero.ctaHref}`} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '13px', textDecoration: 'none' }}>
            {hero.ctaLabel}
          </a>
        </div>
      </div>
    </nav>
  )
}
