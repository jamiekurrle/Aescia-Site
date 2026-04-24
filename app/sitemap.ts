import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.aesciahealth.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const paths = [
    { path: '', priority: 1.0, freq: 'weekly' as const },
    { path: '/hospitals', priority: 0.9, freq: 'weekly' as const },
    { path: '/clinics', priority: 0.9, freq: 'weekly' as const },
    { path: '/platform', priority: 0.8, freq: 'monthly' as const },
    { path: '/evidence', priority: 0.8, freq: 'monthly' as const },
    { path: '/updates', priority: 0.8, freq: 'weekly' as const },
    { path: '/governance', priority: 0.7, freq: 'monthly' as const },
    { path: '/team', priority: 0.7, freq: 'monthly' as const },
    { path: '/contact', priority: 0.6, freq: 'monthly' as const },
  ]

  return paths.map(({ path, priority, freq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }))
}
