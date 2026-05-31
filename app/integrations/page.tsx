import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Aescia integrations for endoscopy and ASC scheduling',
  description:
    'Honest per-system status for Aescia integrations. HL7 v2 ADT and FHIR R4 ingestion ready today. Manual CSV available for any system. Direct real-time API integrations with Provation, EndoWorks, and ModMed gGastro scoped per-customer at engagement.',
  alternates: { canonical: '/integrations' },
  openGraph: {
    title: 'Integrations | Aescia',
    description: 'Per-system integration status. HL7 v2 ADT and FHIR R4 ingestion ready. Real-time APIs scoped per customer.',
    url: '/integrations',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Integrations', url: '/integrations' },
])

const pageSchema = webPageSchema({
  url: '/integrations',
  name: 'Aescia integrations status — endoscopy reporting, practice-management, messaging',
  description:
    'Per-system integration detail for Aescia. Names Provation, EndoWorks, ModMed gGastro, Twilio. States what is live today and what is roadmap, with the implementation lift for the customer\'s IT team.',
})

type Mode = 'live' | 'ready' | 'manual' | 'roadmap'

const modeLabel: Record<Mode, string> = {
  live: 'Live with a customer today',
  ready: 'Framework ready, scoped per customer',
  manual: 'Manual export today',
  roadmap: 'On the roadmap',
}

const modeTint: Record<Mode, string> = {
  live: 'bg-foreground text-background',
  ready: 'bg-accent text-background',
  manual: 'bg-brass/90 text-foreground',
  roadmap: 'border border-foreground/30 text-foreground/70',
}

type Row = {
  system: string
  category: 'Endoscopy reporting' | 'Practice management' | 'Scheduling' | 'Messaging' | 'Authentication' | 'Standards'
  shape: string
  status: Mode
  detail: string
  lift: string
}

const rows: Row[] = [
  {
    system: 'HL7 v2 ADT',
    category: 'Standards',
    shape: 'Inbound feed',
    status: 'ready',
    detail: 'Admit, discharge, and transfer messages ingested for patient demographics and procedure-encounter linkage. Used as the canonical patient feed when an EMR vendor exposes HL7 v2 but not FHIR.',
    lift: 'IT configures a one-way HL7 feed to a customer-specific endpoint inside the Aescia tenant. Typical setup: half a day on the customer side after the endpoint is provisioned.',
  },
  {
    system: 'FHIR R4',
    category: 'Standards',
    shape: 'Inbound feed',
    status: 'ready',
    detail: 'Patient, Encounter, Appointment, and Observation resources ingested via FHIR R4. Used as the canonical feed where the EMR exposes FHIR.',
    lift: 'IT provisions an API client credential on the EMR side and shares the FHIR base URL. Typical setup: under a day on the customer side.',
  },
  {
    system: 'Provation Apex',
    category: 'Endoscopy reporting',
    shape: 'Per-customer scoping',
    status: 'ready',
    detail: 'Aescia ingests scheduled procedures and writes structured outputs back to the chart by HL7 v2 or FHIR R4 where the customer\'s Provation Apex configuration permits. A direct real-time API integration is not live with a customer today and will be scoped at the design-partner engagement.',
    lift: 'IT enables the customer\'s existing Provation Apex outbound HL7/FHIR feeds toward Aescia. No Provation-side custom build is required for Aescia to read the schedule.',
  },
  {
    system: 'Olympus EndoWorks',
    category: 'Endoscopy reporting',
    shape: 'Per-customer scoping',
    status: 'ready',
    detail: 'EndoWorks integration is scoped per-customer. HL7 v2 and FHIR ingestion is the supported path today. Where the customer is on a configuration that does not expose either, manual export is used and the IT lift is documented up front.',
    lift: 'Where HL7/FHIR is available, IT enables an outbound feed toward Aescia. Where not available, a scheduled CSV export from EndoWorks is the bridge until the customer\'s EMR upgrade cycle exposes a structured path.',
  },
  {
    system: 'ModMed gGastro (EMR and PM)',
    category: 'Endoscopy reporting',
    shape: 'Per-customer scoping',
    status: 'ready',
    detail: 'gGastro is the most common GI-specialty EMR in US ambulatory surgery. Aescia ingests appointment, prep-instruction, and procedure data via HL7 v2 or FHIR R4 where the customer\'s gGastro configuration permits. A direct gGastro Marketplace integration is on the roadmap and is the natural Phase 2 path once Aescia has named US ASC reference customers; until then the integration is scoped per-customer.',
    lift: 'IT works with their ModMed account team to enable an outbound HL7/FHIR feed toward Aescia. ModMed-side custom development is not required for the read path.',
  },
  {
    system: 'ModMed gGastro practice-management (scheduling and recall)',
    category: 'Practice management',
    shape: 'Per-customer scoping',
    status: 'ready',
    detail: 'Separately from the EMR side, gGastro PM is the schedule of record at most ASCs. Aescia reads the appointment schedule and writes patient-facing prep, GLP-1, and recall communications without requiring the front-desk team to swivel-chair between Aescia and gGastro PM.',
    lift: 'Same outbound HL7/FHIR feed pattern. No second login for the front-desk team after pathway activation.',
  },
  {
    system: 'Other US ASC practice-management systems',
    category: 'Practice management',
    shape: 'Per-customer scoping',
    status: 'ready',
    detail: 'For ASCs running PM systems other than gGastro, Aescia ingests scheduled procedures and writes back via HL7 v2, FHIR R4, or a structured CSV export. Specific systems documented at engagement.',
    lift: 'IT exposes an outbound feed or a CSV export. Field selection is documented in the pre-pilot integration memo.',
  },
  {
    system: 'Twilio',
    category: 'Messaging',
    shape: 'SMS, short-code, and two-way messaging',
    status: 'live',
    detail: 'SMS and short-code messaging for prep coaching, confirm-and-reschedule, GLP-1 instruction delivery, and surveillance recall. Aescia operates a HIPAA-eligible Twilio configuration; BAA executed before any PHI passes through it.',
    lift: 'No customer-side lift. Aescia provisions a US short-code or local number per customer.',
  },
  {
    system: 'SAML 2.0 / OIDC SSO',
    category: 'Authentication',
    shape: 'Federated identity',
    status: 'ready',
    detail: 'Single sign-on supported via SAML 2.0 and OIDC for staff. Role-based access control with audit trail. Tenant isolation at the database level.',
    lift: 'IT registers Aescia as a relying party in the customer\'s identity provider (Okta, Azure AD, Google Workspace, etc.).',
  },
]

