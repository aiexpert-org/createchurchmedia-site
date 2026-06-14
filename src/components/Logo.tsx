import { cn } from '@/lib/cn'

export function Logo({
  className,
  invert = false,
}: {
  className?: string
  invert?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-2 font-display text-lg font-semibold tracking-tight whitespace-nowrap',
        invert ? 'text-white' : 'text-neutral-950',
        className,
      )}
      aria-label="Create Church Media"
    >
      <span
        aria-hidden="true"
        className="inline-block size-3 rounded-full bg-[var(--color-cta)]"
      />
      Create Church Media
    </span>
  )
}
