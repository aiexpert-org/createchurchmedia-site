import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export type CaseStudyMeta = {
  slug: string
  title: string
  church: string
  location: string
  status: 'active' | 'past'
  engagement: string
  image: string
  excerpt: string
  tags: string[]
}

export type CaseStudy = CaseStudyMeta & {
  contentHtml: string
}

const DIR = path.join(process.cwd(), 'src/content/case-studies')

export function getAllCaseStudySlugs(): string[] {
  if (!fsSync.existsSync(DIR)) return []
  return fsSync
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

function toMeta(slug: string, data: Record<string, unknown>): CaseStudyMeta {
  return {
    slug,
    title: String(data.title ?? ''),
    church: String(data.church ?? ''),
    location: String(data.location ?? ''),
    status: data.status === 'past' ? 'past' : 'active',
    engagement: String(data.engagement ?? ''),
    image: String(data.image ?? ''),
    excerpt: String(data.excerpt ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const filePath = path.join(DIR, `${slug}.md`)
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(raw)
    const file = await remark().use(remarkHtml).process(content)
    return {
      ...toMeta(slug, data),
      contentHtml: String(file),
    }
  } catch {
    return null
  }
}

export async function getAllCaseStudies(): Promise<CaseStudyMeta[]> {
  const slugs = getAllCaseStudySlugs()
  const studies = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await fs.readFile(path.join(DIR, `${slug}.md`), 'utf8')
      const { data } = matter(raw)
      return toMeta(slug, data)
    }),
  )
  return studies.sort((a, b) => a.church.localeCompare(b.church))
}
