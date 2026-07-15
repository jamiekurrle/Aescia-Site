import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Reduce the inadequate bowel prep rate at an ASC with software',
  description:
    'Inadequate bowel preparation is common, with addressable risk factors (Beran 2024, n=358,257). Aescia for Clinics delivers clinician-authored, timed, coached prep pathways. Not a medical device.',
  alternates: { canonical: '/bowel-prep-software' },
  openGraph: {
    title: 'Reduce inadequate bowel prep at an ASC | Aescia for Clinics',
    description:
      'Structured, timed, coached prep pathways instead of a single written instruction at booking. Anchored to Beran 2024, Lebwohl 2011.',
    url: '/bowel-prep-software',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Reduce the inadequate bowel prep rate at an ASC', url: '/bowel-prep-software' },
])

const pageSchema = webPageSchema({
  url: '/bowel-prep-software',
  name: 'Reduce the inadequate bowel prep rate at an ASC with software',
  description:
    'Why inadequate bowel preparation happens, what the published literature shows, and how Aescia for Clinics delivers clinician-authored, timed, coached prep pathways to reduce the inadequate-prep rate.',
  isMedicalPage: true,
})

export default function BowelPrepSoftwarePage() {
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
