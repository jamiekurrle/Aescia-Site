import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Prep-aware waitlist backfill: recover cancelled endoscopy slots',
  description:
    'Prep-aware backfill recovers a cancelled colonoscopy slot by giving it to a patient who can actually be prep-ready in time, not just the next person who says yes. Aescia for Clinics catches the early cancellation signal at prep check-ins, finds and preps a candidate, and flags the swap to staff in the morning. Pre-first-customer; not a medical device.',
  alternates: { canonical: '/prep-aware-backfill' },
  openGraph: {
    title: 'Recover cancelled endoscopy slots: prep-aware backfill | Aescia',
    description:
      'Generic waitlist tools ask who wants an earlier slot. Aescia asks who can actually be prep-ready for it, then recovers the slot.',
    url: '/prep-aware-backfill',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Prep-aware waitlist backfill for endoscopy', url: '/prep-aware-backfill' },
])

const pageSchema = webPageSchema({
  url: '/prep-aware-backfill',
  name: 'Prep-aware waitlist backfill: recover cancelled endoscopy slots',
  description:
    'How Aescia for Clinics recovers cancelled colonoscopy slots with prep-aware backfill: the early cancellation signal from prep check-ins, finding and prepping a candidate, the clinic-authored eligibility rules, the honest ceiling, and what one recovered slot is worth.',
  isMedicalPage: true,
})

export default function PrepAwareBackfillPage() {
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
