import { activeConfig } from '@/configs/active'
import WorkSample from '@/components/WorkSample'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: activeConfig.sectionCopy?.portfolioTitle || `Our Work — ${activeConfig.business.name}`,
}

export default function PortfolioPage() {
  const { hero, sectionCopy } = activeConfig
  return (
    <>
      <Nav />

      <section className="paper-bg" style={{ paddingTop: '64px', paddingBottom: '24px' }}>
        <div className="wrap">
          <a href="/" className="tap-target" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>&larr; Back to home</a>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginTop: '18px', marginBottom: '16px' }}>
            {sectionCopy?.portfolioHeading || 'What we’ve built'}
          </h1>
          {/* Wide enough that the intro sits on one line on desktop, and left
              to wrap naturally below that. pre-line is kept so a config can
              still force its own breaks with \n if it wants them. */}
          <p className="muted" style={{ fontSize: '17px', maxWidth: '760px', whiteSpace: 'pre-line' }}>
            {sectionCopy?.portfolioIntro || 'Real, live products — not mockups. Click through to see them running.'}
          </p>
        </div>
      </section>

      <section style={{ paddingTop: '24px' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          <WorkSample
            name="FloorBalance"
            url="https://floorbalance.com"
            image="/work-floorbalance.png"
            bg="#1A1815"
          />
          <WorkSample
            name="Pancake Dig"
            brand="pancakedig"
            url="https://pancakedig.com"
            tagline="National grassroots volleyball directory"
            bg="#10263B"
            fg="#FFC42B"
          />
          <WorkSample
            name="The Cozy Thrift"
            url="https://thecozythrift.com"
            image="/work-cozythrift.jpg"
            /* sampled from the logo artwork so the letterboxing is invisible */
            bg="#040409"
          />
          <WorkSample
            name="BracketRunner"
            url="https://bracketrunner.com"
            image="/work-bracketrunner.jpg"
            /* the artwork's own backdrop, so the letterboxing is invisible */
            bg="#000000"
          />
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
