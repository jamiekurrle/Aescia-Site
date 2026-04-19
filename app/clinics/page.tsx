import type { Metadata } from 'next'
import { breadcrumbSchema } from '@/lib/schema'
import ClinicsContent from './clinics-content'

export const metadata: Metadata = {
  title: 'Endoscopy prep, no-show reduction, GLP-1 handling',
  description:
    'Aescia for Clinics is a workflow platform for specialty clinics. Pre-procedure prep pathways, GLP-1 handling, call deflection, surveillance and recall. It is not a medical device.',
  alternates: { canonical: '/clinics' },
  openGraph: {
    title: 'Aescia for Clinics | Prep, recall, and workflow',
    description: 'Better prep. Fewer no-shows. Less phone work. A workflow platform for specialty clinics.',
    url: '/clinics',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'For Clinics', url: '/clinics' },
])

export default function ClinicsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <ClinicsContent />
    </>
  )
}
