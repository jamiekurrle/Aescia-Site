import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'The team behind Aescia',
  description:
    'Clinicians and technologists building a continuous-care platform for surgical recovery and specialty-clinic workflow.',
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Team | Aescia',
    description: 'The founding team building Aescia.',
    url: '/team',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Team', url: '/team' },
])

const founders = [
  {
    initials: 'JK',
    name: 'James Kurrle',
    title: 'Founder and CEO',
    bio: 'Critical-care physician with ten years of clinical and hospital leadership experience, dual-trained across Montréal and Sydney. Builds the clinical pathway engine and leads company strategy and fundraising.',
  },
  {
    initials: 'VD',
    name: 'Vasken Dermardiros',
    title: 'Co-founder and CTO',
    bio: 'PhD from Concordia University in building-energy machine learning. Owns hosting, AI inference, EMR integration, and the pathway authoring infrastructure that underpins both products.',
  },
  {
    initials: 'JC',
    name: 'Josh Casey',
    title: 'Compliance and Cybersecurity',
    bio: 'Owner of the SOC 2 readiness programme, privacy impact assessments, cybersecurity posture, and regulatory-classification review for the clinic pathway library.',
  },
]

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Team</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[76px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Clinicians building for clinicians.
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              Aescia is built by a small team that writes its own pathways and ships its own code.
            </p>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Founding team</span>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {founders.map((p) => (
                <article key={p.name} className="bg-background p-8 lg:p-9">
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 border border-foreground/25 flex items-center justify-center font-mono text-[13px] tracking-widest text-foreground/80 mb-6"
                  >
                    {p.initials}
                  </div>
                  <h3
                    className="font-display text-[22px] lg:text-[24px] leading-[1.2] tracking-[-0.018em] mb-2"
                    style={{ fontVariationSettings: "'opsz' 80" }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-[13px] text-foreground/75 mb-5 italic">{p.title}</p>
                  <p className="text-[13.5px] leading-[1.65] text-foreground/80">{p.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Clinical advisory</span>
                </div>
                <h2
                  className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em]"
                  style={{ fontVariationSettings: "'opsz' 120" }}
                >
                  Named, credited, accountable.
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80 mb-6">
                  We do not publish advisory rosters we cannot stand behind. A clinical advisory is being formalised alongside the SAFE-Discharge trial at Royal Prince Alfred Hospital. Members will be named here as each of them formally joins and consents to public acknowledgement.
                </p>
                <p className="text-[15px] leading-[1.7] text-foreground/70">
                  For enquiries about the clinical advisory, use the contact page and we will route accordingly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-[15px] text-foreground/80 flex-1">Want to meet the team?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
            >
              Request a briefing
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
