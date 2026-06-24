import type { Metadata } from 'next'
import { breadcrumbSchema } from '@/lib/schema'
import ClinicsContent from './clinics-content'

export const metadata: Metadata = {
  title: 'Aescia for Clinics: endoscopy prep and no-show reduction for US ASCs',
  description:
    'Workflow platform for US ambulatory surgery centres and specialty clinics. Pre-procedure prep pathways, GLP-1 peri-procedural handling, call deflection, surveillance and recall. Interactive ROI calculator anchored to Hopkins 2020, Allen 2023, Mehta 2021, with Beran 2024 on inadequate-prep risk factors (USD $82K saved over 16 weeks on a prep-focused intervention). Not a medical device.',
  alternates: { canonical: '/clinics' },
  openGraph: {
    title: 'Aescia for Clinics | ROI calculator and ASC workflow',
    description: 'Run your own numbers: conservative, expected, and better-case ranges anchored to the prep and no-show literature. Free-until-proof design-partner pilots.',
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
