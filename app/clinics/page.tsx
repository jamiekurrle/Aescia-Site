import type { Metadata } from 'next'
import { breadcrumbSchema } from '@/lib/schema'
import ClinicsContent from './clinics-content'

export const metadata: Metadata = {
  title: 'Aescia for Clinics: endoscopy prep and no-show reduction for US ASCs',
  description:
    'Prep pathways, GLP-1 handling and call deflection for US ambulatory surgery centres. ROI calculator anchored to Wang 2023 ASC fees, Beran 2024 risk factors, and prep-coaching trials.',
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
