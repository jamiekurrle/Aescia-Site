import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { OPEN_ROLES } from '@/lib/careers'
import { PageContent } from './content'

// With no role currently open, the snippet says so rather than advertising a
// vacancy that a search result would carry for weeks after hiring paused.
const CAREERS_DESCRIPTION = OPEN_ROLES.length
  ? 'Open roles at Aescia, a clinician-led team building continuous-care software for hospitals and specialty clinics. Small team, real product in clinical evaluation, remote-friendly across Montréal, Sydney, and US timezones.'
  : 'Aescia is not hiring at the moment. We are a clinician-led team building continuous-care software for hospitals and specialty clinics, and we still read every note sent to us.'

export const metadata: Metadata = {
  title: OPEN_ROLES.length
    ? 'Careers: build clinician-led medical software'
    : 'Careers: no open roles at the moment',
  description: CAREERS_DESCRIPTION,
  alternates: { canonical: '/careers' },
  openGraph: {
    title: OPEN_ROLES.length ? 'Careers | Aescia' : 'Careers | No open roles at the moment',
    description: CAREERS_DESCRIPTION,
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
  description: CAREERS_DESCRIPTION,
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
