import churchesData from '@/data/churches.json'

// Canonical list of churches Emily has designed for. This single dataset drives
// the home-page trust marquee (src/components/ChurchLogos.tsx) and the
// /case-studies system. The 20 entries here mirror the recolored logo sets in
// public/church-logos/<slug>-{black,white,yellow}.png.
//
// `url: null` = the church's site is offline, so the mark renders without an
// outbound link (the case-study link still works).
export type ChurchStatus = 'active' | 'past'

export type Church = {
  slug: string
  name: string
  url: string | null
  location: string
  status: ChurchStatus
  engagement: string
  workTypes: string[]
  excerpt: string
}

export const churches: Church[] = (churchesData as Church[])
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name))

export function getChurchBySlug(slug: string): Church | undefined {
  return churches.find((c) => c.slug === slug)
}

// The white logo on black, cross-fading to brand yellow on hover.
export function churchLogo(slug: string, variant: 'white' | 'yellow' | 'black') {
  return `/church-logos/${slug}-${variant}.png`
}

// Hero image for a case study. Emily's archive is still being backfilled, so we
// fall back to the church's own logo on a clean panel until real portfolio
// JPEGs land for each church.
export function churchHero(slug: string): string {
  return churchLogo(slug, 'black')
}

// Split the 20 churches into two marquee rows of 10. The rows alternate active
// and past clients so each row carries the same visual weight, then each half
// of the alphabetical list is dealt out top/bottom for variety.
export function marqueeRows(): [Church[], Church[]] {
  const top: Church[] = []
  const bottom: Church[] = []
  churches.forEach((church, i) => {
    ;(i % 2 === 0 ? top : bottom).push(church)
  })
  return [top, bottom]
}
