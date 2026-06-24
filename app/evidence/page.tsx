import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, medicalStudySchema } from '@/lib/schema'
import { PageContent } from './content'

// /evidence — TGA-compliant. Hard rules followed:
// - No quantitative benefit claims tied to Aescia. No dollar projections,
//   no readmission-reduction figures, no bed-day figures, no percent
//   reductions. Third-party study figures stay in the cited references, not
//   the page body, which describes associations qualitatively.
// - No therapeutic claims about Aescia. The bed-day / capacity framing is an
//   inference from the cited readmission literature, explicitly not an Aescia
//   claim, and the disclaimer says so.
// - Covers two literatures: post-discharge monitoring (Hospitals) and
//   pre-procedure preparation / prehabilitation (Clinics, a non-device tool).
// - Literature-based content only, framed as observations about the
//   published research, not as outcomes Aescia will deliver.
// - Same nav, same footer, same regulatory band as /hospitals.

export const metadata: Metadata = {
  title: 'Clinical evidence and the SAFE-Discharge trial',
  description:
    'The published evidence base for structured post-discharge monitoring and for pre-procedure preparation and prehabilitation, and Aescia\'s approach to generating product-specific evidence through the SAFE-Discharge clinical evaluation.',
  alternates: { canonical: '/evidence' },
  openGraph: {
    title: 'Clinical evidence | Aescia',
    description: 'The published evidence base, and our approach to product-specific clinical evaluation.',
    url: '/evidence',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Clinical evidence', url: '/evidence' },
])

export default function EvidencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalStudySchema) }}
      />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <PageContent />
      </main>
      <Footer />
    </>
  )
}
