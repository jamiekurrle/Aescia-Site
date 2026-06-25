import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Software to reduce colonoscopy no-shows and cancellations at an ASC',
  description:
    'Aescia for Clinics reduces colonoscopy no-shows and late cancellations at ambulatory surgery centers by getting more patients correctly prepped and confirmed before the procedure date. Clinician-authored prep pathways, GLP-1 / anticoagulant / diabetic overlays, prep-night photo confirmation. Pre-first-customer; design partners start free until it proves it saves more than it costs.',
  alternates: { canonical: '/colonoscopy-no-show-software' },
  openGraph: {
    title: 'Reduce colonoscopy no-shows at an ASC | Aescia for Clinics',
    description:
      'Pre-procedure pathway software that closes the prep, medication, and confirmation gaps that drive endoscopy no-shows. Anchored to Beran 2024, Allen 2023, Mehta 2021.',
    url: '/colonoscopy-no-show-software',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Reduce colonoscopy no-shows at an ASC', url: '/colonoscopy-no-show-software' },
])

const pageSchema = webPageSchema({
  url: '/colonoscopy-no-show-software',
  name: 'Software to reduce colonoscopy no-shows and cancellations at an ASC',
  description:
    'How Aescia for Clinics reduces colonoscopy no-shows and late cancellations at ambulatory surgery centers: clinician-authored prep pathways, medication overlays, prep-night photo confirmation, and prep-aware backfill. Pre-first-customer.',
  isMedicalPage: true,
})

export default function ColonoscopyNoShowSoftwarePage() {
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
