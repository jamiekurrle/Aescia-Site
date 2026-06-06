import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'GLP-1 screening and prep before endoscopy software',
  description:
    'GLP-1 agonists (semaglutide, tirzepatide, liraglutide) slow gastric emptying, which raised peri-procedural aspiration concern and produced evolving 2023 to 2024 guidance for endoscopy. Aescia for Clinics flags every GLP-1 patient at intake and applies the clinic’s authored protocol consistently. Pre-first-customer; not a medical device.',
  alternates: { canonical: '/glp1-endoscopy-prep' },
  openGraph: {
    title: 'GLP-1 screening and prep before endoscopy | Aescia for Clinics',
    description:
      'Flag every GLP-1 patient at intake and apply your gastroenterologist’s current protocol consistently, instead of relying on front-desk memory.',
    url: '/glp1-endoscopy-prep',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'GLP-1 screening and prep before endoscopy', url: '/glp1-endoscopy-prep' },
])

const pageSchema = webPageSchema({
  url: '/glp1-endoscopy-prep',
  name: 'GLP-1 screening and prep before endoscopy software',
  description:
    'Why GLP-1 agonists matter before endoscopy, how the 2023 to 2024 guidance evolved, and how Aescia for Clinics flags GLP-1 patients at intake and applies the clinic’s authored protocol consistently.',
  isMedicalPage: true,
})

export default function Glp1EndoscopyPrepPage() {
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
                Endoscopy ASC · GLP-1 prep
              </span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              What software flags GLP-1 patients and adjusts endoscopy prep?
            </h1>
            <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
              Aescia for Clinics flags every patient on a GLP-1 medication at intake and applies your gastroenterologist’s current peri-procedural protocol to them automatically, instead of relying on a front-desk staffer to remember. GLP-1 agonists (glucagon-like peptide-1 agonists such as semaglutide, tirzepatide, and liraglutide) slow gastric emptying, which raised aspiration concern for sedated endoscopy and produced guidance that changed between 2023 and 2024, so the practical problem is applying your clinic’s chosen rule consistently to a fast-growing group of patients.
            </p>
            <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Aescia for Clinics is not a medical device and does not decide the protocol. It delivers the clinician-authored rule your clinic has set; the gastroenterologist remains the decision-maker. Aescia is pre-first-customer.
            </p>
          </div>
        </section>

        {/* Why GLP-1 matters for endoscopy */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Why it matters</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              GLP-1 agonists slow gastric emptying, and the guidance is still moving.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                GLP-1 receptor agonists slow gastric emptying. For a procedure under sedation, that raised concern about retained gastric contents and aspiration risk, and about impaired mucosal views at gastroscopy. In 2023 the American Society of Anesthesiologists (ASA) issued guidance suggesting these medications be held before procedures requiring sedation.
              </p>
              <p>
                In 2024, multi-society peri-procedural guidance refined that position toward an individualized, risk-stratified approach rather than a blanket hold, and noted that the clear-liquid diet used for colonoscopy preparation may itself reduce residual gastric content. The result, on the ground, is genuine variation: different societies, evolving advice, and a rapidly growing number of patients on these drugs. Whether a given clinic holds the medication, extends clear liquids, or makes an individualized call is a clinical decision for the gastroenterologist, not the software.
              </p>
              <p>
                The operational risk is not the guideline; it is consistency. When the rule lives in a staffer’s memory or a paper leaflet, some GLP-1 patients are missed, some are told the wrong thing, and some are cancelled on the day. That is the gap Aescia closes.
              </p>
            </div>
          </div>
        </section>

        {/* What Aescia does */}
        <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">What Aescia does</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Apply your protocol to every GLP-1 patient, consistently.
            </h2>
            <ol className="divide-y divide-border border-y border-border bg-background">
              {[
                ['Flag on intake', 'A structured intake question identifies patients on a GLP-1 agonist (semaglutide, tirzepatide, liraglutide, dulaglutide, exenatide), including the dual GIP/GLP-1 agents, so none are missed.'],
                ['Apply the clinic’s authored rule', 'The overlay your gastroenterologist has authored fires automatically: a hold window, an extended clear-liquid instruction, or a route to individualized review, exactly as your clinic has set it.'],
                ['Surface it at the right time', 'The instruction reaches the patient when it is actionable, on the channels they use, not buried in a booking-day leaflet.'],
                ['Resurface and confirm', 'The GLP-1 step is checked again in the prep-night confirmation, so the clinic knows the patient has acknowledged it before the day of the list.'],
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

        {/* Honest ceiling */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Honest scope</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              What Aescia does, and what stays with the clinician.
            </h2>
            <ul className="space-y-4 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl list-none">
              <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>Aescia delivers the rule and confirms acknowledgment. It does not decide whether to hold a GLP-1 medication; the gastroenterologist sets the protocol.</span></li>
              <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>Aescia cannot guarantee a patient stopped a medication; it can flag, instruct, remind, and capture the patient’s confirmation, which is more than a paper leaflet does.</span></li>
              <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>When the guidance changes again, the change is made once in the authored rule set, with a named author and a guideline trail, and applies to every patient from then on.</span></li>
            </ul>
            <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Related:{' '}
              <Link href="/medication-management-before-endoscopy" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">blood-thinner and diabetes handling before endoscopy</Link>,{' '}
              <Link href="/bowel-prep-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">reducing inadequate bowel prep</Link>, and{' '}
              <Link href="/colonoscopy-no-show-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">reducing no-shows</Link>.
            </p>
          </div>
        </section>

        <AscEntityBlock />
        <AscPageCta line="If GLP-1 confusion is driving cancellations or day-of surprises, the design-partner pilot runs free or under a money-back rebate until Aescia delivers measurable net benefit against your own baseline." />
      </main>
      <Footer />
    </>
  )
}
