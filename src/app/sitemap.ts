import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { getAllPostSlugs } from '@/lib/blog'
import { getAllCaseStudySlugs } from '@/lib/case-studies'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const routes = ['/', '/how-it-works', '/subscription', '/portfolio', '/case-studies', '/resources', '/contact']

  const baseEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))

  const articleEntries: MetadataRoute.Sitemap = getAllPostSlugs().map((slug) => ({
    url: `${siteConfig.url}/resources/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = getAllCaseStudySlugs().map((slug) => ({
    url: `${siteConfig.url}/case-studies/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...baseEntries, ...articleEntries, ...caseStudyEntries]
}
