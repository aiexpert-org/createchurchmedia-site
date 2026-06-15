import { cn } from '@/lib/cn'

/**
 * Straight yellow highlighter pass, Greg Isenberg "Blog" style.
 *
 * A clean tape strip with lightly chamfered ends (straight top and bottom,
 * short angled ends), tilted ~1.5deg so it reads like a quick marker swipe
 * rather than a pill or a blob. Sized to bisect the middle ~75% of the text it
 * sits behind: ascenders peek above the strip, descenders below, like a real
 * highlighter pass straight through the letterforms.
 *
 * Rendered as an absolutely positioned layer behind its content. Callers place
 * the text in a `relative z-10` span on top and drive the reveal via
 * `className`: pass `scale-x-0 ... group-hover:scale-x-100` for the
 * center-expand animation, or `scale-x-100 opacity-100` for an always-on swipe.
 *
 * The marker sits at `z-0` (not a negative z-index): a negative z-index inside
 * an `isolate` parent can fail to composite the SVG fill in some engines
 * (notably Safari), which made the swipe read as a hollow outline frame instead
 * of a solid fill. Pairing `z-0` here with `z-10` on the text keeps the fill
 * solid and behind the text in every browser.
 *
 * The fill is a literal `#EEDD47` set via the inline CSS `fill` property (with a
 * matching presentation attribute as a fallback) rather than `fill="var(...)"`.
 * Safari and iOS do not evaluate `var()` inside an SVG presentation attribute,
 * so the yellow failed to paint there: on white the swipe read as an outline
 * frame, and on a dark card the unfilled marker left the dark CTA text
 * illegible. A literal CSS `fill` value paints solid yellow in every engine.
 */
const MARKER_YELLOW = '#EEDD47'

export function MarkerSwipe({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 z-0 origin-center',
        className,
      )}
    >
      <svg
        aria-hidden="true"
        role="presentation"
        focusable="false"
        viewBox="0 0 100 22"
        preserveAspectRatio="none"
        className="absolute top-1/2 left-1/2 h-[75%] w-[110%]"
        style={{
          transform: 'translate(-50%, -50%) rotate(-1.5deg)',
          overflow: 'visible',
        }}
      >
        <path
          d="M 1,11 L 6,3.5 L 94,3.5 L 99,11 L 94,18.5 L 6,18.5 Z"
          fill={MARKER_YELLOW}
          style={{ fill: MARKER_YELLOW }}
          opacity="0.9"
        />
      </svg>
    </span>
  )
}
