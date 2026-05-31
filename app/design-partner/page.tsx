import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Aescia design-partner program for first customers',
  description:
    'Aescia\'s structured program for the first ambulatory surgery centres deploying the Clinics product. Success metric, baseline, and measurement method agreed in writing before the pilot starts. Commercial terms negotiated per deal.',
  alternates: { canonical: '/design-partner' },
  openGraph: {
    title: 'Design-partner program | Aescia',
    description:
      'First-customer program for US GI ambulatory surgery centres. Pre-specified success metric measured against the customer\'s own historical data. Commercial structure negotiated per deal.',
    url: '/design-partner',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Design partner', url: '/design-partner' },
])

const pageSchema = webPageSchema({
  url: '/design-partner',
  name: 'Aescia design-partner program',
  description:
    'How Aescia engages with the first ambulatory surgery centres deploying the Clinics product: scope, measurement method, success criterion, data portability, and what stays negotiable.',
})

const programTerms: Array<{ k: string; v: React.ReactNode }> = [
  {
    k: 'Who it is for',
    v: 'Independent or small-group US gastroenterology ambulatory surgery centres in the first wave of Aescia\'s Clinics deployment. Customers are named publicly only with explicit written consent.',
  },
  {
    k: 'What Aescia takes on',
    v: 'Pathways and protocols co-authored with one of your gastroenterologists. Direct support from the founder during onboarding and through the pilot. Aescia carries the integration work against your scheduling and endoscopy reporting systems.',
  },
  {
    k: 'Commercial structure',
    v: 'Negotiated per deal based on your volume, integration scope, contract length, and what your procurement requires. The structure that fits both sides is agreed in writing before the pilot starts.',
  },
  {
    k: 'What we measure',
    v: (
      <>
        The success metric is chosen from outcomes Aescia can directly move and pre-specified in writing before the pilot starts. Typical choices:
        <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-brass">
          <li>Unrecoverable lost-slot rate (no-show, same-day cancellation, day-of abort), reduced by an agreed percentage relative to your prior 12-month baseline.</li>
          <li>GLP-1-related same-day cancellations, reduced by an agreed percentage relative to your prior 12-month baseline.</li>
          <li>Surveillance recall recapture: overdue surveillance patients re-engaged and rebooked during the pilot.</li>
          <li>MIPS Quality category points added, where your ASC reports under MIPS.</li>
        </ul>
        <p className="mt-3 text-foreground/70 text-[14px]">The threshold is calibrated to your volume so the result is statistically detectable within the pilot. The underlying math is shared with you before sign-off.</p>
      </>
    ),
  },
  {
    k: 'How we measure',
    v: 'Your data, not ours. Baseline is pulled from your existing scheduling, endoscopy reporting, or QI dashboard going back at least 12 months. The same source feeds the end-of-pilot measurement. Both are reported to you with the underlying counts attached. If your data is not directly accessible, Aescia extracts and audits it from your records before the pilot starts — no prospective baseline-collection delay.',
  },
  {
    k: 'Pilot shape',
    v: 'Scoped and time-boxed. Duration is calibrated to your volume so the success metric is statistically detectable within the window. Typical range: three to six months. Pre-specified kill criteria, agreed in writing, allow either side to end the pilot early if it is not working.',
  },
  {
    k: 'Adjudication',
    v: 'The pilot is adjudicated against the customer\'s own scheduling and reporting systems by the customer\'s internal Quality Assurance committee, with a named independent endoscopist as the tie-breaker if needed. The adjudicator is agreed in writing at contract execution.',
  },
  {
    k: 'Exit terms',
    v: 'On contract end Aescia returns your data in JSON and CSV within 30 days, destroys our copies on a documented schedule, and issues a certificate of destruction. You retain rights to use the pathways and protocols co-authored during the pilot.',
  },
  {
    k: 'Support',
    v: 'Direct line to James Kurrle, founder and CEO. Coverage spans Sydney (AEST), Barcelona (CET), and US East and West timezones across the team, with practical 24-hour responsiveness during the design-partner phase. A named operational counterpart is committed in writing at contract execution.',
  },
  {
    k: 'What Aescia asks in return',
    v: 'A reference relationship and use of your logo on aesciahealth.com and in subsequent customer conversations, if the pilot meets its success criterion. Warm peer introductions where you are willing to make them. Conversion to a paying contract on the agreed rate if the success metric is met.',
  },
]

