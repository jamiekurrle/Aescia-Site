import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Is Aescia for Clinics the right fit for your endoscopy ASC?',
  description:
    'Aescia for Clinics is the right fit when prep adequacy, GLP-1 confusion, or prep-aware slot routing is your rate-limiter, and you want explainable clinician-authored rules. It is not the right fit if you need raw same-day clinic backfill, a deployed reference-heavy vendor today, or deep bi-directional EHR scheduling out of the box. Explicit best-fit and not-fit lists.',
  alternates: { canonical: '/asc-fit' },
  openGraph: {
    title: 'Is Aescia right for your ASC? | Aescia for Clinics',
    description:
      'Explicit best-fit and not-the-right-fit lists, plus what to use instead when Aescia is not the answer.',
    url: '/asc-fit',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Is Aescia right for your ASC?', url: '/asc-fit' },
])

const pageSchema = webPageSchema({
  url: '/asc-fit',
  name: 'Is Aescia for Clinics the right fit for your endoscopy ASC?',
  description:
    'Explicit best-fit and not-the-right-fit criteria for Aescia for Clinics at an endoscopy ambulatory surgery center, plus adjacent options when Aescia is not the right choice.',
})

export default function AscFitPage() {
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
