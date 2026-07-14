import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema, faqPageSchema, SITE_LAST_UPDATED } from '@/lib/schema'
import { PageContent } from './content'
import { FAQ_ITEMS } from './faq'
import type { JurId } from './engine'

const SITE_URL = 'https://www.aesciahealth.com'
// Soft-launch: still orphaned + noindexed. Flip GO_PUBLIC to true (and add the
// sitemap/nav/llms entries) to launch.
const GO_PUBLIC = false

export const JUR_META: Record<JurId, { country: string; guideline: string; title: string; desc: string }> = {
  US: {
    country: 'United States',
    guideline: 'USMSTF 2020',
    title: 'Colonoscopy surveillance interval calculator — US (USMSTF 2020)',
    desc: 'Free clinician tool: the guideline-recommended post-polypectomy colonoscopy surveillance interval under the US Multi-Society Task Force (USMSTF 2020), from polyp number, size, and histology. Supports multiple lesion types and first or subsequent surveillance.',
  },
  CA_ON: {
    country: 'Canada — Ontario',
    guideline: 'ColonCancerCheck',
    title: 'Colonoscopy surveillance interval — Ontario (ColonCancerCheck)',
    desc: 'Free clinician tool for Ontario ColonCancerCheck post-polypectomy colonoscopy surveillance intervals, from polyp number, size, and histology, with the exact rule and source.',
  },
  CA_AB: {
    country: 'Canada — Alberta',
    guideline: 'ACRCSP 2023',
    title: 'Colonoscopy surveillance interval — Alberta (ACRCSP 2023)',
    desc: 'Free clinician tool for the Alberta ACRCSP 2023 post-polypectomy colonoscopy surveillance intervals, from polyp number, size, and histology, with the exact rule and source.',
  },
  CA_BC: {
    country: 'Canada — British Columbia',
    guideline: 'BCGuidelines 2022',
    title: 'Colonoscopy surveillance interval — British Columbia (BCGuidelines)',
    desc: 'Free clinician tool for the British Columbia (BCGuidelines 2022) post-polypectomy colonoscopy surveillance intervals, using the combined precancerous-lesion count, with the exact rule and source.',
  },
  AU: {
    country: 'Australia',
    guideline: 'NHMRC / Cancer Council',
    title: 'Colonoscopy surveillance interval calculator — Australia (NHMRC / Cancer Council)',
    desc: 'Free clinician tool for Australian (NHMRC / Cancer Council) post-polypectomy colonoscopy surveillance intervals, from polyp number, size, and histology, with the exact rule and source.',
  },
  EU: {
    country: 'Europe',
    guideline: 'ESGE 2020',
    title: 'Colonoscopy surveillance interval calculator — Europe (ESGE 2020)',
    desc: 'Free clinician tool for European (ESGE 2020) post-polypectomy colonoscopy surveillance intervals, from polyp number, size, and histology, with the exact rule and source.',
  },
}

export function makeMetadata(jur: JurId, canonicalPath: string): Metadata {
  const m = JUR_META[jur]
  return {
    title: m.title,
    description: m.desc,
    alternates: { canonical: canonicalPath },
    ...(GO_PUBLIC ? {} : { robots: { index: false, follow: false } }),
    openGraph: {
      title: m.title,
      description: m.desc,
      url: canonicalPath,
      type: 'website',
      siteName: 'Aescia',
      images: [{ url: `${SITE_URL}/colonoscopy-surveillance-og.png`, width: 1200, height: 627, alt: 'Colonoscopy surveillance interval calculator — Aescia' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.desc,
      images: [`${SITE_URL}/colonoscopy-surveillance-og.png`],
    },
  }
}

// `jur` drives the page's SEO metadata + JSON-LD (stable per canonical URL).
// `initialJur` is the visitor's client-side starting jurisdiction (geo default
// on the base page); it does not affect crawlable metadata. Defaults to `jur`.
export function SurveillancePageShell({ jur, canonicalPath, initialJur }: { jur: JurId; canonicalPath: string; initialJur?: JurId }) {
  const url = `${SITE_URL}${canonicalPath}`
  const m = JUR_META[jur]
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Colonoscopy surveillance interval', url: canonicalPath },
  ])
  const pageSchema = webPageSchema({
    url: canonicalPath,
    name: m.title,
    description: m.desc,
    datePublished: '2026-07-12',
    dateModified: SITE_LAST_UPDATED,
    isMedicalPage: true,
    breadcrumb: breadcrumbs,
  })
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#tool`,
    name: 'Colonoscopy Surveillance Interval Calculator',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    inLanguage: 'en',
    url,
    datePublished: '2026-07-12',
    dateModified: SITE_LAST_UPDATED,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    audience: { '@type': 'MedicalAudience', audienceType: 'Clinician' },
    about: [
      { '@type': 'MedicalCondition', name: 'Colorectal polyps' },
      { '@type': 'MedicalCondition', name: 'Colorectal cancer' },
    ],
    description: m.desc,
    featureList: [
      'US USMSTF 2020 surveillance intervals',
      'Canada — ColonCancerCheck (Ontario), ACRCSP (Alberta), BCGuidelines (British Columbia)',
      'Australia — NHMRC / Cancer Council intervals',
      'Europe — ESGE 2020 intervals',
      'Boston Bowel Prep Scale adequacy handling',
      'Adenoma, sessile serrated, traditional serrated, and hyperplastic histology',
      'Multiple lesion types, plus first and subsequent surveillance',
      'Shows the guideline rule and source behind every interval',
    ],
    reviewedBy: { '@type': 'Organization', name: 'Aescia clinical team' },
    dateReviewed: SITE_LAST_UPDATED,
    provider: { '@id': `${SITE_URL}#organization` },
    publisher: { '@id': `${SITE_URL}#organization` },
    isPartOf: { '@id': `${SITE_URL}#website` },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  }
  const faqSchema = { ...faqPageSchema(FAQ_ITEMS.map((f) => ({ q: f.q, a: f.a }))), '@id': `${url}#faq` }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <PageContent initialJur={initialJur ?? jur} />
      </main>
      <Footer />
    </>
  )
}
