import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Prep-aware waitlist backfill: recover cancelled endoscopy slots',
  description:
    'Prep-aware backfill recovers a cancelled colonoscopy slot by giving it to a patient who can actually be prep-ready in time, not just the next person who says yes. Aescia for Clinics catches the early cancellation signal at prep check-ins, finds and preps a candidate, and flags the swap to staff in the morning. Pre-first-customer; not a medical device.',
  alternates: { canonical: '/prep-aware-backfill' },
  openGraph: {
    title: 'Recover cancelled endoscopy slots: prep-aware backfill | Aescia',
    description:
      'Generic waitlist tools ask who wants an earlier slot. Aescia asks who can actually be prep-ready for it, then recovers the slot.',
    url: '/prep-aware-backfill',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Prep-aware waitlist backfill for endoscopy', url: '/prep-aware-backfill' },
])

const pageSchema = webPageSchema({
  url: '/prep-aware-backfill',
  name: 'Prep-aware waitlist backfill: recover cancelled endoscopy slots',
  description:
    'How Aescia for Clinics recovers cancelled colonoscopy slots with prep-aware backfill: the early cancellation signal from prep check-ins, finding and prepping a candidate, the clinic-authored eligibility rules, the honest ceiling, and what one recovered slot is worth.',
  isMedicalPage: true,
})

