import { SiteNav } from '@/components/site-nav'
import { EditorialHero } from '@/components/editorial-hero'
import { AudienceSplit } from '@/components/audience-split'
import { TrustStrip } from '@/components/trust-strip'
import { PlatformBlurb } from '@/components/platform-blurb'
import { Pillars } from '@/components/pillars'
import { EvidenceRibbon } from '@/components/evidence-ribbon'
import { PartnersStrip } from '@/components/partners-strip'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { medicalStudySchema, webPageSchema } from '@/lib/schema'

const homePageSchema = webPageSchema({
  url: '/',
  name: 'Aescia. A continuous-care platform.',
  description:
    'Structured patient follow-up for hospitals (investigational SaMD, intended TGA Class IIa) and specialty-clinic workflow.',
  primaryImage: 'https://www.aesciahealth.com/aescia-logo.png',
})

export default function Home() {
  return (
    <main id="main" className="bg-background min-h-screen">
      {/* Homepage-specific JSON-LD: a WebPage schema with publish/modified
          dates (content-freshness signals for AI retrieval) and the
          MedicalStudy schema for SAFE-Discharge so the trial is one of the
          first things any LLM extracts when crawling the homepage. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalStudySchema) }}
      />
      <SiteNav transparent />
      <EditorialHero />
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
