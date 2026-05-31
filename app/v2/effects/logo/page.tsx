import { SiteNav } from '@/components/site-nav'
import { EditorialHeroLogo } from '@/components/effects-variants/editorial-hero-logo'
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
  title: 'Effects sandbox / Liquid logo',
  description: 'Aescia homepage variant — the cohort diagram replaced with a liquid metal AE mark.',
}

export default function LogoVariant() {
  return (
    <main id="main" className="bg-background min-h-screen">
      <SiteNav transparent />
      <EditorialHeroLogo />
      <CredibilityFacts />
      <AudienceSplit />
      <TrustStrip />
      <PlatformBlurb />
      <Pillars />
      <EvidenceRibbon />
      <PartnersStrip />
      <CTASection />
      <Footer />
      <EffectsLabel name="Liquid Logo" current="logo" />
    </main>
  )
}
