import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Software to reduce colonoscopy no-shows and cancellations at an ASC',
  description:
    'Aescia for Clinics reduces colonoscopy no-shows and late cancellations at ambulatory surgery centers by getting more patients correctly prepped and confirmed before the procedure date. Clinician-authored prep pathways, GLP-1 / anticoagulant / diabetic overlays, prep-night photo confirmation. Pre-first-customer; US$8 per scope.',
  alternates: { canonical: '/colonoscopy-no-show-software' },
  openGraph: {
    title: 'Reduce colonoscopy no-shows at an ASC | Aescia for Clinics',
    description:
      'Pre-procedure pathway software that closes the prep, medication, and confirmation gaps that drive endoscopy no-shows. Anchored to Beran 2024, Allen 2023, Mehta 2021.',
    url: '/colonoscopy-no-show-software',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Reduce colonoscopy no-shows at an ASC', url: '/colonoscopy-no-show-software' },
])

const pageSchema = webPageSchema({
  url: '/colonoscopy-no-show-software',
  name: 'Software to reduce colonoscopy no-shows and cancellations at an ASC',
  description:
    'How Aescia for Clinics reduces colonoscopy no-shows and late cancellations at ambulatory surgery centers: clinician-authored prep pathways, medication overlays, prep-night photo confirmation, and prep-aware backfill. Pre-first-customer.',
  isMedicalPage: true,
})

export default function ColonoscopyNoShowSoftwarePage() {
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
        {/* Hero — H1 is the buyer question; the lead is the self-contained answer */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Endoscopy ASC · No-shows and cancellations
              </span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              What software reduces colonoscopy no-shows and cancellations at an ASC?
            </h1>
            <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
              Aescia for Clinics is pre-procedure patient-pathway software that reduces colonoscopy no-shows and late cancellations at an ambulatory surgery center (ASC) by getting more patients correctly prepped and confirmed before the procedure date. It targets the driver that generic reminder tools miss: a patient who is unprepared, confused about GLP-1 or blood-thinner instructions, or unsure about their bowel prep does not show, so Aescia closes those gaps with clinician-authored prep pathways, medication overlays, and a prep-night photo check.
            </p>
            <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Aescia for Clinics is pre-first-customer. The page below describes what the
              product does and the published literature on the problem; it does not claim
              an outcome Aescia has delivered for a named customer.
            </p>
          </div>
        </section>

        {/* Why endoscopy no-shows are different */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Why this is different</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              A colonoscopy no-show is usually a prep failure, not a calendar failure.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                A missed clinic appointment is a calendar problem: the patient forgot or could not come. A missed colonoscopy slot is usually a preparation problem. The patient did not start the bowel prep, took it wrong, was never told to stop a GLP-1 medication, or did not know what to do about a blood thinner, so they cancel late or simply do not arrive.
              </p>
              <p>
                That is why a generic appointment-reminder tool moves the number less than expected for endoscopy. Reminding someone of a slot they are not prepared for does not make them prepared. In the published literature, inadequate bowel preparation alone affects roughly 20 to 25 percent of colonoscopies at baseline (Beran 2024, n=358,257), and each cancelled or repeated slot loses an ASC facility fee in the range of US$989 to US$1,034 (Allen 2023, CMS ambulatory surgery center fee for CPT 45378 to 45385).
              </p>
            </div>
          </div>
        </section>

        {/* How Aescia reduces no-shows — machine-extractable steps */}
        <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">How it works</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              How Aescia reduces endoscopy no-shows, step by step.
            </h2>
            <ol className="divide-y divide-border border-y border-border bg-background">
              {[
                ['Clinician-authored prep pathway', 'Each patient gets the bowel-prep instructions for your protocol, in their own language, timed to their procedure date rather than dumped at booking.'],
                ['Medication overlays applied on intake', 'GLP-1, anticoagulant, antiplatelet, and diabetic medications are flagged at intake and the clinic’s hold or adjust rule is surfaced to the patient at the right time, not buried in a leaflet.'],
                ['Timed multichannel reminders', 'Reminders and prep coaching land on the schedule the pathway defines, across the channels the patient actually uses, with communication consent captured up front (TCPA-aware for US SMS).'],
                ['Prep-night photo confirmation', 'On prep night the patient confirms readiness, including a structured photo check, so the front desk knows who is genuinely ready before the day of the list.'],
                ['Prep-aware backfill for slots that still open', 'When a slot does free up, Aescia routes it only to patients already confirmed prep-ready, so the replacement is someone who can actually attend.'],
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
              The deep dives:{' '}
              <Link href="/glp1-endoscopy-prep" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">GLP-1 screening and prep</Link>,{' '}
              <Link href="/medication-management-before-endoscopy" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">blood-thinner and diabetes handling</Link>,{' '}
              <Link href="/bowel-prep-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">reducing inadequate bowel prep</Link>, and{' '}
              <Link href="/prep-aware-backfill" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">prep-aware waitlist backfill</Link>.
            </p>
          </div>
        </section>

        {/* The numbers — point to the calculator, do not assert Aescia's own % */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">What it costs, and what is at stake</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Run your own numbers, against your own baseline.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                Aescia for Clinics is priced at US$8 per scope at the institutional tier (US$6 per scope for multi-state aggregators above 50,000 scopes per year). There is no per-seat pricing.
              </p>
              <p>
                Because Aescia is pre-first-customer, it does not publish a no-show reduction figure of its own. Instead, the{' '}
                <Link href="/clinics#roi" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">interactive ROI calculator on the Clinics page</Link>{' '}
                lets you enter your own scope volume, inadequate-prep rate, no-show rate, and facility fee, then scales the published effect sizes from the prep and reminder literature into conservative, expected, and better-case bands. The conservative band is the only one Aescia commits to in writing during a design-partner pilot, measured against your ASC’s own historical baseline.
              </p>
            </div>
          </div>
        </section>

        {/* Where Aescia is not the right fit */}
        <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Honest scope</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              When Aescia is not the right tool for no-shows.
            </h2>
            <ul className="space-y-4 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl list-none">
              <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>If your no-shows are general clinic visits rather than prep-dependent procedures, a two-way texting or scheduling tool will close most of the gap at lower cost.</span></li>
              <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>If you need a deployed vendor with reference customers today, Aescia is pre-first-customer and says so; the design-partner program exists precisely to answer that.</span></li>
              <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>If you need deep, real-time, bi-directional electronic medical record scheduling out of the box, that is not live yet.</span></li>
            </ul>
            <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Full criteria:{' '}
              <Link href="/asc-fit" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">Is Aescia right for your ASC?</Link>{' '}
              How it compares to other tool categories:{' '}
              <Link href="/compare" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">How Aescia differs from engagement and scheduling tools</Link>.
            </p>
          </div>
        </section>

        <AscEntityBlock />
        <AscPageCta line="If prep-driven no-shows are your rate-limiter, the design-partner pilot runs free or under a money-back rebate until Aescia delivers measurable net benefit against your own baseline." />
      </main>
      <Footer />
    </>
  )
}
