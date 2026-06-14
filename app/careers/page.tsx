import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Open roles at Aescia, a clinician-led team building continuous-care software for hospitals and specialty clinics. Small team, real product in clinical evaluation, remote-friendly across Montréal, Sydney, and US timezones.',
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Careers | Aescia',
    description: 'Open roles at a clinician-led medical software team.',
    url: '/careers',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Careers', url: '/careers' },
])

const pageSchema = webPageSchema({
  url: '/careers',
  name: 'Careers at Aescia',
  description:
    'Open roles at Aescia, a clinician-led team building continuous-care software for hospitals and specialty clinics.',
})

export default function CareersPage() {
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
