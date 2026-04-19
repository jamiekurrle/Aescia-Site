import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Governance, security posture, and regulatory status',
  description:
    'How Aescia is governed. Investigational medical device posture for Hospitals. Non-device workflow posture for Clinics. Certifications not yet obtained. Full security pack available under NDA.',
  alternates: { canonical: '/governance' },
  openGraph: {
    title: 'Aescia Governance | Honest posture, documented',
    description: 'Regulatory posture, security frameworks, corporate structure, and the boundary between products.',
    url: '/governance',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Governance', url: '/governance' },
])

export default function GovernancePage() {
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
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Governance</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[76px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Honest posture, documented.
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              Aescia runs two products with different regulatory postures. The Hospitals product is an investigational medical device with an intended Class IIa classification; a regulatory application has not yet been lodged. The Clinics product is a workflow tool that is not a medical device and is not represented as one. This page states what each is, and what each is not.
            </p>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="border-t-2 border-foreground pt-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70 mb-4 block">Aescia for Hospitals</span>
              <h2
                className="font-display text-[24px] lg:text-[30px] leading-[1.2] tracking-[-0.02em] mb-6"
                style={{ fontVariationSettings: "'opsz' 80" }}
              >
                Investigational medical device, on pathway.
              </h2>
              <dl className="divide-y divide-border border-y border-border text-[14px]">
                {[
                  ['Classification', 'Software as a Medical Device (SaMD), intended Class IIa under TGA Rule 3.4. Application not yet lodged.'],
                  ['Regulatory roadmap', 'Under development. No TGA, MDSAP, FDA, CE/UKCA, or Health Canada applications have been filed.'],
                  ['Software lifecycle', 'IEC 62304:2006+A1:2015 processes implemented and documented. No third-party conformity assessment yet undertaken.'],
                  ['Quality system', 'ISO 13485:2016 implementation underway. Certification not yet obtained; target 2026.'],
                  ['Information security', 'ISO/IEC 27001:2022 controls implemented. Certification not yet obtained.'],
                  ['Clinical evaluation', 'Through the SAFE-Discharge trial (ACTRN12625001425482).'],
                  ['Current engagement', 'Evaluation and pilot contracts only, not commercial supply.'],
                  ['Output posture', 'Advisory only. The clinician remains the decision-maker.'],
                ].map(([k, v]) => (
                  <div key={k as string} className="grid grid-cols-[130px_1fr] gap-4 py-5">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">{k}</dt>
                    <dd className="text-foreground/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-t-2 border-accent pt-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent mb-4 block">Aescia for Clinics</span>
              <h2
                className="font-display text-[24px] lg:text-[30px] leading-[1.2] tracking-[-0.02em] mb-6"
                style={{ fontVariationSettings: "'opsz' 80" }}
              >
                A workflow tool. Not a medical device.
              </h2>
              <dl className="divide-y divide-border border-y border-border text-[14px]">
                {[
                  ['Classification', 'Software as a Service. Not a medical device, not represented as one.'],
                  ['Boundary', 'Does not diagnose, does not treat, does not propose clinical decisions.'],
                  ['Posture', 'Propose, do not decide. The clinician remains in control.'],
                  ['Rule content', 'Delivers clinician-authored educational content and prep instructions.'],
                  ['Escalation', 'Routes exceptions to named staff, does not act autonomously.'],
                  ['Audit', 'Full record of pathway step, patient response, and clinician review.'],
                  ['Engagement', 'Per-specialty monthly subscription at the clinic level.'],
                ].map(([k, v]) => (
                  <div key={k as string} className="grid grid-cols-[130px_1fr] gap-4 py-5">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">{k}</dt>
                    <dd className="text-foreground/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <p className="max-w-7xl mx-auto text-[13px] text-foreground/70 italic mt-10 border-l-2 border-brass/60 pl-4">
            No conformity-assessment certifications are currently held by either product. Implementation of the listed frameworks is in progress and documented internally. A full security pack is available to prospective customers under mutual NDA.
          </p>
        </section>

        {/* Security and data */}
        <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Security and data</span>
            <h2
              className="font-display text-[32px] lg:text-[46px] leading-[1.08] tracking-[-0.025em] mt-6 mb-12 max-w-3xl"
              style={{ fontVariationSettings: "'opsz' 120" }}
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
                  items: ['ISO/IEC 27001 controls implemented', 'IEC 62304 processes for the regulated product', 'OWASP secure development baseline', 'Independent penetration testing at each release'],
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
                  items: ['Intended Class IIa for Hospitals, application not yet lodged', 'Non-device posture for Clinics, documented per feature', 'No AI models outside clinician-authored rule sets'],
                },
              ].map((block) => (
                <div key={block.title} className="bg-secondary p-7 lg:p-8">
                  <h3
                    className="font-display text-[20px] mb-5"
                    style={{ fontVariationSettings: "'opsz' 72" }}
                  >
                    {block.title}
                  </h3>
                  <ul className="space-y-2.5 text-[13.5px] leading-[1.6] text-foreground/80">
                    {block.items.map((item) => (
                      <li key={item} className="pl-4 relative">
                        <span className="absolute left-0 top-2.5 w-1.5 h-px bg-brass" aria-hidden="true" />
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
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Structured for multi-region operation.
            </h2>
            <dl className="divide-y divide-border border-y border-border">
              {[
                ['Holding entity', 'Aescia Health Inc. (Ontario, Canada). IP and capitalisation.'],
                ['R&D entity', '9550-0708 Québec inc. Canadian data residency and R&D operations. NEQ 1181312316.'],
                ['Regulatory applicant', 'Aescia Pty Ltd (Australia). ABN 96 687 840 517.'],
                ['Resident director', 'Shannon Kurrle, Aescia Pty Ltd. Statutory requirement under the Australian Corporations Act.'],
                ['Registered office', 'Sydney, Australia.'],
                ['Operations', 'Montréal, Canada. Sydney, Australia.'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[180px_1fr] gap-6 py-6">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">{k}</dt>
                  <dd className="text-[15px] text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-[15px] text-foreground/80 flex-1">Need the security pack for procurement?</p>
            <Link
              href="/contact?intent=security-pack"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
            >
              Request under NDA
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
