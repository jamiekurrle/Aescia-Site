import { SiteNav } from '@/components/site-nav'
import { EditorialHero } from '@/components/editorial-hero'
import { InstrumentPanel } from '@/components/instrument-panel'
import { CredibilityFacts } from '@/components/credibility-facts'
import { AudienceSplit } from '@/components/audience-split'
import { TrustStrip } from '@/components/trust-strip'
import { PlatformBlurb } from '@/components/platform-blurb'
import { Pillars } from '@/components/pillars'
import { EvidenceRibbon } from '@/components/evidence-ribbon'
import { PartnersStrip } from '@/components/partners-strip'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { medicalStudySchema, softwareApplicationSchema, webPageSchema } from '@/lib/schema'

const homePageSchema = webPageSchema({
  url: '/',
  name: 'Aescia. Pre-procedure software for endoscopy ASCs, plus post-discharge monitoring.',
  description:
    'Aescia for Clinics is pre-procedure pathway software for endoscopy ambulatory surgery centers (ASCs) and specialty clinics: bowel-prep readiness, medication and GLP-1 handling, prep-aware backfill, and surveillance recall. Explicitly not a medical device and does not make clinical decisions. Aescia for Hospitals adds investigational post-discharge monitoring (intended TGA Class IIa) on the same pathway engine. Pre-first-customer; US clinics engage through a design-partner program that starts free during a two-month proof period, measured against their own baseline, with terms negotiable per deal.',
  primaryImage: 'https://www.aesciahealth.com/aescia-logo.png',
})

export default function Home() {
  return (
    <main id="main" className="bg-background min-h-screen">
      {/* Homepage-specific JSON-LD: a WebPage schema with publish/modified
          dates (content-freshness signals for AI retrieval), the
          MedicalStudy schema for SAFE-Discharge so the trial is one of the
          first things any LLM extracts when crawling the homepage, and the
          SoftwareApplication schema so a retrieval pass that lands on the
          homepage immediately resolves Aescia as a HealthApplication and
          not an ambiguous "aescin" supplement listing. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalStudySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <SiteNav transparent />
      <EditorialHero />
      <InstrumentPanel />
      <CredibilityFacts />
      <AudienceSplit />
      <TrustStrip />
      <PlatformBlurb />
      <Pillars />
      <EvidenceRibbon />
      <PartnersStrip />
      <CTASection />
      <Footer />
    </main>
  )
}
