import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, jamesKurrlePersonSchema } from '@/lib/schema'
import { PageContent } from './content'

const SITE_URL = 'https://www.aesciahealth.com'

export const metadata: Metadata = {
  title: 'James Kurrle | Founder of Aescia',
  description:
    'James Kurrle is a critical-care physician and the founder of Aescia, a continuous-care platform for structured patient follow-up and specialty-clinic workflow.',
  alternates: { canonical: '/team/james-kurrle' },
  openGraph: {
    title: 'James Kurrle | Founder of Aescia',
    description:
      'James Kurrle is a critical-care physician and the founder of Aescia, building a continuous-care platform for hospitals and specialty clinics.',
    url: '/team/james-kurrle',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'James Kurrle | Founder of Aescia',
    description:
      'Critical-care physician and founder of Aescia. Authors the clinical pathway engine; leads company strategy.',
  },
  other: {
    // IndieAuth / rel-me: links this page to the LinkedIn profile so that
    // crawlers and identity verifiers can resolve James Kurrle ↔ this page.
    'rel-me': 'https://www.linkedin.com/in/jameskurrle/',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Team', url: '/team' },
  { name: 'James Kurrle', url: '/team/james-kurrle' },
])

export default function JamesKurrlePage() {
  return (
    <>
      {/* IndieAuth-style rel="me" verification, in addition to the meta
          variant above. Some verifiers prefer the link element. */}
      <link rel="me" href="https://www.linkedin.com/in/jameskurrle/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jamesKurrlePersonSchema) }}
      />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <PageContent />
      </main>
      <Footer />
    </>
  )
}
