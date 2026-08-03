import { activeConfig } from '@/configs/active'
import { isRealPhone } from '@/lib/guards'

export default function Footer() {
  const { footer, business } = activeConfig
  // Border and padding live in globals.css, not inline: an inline value
  // outranks the narrow-screen media query and silently defeats it.
  return (
    <footer>
      <div className="wrap footer-row">
        <p className="muted footer-item">
          © {new Date().getFullYear()} {footer.copyrightName}
        </p>

        {footer.payLinkLabel && (
          <a href="/pay" className="tap-target footer-item footer-pay">
            {footer.payLinkLabel}
          </a>
        )}

        <p className="muted footer-item">
          {isRealPhone(business.phone) ? `${business.phone} · ${business.email}` : business.email}
        </p>
      </div>
    </footer>
  )
}
