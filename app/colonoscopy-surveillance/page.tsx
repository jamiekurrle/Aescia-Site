import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema, faqPageSchema, SITE_LAST_UPDATED } from '@/lib/schema'
import { PageContent } from './content'
import { FAQ_ITEMS } from './faq'

const SITE_URL = 'https://www.aesciahealth.com'

export const metadata: Metadata = {
  title: 'Colonoscopy surveillance interval calculator (USMSTF, ESGE, NHMRC, ColonCancerCheck)',
  description:
    'Free colonoscopy surveillance interval calculator for clinicians: enter bowel-prep quality, polyp number, size, and histology to get the guideline-recommended post-polypectomy interval — when to repeat the colonoscopy — with the exact rule and source. Covers US (USMSTF 2020), Canada (ColonCancerCheck Ontario, Alberta ACRCSP, British Columbia), Australia (NHMRC / Cancer Council), and Europe (ESGE 2020). For health professionals. Not medical advice, not a medical device.',
  keywords:
    'colonoscopy surveillance interval calculator, post-polypectomy surveillance, when to repeat colonoscopy after polyps, colonoscopy follow-up interval, adenoma surveillance interval, USMSTF 2020, ESGE 2020, ColonCancerCheck, ACRCSP, BCGuidelines colonoscopy surveillance, Cancer Council Australia colonoscopy surveillance, NHMRC surveillance colonoscopy, sessile serrated lesion surveillance, high-grade dysplasia adenoma follow-up, 10 mm adenoma surveillance, piecemeal polypectomy follow-up, bowel prep Boston scale, polyp surveillance guideline calculator',
  alternates: { canonical: '/colonoscopy-surveillance' },
  // Soft-launch: orphaned, direct-link-only for now. Not indexed and not
  // promoted (not in sitemap/llms/facts). Remove this `robots` block and add
  // the sitemap/SEO entries to go fully public.
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Colonoscopy surveillance interval calculator | Aescia',
    description:
      'Enter prep, number, size, and histology; get the guideline-recommended surveillance interval with the exact rule and source. US, Canada (Ontario / Alberta / BC), Australia, and Europe. Clinician reference, not a medical device.',
    url: '/colonoscopy-surveillance',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colonoscopy surveillance interval calculator | Aescia',
    description:
      'Free clinician tool: guideline-recommended post-polypectomy colonoscopy surveillance interval across US, Canada, Australia, and Europe, with the exact rule and source.',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Colonoscopy surveillance interval', url: '/colonoscopy-surveillance' },
])

const pageSchema = webPageSchema({
  url: '/colonoscopy-surveillance',
  name: 'Colonoscopy surveillance interval calculator',
  description:
    'A clinician reference tool that returns the guideline-recommended post-polypectomy colonoscopy surveillance interval from bowel-prep quality, polyp number, size, and histology, across the US (USMSTF 2020), Canadian (ColonCancerCheck Ontario, Alberta ACRCSP, British Columbia), Australian (Cancer Council / NHMRC), and European (ESGE 2020) guidelines, showing the exact rule and source behind each result.',
  isMedicalPage: true,
  breadcrumb: breadcrumbs,
})

const faqSchema = faqPageSchema(FAQ_ITEMS.map((f) => ({ q: f.q, a: f.a })))

// WebApplication + MedicalWebPage entity for the calculator itself. Gives
// search and AI answer engines a typed, free-to-use clinical-tool entity that
// matches queries like "colonoscopy surveillance interval calculator".
const appSchema = {
  '@context': 'https://schema.org',
  '@type': ['WebApplication', 'MedicalWebPage'],
  '@id': `${SITE_URL}/colonoscopy-surveillance#tool`,
  name: 'Colonoscopy Surveillance Interval Calculator',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  inLanguage: 'en',
  url: `${SITE_URL}/colonoscopy-surveillance`,
  datePublished: '2026-07-12',
  dateModified: SITE_LAST_UPDATED,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  audience: { '@type': 'MedicalAudience', audienceType: 'Clinician' },
  about: [
    { '@type': 'MedicalCondition', name: 'Colorectal polyps' },
    { '@type': 'MedicalCondition', name: 'Colorectal cancer' },
  ],
  description:
    'A free clinician reference tool that computes the guideline-recommended post-polypectomy colonoscopy surveillance interval from bowel-prep quality, polyp number, size, and histology, and shows the exact rule and source behind each result.',
  featureList: [
    'US USMSTF 2020 surveillance intervals',
    'Canada — ColonCancerCheck (Ontario), ACRCSP (Alberta), BCGuidelines (British Columbia)',
    'Australia — NHMRC / Cancer Council intervals',
    'Europe — ESGE 2020 intervals',
    'Boston Bowel Prep Scale adequacy handling',
    'Adenoma, sessile serrated, traditional serrated, and hyperplastic histology',
    'High-grade dysplasia and piecemeal-resection handling',
    'Transparent guideline rule and verbatim citation for every result',
  ],
  isPartOf: { '@id': `${SITE_URL}#website` },
  publisher: { '@id': `${SITE_URL}#organization` },
}

export default function ColonoscopySurveillancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <PageContent />
      </main>
      <Footer />
    </>
  )
}
