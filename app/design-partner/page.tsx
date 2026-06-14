import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Aescia design-partner program for first customers',
  description:
    'Aescia\'s structured program for the first ambulatory surgery centres deploying the Clinics product. Success metric, baseline, and measurement method agreed in writing before the pilot starts. Commercial terms negotiated per deal.',
  alternates: { canonical: '/design-partner' },
  openGraph: {
    title: 'Design-partner program | Aescia',
    description:
      'First-customer program for US GI ambulatory surgery centres. Pre-specified success metric measured against the customer\'s own historical data. Commercial structure negotiated per deal.',
    url: '/design-partner',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Design partner', url: '/design-partner' },
])

const pageSchema = webPageSchema({
  url: '/design-partner',
  name: 'Aescia design-partner program',
  description:
    'How Aescia engages with the first ambulatory surgery centres deploying the Clinics product: scope, measurement method, success criterion, data portability, and what stays negotiable.',
})

export default function DesignPartnerPage() {
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
