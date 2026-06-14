import { cn } from '@/lib/cn'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export function PageIntro({
  eyebrow,
  title,
  children,
  centered = false,
}: {
  eyebrow?: string
  title: string
  children?: React.ReactNode
  centered?: boolean
}) {
  return (
    <Container
      className={cn('mt-24 sm:mt-32 lg:mt-40', centered && 'text-center')}
    >
      <FadeIn>
        <h1>
          {eyebrow && (
            <>
              <span className="block font-display text-base font-semibold tracking-wider uppercase text-neutral-950">
                {eyebrow}
              </span>
              <span className="sr-only"> - </span>
            </>
          )}
          <span
            className={cn(
              'mt-6 block max-w-5xl font-display text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[4rem] lg:leading-[1.1] font-medium tracking-tight text-balance text-neutral-950',
              centered && 'mx-auto',
            )}
          >
            {title}
          </span>
        </h1>
        {children && (
          <div
            className={cn(
              'mt-6 max-w-3xl text-xl text-neutral-600',
              centered && 'mx-auto',
            )}
          >
            {children}
          </div>
        )}
      </FadeIn>
    </Container>
  )
}
