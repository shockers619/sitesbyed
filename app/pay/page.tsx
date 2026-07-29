import { activeConfig } from '@/configs/active'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PayForm from '@/components/PayForm'

/**
 * Unlisted payment page. Not in the nav, not in a sitemap, and noindex'd — but
 * "unlisted" is not "private": anyone holding the URL can load it. The actual
 * protection is the server-side amount bounds in the API route plus Stripe
 * Radar, not the obscurity of this path.
 */
export const metadata = {
  title: `Make a payment — ${activeConfig.business.name}`,
  robots: { index: false, follow: false },
}

export default function PayPage() {
  const { business } = activeConfig
  return (
    <>
      <Nav />

      <section className="paper-bg" style={{ paddingTop: '56px', paddingBottom: '16px' }}>
        <div className="wrap" style={{ maxWidth: '560px' }}>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 42px)', marginBottom: '14px' }}>Make a payment</h1>
          <p className="muted" style={{ fontSize: '17px', lineHeight: 1.6 }}>
            Enter the amount we agreed on. Card details are handled by Stripe and
            never touch this site.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: '8px' }}>
        <div className="wrap" style={{ maxWidth: '560px' }}>
          <PayForm />
          <p className="muted" style={{ fontSize: '14px', marginTop: '28px', lineHeight: 1.6 }}>
            Not sure what to enter? Email {business.email}{' '}
            and I&rsquo;ll confirm the amount.
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
