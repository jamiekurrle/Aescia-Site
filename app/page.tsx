import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { AboutSection } from '@/components/about-section'
import { HowItWorks } from '@/components/how-it-works'
import { EvidenceSection } from '@/components/evidence-section'
import { GovernanceSection } from '@/components/governance-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Nav />
      <Hero />
      <AboutSection />
      <HowItWorks />
      <EvidenceSection />
      <GovernanceSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
