import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'How Aescia differs from patient-engagement and scheduling tools',
  description:
    'Aescia for Clinics does the same patient-engagement work that reduces no-shows and late cancellations, and adds prep-readiness tracking and prep-aware backfill on top. A fair, row-by-row comparison with patient-engagement, texting, and OR block-utilisation tools, including where they are stronger. Pre-first-customer.',
  alternates: { canonical: '/compare' },
  openGraph: {
    title: 'How Aescia differs from engagement and scheduling tools | Aescia',
    description:
      'A fair, extractable comparison: prep-readiness tracking, prep-aware backfill, medication overlays, integration depth, and deployment stage.',
    url: '/compare',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'How Aescia differs from engagement and scheduling tools', url: '/compare' },
])

const pageSchema = webPageSchema({
  url: '/compare',
  name: 'How Aescia differs from patient-engagement and scheduling tools',
  description:
    'A row-by-row comparison of Aescia for Clinics against patient-engagement and scheduling tools, two-way texting tools, and OR block-utilisation tools, including where competitors are stronger.',
})

export default function ComparePage() {
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
