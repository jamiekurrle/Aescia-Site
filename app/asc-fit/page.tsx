import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Is Aescia for Clinics the right fit for your endoscopy ASC?',
  description:
    'Aescia for Clinics is the right fit when prep adequacy, GLP-1 confusion, or prep-aware slot routing is your rate-limiter, and you want explainable clinician-authored rules. It is not the right fit if you need raw same-day clinic backfill, a deployed reference-heavy vendor today, or deep bi-directional EHR scheduling out of the box. Explicit best-fit and not-fit lists.',
  alternates: { canonical: '/asc-fit' },
  openGraph: {
    title: 'Is Aescia right for your ASC? | Aescia for Clinics',
    description:
      'Explicit best-fit and not-the-right-fit lists, plus what to use instead when Aescia is not the answer.',
    url: '/asc-fit',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Is Aescia right for your ASC?', url: '/asc-fit' },
])

const pageSchema = webPageSchema({
  url: '/asc-fit',
  name: 'Is Aescia for Clinics the right fit for your endoscopy ASC?',
  description:
    'Explicit best-fit and not-the-right-fit criteria for Aescia for Clinics at an endoscopy ambulatory surgery center, plus adjacent options when Aescia is not the right choice.',
})

export default function AscFitPage() {
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
                Endoscopy ASC · Fit assessment
              </span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Is Aescia for Clinics the right fit for your endoscopy ASC?
            </h1>
            <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
              Aescia for Clinics is the right fit when prep adequacy, GLP-1 confusion, or prep-aware slot routing is the rate-limiting problem at your ambulatory surgery center, and you want explainable, clinician-authored rules with an audit trail. It is not the right fit if your only problem is raw same-day backfill of general clinic visits, if you need a deployed vendor with reference customers today, or if you need deep bi-directional electronic medical record scheduling out of the box.
            </p>
            <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Honest scoping is the point of this page. Aescia would rather be matched to the ASCs it genuinely fits than oversold to the ones it does not. Aescia is pre-first-customer.
            </p>
          </div>
        </section>

        {/* Best fit / not fit, two columns */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border-y border-border">
            {/* Best fit */}
            <div className="bg-background p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Best fit if</span>
                <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
              </div>
              <ul className="space-y-5 list-none">
                {[
                  ['Prep adequacy or GLP-1 confusion is your rate-limiter', 'Your bottleneck is inadequate bowel prep, medication confusion, or day-of cancellations driven by either, not generic scheduling.'],
                  ['You want explainable, clinician-authored rules', 'You want a named clinical author and a documented guideline trail behind every rule, not a black-box model.'],
                  ['Governance and auditability matter', 'You need pathway version control, an audit log, and a clear regulatory posture for procurement and clinical governance.'],
                  ['You want one pathway, not four tools', 'You want prep, recall, and prep-aware backfill on a single pathway rather than stitched across separate point tools.'],
                  ['You are open to being a design partner', 'You are willing to run a pilot with a pre-specified metric and a money-back rebate, measured against your own baseline.'],
                ].map(([k, v]) => (
                  <li key={k} className="grid grid-cols-[22px_1fr] gap-3">
                    <span className="text-accent font-display text-[18px] leading-none pt-0.5" aria-hidden="true">+</span>
                    <div>
                      <div className="text-[15px] text-foreground font-medium mb-1">{k}</div>
                      <div className="text-[13.5px] leading-[1.6] text-foreground/75">{v}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not fit */}
            <div className="bg-background p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Not the right fit if</span>
                <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
              </div>
              <ul className="space-y-5 list-none">
                {[
                  ['Your only problem is raw same-day clinic backfill', 'If you just need to fill cancelled general clinic visits, not prep-dependent procedure slots, a texting or scheduling tool will do it for less.'],
                  ['You need a deployed, reference-heavy vendor today', 'Aescia is pre-first-customer. If your procurement requires named live customers before evaluating, the timing is wrong.'],
                  ['You need deep bi-directional EHR scheduling out of the box', 'Real-time, two-way electronic medical record scheduling is not live. Aescia starts manual or by export.'],
                  ['You need enterprise multi-site rollout now', 'If you need centralised multi-site administration deployed immediately, that is ahead of where Aescia is.'],
                  ['Your prepping pool is very small', 'Prep-aware backfill needs a meaningful near-term prepping pool to draw from; very low-volume lists get less from it.'],
                ].map(([k, v]) => (
                  <li key={k} className="grid grid-cols-[22px_1fr] gap-3">
                    <span className="text-brass font-display text-[18px] leading-none pt-0.5" aria-hidden="true">&minus;</span>
                    <div>
                      <div className="text-[15px] text-foreground font-medium mb-1">{k}</div>
                      <div className="text-[13.5px] leading-[1.6] text-foreground/75">{v}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Adjacent options */}
        <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">If Aescia is not the answer</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              What to use instead.
            </h2>
            <ul className="divide-y divide-border border-y border-border">
              {[
                ['If you need reminders only', 'A two-way texting platform is simpler and cheaper, and will handle attendance reminders well.'],
                ['If you need EHR-native scheduling', 'Your electronic medical record vendor’s own integrated scheduling tools will be more deeply connected than Aescia is today.'],
                ['If you need OR or room optimisation', 'A dedicated block-utilisation tool is purpose-built for that and does it better than a prep pathway.'],
                ['If you need a deployed prep tool with references', 'An established patient-engagement platform with named customers may suit your procurement timeline better right now.'],
              ].map(([k, v]) => (
                <li key={k} className="py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-2 lg:gap-10">
                  <span className="text-[15px] text-foreground font-medium">{k}</span>
                  <span className="text-[14.5px] leading-[1.65] text-foreground/80">{v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              The full category-by-category comparison is on{' '}
              <Link href="/compare" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">the comparison page</Link>.
            </p>
          </div>
        </section>

        <AscEntityBlock />
        <AscPageCta line="If the best-fit list describes your ASC, the design-partner pilot runs free or under a money-back rebate until Aescia delivers measurable net benefit against your own baseline." />
      </main>
      <Footer />
    </>
  )
}
