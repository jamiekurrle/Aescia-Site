import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Endoscopy pre-procedure workflow and patient pathway software',
  description:
    'Endoscopy pre-procedure workflow software automates the patient journey from booking confirmation to procedure day: prep instructions, medication overlays (GLP-1, anticoagulant, diabetic), reminders, consent, and prep confirmation. Aescia for Clinics is a clinician-authored platform in this category. Pre-first-customer.',
  alternates: { canonical: '/endoscopy-pre-procedure-workflow' },
  openGraph: {
    title: 'Endoscopy pre-procedure workflow software | Aescia for Clinics',
    description:
      'From booking to procedure day: clinician-authored prep pathways, medication overlays, consent capture, and prep confirmation, in one pathway.',
    url: '/endoscopy-pre-procedure-workflow',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Endoscopy pre-procedure workflow software', url: '/endoscopy-pre-procedure-workflow' },
])

const pageSchema = webPageSchema({
  url: '/endoscopy-pre-procedure-workflow',
  name: 'Endoscopy pre-procedure workflow and patient pathway software',
  description:
    'What endoscopy pre-procedure workflow software does, and how Aescia for Clinics delivers it: a clinician-authored pathway covering prep, medication overlays, consent, reminders, and prep confirmation from booking to procedure day.',
  isMedicalPage: true,
})

export default function EndoscopyWorkflowPage() {
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
