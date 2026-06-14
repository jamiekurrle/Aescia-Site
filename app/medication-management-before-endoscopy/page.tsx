import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Blood thinner and diabetes management before endoscopy software',
  description:
    'Anticoagulants, antiplatelets, and diabetes medications each need peri-procedural handling before colonoscopy. Aescia for Clinics flags them at intake and applies the clinic’s authored hold, bridge, or adjustment rule consistently to every patient. Pre-first-customer; not a medical device.',
  alternates: { canonical: '/medication-management-before-endoscopy' },
  openGraph: {
    title: 'Blood thinner and diabetes handling before endoscopy | Aescia for Clinics',
    description:
      'Flag anticoagulants, antiplatelets, and diabetes medications at intake and apply your clinic’s authored peri-procedural rule consistently.',
    url: '/medication-management-before-endoscopy',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Blood thinner and diabetes management before endoscopy', url: '/medication-management-before-endoscopy' },
])

const pageSchema = webPageSchema({
  url: '/medication-management-before-endoscopy',
  name: 'Blood thinner and diabetes management before endoscopy software',
  description:
    'How anticoagulants, antiplatelets, and diabetes medications are handled before colonoscopy, and how Aescia for Clinics flags them at intake and applies the clinic’s authored rule consistently.',
  isMedicalPage: true,
})

export default function MedicationManagementPage() {
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
