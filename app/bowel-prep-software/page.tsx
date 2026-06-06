import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Reduce the inadequate bowel prep rate at an ASC with software',
  description:
    'Inadequate bowel preparation affects roughly 20 to 25 percent of colonoscopies at baseline (Beran 2024, n=358,257) and drives repeat procedures, missed adenomas, and lost capacity. Aescia for Clinics delivers clinician-authored, timed, coached prep pathways to reduce that rate. Pre-first-customer; not a medical device.',
  alternates: { canonical: '/bowel-prep-software' },
  openGraph: {
    title: 'Reduce inadequate bowel prep at an ASC | Aescia for Clinics',
    description:
      'Structured, timed, coached prep pathways instead of a single written instruction at booking. Anchored to Beran 2024, Lebwohl 2011.',
    url: '/bowel-prep-software',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Reduce the inadequate bowel prep rate at an ASC', url: '/bowel-prep-software' },
])

const pageSchema = webPageSchema({
  url: '/bowel-prep-software',
  name: 'Reduce the inadequate bowel prep rate at an ASC with software',
  description:
    'Why inadequate bowel preparation happens, what the published literature shows, and how Aescia for Clinics delivers clinician-authored, timed, coached prep pathways to reduce the inadequate-prep rate.',
  isMedicalPage: true,
})

export default function BowelPrepSoftwarePage() {
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
                Endoscopy ASC · Bowel preparation
              </span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              How do I reduce the inadequate bowel prep rate at my ASC?
            </h1>
            <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
              Reduce inadequate bowel preparation by replacing the single written instruction handed out at booking with a structured, timed, coached prep pathway, which the published literature associates with better preparation quality. Aescia for Clinics delivers exactly that: clinician-authored prep instructions for your protocol, in the patient’s language, timed to their procedure date, with reminders and a prep-night confirmation, so more patients arrive adequately prepared.
            </p>
            <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Aescia for Clinics is pre-first-customer and is not a medical device. The figures below are from the published literature on the problem; they are not outcomes Aescia has delivered for a named customer.
            </p>
          </div>
        </section>

        {/* The problem, sourced */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">The problem</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Why a written instruction at booking is not enough.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                Inadequate bowel preparation affects roughly 20 to 25 percent of colonoscopies at baseline (Beran 2024, n=358,257). When the prep is inadequate, the procedure is often repeated, abandoned, or shortened, and the downstream cost is clinical as well as operational: inadequate preparation is associated with a higher adenoma miss rate (Lebwohl 2011) and, in inpatients, with longer stays and higher costs (Yadlapati 2015).
              </p>
              <p>
                The instruction usually fails for ordinary reasons. It is handed over at booking, weeks before it is needed; it is in dense clinical language; it is not in the patient’s first language; the split-dose timing is misunderstood; and there is no checkpoint until the patient arrives, when it is too late to fix. A reminder to attend does not solve any of these, because the gap is comprehension and timing, not memory of the date.
              </p>
            </div>
          </div>
        </section>

        {/* What a structured pathway does */}
        <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">What changes</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              What a structured prep pathway does differently.
            </h2>
            <ol className="divide-y divide-border border-y border-border bg-background">
              {[
                ['Timed to the procedure, not to booking', 'Each step arrives when the patient needs to act: the diet change, the split-dose start, the overnight instruction, each on schedule rather than all at once weeks earlier.'],
                ['In the patient’s language, in plain terms', 'The clinician-authored instruction is delivered in the patient’s own language and in plain wording, so comprehension is not the failure point.'],
                ['Coached, with the common mistakes pre-empted', 'The pathway addresses the predictable errors (split-dose timing, clear-liquid choices, what counts as clear) before they happen.'],
                ['Confirmed on prep night', 'A structured prep-night check, including a photo confirmation, surfaces who is genuinely ready while there is still time to intervene.'],
                ['Aligned to a prep-adequacy standard', 'Prep tracking is aligned to a recognized standard (Boston Bowel Preparation aligned), so adequacy is measured consistently rather than informally.'],
              ].map(([k, v], i) => (
                <li key={k} className="py-7 px-5 lg:px-8 grid grid-cols-[44px_1fr] gap-4 lg:gap-8 items-start">
                  <span className="font-mono text-[12px] text-brass tracking-widest pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="font-display text-[18px] lg:text-[20px] leading-[1.25] tracking-[-0.015em] text-foreground mb-2" style={{ fontVariationSettings: "'opsz' 72" }}>{k}</div>
                    <div className="text-[14.5px] lg:text-[15px] leading-[1.65] text-foreground/80 max-w-2xl">{v}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Realistic ceiling */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Realistic ceiling</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Prep adequacy improves; it does not reach zero failures.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                Better prep instructions raise the share of adequately prepared patients; they do not eliminate inadequate prep. Some patients will still struggle regardless of coaching, and some inadequate preparation has medical rather than instructional causes. Aescia improves the part that is driven by comprehension, timing, and confirmation, which the literature suggests is a meaningful part, not all of it.
              </p>
              <p>
                Because Aescia is pre-first-customer, it does not publish its own reduction figure. The{' '}
                <Link href="/clinics#roi" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">ROI calculator on the Clinics page</Link>{' '}
                lets you scale the published effect sizes to your own inadequate-prep rate and scope volume, and the conservative band is the only one Aescia commits to in writing during a design-partner pilot, measured against your own baseline.
              </p>
            </div>
            <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Related:{' '}
              <Link href="/colonoscopy-no-show-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">reducing no-shows</Link>,{' '}
              <Link href="/prep-aware-backfill" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">prep-aware backfill</Link>, and the full{' '}
              <Link href="/endoscopy-pre-procedure-workflow" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">pre-procedure workflow</Link>.
            </p>
          </div>
        </section>

        <AscEntityBlock />
        <AscPageCta line="If inadequate prep is your rate-limiter, the design-partner pilot runs free or under a money-back rebate until Aescia delivers measurable net benefit against your own baseline." />
      </main>
      <Footer />
    </>
  )
}
