import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'GLP-1 screening and prep before endoscopy software',
  description:
    'GLP-1 agonists (semaglutide, tirzepatide, liraglutide) slow gastric emptying, which raised peri-procedural aspiration concern and produced evolving 2023 to 2024 guidance for endoscopy. Aescia for Clinics flags every GLP-1 patient at intake and applies the clinic’s authored protocol consistently. Pre-first-customer; not a medical device.',
  alternates: { canonical: '/glp1-endoscopy-prep' },
  openGraph: {
    title: 'GLP-1 screening and prep before endoscopy | Aescia for Clinics',
    description:
      'Flag every GLP-1 patient at intake and apply your gastroenterologist’s current protocol consistently, instead of relying on front-desk memory.',
    url: '/glp1-endoscopy-prep',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'GLP-1 screening and prep before endoscopy', url: '/glp1-endoscopy-prep' },
])

const pageSchema = webPageSchema({
  url: '/glp1-endoscopy-prep',
  name: 'GLP-1 screening and prep before endoscopy software',
  description:
    'Why GLP-1 agonists matter before endoscopy, how the 2023 to 2024 guidance evolved, and how Aescia for Clinics flags GLP-1 patients at intake and applies the clinic’s authored protocol consistently.',
  isMedicalPage: true,
})

export default function Glp1EndoscopyPrepPage() {
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