export default function DesignPartnerPage() {
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
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Design-partner program</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Pre-specified outcomes for Aescia's first customers.
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              Aescia for Clinics is pre-first-customer. This page describes how Aescia engages with the first ambulatory surgery centres to deploy the platform: how the pilot is scoped, how the success metric is chosen and measured against your own data, who adjudicates, and what stays yours at the end.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?intent=design-partner"
                className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
              >
                Apply as a design partner
              </Link>
              <Link
                href="/clinics#roi"
                className="inline-flex items-center justify-center border border-foreground/30 text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/5 transition-colors min-h-[44px]"
              >
                Run your own ROI numbers
              </Link>
            </div>
          </div>
        </section>

        {/* The principles at a glance */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Three principles</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border-y border-border">
              {[
                {
                  n: '01',
                  title: 'Measured on your own data',
                  desc: 'The success metric is chosen from a short menu of outcomes Aescia can directly move. The baseline comes from at least twelve months of your existing scheduling and reporting data. Aescia does not get to mark its own homework.',
                },
                {
                  n: '02',
                  title: 'Pre-specified in writing',
                  desc: 'The metric, the baseline source, the measurement window, the statistical threshold, the adjudicator, and the kill criteria are all written into the contract before the pilot starts. Nothing about the success criterion is negotiated after the data is in.',
                },
                {
                  n: '03',
                  title: 'Calibrated to your volume',
                  desc: 'Pilot duration and the success threshold are set so the result is statistically detectable within the pilot. We share the math with you up front. No metric is committed that the pilot N cannot prove.',
                },
              ].map((it) => (
                <article key={it.n} className="bg-background p-7 lg:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="font-mono text-[12px] text-brass tracking-widest">{it.n}</span>
                    <span className="h-px w-5 bg-brass/60" aria-hidden="true" />
                  </div>
                  <h3
                    className="font-display text-[20px] lg:text-[24px] leading-[1.2] tracking-[-0.02em] mb-4"
                    style={{ fontVariationSettings: "'opsz' 80" }}
                  >
                    {it.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.7] text-foreground/75">{it.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Program terms in full */}
        <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Program terms</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <dl className="divide-y divide-border border-y border-border bg-background">
              {programTerms.map((row) => (
                <div key={row.k} className="py-8 lg:py-10 px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-12">
                  <dt
                    className="font-display text-[18px] lg:text-[22px] leading-[1.25] tracking-[-0.018em] text-foreground"
                    style={{ fontVariationSettings: "'opsz' 80" }}
                  >
                    {row.k}
                  </dt>
                  <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* What this is not */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">What this is not</span>
            <h2
              className="font-display text-[28px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] mt-6 mb-10"
              style={{ fontVariationSettings: "'opsz' 96" }}
            >
              Two honest disclaimers.
            </h2>
            <ul className="space-y-7">
              <li className="border-l-2 border-brass/60 pl-5">
                <p className="text-[16px] leading-[1.7] text-foreground/85">
                  <strong className="text-foreground">This is not a free trial.</strong> A free trial is a self-serve product you can switch off in a browser tab. The design-partner pilot is a multi-month operational engagement that affects your patients’ prep flow and your front-desk workflow. Both sides commit to it like a contract because it is one.
                </p>
              </li>
              <li className="border-l-2 border-brass/60 pl-5">
                <p className="text-[16px] leading-[1.7] text-foreground/85">
                  <strong className="text-foreground">Aescia is pre-first-customer.</strong> We are transparent about that here, on the homepage, and in every prospect conversation. The design-partner program is built around the fact that early customers carry more uncertainty and deserve an engagement structured to reflect it: outcomes agreed in writing before the pilot, measured against the customer’s own data, adjudicated by the customer’s own team.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32 px-6 lg:px-10 bg-foreground text-background">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Apply</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.2] tracking-[-0.02em] mt-6 mb-6 text-background"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              We are speaking with a small number of design partners at a time.
            </h2>
            <p className="text-[15px] leading-[1.7] text-background/80 max-w-2xl mx-auto mb-10">
              Tell us your scope volume, your current cancellation and no-show baselines (or that you do not track them), and which of the success metrics above your ASC would consider committing to. We will return with a one-page proposal in under five business days.
            </p>
            <Link
              href="/contact?intent=design-partner"
              className="inline-flex items-center gap-2.5 bg-background text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-background/90 transition-colors min-h-[44px]"
            >
              Apply as a design partner
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
