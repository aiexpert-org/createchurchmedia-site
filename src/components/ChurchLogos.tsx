import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { marqueeRows, type Church } from '@/lib/churches'

// Real church logos, recolored to a monochrome set in
// public/church-logos/<slug>-{black,white,yellow}.png. This trust band sits on
// a black background, so the logos display in WHITE and cross-fade to Emily's
// brand yellow on hover. Each logo links through to its case study.
//
// Layout is a two-row infinite marquee: the top row drifts left-to-right, the
// bottom row right-to-left. Hovering anywhere in the band pauses both rows so a
// logo can be clicked (see .marquee-band in src/styles/tailwind.css).

function ChurchLogo({ church }: { church: Church }) {
  return (
    <span className="relative block h-12 w-full">
      <Image
        src={`/church-logos/${church.slug}-white.png`}
        alt=""
        aria-hidden="true"
        fill
        sizes="160px"
        className="object-contain transition-opacity duration-200 ease-out group-hover:opacity-0"
      />
      <Image
        src={`/church-logos/${church.slug}-yellow.png`}
        alt=""
        aria-hidden="true"
        fill
        sizes="160px"
        className="object-contain opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
      />
    </span>
  )
}

function MarqueeItem({ church }: { church: Church }) {
  return (
    <Link
      href={`/case-studies/${church.slug}`}
      aria-label={`Read the ${church.name} case study`}
      className="group flex w-40 shrink-0 flex-col items-center gap-2.5 rounded-2xl px-4 py-3 ring-1 ring-inset ring-transparent transition hover:bg-white/5 hover:ring-[var(--color-cta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-44"
    >
      <ChurchLogo church={church} />
      <span className="text-center text-[0.7rem] font-medium leading-tight text-neutral-400 group-hover:text-white">
        {church.name}
      </span>
    </Link>
  )
}

function MarqueeRow({
  row,
  direction,
}: {
  row: Church[]
  direction: 'ltr' | 'rtl'
}) {
  // The row is rendered twice inside the track so the -50% loop is seamless.
  const items = [...row, ...row]
  return (
    <div
      className={`marquee-track ${direction === 'ltr' ? 'marquee-ltr' : 'marquee-rtl'}`}
    >
      {items.map((church, i) => (
        <MarqueeItem key={`${church.slug}-${i}`} church={church} />
      ))}
    </div>
  )
}

export function ChurchLogos() {
  const [top, bottom] = marqueeRows()

  return (
    <div className="mt-24 sm:mt-32 lg:mt-40 rounded-4xl bg-neutral-950 py-20 sm:py-24">
      <Container>
        <FadeIn>
          <h2 className="text-center font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Churches I&rsquo;ve worked with.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-neutral-400">
            Churches across the country who have trusted Emily with their visual identity, week after week. Hover to pause, click any logo for the story.
          </p>
        </FadeIn>
      </Container>

      <FadeIn>
        <div
          className="marquee-band mt-14 flex flex-col gap-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          aria-label="Churches Emily has designed for"
        >
          <MarqueeRow row={top} direction="ltr" />
          <MarqueeRow row={bottom} direction="rtl" />
        </div>
      </FadeIn>
    </div>
  )
}
