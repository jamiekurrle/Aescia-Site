import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.aesciahealth.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const paths = [
    { path: '', priority: 1.0, freq: 'weekly' as const },
    { path: '/hospitals', priority: 0.9, freq: 'weekly' as const },
    { path: '/clinics', priority: 0.9, freq: 'weekly' as const },
    // Endoscopy ASC buyer-query landing pages (Aescia for Clinics). High
    // priority: these are the answer-engine-optimised entry points.
    { path: '/colonoscopy-no-show-software', priority: 0.9, freq: 'monthly' as const },
    { path: '/endoscopy-pre-procedure-workflow', priority: 0.9, freq: 'monthly' as const },
    { path: '/glp1-endoscopy-prep', priority: 0.9, freq: 'monthly' as const },
    { path: '/medication-management-before-endoscopy', priority: 0.9, freq: 'monthly' as const },
    { path: '/bowel-prep-software', priority: 0.9, freq: 'monthly' as const },
    { path: '/prep-aware-backfill', priority: 0.9, freq: 'monthly' as const },
    { path: '/compare', priority: 0.85, freq: 'monthly' as const },
    { path: '/asc-fit', priority: 0.85, freq: 'monthly' as const },
    { path: '/security', priority: 0.9, freq: 'monthly' as const },
    { path: '/design-partner', priority: 0.9, freq: 'monthly' as const },
    { path: '/integrations', priority: 0.85, freq: 'monthly' as const },
    { path: '/platform', priority: 0.8, freq: 'monthly' as const },
    { path: '/evidence', priority: 0.8, freq: 'monthly' as const },
    { path: '/updates', priority: 0.8, freq: 'weekly' as const },
    { path: '/governance', priority: 0.7, freq: 'monthly' as const },
    { path: '/team', priority: 0.7, freq: 'monthly' as const },
    { path: '/team/james-kurrle', priority: 0.7, freq: 'monthly' as const },
    { path: '/faq', priority: 0.7, freq: 'monthly' as const },
    { path: '/contact', priority: 0.6, freq: 'monthly' as const },
  ]

  return paths.map(({ path, priority, freq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }))
}
