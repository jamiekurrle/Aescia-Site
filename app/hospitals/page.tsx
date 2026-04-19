import type { Metadata } from 'next'
import { breadcrumbSchema } from '@/lib/schema'
import HospitalsContent from './hospitals-content'

export const metadata: Metadata = {
  title: 'Post-surgical recovery monitoring for cardiothoracic surgery',
  description:
    'Aescia for Hospitals is a structured post-discharge monitoring platform for cardiothoracic and other high-acuity surgical recovery. In clinical evaluation through the SAFE-Discharge trial at Royal Prince Alfred Hospital.',
  alternates: { canonical: '/hospitals' },
  openGraph: {
    title: 'Aescia for Hospitals | Post-surgical recovery monitoring',
    description:
      'A structured follow-up layer for cardiothoracic recovery. Clinician-authored pathways, transparent rule-based prioritisation, in clinical evaluation.',
    url: '/hospitals',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'For Hospitals', url: '/hospitals' },
])

export default function HospitalsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <HospitalsContent />
    </>
  )
}
