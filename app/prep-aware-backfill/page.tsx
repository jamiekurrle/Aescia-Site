import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Prep-aware waitlist backfill for endoscopy, explained',
  description:
    'Prep-aware backfill routes a freed colonoscopy slot only to patients already confirmed prep-ready for that date. Prep-blind backfill fails for colonoscopy because the replacement needs 1 to 2 days of bowel prep. Aescia for Clinics tracks prep state and enables prep-aware routing. Pre-first-customer; not a medical device.',
  alternates: { canonical: '/prep-aware-backfill' },
  openGraph: {
    title: 'Prep-aware waitlist backfill for endoscopy | Aescia for Clinics',
    description:
      'Why generic waitlist auto-fill fails for colonoscopy, and how prep-aware backfill routes freed slots only to prep-ready patients.',
    url: '/prep-aware-backfill',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Prep-aware waitlist backfill for endoscopy', url: '/prep-aware-backfill' },
])

const pageSchema = webPageSchema({
  url: '/prep-aware-backfill',
  name: 'Prep-aware waitlist backfill for endoscopy, explained',
  description:
    'A definition of prep-aware backfill, why prep-blind backfill fails for colonoscopy, how Aescia for Clinics enables prep-aware routing of freed slots, and the realistic ceiling.',
  isMedicalPage: true,
})

export default function PrepAwareBackfillPage() {
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
                Endoscopy ASC · Prep-aware backfill
              </span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              What is prep-aware waitlist backfill for endoscopy?
            </h1>
            <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
              Prep-aware waitlist backfill routes a freed colonoscopy slot only to patients who are already confirmed prep-ready for that specific date. It exists because generic, prep-blind backfill fails for colonoscopy: the replacement patient needs 1 to 2 days of active bowel preparation, so offering them a same-day or next-day slot just produces a new no-show. Aescia for Clinics tracks prep state across the active waitlist and enables routing freed slots only to patients who can actually attend prepared.
            </p>
            <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Generic waitlist auto-fill is table-stakes parity that many tools offer. Prep-aware backfill is the genuine differentiator, and Aescia only claims the version it actually builds. Aescia is pre-first-customer and is not a medical device.
            </p>
          </div>
        </section>

        {/* Why prep-blind fails */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">The core problem</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Why prep-blind backfill fails for colonoscopy.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                Most waitlist auto-fill tools treat a colonoscopy slot like any other appointment: a slot opens, the tool calls the next person on the list, the slot is “filled.” For a clinic consultation that works. For a colonoscopy it usually does not, because a colonoscopy is not just an appointment, it is an appointment the patient must spend 1 to 2 days preparing for.
              </p>
              <p>
                A patient pulled off the waitlist into tomorrow’s freed slot has not done the bowel prep. They either decline, or they accept and then cannot attend properly, or they arrive inadequately prepared and the procedure is repeated. The slot looks filled in the scheduling system and is effectively lost in the room. Prep-blind backfill moves the problem; it does not solve it.
              </p>
            </div>
          </div>
        </section>

        {/* How Aescia enables prep-aware backfill */}
        <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">How Aescia enables it</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Routing freed slots to patients who are already prepped.
            </h2>
            <ol className="divide-y divide-border border-y border-border bg-background">
              {[
                ['Prep state is tracked across the active list', 'Because every patient on a pathway has a known prep state (instructions received, acknowledged, in progress, photo-confirmed), Aescia knows who is genuinely prep-ready for a near-term date, not just who is next on the list.'],
                ['A slot opens', 'When a cancellation frees a slot, Aescia can identify the patients whose prep timing matches that date, rather than calling down the list blind.'],
                ['The freed slot is offered to prep-ready patients first', 'The routing signal prioritizes patients already confirmed ready for that window, so the replacement is someone who can actually attend prepared.'],
                ['Booking still happens in your scheduling system', 'Aescia produces the prep-aware routing signal and the confirmation; the slot is booked in your scheduling system. Aescia does not replace the scheduler.'],
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
            <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Prep-aware backfill only works because the prep pathway exists first. See{' '}
              <Link href="/bowel-prep-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">how the prep pathway works</Link>{' '}
              and{' '}
              <Link href="/endoscopy-pre-procedure-workflow" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">the full pre-procedure workflow</Link>.
            </p>
          </div>
        </section>

        {/* Realistic ceiling — honesty */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">The honest ceiling</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              It can only pull from the prepping pool.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                Prep-aware backfill is bounded by how many patients are actively prepping at any moment. If only a handful of patients are in the prep window when a slot opens, the backfill rate is low, because there is no one prep-ready to route the slot to. The mechanism does not manufacture prepped patients; it makes use of the ones who already are.
              </p>
              <p>
                It follows that prep-aware backfill is most valuable for ASCs with enough near-term volume to keep a meaningful prepping pool, and least valuable for very low-volume lists. It is also a routing signal, not a guarantee that every freed slot is recovered. Aescia states this plainly because over-claiming here is exactly the kind of thing that erodes trust with a buyer who runs the list every day.
              </p>
            </div>
            <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Where competitors are genuinely stronger, and where Aescia fits, is laid out in{' '}
              <Link href="/compare" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">the comparison</Link>{' '}
              and{' '}
              <Link href="/asc-fit" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">the fit page</Link>.
            </p>
          </div>
        </section>

        <AscEntityBlock />
        <AscPageCta line="If freed colonoscopy slots are going unfilled because the replacements are not prepped, the design-partner pilot runs free or under a money-back rebate until Aescia delivers measurable net benefit against your own baseline." />
      </main>
      <Footer />
    </>
  )
}
