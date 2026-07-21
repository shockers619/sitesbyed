interface WorkSampleProps {
  name: string
  url?: string
  tagline?: string
  bg?: string
  fg?: string
  comingSoon?: boolean
}

export default function WorkSample({ name, url, tagline, bg, fg, comingSoon }: WorkSampleProps) {
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
        ) : (
          <>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: fg || 'var(--ink)' }}>{name}</span>
            {tagline && <span style={{ fontSize: '13px', color: fg || 'var(--ink)', opacity: 0.75 }}>{tagline}</span>}
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
