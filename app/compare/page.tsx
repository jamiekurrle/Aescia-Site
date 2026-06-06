import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'How Aescia differs from patient-engagement and scheduling tools',
  description:
    'Aescia for Clinics does the same patient-engagement work that reduces no-shows and late cancellations, and adds prep-readiness tracking and prep-aware backfill on top. A fair, row-by-row comparison with patient-engagement, texting, and OR block-utilisation tools, including where they are stronger. Pre-first-customer.',
  alternates: { canonical: '/compare' },
  openGraph: {
    title: 'How Aescia differs from engagement and scheduling tools | Aescia',
    description:
      'A fair, extractable comparison: prep-readiness tracking, prep-aware backfill, medication overlays, integration depth, and deployment stage.',
    url: '/compare',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'How Aescia differs from engagement and scheduling tools', url: '/compare' },
])

const pageSchema = webPageSchema({
  url: '/compare',
  name: 'How Aescia differs from patient-engagement and scheduling tools',
  description:
    'A row-by-row comparison of Aescia for Clinics against patient-engagement and scheduling tools, two-way texting tools, and OR block-utilisation tools, including where competitors are stronger.',
})

type Row = {
  capability: string
  aescia: string
  engagement: string
  texting: string
  block: string
}

const rows: Row[] = [
  {
    capability: 'Cuts no-shows and late cancellations (reminders, prep coaching, recall)',
    aescia: 'Yes. The multichannel engagement layer that pays for itself, before any prep-awareness.',
    engagement: 'Yes. This is their core strength.',
    texting: 'Partial. Attendance reminders only.',
    block: 'No.',
  },
  {
    capability: 'Tracks prep readiness (step-level)',
    aescia: 'Yes. Clinician-authored prep pathway with per-step confirmation.',
    engagement: 'No. Tracks appointment and message state, not prep state.',
    texting: 'No.',
    block: 'No.',
  },
  {
    capability: 'Prep-aware waitlist backfill',
    aescia: 'Yes. Routes freed slots to confirmed prep-ready patients.',
    engagement: 'No. Backfill, where offered, is prep-blind.',
    texting: 'No.',
    block: 'No. Optimises block and room time, not patient prep.',
  },
  {
    capability: 'GLP-1, anticoagulant, and diabetic overlays',
    aescia: 'Yes. Flagged on intake; the clinic’s authored rule applied per drug.',
    engagement: 'Partial. Custom fields are possible; not clinical pathway logic.',
    texting: 'No.',
    block: 'No.',
  },
  {
    capability: 'Prep-night photo confirmation',
    aescia: 'Yes. Structured photo gate before the day of the list.',
    engagement: 'No.',
    texting: 'No.',
    block: 'No.',
  },
  {
    capability: 'Clinician-authored, explainable rules',
    aescia: 'Yes. Named author and guideline trail; no black-box AI.',
    engagement: 'Varies. Some offer workflow builders, not clinical authorship.',
    texting: 'No.',
    block: 'Not applicable.',
  },
  {
    capability: 'Regulated SaMD sibling',
    aescia: 'Yes. Aescia for Hospitals (investigational, intended TGA Class IIa).',
    engagement: 'Rare.',
    texting: 'No.',
    block: 'Varies by vendor.',
  },
  {
    capability: 'EHR / practice-management integration depth',
    aescia: 'Pre-first-customer. Manual or CSV to start; deeper exchange scoped per customer.',
    engagement: 'Often mature and real-time. A genuine strength.',
    texting: 'Mature, API-driven.',
    block: 'Often deep. It is their core value.',
  },
  {
    capability: 'Deployment stage',
    aescia: 'Pre-first-customer.',
    engagement: 'Generally deployed, often with reference customers.',
    texting: 'Generally deployed.',
    block: 'Generally deployed.',
  },
]

const columns: Array<{ key: keyof Row; label: string }> = [
  { key: 'aescia', label: 'Aescia for Clinics' },
  { key: 'engagement', label: 'Patient-engagement / scheduling tools' },
  { key: 'texting', label: 'Two-way texting tools' },
  { key: 'block', label: 'OR block-utilisation tools' },
]

