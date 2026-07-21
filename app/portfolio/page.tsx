import { activeConfig } from '@/configs/active'
import WorkSample from '@/components/WorkSample'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: `Our Work — ${activeConfig.business.name}`,
}

export default function PortfolioPage() {
  const { hero } = activeConfig
  return (
    <>
      <Nav />

      <section className="paper-bg" style={{ paddingTop: '64px', paddingBottom: '24px' }}>
        <div className="wrap">
          <a href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>&larr; Back to home</a>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginTop: '18px', marginBottom: '16px' }}>What we\u2019ve built</h1>
          <p className="muted" style={{ fontSize: '17px', maxWidth: '560px' }}>
            Real, live products — not mockups. Click through to see them running.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: '24px' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          <WorkSample
            name="FloorBalance"
            url="https://floorbalance.com"
            tagline="National youth basketball directory"
            bg="#1A1815"
            fg="#F4A25C"
          />
          <WorkSample
            name="Pancake Dig"
            url="https://pancakedig.com"
            tagline="National grassroots volleyball directory"
            bg="#10263B"
            fg="#FFC42B"
          />
          <WorkSample
            name="The Cozy Thrift"
            url="https://thecozythrift.com"
            tagline="Vintage & secondhand resale shop"
            bg="#1F1414"
            fg="#D4A24C"
          />
          <WorkSample name="" comingSoon />
          <WorkSample name="" comingSoon />
          <WorkSample name="" comingSoon />
        </div>
      </section>

      <section>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', marginBottom: '20px' }}>Yours could be next</h2>
          <a href={`/${hero.ctaHref}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>{hero.ctaLabel}</a>
        </div>
      </section>

      <Footer />
    </>
  )
}
