import { SiteNav } from '@/components/site-nav'
import { EditorialHero } from '@/components/editorial-hero'
import { AudienceSplit } from '@/components/audience-split'
import { TrustStrip } from '@/components/trust-strip'
import { PlatformBlurb } from '@/components/platform-blurb'
import { Pillars } from '@/components/pillars'
import { EvidenceRibbon } from '@/components/evidence-ribbon'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main id="main" className="bg-background min-h-screen">
      <SiteNav transparent />
      <EditorialHero />
      <AudienceSplit />
      <TrustStrip />
      <PlatformBlurb />
      <Pillars />
      <EvidenceRibbon />
      <CTASection />
      <Footer />
    </main>
  )
}
