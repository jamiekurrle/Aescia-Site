import { SiteNav } from '@/components/site-nav'
import { VideoHero } from '@/components/video-hero'
import { WorkflowDiagram } from '@/components/workflow-diagram'
import { ValueProps } from '@/components/value-props'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <SiteNav />
      <VideoHero />
      <WorkflowDiagram />
      <ValueProps />
      <CTASection />
      <Footer />
    </main>
  )
}
