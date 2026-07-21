import { activeConfig } from '@/configs/active'

export default function Footer() {
  const { footer, business } = activeConfig
  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '32px 24px' }}>
      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <p className="muted" style={{ fontSize: '13px' }}>
          © {new Date().getFullYear()} {footer.copyrightName}
        </p>
        <p className="muted" style={{ fontSize: '13px' }}>{business.phone} · {business.email}</p>
      </div>
    </footer>
  )
}
