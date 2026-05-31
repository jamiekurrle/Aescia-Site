import { SiteNav } from '@/components/site-nav'
import { EditorialHeroGradient } from '@/components/effects-variants/editorial-hero-gradient'
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
  title: 'Effects sandbox / Living gradient',
  description: 'Aescia homepage variant — ShaderGradient v2 replacing the hero radial gradient.',
}

export default function GradientVariant() {
  return (
    <main id="main" className="bg-background min-h-screen">
      <SiteNav transparent />
      <EditorialHeroGradient />
      <CredibilityFacts />
      <AudienceSplit />
      <TrustStrip />
      <PlatformBlurb />
      <Pillars />
      <EvidenceRibbon />
      <PartnersStrip />
      <CTASection />
      <Footer />
      <EffectsLabel name="ShaderGradient v2" current="gradient" />
    </main>
  )
}
