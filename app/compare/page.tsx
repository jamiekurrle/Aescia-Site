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
    'Aescia for Clinics overlaps with patient-engagement and scheduling tools on reminders and slots, but differs in tracking prep readiness rather than appointment state, which is what enables prep-aware backfill. A row-by-row comparison, including where other tools are genuinely stronger. Pre-first-customer.',
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
    'A row-by-row comparison of Aescia for Clinics against prep-blind engagement tools, two-way texting tools, and OR block-utilisation tools, including where competitors are stronger.',
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
  { key: 'engagement', label: 'Prep-blind engagement / scheduling tools' },
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
              Aescia for Clinics overlaps with patient-engagement tools on reminders and with scheduling tools on slots, but it tracks prep readiness rather than appointment state, and that difference is what lets it do prep-aware backfill. Engagement, texting, and block-utilisation tools are often more mature and more deeply integrated than Aescia, which is pre-first-customer; the table below is meant to match each tool to the job it is actually best at.
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
                  Comparison of Aescia for Clinics against prep-blind engagement and
                  scheduling tools, two-way texting tools, and OR block-utilisation tools,
                  across eight capabilities.
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
              <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>Two-way texting tools are simpler, cheaper, and excellent if reminders are all you need. OR block-utilisation tools are purpose-built for block and room optimisation, which Aescia does not do.</span></li>
            </ul>
            <p className="mt-8 text-[15px] leading-[1.7] text-foreground/85 max-w-3xl">
              Aescia is the right choice when prep readiness is the rate-limiter and prep-aware backfill is the goal. For everything else, one of the categories above is likely the better fit. The decision criteria are on{' '}
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
