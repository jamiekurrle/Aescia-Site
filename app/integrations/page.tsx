import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'How Aescia fits with your systems',
  description:
    'Aescia is pre-first-customer and has no named EMR or practice-management integration live yet. A clinic can start with manual data or a simple export; any deeper data exchange is scoped with each customer and is designed to be a quick setup.',
  alternates: { canonical: '/integrations' },
  openGraph: {
    title: 'Integration approach | Aescia',
    description: 'No named integration is live yet. Manual to start; deeper data exchange scoped per customer.',
    url: '/integrations',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Integrations', url: '/integrations' },
])

const pageSchema = webPageSchema({
  url: '/integrations',
  name: 'How Aescia fits with your systems',
  description:
    'Aescia\'s integration approach. Pre-first-customer: no named EMR or practice-management integration is live. Manual data to start; any deeper data exchange is scoped per customer.',
})

export default function IntegrationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <PageContent />
      </main>
      <Footer />
    </>
  )
}
