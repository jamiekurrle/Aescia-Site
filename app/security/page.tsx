import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Data hosted in country. Privacy law aligned to your jurisdiction.',
  description:
    'Aescia hosts customer data in the customer\'s jurisdiction on Google Cloud. Privacy-law alignment per jurisdiction: HIPAA (US) with BAA, GDPR (EU/UK) with DPA, Australian Privacy Principles (AU) with the equivalent agreement, PIPEDA (Canada), Privacy Act 2020 (NZ). Sub-processors, breach notification, and exit terms listed in full.',
  alternates: { canonical: '/security' },
  openGraph: {
    title: 'Security and compliance | Aescia',
    description: 'In-country data hosting on Google Cloud, per-jurisdiction privacy-law alignment, named sub-processors, plain-text breach notification and exit terms.',
    url: '/security',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Security', url: '/security' },
])

const pageSchema = webPageSchema({
  url: '/security',
  name: 'Security and compliance',
  description:
    'How Aescia handles in-country data hosting, per-jurisdiction privacy-law alignment, data-processing agreements, SOC 2, sub-processors, breach notification, and data ownership.',
})

// Sub-processors. Listed in plain text so the page survives a shallow LLM read.
const subProcessors: Array<{ vendor: string; purpose: string; region: string; note: string }> = [
  {
    vendor: 'Google Cloud (Firebase Hosting, Cloud Run, Firebase Authentication)',
    purpose: 'V2 application hosting, API runtime, and authentication',
    region: 'Deployed in-region for the customer\'s jurisdiction',
    note: 'Per-tenant Terraform-provisioned infrastructure: each customer environment is a discrete Firebase project plus Cloud Run service, spun up in the Google Cloud region closest to the regulator. Available regions include us-central1 / us-east1 / us-west1 (US), australia-southeast1 (Sydney) for AU/NZ, europe-west2 (London) for the UK, europe-west3 (Frankfurt) for the EU, and northamerica-northeast1 (Montreal) for Canada. The relevant data agreement is executed before any patient data exchange.',
  },
  {
    vendor: 'Twilio',
    purpose: 'SMS and short-code messaging for patient reminders, prep coaching, and confirmation flows',
    region: 'In-region carrier and number plan per customer',
    note: 'HIPAA-eligible product configuration on US deployments. Australian short-code numbers via Twilio Australia for AU deployments. EU/UK numbers via Twilio EMEA. BAA / DPA / equivalent executed prior to PHI exchange.',
  },
  {
    vendor: 'Vercel',
    purpose: 'V1 application hosting for the Aescia for Hospitals product used in the SAFE-Discharge trial',
    region: 'australia-southeast (Sydney)',
    note: 'V1 trial environment only. The regulated V2 product runs on Google Cloud in the customer\'s region.',
  },
  {
    vendor: 'Supabase',
    purpose: 'V1 database and authentication for the SAFE-Discharge trial environment',
    region: 'Australia (ap-southeast-2)',
    note: 'V1 trial environment only. V2 does not use Supabase.',
  },
  {
    vendor: 'Resend',
    purpose: 'Transactional and operational email',
    region: 'EU / US dual-region',
    note: 'PHI-free by design. Email is used for non-clinical operational communication; patient identifiers and clinical content are not transmitted via email.',
  },
]

