import { BrandMark, BrandWordmark, BrandKey } from '@/components/BrandMark'

interface WorkSampleProps {
  name: string
  url?: string
  tagline?: string
  bg?: string
  fg?: string
  comingSoon?: boolean
  /** Renders the brand's own mark and wordmark instead of plain display text. */
  brand?: BrandKey
  /** Overrides the tagline colour where the brand sets it apart from the
   *  wordmark — e.g. Cozy Thrift's white name over a red strapline. */
  taglineFg?: string
  /** A full logo lockup to show instead of the mark/wordmark/tagline stack.
   *  Use when the brand's artwork already contains its own name and strapline,
   *  so rendering them separately would duplicate. */
  image?: string
}

export default function WorkSample({ name, url, tagline, bg, fg, comingSoon, brand, taglineFg, image }: WorkSampleProps) {
  const content = (
    <div className="card" style={{ padding: 0, overflow: 'hidden', cursor: comingSoon ? 'default' : 'pointer', opacity: comingSoon ? 0.55 : 1 }}>
      {/* browser chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderBottom: '1px solid var(--line)', background: 'var(--bg-alt)' }}>
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--line)' }} />
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--line)' }} />
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--line)' }} />
        <span style={{ marginLeft: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-muted)' }}>
          {comingSoon ? 'coming soon' : url}
        </span>
      </div>
      {/* preview area */}
      <div style={{
        height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px',
        background: comingSoon ? 'repeating-linear-gradient(45deg, var(--bg-alt), var(--bg-alt) 10px, var(--bg) 10px, var(--bg) 20px)' : (bg || 'var(--bg-alt)'),
      }}>
        {comingSoon ? (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-muted)' }}>MORE WORK COMING SOON</span>
        ) : image ? (
          // The artwork already carries the name and strapline, so it replaces
          // the whole stack rather than sitting above it. `contain` keeps the
          // logo whole — `cover` clipped the top of the skull — which only
          // looks seamless because the card's bg is set to the artwork's own
          // background colour, so the letterboxing is invisible.
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image}
            alt={`${name} logo`}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        ) : (
          <>
            {brand && <BrandMark brand={brand} />}
            {brand ? (
              <BrandWordmark brand={brand} name={name} fg={fg || 'var(--ink)'} />
            ) : (
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: fg || 'var(--ink)' }}>{name}</span>
            )}
            {tagline && (
              <span style={{
                fontSize: '13px',
                color: taglineFg || fg || 'var(--ink)',
                opacity: taglineFg ? 1 : 0.75,
                textAlign: 'center',
                padding: '0 12px',
              }}>
                {tagline}
              </span>
            )}
          </>
        )}
      </div>
      {!comingSoon && (
        <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: '15px' }}>{name}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)' }}>Visit site →</span>
        </div>
      )}
    </div>
  )

  if (comingSoon || !url) return content
  return <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{content}</a>
}
