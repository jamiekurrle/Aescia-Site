import { SiteNav } from '@/components/site-nav'
import { EditorialHeroR3F } from '@/components/effects-variants/editorial-hero-r3f'
import { CredibilityFacts } from '@/components/credibility-facts'
import { AudienceSplit } from '@/components/audience-split'
import { TrustStrip } from '@/components/trust-strip'
import { PlatformBlurb } from '@/components/platform-blurb'
import { Pillars } from '@/components/pillars'
import { EvidenceRibbon } from '@/components/evidence-ribbon'
import { PartnersStrip } from '@/components/partners-strip'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { EffectsLabel } from '@/components/effects-variants/effects-label'

export const metadata = {
  title: 'Effects sandbox / Care orbit (R3F)',
  description: 'Aescia homepage variant — cohort diagram replaced with a live three.js care-orbit.',
}

export default function R3FVariant() {
  return (
    <main id="main" className="bg-background min-h-screen">
      <SiteNav transparent />
      <EditorialHeroR3F />
      <CredibilityFacts />
      <AudienceSplit />
      <TrustStrip />
      <PlatformBlurb />
      <Pillars />
      <EvidenceRibbon />
      <PartnersStrip />
      <CTASection />
      <Footer />
      <EffectsLabel name="React Three Fiber" current="r3f" />
    </main>
  )
}
