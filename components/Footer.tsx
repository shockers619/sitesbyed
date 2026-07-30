import { activeConfig } from '@/configs/active'
import { isRealPhone } from '@/lib/guards'

export default function Footer() {
  const { footer, business } = activeConfig
  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '32px 24px' }}>
      <div className="wrap" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <p className="muted" style={{ fontSize: '13px' }}>
          © {new Date().getFullYear()} {footer.copyrightName}
        </p>

        {footer.payLinkLabel && (
          <a
            href="/pay"
            className="tap-target"
            style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}
          >
            {footer.payLinkLabel}
          </a>
        )}

        <p className="muted" style={{ fontSize: '13px' }}>
          {isRealPhone(business.phone) ? `${business.phone} · ${business.email}` : business.email}
        </p>
      </div>
    </footer>
  )
}
