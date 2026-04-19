import { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Governance | Aescia',
  description:
    'How Aescia is governed: regulatory posture, security frameworks, data residency, clinical oversight, and the boundary between the regulated Hospitals product and the non-regulated Clinics product.',
}

export default function GovernancePage() {
  return (
    <>
      <SiteNav />
      <main className="bg-background min-h-screen">
        <section className="pt-40 pb-20 lg:pt-48 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Governance</span>
              <span className="h-px w-10 bg-accent/50" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[76px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}
            >
              Honest posture, documented.
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/75 max-w-3xl">
              Aescia runs two products with different regulatory postures. The Hospitals product is a medical device in clinical evaluation. The Clinics product is a workflow tool that is not a medical device. This page states what each is, and what each is not.
            </p>
          </div>
        </section>

        {/* Two-column posture */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="border-t-2 border-foreground pt-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/55 mb-4 block">Aescia for Hospitals</span>
              <h2
                className="font-display text-[24px] lg:text-[30px] leading-[1.2] tracking-[-0.02em] mb-6"
                style={{ fontVariationSettings: "'opsz' 80, 'SOFT' 30" }}
              >
                A Class IIa medical device, on pathway.
              </h2>
              <dl className="divide-y divide-border border-y border-border text-[14px]">
                {[
                  ['Classification', 'Software as a Medical Device (SaMD), Class IIa pathway'],
                  ['Pathway', 'TGA Rule 3.4, Class IIa. Planned MDSAP and subsequent FDA De Novo'],
                  ['Software lifecycle', 'IEC 62304 practices, documented'],
                  ['Quality', 'ISO 13485 alignment, in progress'],
                  ['Clinical evaluation', 'Through the SAFE-Discharge trial (ACTRN12625001425482)'],
                  ['Current engagement', 'Evaluation and pilot only, not commercial deployment'],
                  ['Output posture', 'Advisory only, clinician remains the decision-maker'],
                ].map(([k, v]) => (
                  <div key={k as string} className="grid grid-cols-[130px_1fr] gap-4 py-5">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">{k}</dt>
                    <dd className="text-foreground/80">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-t-2 border-accent pt-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent mb-4 block">Aescia for Clinics</span>
              <h2
                className="font-display text-[24px] lg:text-[30px] leading-[1.2] tracking-[-0.02em] mb-6"
                style={{ fontVariationSettings: "'opsz' 80, 'SOFT' 30" }}
              >
                A workflow tool. Not a medical device.
              </h2>
              <dl className="divide-y divide-border border-y border-border text-[14px]">
                {[
                  ['Classification', 'Software as a Service. Not a medical device.'],
                  ['Boundary', 'Does not diagnose, treat, or propose clinical decisions'],
                  ['Posture', 'Propose, do not decide. The clinician remains in control'],
                  ['Rule content', 'Delivers clinician-authored educational content and prep instructions'],
                  ['Escalation', 'Routes exceptions to named staff, does not act autonomously'],
                  ['Audit', 'Full record of pathway step, patient response, and clinician review'],
                  ['Engagement', 'Per-specialty monthly subscription at the clinic level'],
                ].map(([k, v]) => (
                  <div key={k as string} className="grid grid-cols-[130px_1fr] gap-4 py-5">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">{k}</dt>
                    <dd className="text-foreground/80">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Security and data */}
        <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Security and data</span>
            <h2
              className="font-display text-[32px] lg:text-[46px] leading-[1.08] tracking-[-0.025em] mt-6 mb-12 max-w-3xl"
              style={{ fontVariationSettings: "'opsz' 120, 'SOFT' 30" }}
            >
              A documented posture, available to buyers under NDA.
            </h2>

            <div className="grid md:grid-cols-3 gap-px bg-border">
              {[
                {
                  title: 'Identity',
                  items: ['SAML 2.0 and OIDC single sign-on', 'Role-based access control with audit trail', 'Tenant isolation at the database level'],
                },
                {
                  title: 'Data',
                  items: ['Encryption in transit (TLS 1.3) and at rest (AES-256)', 'Data residency by deployment region', 'Documented sub-processor list on request', 'Minimum-necessary collection by design'],
                },
                {
                  title: 'Software',
                  items: ['ISO 27001 aligned SDLC', 'IEC 62304 practices for the regulated product', 'OWASP secure development baseline', 'Independent penetration testing on release'],
                },
                {
                  title: 'Integration',
                  items: ['HL7 v2 ADT and FHIR R4 inbound', 'Optional flowsheet or note write-back', 'Designed to add a signal layer, not a new portal'],
                },
                {
                  title: 'Clinical oversight',
                  items: ['Clinician-authored pathways and rules', 'Advisory output, clinician decides', 'Escalation policies configurable per institution'],
                },
                {
                  title: 'Regulatory',
                  items: ['Class IIa pathway for Hospitals', 'CDSS-exempt posture for Clinics, documented per feature', 'No AI models outside clinician-authored rule sets'],
                },
              ].map((block) => (
                <div key={block.title} className="bg-secondary p-7 lg:p-8">
                  <h3
                    className="font-display text-[20px] mb-5"
                    style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 30" }}
                  >
                    {block.title}
                  </h3>
                  <ul className="space-y-2.5 text-[13.5px] leading-[1.6] text-foreground/70">
                    {block.items.map((item) => (
                      <li key={item} className="pl-4 relative">
                        <span className="absolute left-0 top-2.5 w-1.5 h-px bg-brass/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Corporate</span>
            <h2
              className="font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
              style={{ fontVariationSettings: "'opsz' 120, 'SOFT' 30" }}
            >
              Structured for multi-region operation.
            </h2>
            <dl className="divide-y divide-border border-y border-border">
              {[
                ['Holding entity', 'Aescia Health Inc. (Ontario, Canada). IP and cap table.'],
                ['R&D entity', 'Aescia Health Québec Inc. Canadian data residency.'],
                ['Regulatory applicant', 'Aescia Pty Ltd (Australia). ABN 96 687 840 517.'],
                ['Registered office', 'Sydney, Australia.'],
                ['Operations', 'Montréal, Canada. Sydney, Australia.'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[180px_1fr] gap-6 py-6">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">{k}</dt>
                  <dd className="text-[15px] text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-[15px] text-foreground/70 flex-1">Need the security pack for procurement?</p>
            <Link
              href="/contact?intent=security-pack"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto"
            >
              Request under NDA
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
