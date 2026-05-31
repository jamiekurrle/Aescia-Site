import { SiteNavGlass } from '@/components/effects-variants/site-nav-glass'
import { EditorialHeroGlass } from '@/components/effects-variants/editorial-hero-glass'
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
  title: 'Effects sandbox / Liquid glass',
  description: 'Aescia homepage variant — floating liquid-glass navigation and primary CTA.',
}

export default function GlassVariant() {
  return (
    <main id="main" className="bg-background min-h-screen">
      <SiteNavGlass />
      <EditorialHeroGlass />
      <CredibilityFacts />
      <AudienceSplit />
      <TrustStrip />
      <PlatformBlurb />
      <Pillars />
      <EvidenceRibbon />
      <PartnersStrip />
      <CTASection />
      <Footer />
      <EffectsLabel name="Liquid Glass" current="glass" />
    </main>
  )
}
