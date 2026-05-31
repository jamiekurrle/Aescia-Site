import { SiteNav } from '@/components/site-nav'
import { EditorialHero } from '@/components/editorial-hero'
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
  name: 'Aescia. A continuous-care platform.',
  description:
    'A continuous-care platform for US ambulatory surgery centres and hospital surgical recovery. HIPAA-aligned with BAA on request, US-region hosting on Google Cloud for US ASCs, HL7 v2 ADT and FHIR R4 integration ready, design-partner program with free-until-proof pilots and 3-year price-lock.',
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
