import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Governance: products, security and corporate structure',
  description:
    'How Aescia is governed: what each product does, how data is stored and secured, and the corporate structure. Full security pack available under a non-disclosure agreement.',
  alternates: { canonical: '/governance' },
  openGraph: {
    title: 'Aescia governance',
    description: 'What each product does, security and data, and corporate structure.',
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
