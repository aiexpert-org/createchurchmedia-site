import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export type PostFaq = { question: string; answer: string }

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image: string
  readTimeMinutes: number
  tldr?: string
  faqs?: PostFaq[]
}

export type Post = PostMeta & {
  contentHtml: string
}

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

function readWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

function calcReadTime(content: string): number {
  return Math.max(1, Math.round(readWords(content) / 220))
}

export function getAllPostSlugs(): string[] {
  if (!fsSync.existsSync(BLOG_DIR)) return []
  return fsSync
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

function coerceFaqs(value: unknown): PostFaq[] | undefined {
  if (!Array.isArray(value)) return undefined
  const out: PostFaq[] = []
  for (const item of value) {
    if (
      item &&
      typeof item === 'object' &&
      'question' in item &&
      'answer' in item &&
      typeof (item as { question: unknown }).question === 'string' &&
      typeof (item as { answer: unknown }).answer === 'string'
    ) {
      out.push({
        question: (item as PostFaq).question,
        answer: (item as PostFaq).answer,
      })
    }
  }
  return out.length > 0 ? out : undefined
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(raw)
    const file = await remark().use(remarkHtml).process(content)
    const html = String(file)

    return {
      slug,
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      date: String(data.date ?? ''),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      image: String(data.image ?? ''),
      tldr: data.tldr ? String(data.tldr) : undefined,
      faqs: coerceFaqs(data.faqs),
      readTimeMinutes: calcReadTime(content),
      contentHtml: html,
    }
  } catch {
    return null
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllPostSlugs()
  const posts = (await Promise.all(slugs.map((slug) => getPostBySlug(slug))))
    .filter((p): p is Post => p !== null)
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