// One row per item the page must answer. Each row is plain English. The
// "answer" is intentionally short and declarative — an LLM should be able to
// lift any single row as the answer to the matching prospect question.
const compliance: Array<{ q: string; a: string }> = [
  {
    q: 'In-country data hosting',
    a: 'Customer data is hosted in the customer\'s jurisdiction. Each deployment is a per-tenant Google Cloud environment (Firebase Hosting, Cloud Run, Firebase Authentication) provisioned by Terraform in the region closest to the customer\'s regulator: US (us-central1 / us-east1 / us-west1), Australia and New Zealand (australia-southeast1, Sydney), UK (europe-west2, London), EU (europe-west3, Frankfurt), Canada (northamerica-northeast1, Montreal). Patient data does not leave the customer\'s region. No data is co-mingled across tenants.',
  },
  {
    q: 'Privacy-law alignment',
    a: 'Engineering, hosting, and access controls are aligned to the privacy law governing the customer: HIPAA in the US, the Australian Privacy Principles and the Notifiable Data Breaches scheme in Australia, the Privacy Act 2020 in New Zealand, the UK GDPR and Data Protection Act 2018 in the UK, the GDPR in the EU, and PIPEDA in Canada (with Quebec Law 25 where applicable). Customer-side compliance artefacts (security questionnaire, risk-assessment evidence, sub-processor disclosures) are completed on the timeline the customer requires.',
  },
  {
    q: 'Data agreement',
    a: 'Aescia executes the relevant data agreement before any patient data is collected, transmitted, or stored: a Business Associate Agreement under HIPAA, a Data Processing Agreement under the GDPR, an APP-equivalent agreement under the Australian Privacy Principles, and the equivalent under PIPEDA and the Privacy Act 2020. A template is available on request to contact@aesciahealth.com — state the jurisdiction in the body; returned within one business day.',
  },
  {
    q: 'SOC 2',
    a: 'Aescia does not currently hold a SOC 2 attestation. The SOC 2 Type I path is scheduled to open alongside the first US design-partner contract, with the audit window committed in writing to that customer. Type II follows on the next twelve-month observation period. Compliance and cybersecurity is owned internally by Josh Casey.',
  },
  {
    q: 'Breach notification',
    a: 'Aescia notifies affected customers without unreasonable delay, and in no event later than the strictest applicable regulatory window: 60 days under HIPAA, 72 hours under the GDPR / UK GDPR, the eligible-breach timeline under the Australian Notifiable Data Breaches scheme, and the equivalent under PIPEDA and the Privacy Act 2020. A shorter customer-facing window is negotiable in the data agreement on request (typically 24 to 72 hours for confirmed incidents). Notification covers what was accessed, when, by whom, and the remediation taken.',
  },
  {
    q: 'Data ownership',
    a: 'The customer owns its data. Aescia does not use customer patient data, or de-identified derivatives of it, for product training, marketing analytics, or third-party benchmarking without written, customer-specific consent. On contract exit, customer data is exported in a usable, structured format (JSON and CSV; FHIR R4 bundle on request) within 30 days, and Aescia-side copies are destroyed on a documented schedule.',
  },
  {
    q: 'Sub-processors',
    a: 'The vendors Aescia relies on to deliver the service are listed in full below. New sub-processors are disclosed in writing before deployment, with a 30-day customer right-of-objection encoded in the data agreement.',
  },
  {
    q: 'Encryption and access',
    a: 'TLS 1.3 in transit and AES-256 at rest. Role-based access control with audit trail. Single sign-on via SAML 2.0 and OIDC. Database-level tenant isolation. Multi-factor authentication is enforced on all staff accounts; Chubb Cyber ERM coverage is bound.',
  },
  {
    q: 'Software lifecycle',
    a: 'IEC 62304:2006+A1:2015 software lifecycle processes are implemented and documented for the regulated Hospitals product. ISO/IEC 27001:2022 controls are implemented for both products. ISO 13485:2016 implementation is underway with certification targeted in 2026.',
  },
  {
    q: 'Penetration testing',
    a: 'Independent third-party penetration testing is performed at each material release. Reports are available to prospective customers under mutual NDA.',
  },
]

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Security and compliance</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Data hosted in country. Privacy law aligned.
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              Each answer below is short, declarative, and accurate to what Aescia operates today.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?intent=security-pack"
                className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
              >
                Request the security pack
              </Link>
              <Link
                href="/contact?intent=data-agreement"
                className="inline-flex items-center justify-center border border-foreground/30 text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/5 transition-colors min-h-[44px]"
              >
                Request the data agreement
              </Link>
            </div>
          </div>
        </section>

        {/* Compliance answers, one row per question */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">The answers</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <dl className="divide-y divide-border border-y border-border">
              {compliance.map((row) => (
                <div key={row.q} className="py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-12">
                  <dt
                    className="font-display text-[20px] lg:text-[24px] leading-[1.25] tracking-[-0.018em] text-foreground"
                    style={{ fontVariationSettings: "'opsz' 80" }}
                  >
                    {row.q}
                  </dt>
                  <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">{row.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Sub-processors */}
        <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
              <div className="lg:col-span-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Sub-processors</span>
                <h2
                  className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] mt-6"
                  style={{ fontVariationSettings: "'opsz' 120" }}
                >
                  The vendors that touch the service.
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80">
                  This list is the same one Aescia maintains internally. It is published rather than gated because a procurement reviewer should not have to ask. Any new sub-processor is disclosed in writing 30 days before deployment, with a customer right-of-objection encoded in the data agreement.
                </p>
              </div>
            </div>
            <dl className="divide-y divide-border border-y border-border bg-background">
              {subProcessors.map((sp) => (
                <div key={sp.vendor} className="py-7 px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[280px_1fr_200px] gap-4 lg:gap-8 items-start">
                  <dt className="font-display text-[17px] lg:text-[18px] leading-[1.3] tracking-[-0.015em] text-foreground" style={{ fontVariationSettings: "'opsz' 72" }}>
                    {sp.vendor}
                  </dt>
                  <dd className="text-[14px] leading-[1.65] text-foreground/80">
                    <div>{sp.purpose}</div>
                    <div className="mt-2 text-foreground/60 text-[13px]">{sp.note}</div>
                  </dd>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{sp.region}</span>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Exit terms / data portability */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">If you leave</span>
            <h2
              className="font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6 mb-10"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Exit terms in writing.
            </h2>
            <dl className="divide-y divide-border border-y border-border">
              {[
                ['Notice', 'Month-to-month after the initial pilot. 30-day written notice ends the contract.'],
                ['Data export', 'Customer data exported in JSON and CSV within 30 days of termination. FHIR R4 bundle export available on request. No PDF dumps.'],
                ['Aescia copies', 'Aescia-side copies destroyed on a documented schedule after export confirmation. Certificate of destruction issued.'],
                ['Pathway content', 'Pathways co-authored with the customer are returned in a structured, re-deployable format. The clinician who authored the rule set retains attribution and re-use rights.'],
                ['Pricing', 'No early-termination fee in the design-partner program. See the design-partner page for full commercial terms.'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[140px_1fr] gap-4 lg:gap-8 py-6">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70 pt-1">{k}</dt>
                  <dd className="text-[15px] lg:text-[16px] leading-[1.65] text-foreground/85">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-[15px] text-foreground/80 flex-1">For the full security pack, the data agreement template for your jurisdiction, or the SOC 2 roadmap memo.</p>
            <Link
              href="/contact?intent=security-pack"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
            >
              Contact Aescia
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