const categories: Array<Row['category']> = [
  'Endoscopy reporting',
  'Practice management',
  'Scheduling',
  'Messaging',
  'Authentication',
  'Standards',
]

export default function IntegrationsPage() {
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
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Integrations</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Where each integration stands.
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              Integration is the silent ROI-killer. This page names each system Aescia talks to, what shape the integration takes, what is live today, what is ready and waiting on a first customer engagement, and what the IT lift looks like for the ASC. If a row says manual, it is manual.
            </p>
          </div>
        </section>

        {/* Legend */}
        <section className="py-12 lg:py-16 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/60 mb-5">How to read the status column</p>
            <ul className="grid sm:grid-cols-2 gap-3 text-[13px] text-foreground/80">
              {(['live', 'ready', 'manual', 'roadmap'] as Mode[]).map((m) => (
                <li key={m} className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${modeTint[m]}`}>{m}</span>
                  <span>{modeLabel[m]}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Per-system rows grouped by category */}
        {categories.map((cat) => {
          const inCat = rows.filter((r) => r.category === cat)
          if (inCat.length === 0) return null
          return (
            <section key={cat} className="py-16 lg:py-20 px-6 lg:px-10 border-b border-border">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-baseline gap-4 mb-10">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{cat}</span>
                  <span className="h-px flex-1 bg-border" aria-hidden="true" />
                </div>
                <div className="divide-y divide-border border-y border-border bg-background">
                  {inCat.map((row) => (
                    <article key={row.system} className="py-7 px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[280px_1fr_220px] gap-4 lg:gap-8 items-start">
                      <div>
                        <h3
                          className="font-display text-[19px] lg:text-[21px] leading-[1.25] tracking-[-0.015em] mb-2"
                          style={{ fontVariationSettings: "'opsz' 80" }}
                        >
                          {row.system}
                        </h3>
                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/60">{row.shape}</p>
                      </div>
                      <div className="text-[14.5px] leading-[1.65] text-foreground/80">
                        <p>{row.detail}</p>
                        <p className="mt-3 text-[13px] text-foreground/65"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/55 mr-2">IT lift</span>{row.lift}</p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${modeTint[row.status]}`}>{row.status}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        {/* What we will not pretend */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">What we will not pretend</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.15] tracking-[-0.02em] mt-6 mb-10"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Three things this page would have told you anyway.
            </h2>
            <ul className="space-y-7">
              <li className="border-l-2 border-brass/60 pl-5">
                <p className="text-[16px] leading-[1.7] text-foreground/85">
                  <strong className="text-foreground">No reference Provation, EndoWorks, or gGastro customer is live yet.</strong> Aescia for Clinics is pre-first-customer. The HL7 v2 ADT and FHIR R4 paths are framework-ready, not field-proven in a US ASC. Field-proving them is what the design-partner program is for; the integration scoping memo is in the pilot contract.
                </p>
              </li>
              <li className="border-l-2 border-brass/60 pl-5">
                <p className="text-[16px] leading-[1.7] text-foreground/85">
                  <strong className="text-foreground">A ModMed gGastro Marketplace listing is a Phase 2 step, not a Phase 1 one.</strong> The Marketplace listing requires a named reference customer running the integration; that is the natural ladder, not the place we start. Until then the integration runs against the customer{`'`}s own outbound feeds.
                </p>
              </li>
              <li className="border-l-2 border-brass/60 pl-5">
                <p className="text-[16px] leading-[1.7] text-foreground/85">
                  <strong className="text-foreground">If your environment is on a manual export path, the page will say so in the pilot memo.</strong> Discovering the manual path during week two of a pilot is the kind of surprise that eats ROI silently. Aescia documents the lift before the contract is signed.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-[15px] text-foreground/80 flex-1">Tell us the systems your ASC runs. We will return a one-page integration memo before the pilot starts.</p>
            <Link
              href="/contact?intent=integrations"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
            >
              Request integration memo
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