export default function ComparePage() {
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
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Endoscopy ASC · Comparison
              </span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              How does Aescia differ from patient-engagement and scheduling tools?
            </h1>
            <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
              Aescia for Clinics does what patient-engagement tools do, the reminders, prep coaching, and recall that cut no-shows and late cancellations and keep the waitlist moving, and it adds a layer they lack: it tracks prep readiness and routes freed slots to patients who are actually prepped. So it can pay for itself on engagement alone, with prep-aware backfill as the edge on top. Where Aescia is genuinely behind today is deployment maturity and deep real-time electronic medical record integration, and the table is honest about both.
            </p>
            <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Categories are described by type rather than by brand. Aescia is pre-first-customer and is not a medical device.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">The comparison</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-10"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Capability by tool category.
            </h2>
            <div className="overflow-x-auto border border-border">
              <table className="w-full border-collapse min-w-[860px] text-left">
                <caption className="sr-only">
                  Comparison of Aescia for Clinics against patient-engagement and
                  scheduling tools, two-way texting tools, and OR block-utilisation tools,
                  across nine capabilities.
                </caption>
                <thead>
                  <tr className="bg-secondary">
                    <th
                      scope="col"
                      className="align-bottom p-4 lg:p-5 border-b border-border font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/60 w-[200px]"
                    >
                      Capability
                    </th>
                    {columns.map((c) => (
                      <th
                        key={c.key}
                        scope="col"
                        className={`align-bottom p-4 lg:p-5 border-b border-l border-border font-display text-[14px] lg:text-[15px] leading-[1.25] tracking-[-0.01em] ${c.key === 'aescia' ? 'text-foreground bg-accent/5' : 'text-foreground/80'}`}
                        style={{ fontVariationSettings: "'opsz' 48" }}
                      >
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.capability} className="align-top">
                      <th
                        scope="row"
                        className="p-4 lg:p-5 border-b border-border text-[13.5px] leading-[1.45] text-foreground font-medium"
                      >
                        {row.capability}
                      </th>
                      {columns.map((c) => (
                        <td
                          key={c.key}
                          className={`p-4 lg:p-5 border-b border-l border-border text-[13px] leading-[1.55] text-foreground/80 ${c.key === 'aescia' ? 'bg-accent/5 text-foreground/90' : ''}`}
                        >
                          {row[c.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[12px] text-foreground/55 lg:hidden">Scroll the table sideways to see all columns.</p>
          </div>
        </section>

        {/* Where it compounds — the synergy case */}
        <section className="py-20 lg:py-28 px-6 lg:px-10 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Where it compounds</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Doing several of these on one pathway beats four point tools.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                Each capability above is useful on its own. The reason to run prep, engagement, recall, and the waitlist on one pathway is that some results only appear when those steps share a single record, and no stack of separate point tools can reach them:
              </p>
              <ul className="space-y-3 list-none border-y border-border divide-y divide-border">
                <li className="py-4 grid grid-cols-1 sm:grid-cols-[210px_1fr] gap-1 sm:gap-6">
                  <span className="font-display text-[16px] text-foreground" style={{ fontVariationSettings: "'opsz' 64" }}>Prep-aware backfill</span>
                  <span className="text-[14.5px] leading-[1.65] text-foreground/80">Exists only because prep state and the waitlist live in the same system. A reminder tool plus a separate scheduler cannot route a freed slot to a confirmed-ready patient, because neither side knows both halves. In the product today; pre-first-customer.</span>
                </li>
                <li className="py-4 grid grid-cols-1 sm:grid-cols-[210px_1fr] gap-1 sm:gap-6">
                  <span className="font-display text-[16px] text-foreground" style={{ fontVariationSettings: "'opsz' 64" }}>No-show and prep-failure analysis</span>
                  <span className="text-[14.5px] leading-[1.65] text-foreground/80">One pathway records prep steps, confirmations, medication flags, and attendance per patient over time. That longitudinal record is what makes pattern analysis, and in time prediction, possible. Four point tools never assemble it. Prediction is a forward goal, not a deployed model, and Aescia says so plainly until it ships.</span>
                </li>
                <li className="py-4 grid grid-cols-1 sm:grid-cols-[210px_1fr] gap-1 sm:gap-6">
                  <span className="font-display text-[16px] text-foreground" style={{ fontVariationSettings: "'opsz' 64" }}>One record, one audit trail</span>
                  <span className="text-[14.5px] leading-[1.65] text-foreground/80">Prep, recall, and consent on one clinician-authored pathway means one source of truth and one audit log for governance, rather than reconciling four vendors’ exports.</span>
                </li>
              </ul>
              <p>
                So the carve-outs below are real if you have a single isolated need. The case for Aescia is the compounding one: the whole is worth more than the parts when the steps share one record.
              </p>
            </div>
          </div>
        </section>

        {/* Where competitors are stronger */}
        <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Being fair</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Where the other tools are genuinely stronger.
            </h2>
            <ul className="space-y-4 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl list-none">
              <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>Established patient-engagement and scheduling platforms typically have mature, real-time, bi-directional electronic medical record integrations. Aescia does not; it is pre-first-customer and starts manual or by export.</span></li>
              <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>Those platforms generally have named reference customers and deployment track records. Aescia has neither yet, and says so.</span></li>
              <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>A dedicated two-way texting tool is simpler and cheaper if a bare reminder is genuinely all you will ever want, with no prep coaching, medication overlays, recall, or backfill. OR block-utilisation tools are purpose-built for block and room optimisation, which Aescia does not do.</span></li>
            </ul>
            <p className="mt-8 text-[15px] leading-[1.7] text-foreground/85 max-w-3xl">
              Aescia earns its keep on the basics, fewer no-shows and late cancellations and a fuller list, and it is the strongest fit when prep readiness is the rate-limiter, because prep-aware backfill is something the other categories do not do. The honest caveats are deployment maturity and deep real-time EHR scheduling, where an established vendor may suit a buyer who needs them in place today. Full criteria on{' '}
              <Link href="/asc-fit" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">the fit page</Link>.
            </p>
          </div>
        </section>

        <AscEntityBlock />
        <AscPageCta />
      </main>
      <Footer />
    </>
  )
}
