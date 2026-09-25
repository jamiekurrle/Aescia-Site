import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Governance: regulatory posture and standards',
  description:
    'How Aescia is governed. Investigational medical device posture for Hospitals. Non-device workflow posture for Clinics. Aescia is not certified to ISO 13485, ISO/IEC 27001 or IEC 62304; certification is planned. Full security pack available under a non-disclosure agreement.',
  alternates: { canonical: '/governance' },
  openGraph: {
    title: 'Aescia governance and regulatory posture',
    description: 'Regulatory posture, certification status, corporate structure, and the boundary between products.',
    url: '/governance',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Governance', url: '/governance' },
])

export default function GovernancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <PageContent />
      </main>
      <Footer />
    </>
  )
}