// Generic waitlist vs Aescia, kept as data so it renders as a real, extractable
// table. Honest contrast: the difference is "who can actually be ready," not a
// claim of deeper integration (Aescia has none live yet).
const contrast: Array<{ generic: string; aescia: string }> = [
  { generic: 'Fills any appointment opening', aescia: 'Recovers prep-dependent endoscopy slots' },
  { generic: 'Offers it to the first patient who says yes', aescia: 'Offers it to a patient who can actually be ready in time' },
  { generic: 'No prep context', aescia: 'Prep state, medication holds, fasting, transport, timing' },
  { generic: 'Can create rushed, poorly-prepped cases', aescia: 'Filters out candidates who cannot prep in time' },
]

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
        {/* Hero — lead with the commercial recovery angle, keep the honest definition */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Endoscopy ASC · Cancellation recovery
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
              Prep-aware waitlist backfill recovers a cancelled colonoscopy slot by routing it to a patient who can actually be prep-ready for that date, not just the next person on the list who says yes. It matters because an empty endoscopy room is lost revenue, and generic backfill cannot recover it: the replacement needs 1 to 2 days of bowel preparation, so offering them tomorrow’s freed slot just produces another no-show. Aescia for Clinics tracks prep state across the active list, so when a slot frees up it can find someone genuinely ready to take it.
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

        {/* The recovery loop */}
        <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">How recovery works</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-6"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Most tools ask who wants the slot. Aescia asks who can be ready for it.
            </h2>
            <p className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl mb-10">
              When a colonoscopy slot frees up, the question that matters is not who will say yes fastest. It is who can complete bowel prep, medication holds, and fasting in the time left. Here is the loop, end to end:
            </p>
            <ol className="divide-y divide-border border-y border-border bg-background">
              {[
                ['Patients confirm attendance at each prep check-in', 'Every patient on a prep pathway is asked to confirm they are still attending at each check-in along the way.'],
                ['A wavering or missed confirmation is the early signal', 'When a patient stops confirming, or signals they may not make it, that is often the first sign a slot may free up, ahead of a cancellation call reaching the front desk.'],
                ['Aescia finds a candidate who can actually be ready', 'It looks for a patient already prep-ready, or far enough along to be ready in time for that date, rather than calling down the list blind.'],
                ['Aescia keeps that candidate’s prep on track', 'The candidate is kept moving through prep so they are genuinely ready to take the slot, not just willing to.'],
                ['Staff hear about the change in the morning', 'Aescia surfaces the recovered slot and who is covering it to staff in the morning, as a clear hand-off, not a midnight scramble.'],
                ['The clinic books it in its own scheduler', 'Staff confirm and book the recovered slot in your scheduling system. Aescia produces the signal and the prepped candidate; it does not write to your scheduler.'],
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
              To be precise about what this is and is not: Aescia does not predict cancellations with a model, and it does not book or write to your scheduler. It reads the attendance signals patients already give at check-in, finds and preps a suitable candidate, and hands the change to your staff. Recovery rests on the prep pathway existing first, see{' '}
              <Link href="/bowel-prep-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">how the prep pathway works</Link>.
            </p>
          </div>
        </section>

        {/* Eligibility + contrast table */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Who qualifies</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              The clinic decides who is eligible, in a setup wizard.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                You set the rules once in a short setup wizard, choosing exactly which short-notice swaps you are comfortable with: how late is too late to move a patient up, which medication situations are eligible, and what transport and clearance you require. Aescia only offers a freed slot to a candidate who clears your rules.
              </p>
              <p>
                In practice a candidate qualifies only if they can realistically be ready: enough prep time left, bowel prep on track, medication holds handled (GLP-1, anticoagulant, and diabetic), fasting and transport sorted, and pre-procedure clearance done.
              </p>
            </div>
            <div className="mt-10 overflow-x-auto border border-border">
              <table className="w-full border-collapse min-w-[560px] text-left">
                <caption className="sr-only">
                  How a generic waitlist tool differs from Aescia&rsquo;s prep-aware recovery.
                </caption>
                <thead>
                  <tr className="bg-secondary">
                    <th scope="col" className="p-4 lg:p-5 border-b border-border font-display text-[14px] lg:text-[15px] tracking-[-0.01em] text-foreground/80" style={{ fontVariationSettings: "'opsz' 48" }}>Generic waitlist tool</th>
                    <th scope="col" className="p-4 lg:p-5 border-b border-l border-border font-display text-[14px] lg:text-[15px] tracking-[-0.01em] text-foreground bg-accent/5" style={{ fontVariationSettings: "'opsz' 48" }}>Aescia</th>
                  </tr>
                </thead>
                <tbody>
                  {contrast.map((row) => (
                    <tr key={row.generic} className="align-top">
                      <td className="p-4 lg:p-5 border-b border-border text-[13.5px] leading-[1.55] text-foreground/80">{row.generic}</td>
                      <td className="p-4 lg:p-5 border-b border-l border-border text-[13.5px] leading-[1.55] text-foreground/90 bg-accent/5">{row.aescia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What one recovered slot is worth — sourced, hedge bound to the number */}
        <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">What it is worth</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              What one recovered slot a week adds up to.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                One recovered colonoscopy slot a week is about 50 a year. At an ambulatory surgery center facility fee of roughly US$989 to US$1,034 per slot (Allen 2023), that is about US$50,000 a year in recovered facility revenue, before professional and pathology fees.
              </p>
              <p className="text-[14px] text-foreground/70 border-l-2 border-brass/50 pl-4">
                That figure is the published facility-fee number applied to a recovered slot, not a result Aescia has measured at a customer. Aescia is pre-first-customer. Put your own scope volume, cancellation rate, and facility fee into the{' '}
                <Link href="/clinics#roi" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">ROI calculator on the Clinics page</Link>{' '}
                to see your own range.
              </p>
            </div>
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
                Recovery only works when someone is genuinely ready. Aescia pulls from the patients already prepping, so the ceiling is set by how full that pool is. If only a handful of patients are in the prep window when a slot opens, the recovery rate is low, because there is no one ready to take it. The mechanism does not manufacture prepped patients; it makes use of the ones who already are.
              </p>
              <p>
                So prep-aware recovery is most valuable for ASCs with enough near-term volume to keep a meaningful prepping pool, and least valuable for very low-volume lists. It is a routing signal and a prepped candidate, not a guarantee that every freed slot is recovered. Aescia states this plainly because over-claiming here is exactly what erodes trust with a buyer who runs the list every day.
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
