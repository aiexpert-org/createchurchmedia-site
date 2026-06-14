import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

// TODO(emily-real-logos): Replace placeholder SVGs in public/church-logos/ with
// real church logos when Emily provides them. Each placeholder SVG carries the
// church name; swap to the actual mark and keep the grayscale-on-default,
// soft-highlight-on-hover treatment.
const CHURCHES = [
  { name: 'First Christian Church Santa Maria', url: 'https://fccsantamaria.org', slug: 'fcc-santa-maria' },
  { name: 'Faith Community Fellowship', url: 'https://fcffamily.com', slug: 'faith-community-fellowship' },
  { name: 'The Grove Church', url: 'https://grove.church', slug: 'the-grove-church' },
  { name: 'Sanibel Community Church', url: 'https://sanibelchurch.com', slug: 'sanibel-community-church' },
  { name: 'Community Christian Church', url: 'https://communitycc.net', slug: 'community-christian-church' },
  { name: 'For The One Church', url: 'https://fortheone.church', slug: 'for-the-one-church' },
  { name: 'Cornerstone Church Buzz', url: 'https://cornerstonebuzz.org', slug: 'cornerstone-buzz' },
  { name: 'Centerpoint Church Utah', url: 'https://centerpointutah.org', slug: 'centerpoint-utah' },
  { name: 'Faith Bible Church OK', url: 'https://faithbibleok.com', slug: 'faith-bible-ok' },
  { name: 'Eastown Church', url: 'https://eastown.church', slug: 'eastown' },
] as const

export function ChurchLogos() {
  return (
    <div className="mt-24 sm:mt-32 lg:mt-40 rounded-4xl bg-neutral-50 py-20 sm:py-24">
      <Container>
        <FadeIn>
          <h2 className="text-center font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
            Churches I work with.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-neutral-600">
            A growing list of churches across the country who trust Emily with their visual identity week after week.
          </p>
        </FadeIn>

        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5"
          >
            {CHURCHES.map((church) => (
              <FadeIn key={church.slug} as="li" className="flex">
                <a
                  href={church.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full flex-col items-center gap-3 rounded-2xl p-4 ring-1 ring-inset ring-transparent transition hover:ring-[var(--color-cta)] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                  aria-label={`Visit ${church.name}`}
                >
                  <span className="relative block h-14 w-full grayscale opacity-80 transition group-hover:opacity-100">
                    <Image
                      src={`/church-logos/${church.slug}.svg`}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-contain"
                    />
                  </span>
                  <span className="text-center text-xs font-medium text-neutral-700 group-hover:text-neutral-950">
                    {church.name}
                  </span>
                </a>
              </FadeIn>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}
