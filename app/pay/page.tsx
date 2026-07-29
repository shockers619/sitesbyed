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
  return (
    <>
      <Nav />

      <section className="paper-bg" style={{ paddingTop: '56px', paddingBottom: '16px' }}>
        <div className="wrap" style={{ maxWidth: '560px' }}>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 42px)' }}>Make a payment</h1>
        </div>
      </section>

      {/* The intro and the "not sure what to enter?" footnote both talk about
          choosing an amount, so they belong to step one only. PayForm owns them
          because it owns the step state. */}
      <section style={{ paddingTop: '20px' }}>
        <div className="wrap" style={{ maxWidth: '560px' }}>
          <PayForm />
        </div>
      </section>

      <Footer />
    </>
  )
}
