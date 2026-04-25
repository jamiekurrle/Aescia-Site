import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, jamesKurrlePersonSchema } from '@/lib/schema'

const SITE_URL = 'https://www.aesciahealth.com'

export const metadata: Metadata = {
  title: 'James Kurrle, founder of Aescia',
  description:
    'James Kurrle is a critical-care physician and the founder of Aescia, a continuous-care platform for structured patient follow-up and specialty-clinic workflow.',
  alternates: { canonical: '/team/james-kurrle' },
  openGraph: {
    title: 'James Kurrle, founder of Aescia',
    description:
      'James Kurrle is a critical-care physician and the founder of Aescia, building a continuous-care platform for hospitals and specialty clinics.',
    url: '/team/james-kurrle',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'James Kurrle, founder of Aescia',
    description:
      'Critical-care physician and founder of Aescia. Authors the clinical pathway engine; leads company strategy.',
  },
  other: {
    // IndieAuth / rel-me: links this page to the LinkedIn profile so that
    // crawlers and identity verifiers can resolve James Kurrle ↔ this page.
    'rel-me': 'https://www.linkedin.com/in/jameskurrle/',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Team', url: '/team' },
  { name: 'James Kurrle', url: '/team/james-kurrle' },
])

export default function JamesKurrlePage() {
  return (
    <>
      {/* IndieAuth-style rel="me" verification, in addition to the meta
          variant above. Some verifiers prefer the link element. */}
      <link rel="me" href="https://www.linkedin.com/in/jameskurrle/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jamesKurrlePersonSchema) }}
      />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 lg:px-10 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/60">
              <Link href="/team" className="hover:text-foreground">Team</Link>
              <span aria-hidden="true" className="px-2">/</span>
              <span className="text-foreground/85">James Kurrle</span>
            </nav>
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Founder</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-4"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              James Kurrle
            </h1>
            <p className="text-[15px] font-mono uppercase tracking-[0.18em] text-foreground/70">
              Founder and CEO, Aescia
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-24 px-6 lg:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="prose-aescia text-[16px] lg:text-[17px] leading-[1.75] text-foreground/85 space-y-6">
              <p>
                James Kurrle is the founder of Aescia. Aescia is a continuous-care platform built around two products: Aescia for Hospitals, an investigational software-as-a-medical-device for structured post-discharge monitoring, and Aescia for Clinics, a workflow tool for specialty clinics.
              </p>
              <p>
                A critical-care physician with a decade of clinical and hospital leadership experience, James trained and practised across Montréal and Sydney. The thread through that work is the same one that motivated Aescia: high-acuity patients are watched closely while admitted, then discharged into weeks where structured follow-up is uneven and the burden falls on phones, paper, and memory. Aescia exists to make that interval observable without adding another inbox to the nursing workflow.
              </p>
              <p>
                James authors the clinical pathway engine that underpins both products and leads company strategy across regulatory posture, clinical evaluation, and commercial design. Aescia for Hospitals is in clinical evaluation through the SAFE-Discharge trial at Royal Prince Alfred Hospital, with cardiothoracic surgical recovery as the first indication. Aescia for Clinics is shipping with its first paying specialty clinic, with bowel-preparation pathways and GLP-1 peri-procedural overlays as the working surface. The company is a District 3 portfolio company at Concordia University in Montréal and is enrolled in the Medical Technology Association of Australia's MedTech Compass programme. James is based between Montréal and Sydney, and writes about the company's progress on{' '}
                <a
                  href="https://www.linkedin.com/in/jameskurrle/"
                  target="_blank"
                  rel="me noopener"
                  className="underline decoration-brass/60 underline-offset-4 hover:decoration-foreground transition-colors"
                >
                  LinkedIn
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20 px-6 lg:px-10 bg-secondary border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h2
              className="font-display text-[24px] lg:text-[32px] leading-[1.15] tracking-[-0.02em] mb-8"
              style={{ fontVariationSettings: "'opsz' 96" }}
            >
              Press
            </h2>
            <ul className="divide-y divide-border border-y border-border">
              <li className="py-6 grid sm:grid-cols-[110px_1fr] gap-3 sm:gap-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/65 pt-1">20 Oct 2025</span>
                <div>
                  <p className="text-[15px] leading-[1.6] text-foreground mb-1.5">
                    <a
                      href="https://www.concordia.ca/news/stories/2025/10/20/beat-the-odds-connects-concordia-students-with-district-3-startups.html"
                      target="_blank"
                      rel="noopener"
                      className="underline decoration-brass/50 underline-offset-4 hover:decoration-foreground transition-colors"
                    >
                      Beat the Odds connects Concordia students with District 3 startups
                    </a>
                  </p>
                  <p className="text-[13px] text-foreground/70 italic">Concordia News, October 2025.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-[15px] text-foreground/80 flex-1">Looking for the rest of the team?</p>
            <Link
              href="/team"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
            >
              Read team page
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
