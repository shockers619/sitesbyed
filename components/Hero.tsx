import { activeConfig } from '@/configs/active'

export default function Hero() {
  const { hero } = activeConfig
  return (
    <section className="paper-bg" style={{ paddingTop: '96px', paddingBottom: '80px' }}>
      <div className="wrap" style={{ maxWidth: '760px' }}>
        {hero.eyebrow && <p className="stamp" style={{ marginBottom: '28px' }}>{hero.eyebrow}</p>}
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 60px)', whiteSpace: 'pre-line', marginBottom: '28px' }}>
          {hero.headline}
        </h1>
        <p className="muted" style={{ fontSize: '19px', lineHeight: 1.55, marginBottom: '36px', maxWidth: '540px' }}>
          {hero.subhead}
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={hero.ctaHref} className="btn btn-primary" style={{ textDecoration: 'none' }}>{hero.ctaLabel}</a>
          {hero.secondaryCtaLabel && (
            <a href={hero.secondaryCtaHref} className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              {hero.secondaryCtaLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
