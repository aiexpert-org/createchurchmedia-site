import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/how-it-works', '/subscription', '/portfolio', '/resources']
  const lastModified = new Date()
  return routes.map((route) => ({
    url: `${siteConfig.url}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: route === '/' ? 'monthly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
