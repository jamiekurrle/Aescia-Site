import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Endoscopy pre-procedure workflow and patient pathway software',
  description:
    'Endoscopy pre-procedure workflow software automates the patient journey from booking confirmation to procedure day: prep instructions, medication overlays (GLP-1, anticoagulant, diabetic), reminders, consent, and prep confirmation. Aescia for Clinics is a clinician-authored platform in this category. Pre-first-customer.',
  alternates: { canonical: '/endoscopy-pre-procedure-workflow' },
  openGraph: {
    title: 'Endoscopy pre-procedure workflow software | Aescia for Clinics',
    description:
      'From booking to procedure day: clinician-authored prep pathways, medication overlays, consent capture, and prep confirmation, in one pathway.',
    url: '/endoscopy-pre-procedure-workflow',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Endoscopy pre-procedure workflow software', url: '/endoscopy-pre-procedure-workflow' },
])

const pageSchema = webPageSchema({
  url: '/endoscopy-pre-procedure-workflow',
  name: 'Endoscopy pre-procedure workflow and patient pathway software',
  description:
    'What endoscopy pre-procedure workflow software does, and how Aescia for Clinics delivers it: a clinician-authored pathway covering prep, medication overlays, consent, reminders, and prep confirmation from booking to procedure day.',
  isMedicalPage: true,
})

export default function EndoscopyWorkflowPage() {
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
                Endoscopy ASC · Pre-procedure workflow
              </span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              What does endoscopy pre-procedure workflow software do?
            </h1>
            <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
              Endoscopy pre-procedure workflow software automates the patient journey from booking confirmation to procedure day, so every patient gets the right bowel-prep instructions, completes the correct medication steps (GLP-1 cessation, anticoagulant hold or bridge, insulin and diabetes adjustment), gives consent, and arrives ready. Aescia for Clinics is a clinician-authored platform in this category that runs one pathway covering prep, medication overlays, reminders, consent, and prep-night confirmation, rather than a separate tool for each.
            </p>
            <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Aescia for Clinics is pre-first-customer and is not a medical device. It delivers clinician-authored steps; it does not propose or make clinical decisions.
            </p>
          </div>
        </section>

        {/* The journey, as a timeline */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">The patient journey</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              From booking to procedure day, one pathway.
            </h2>
            <ol className="divide-y divide-border border-y border-border">
              {[
                ['At booking', 'The patient is enrolled on the pathway for their procedure and their language. Communication consent is captured up front (TCPA-aware for US SMS). No portal login is forced.'],
                ['Intake and screening', 'A structured intake flags GLP-1 agonists, anticoagulants and antiplatelets, diabetes and insulin, and prior inadequate preparation, so the clinic’s authored rule for each can fire.'],
                ['Through the prep window', 'Timed reminders and prep coaching land on the schedule the pathway defines, with medication-hold and adjustment steps surfaced at the right time rather than at booking.'],
                ['Prep night', 'The patient confirms readiness, including a structured photo check, so the front desk sees who is genuinely ready before the day of the list.'],
                ['Day of procedure', 'A prioritised readiness view shows who is prepared, who needs a call, and which slots are at risk, so staff work exceptions rather than the whole list.'],
                ['After the procedure', 'Surveillance recall and the next-interval reminder are tracked against guideline intervals, so the follow-up does not drift.'],
              ].map(([k, v], i) => (
                <li key={k} className="py-7 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-2 lg:gap-10">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent pt-1">{k}</div>
                  <div className="text-[15px] leading-[1.7] text-foreground/85 max-w-2xl">{v}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What the pathway covers — feature grid */}
        <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">What the pathway covers</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              The steps a complete endoscopy pathway has to handle.
            </h2>
            <div className="grid md:grid-cols-2 gap-px bg-border border-y border-border">
              {[
                ['Bowel preparation', 'Clinician-authored prep instructions for your protocol, timed and coached, in the patient’s language.'],
                ['GLP-1 peri-procedural handling', 'GLP-1 agonists (semaglutide, tirzepatide, liraglutide) flagged and the cessation overlay applied per the 2024 multi-society guidance.'],
                ['Anticoagulant and antiplatelet handling', 'Blood thinners flagged on intake; the clinic’s hold or bridge rule surfaced to the patient at the right time.'],
                ['Diabetes and insulin adjustment', 'Diabetic medications flagged; the clinic’s fasting-day adjustment rule delivered, with morning-list scheduling supported.'],
                ['Consent capture', 'Communication opt-in and a structured prep-acknowledgment step, captured before reminders fire.'],
                ['Surveillance and recall', 'Next-interval recall tracked against USMSTF and NHMRC guideline intervals so follow-up does not drift.'],
              ].map(([k, v]) => (
                <div key={k} className="bg-background p-7 lg:p-8">
                  <h3 className="font-display text-[18px] lg:text-[20px] leading-[1.25] tracking-[-0.015em] mb-3" style={{ fontVariationSettings: "'opsz' 72" }}>{k}</h3>
                  <p className="text-[14px] leading-[1.65] text-foreground/80">{v}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Deep dives:{' '}
              <Link href="/glp1-endoscopy-prep" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">GLP-1 prep</Link>,{' '}
              <Link href="/medication-management-before-endoscopy" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">blood thinners and diabetes</Link>,{' '}
              <Link href="/bowel-prep-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">bowel prep</Link>, and{' '}
              <Link href="/colonoscopy-no-show-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">no-show reduction</Link>.
            </p>
          </div>
        </section>

        {/* How pathways are authored */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">How the rules are built</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Clinician-authored, explainable, and guideline-traced.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                Pathways start from published evidence-based guidelines for the specialty: USMSTF and NHMRC for surveillance intervals, the 2024 multi-society guidance for GLP-1 peri-procedural handling, regional bowel-preparation protocols, and society anticoagulation guidance. A practising clinician authors the rule set against those guidelines, and every pathway carries a named clinical author and a documented guideline trail.
              </p>
              <p>
                The rules are stress-tested against simulated synthetic-patient cohorts before they touch a real patient, so edge cases such as a diabetic patient on insulin who is also on a GLP-1 agonist surface and are resolved in the rule editor rather than in the front-desk call queue. There are no AI models operating outside the clinician-authored rule set, which is part of why Aescia for Clinics is not a medical device.
              </p>
            </div>
          </div>
        </section>

        <AscEntityBlock />
        <AscPageCta />
      </main>
      <Footer />
    </>
  )
}
