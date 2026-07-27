import { activeConfig } from '@/configs/active'

/**
 * A hand-drawn underline for headings — the pen-stroke equivalent of a
 * highlight. Wraps its children in the `.underline-draw` positioning context
 * that globals.css already defines, then lays a wobbly stroke underneath.
 *
 * Renders as a plain wrapper (no stroke) unless the active config opts into
 * the craft texture, so client sites without it are unaffected.
 */
export default function HandUnderline({ children }: { children: React.ReactNode }) {
  if (activeConfig.theme.texture !== 'craft') return <>{children}</>

  return (
    <span className="underline-draw">
      {children}
      {/* preserveAspectRatio="none" lets the stroke span any heading width;
          non-scaling-stroke keeps the line weight honest when it stretches. */}
      <svg viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path
          d="M2,7 C28,3.2 54,8.4 81,5.2 C109,2.1 139,8.2 167,4.4 C179,2.9 190,6.1 198,4.8"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.55"
        />
      </svg>
    </span>
  )
}
