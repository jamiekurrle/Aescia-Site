import type { Metadata } from 'next'
import { breadcrumbSchema, softwareApplicationSchema } from '@/lib/schema'
import PlatformContent from './platform-content'

export const metadata: Metadata = {
  title: 'A composable pathway engine for clinical follow-up',
  description:
    'One engine, two products. Five step types: Collect, Follow, Remind, Educate, Export. The platform underneath Aescia for Hospitals and Aescia for Clinics.',
  alternates: { canonical: '/platform' },
  openGraph: {
    title: 'Aescia Platform | The engine underneath both products',
    description: 'A composable pathway engine applied twice: surgical recovery and procedural preparation.',
    url: '/platform',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Platform', url: '/platform' },
])

export default function PlatformPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <PlatformContent />
    </>
  )
}
