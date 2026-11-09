import type { Metadata } from 'next'
import { breadcrumbSchema } from '@/lib/schema'
import HospitalsContent from './hospitals-content'

export const metadata: Metadata = {
  title: "Post-discharge check-ins and nurse alerts, on your hospital's rules",
  description:
    "Aescia for Hospitals sends patients your hospital's check-in questions and education after discharge, and alerts your nurses when an answer meets a rule your hospital set. Used in the SAFE-Discharge trial at Royal Prince Alfred Hospital.",
  alternates: { canonical: '/hospitals' },
  openGraph: {
    title: 'Aescia for Hospitals | Post-discharge check-ins and nurse alerts',
    description:
      "Post-discharge check-ins and nurse alerts, on your hospital's rules. Questions and alert rules written by your clinicians.",
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
