import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Data hosted in country. Privacy law aligned to your jurisdiction.',
  description:
    'Aescia hosts customer data in the customer\'s jurisdiction on Google Cloud, with the relevant data agreement signed before any patient data is exchanged. Sub-processors, breach notification, SOC 2 status, and exit terms listed in full. Aescia is pre-first-customer.',
  alternates: { canonical: '/security' },
  openGraph: {
    title: 'Security and compliance | Aescia',
    description: 'In-country data hosting on Google Cloud, per-jurisdiction privacy-law alignment, named sub-processors, plain-text breach notification and exit terms.',
    url: '/security',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Security', url: '/security' },
])

const pageSchema = webPageSchema({
  url: '/security',
  name: 'Security and compliance',
  description:
    'How Aescia handles in-country data hosting, per-jurisdiction privacy-law alignment, data-processing agreements, SOC 2, sub-processors, breach notification, and data ownership.',
})

export default function SecurityPage() {
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
