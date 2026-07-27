// Brand marks for the portfolio cards, inlined as vector rather than fetched
// as image files. These are copied from each site's own favicon.svg, so they
// stay crisp scaled up to card size and cost no extra network request.
//
// Not every brand has a usable mark: The Cozy Thrift's only logo is an 89 KB
// raster (too heavy for a page that sells sub-second loads) and BracketRunner
// has no icon at all — both render as a styled wordmark instead, which is why
// `mark` is optional.

export type BrandKey = 'floorbalance' | 'pancakedig' | 'cozythrift' | 'bracketrunner'

export function BrandMark({ brand, size = 54 }: { brand: BrandKey; size?: number }) {
  if (brand === 'floorbalance') {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true" focusable="false">
        <circle cx="18" cy="18" r="17" fill="#15130F" />
        <circle cx="18" cy="18" r="15" fill="#E8542F" />
        <path
          d="M18 3V33M3 18H33M7 8C11 13 11 23 7 28M29 8C25 13 25 23 29 28"
          stroke="#15130F" strokeWidth="2.5" fill="none" strokeLinecap="round"
        />
      </svg>
    )
  }

  if (brand === 'pancakedig') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <circle cx="16" cy="16" r="15" fill="#10263B" />
        <g stroke="#FFC42B" strokeWidth="2.6" strokeLinecap="round" fill="none">
          <path d="M16,16 C21.19,13.4 25.09,14.05 27.03,19.24" />
          <path d="M16,16 C21.19,13.4 25.09,14.05 27.03,19.24" transform="rotate(120 16 16)" />
          <path d="M16,16 C21.19,13.4 25.09,14.05 27.03,19.24" transform="rotate(240 16 16)" />
        </g>
        <circle cx="16" cy="16" r="12" fill="none" stroke="#F4F6F2" strokeWidth="2.6" />
      </svg>
    )
  }

  return null
}

/** The wordmark, set the way each brand sets it on its own site. */
export function BrandWordmark({ brand, name, fg }: { brand: BrandKey; name: string; fg: string }) {
  // BracketRunner splits its wordmark across two colours — white "Bracket",
  // orange "Runner" — exactly as the live site renders it.
  if (brand === 'bracketrunner') {
    return (
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '23px', letterSpacing: '-0.01em' }}>
        <span style={{ color: '#FFFFFF' }}>Bracket</span>
        <span style={{ color: '#FF5500' }}>Runner</span>
      </span>
    )
  }

  return (
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '23px', color: fg, letterSpacing: '-0.01em' }}>
      {name}
    </span>
  )
}
