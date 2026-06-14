import { NextResponse } from 'next/server'

import { getAllPosts } from '@/lib/blog'
import { siteConfig } from '@/lib/site-config'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET(): Promise<NextResponse> {
  const posts = await getAllPosts()
  const lastBuildDate = new Date().toUTCString()

  const items = posts
    .map((post) => {
      const link = `${siteConfig.url}/resources/${post.slug}`
      const pubDate = new Date(post.date).toUTCString()
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${siteConfig.email} (${escapeXml(siteConfig.designer)})</author>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.brand)} Resources</title>
    <link>${siteConfig.url}/resources</link>
    <atom:link href="${siteConfig.url}/resources/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Notes from Emily Farmer on church design, brand consistency, and the subscription model.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
