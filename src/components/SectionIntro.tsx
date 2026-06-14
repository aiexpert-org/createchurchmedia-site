import { cn } from '@/lib/cn'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

type Props = {
  title: string
  eyebrow?: string
  children?: React.ReactNode
  smaller?: boolean
  invert?: boolean
  className?: string
}

export function SectionIntro({
  title,
  eyebrow,
  children,
  smaller = false,
  invert = false,
  className,
}: Props) {
  return (
    <Container className={className}>
      <FadeIn className="max-w-2xl">
        <h2>
          {eyebrow && (
            <>
              <span
                className={cn(
                  'mb-6 block font-display text-sm font-semibold tracking-wider uppercase',
                  invert ? 'text-white/80' : 'text-neutral-500',
                )}
              >
                {eyebrow}
              </span>
              <span className="sr-only"> - </span>
            </>
          )}
          <span
            className={cn(
              'block font-display tracking-tight text-balance',
              smaller
                ? 'text-2xl font-semibold'
                : 'text-3xl font-medium sm:text-4xl lg:text-5xl',
              invert ? 'text-white' : 'text-neutral-950',
            )}
          >
            {title}
          </span>
        </h2>
        {children && (
          <div
            className={cn(
              'mt-6 text-xl',
              invert ? 'text-neutral-300' : 'text-neutral-600',
            )}
          >
            {children}
          </div>
        )}
      </FadeIn>
    </Container>
  )
}
