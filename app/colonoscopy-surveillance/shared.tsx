import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema, SITE_LAST_UPDATED } from '@/lib/schema'
import { PageContent } from './content'
import type { JurId } from './engine'

const SITE_URL = 'https://www.aesciahealth.com'
// GO_PUBLIC gates whether the guideline pages are discoverable by search and AI
// crawlers. True: each page is indexable (index,follow) with its self-referencing
// canonical. False: each page emits robots noindex,nofollow.
const GO_PUBLIC = true

// Date the Aescia clinical team last reviewed the rules against the published
// guidelines. Bump this ONLY when a real review happens — it is not the build
// date, because a site deploy is not a clinical review.
const LAST_CLINICAL_REVIEW = '2026-07-14'

// `title` is appended with " | Aescia" by the root layout's title template, so
// it must stay short. Descriptions are kept under ~155 chars to avoid SERP
// truncation and avoid "exact" (some results are discretionary or assumptions).
export const JUR_META: Record<JurId, { country: string; guideline: string; lang: string; title: string; desc: string }> = {
  US: {
    country: 'United States',
    guideline: 'USMSTF 2020',
    lang: 'en-US',
    title: 'US Colonoscopy Surveillance Calculator (USMSTF 2020)',
    desc: 'Free clinician tool for US (USMSTF 2020) post-polypectomy colonoscopy surveillance intervals from polyp number, size, and histology, with the guideline rule and source.',
  },
  CA_ON: {
    country: 'Canada — Ontario',
    guideline: 'ColonCancerCheck',
    lang: 'en-CA',
    title: 'Ontario Colonoscopy Surveillance Calculator',
    desc: 'Free clinician tool for Ontario ColonCancerCheck post-polypectomy colonoscopy surveillance intervals from polyp number, size, and histology, with the guideline rule and source.',
  },
  CA_AB: {
    country: 'Canada — Alberta',
    guideline: 'ACRCSP',
    lang: 'en-CA',
    title: 'Alberta Colonoscopy Surveillance Calculator (ACRCSP)',
    desc: 'Free clinician tool for Alberta ACRCSP post-polypectomy colonoscopy surveillance intervals from polyp number, size, and histology, with the guideline rule and source.',
  },
  CA_BC: {
    country: 'Canada — British Columbia',
    guideline: 'BCGuidelines 2022',
    lang: 'en-CA',
    title: 'BC Colonoscopy Surveillance Calculator (BCGuidelines)',
    desc: 'Free clinician tool for British Columbia (BCGuidelines 2022) post-polypectomy colonoscopy surveillance intervals using the combined precancerous-lesion count.',
  },
  AU: {
    country: 'Australia',
    guideline: 'NHMRC / Cancer Council',
    lang: 'en-AU',
    title: 'Australia Colonoscopy Surveillance Calculator (NHMRC)',
    desc: 'Free clinician tool for Australian (NHMRC / Cancer Council) post-polypectomy colonoscopy surveillance intervals from polyp number, size, and histology, with the guideline rule and source.',
  },
  EU: {
    country: 'Europe',
    guideline: 'ESGE 2020',
    lang: 'en-GB',
    title: 'Europe Colonoscopy Surveillance Calculator (ESGE 2020)',
    desc: 'Free clinician tool for European (ESGE 2020) post-polypectomy colonoscopy surveillance intervals from polyp number, size, and histology, with the guideline rule and source.',
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
      images: [{ url: `${SITE_URL}/colonoscopy-surveillance-og`, width: 1200, height: 630, alt: 'Colonoscopy surveillance interval calculator — Aescia' }],
      locale: m.lang.replace('-', '_'),
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.desc,
      images: [`${SITE_URL}/colonoscopy-surveillance-og`],
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
    inLanguage: m.lang,
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
    inLanguage: m.lang,
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
    dateReviewed: LAST_CLINICAL_REVIEW,
    maintainer: { '@id': `${SITE_URL}#organization` },
    provider: { '@id': `${SITE_URL}#organization` },
    publisher: { '@id': `${SITE_URL}#organization` },
    isPartOf: { '@id': `${SITE_URL}#website` },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <PageContent initialJur={initialJur ?? jur} />
      </main>
      <Footer />
    </>
  )
}
