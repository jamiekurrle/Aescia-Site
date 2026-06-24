import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Governance: regulatory posture and quality systems',
  description:
    'How Aescia is governed. Investigational medical device posture for Hospitals. Non-device workflow posture for Clinics. Certifications not yet obtained. Full security pack available under NDA.',
  alternates: { canonical: '/governance' },
  openGraph: {
    title: 'Aescia governance and regulatory posture',
    description: 'Regulatory posture, security frameworks, corporate structure, and the boundary between products.',
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
