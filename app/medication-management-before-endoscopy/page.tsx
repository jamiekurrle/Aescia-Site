import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Blood thinner and diabetes management before endoscopy software',
  description:
    'Anticoagulants, antiplatelets, and diabetes medications each need peri-procedural handling before colonoscopy. Aescia for Clinics flags them at intake and applies the clinic’s authored hold, bridge, or adjustment rule consistently to every patient. Pre-first-customer; not a medical device.',
  alternates: { canonical: '/medication-management-before-endoscopy' },
  openGraph: {
    title: 'Blood thinner and diabetes handling before endoscopy | Aescia for Clinics',
    description:
      'Flag anticoagulants, antiplatelets, and diabetes medications at intake and apply your clinic’s authored peri-procedural rule consistently.',
    url: '/medication-management-before-endoscopy',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Blood thinner and diabetes management before endoscopy', url: '/medication-management-before-endoscopy' },
])

const pageSchema = webPageSchema({
  url: '/medication-management-before-endoscopy',
  name: 'Blood thinner and diabetes management before endoscopy software',
  description:
    'How anticoagulants, antiplatelets, and diabetes medications are handled before colonoscopy, and how Aescia for Clinics flags them at intake and applies the clinic’s authored rule consistently.',
  isMedicalPage: true,
})

export default function MedicationManagementPage() {
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
                Endoscopy ASC · Blood thinners and diabetes
              </span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              What software manages blood thinners and diabetes before a colonoscopy?
            </h1>
            <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
              Aescia for Clinics flags anticoagulants, antiplatelets, and diabetes medications at intake and applies your clinic’s authored peri-procedural rule to each patient automatically. Blood thinners drive bleeding risk at polypectomy and a long tail of late cancellations when patients stop the wrong drug or none at all, and diabetes medications interact with the fasting and bowel-prep window, so both need the right instruction delivered at the right time rather than left to a front-desk call.
            </p>
            <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
              Aescia for Clinics is not a medical device. It delivers the clinician-authored rule your clinic has set; it does not decide whether to bridge, hold, or adjust a dose. The treating clinician remains the decision-maker. Aescia is pre-first-customer.
            </p>
          </div>
        </section>

        {/* Blood thinners */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Anticoagulants and antiplatelets</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Blood thinners: the right hold, for the right drug, at the right time.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                Colonoscopy with polypectomy is a high-bleeding-risk procedure, so antithrombotic management matters. Society guidance (the American Society for Gastrointestinal Endoscopy, ASGE, 2016; and the British Society of Gastroenterology and European Society of Gastrointestinal Endoscopy, BSG and ESGE, 2021) sets out how each drug class is handled, and the handling differs by drug:
              </p>
              <ul className="space-y-3 list-none border-y border-border divide-y divide-border">
                {[
                  ['Warfarin', 'Typically stopped about 5 days before, with an INR (international normalised ratio) check, and bridging only for patients at high thrombotic risk.'],
                  ['Direct oral anticoagulants (DOACs)', 'Apixaban, rivaroxaban, dabigatran, and edoxaban are typically stopped 1 to 2 days before depending on the drug and renal function, with no bridging.'],
                  ['Aspirin', 'Aspirin monotherapy is usually continued through the procedure.'],
                  ['P2Y12 inhibitors', 'Clopidogrel and ticagrelor are individualized in consultation with cardiology, especially for patients with recent coronary stents.'],
                ].map(([k, v]) => (
                  <li key={k} className="py-4 grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-6">
                    <span className="font-display text-[16px] text-foreground" style={{ fontVariationSettings: "'opsz' 64" }}>{k}</span>
                    <span className="text-[14.5px] leading-[1.65] text-foreground/80">{v}</span>
                  </li>
                ))}
              </ul>
              <p>
                The detail is exactly why this fails on paper. A patient told generically to “stop your blood thinner” may stop aspirin they should have continued, or keep a DOAC they should have held. Aescia flags the specific drug at intake and delivers the clinic’s authored rule for that drug, with the stop date and the restart date, then confirms it.
              </p>
            </div>
          </div>
        </section>

        {/* Diabetes */}
        <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Diabetes and insulin</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Diabetes: the prep day and the fast both change the plan.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                The clear-liquid prep day plus the procedure-day fast destabilize glucose. A patient on insulin or a sulfonylurea who follows their normal regimen while not eating is at risk of hypoglycemia; some preparations also raise glucose. Common elements of a clinic’s authored rule include:
              </p>
              <ul className="space-y-3 list-none border-y border-border divide-y divide-border">
                {[
                  ['Sulfonylureas', 'Usually held on the prep day and the procedure day because of hypoglycemia risk while fasting.'],
                  ['SGLT2 inhibitors', 'Sodium-glucose cotransporter-2 inhibitors (empagliflozin, dapagliflozin, canagliflozin) are increasingly held several days before, because of the risk of euglycemic diabetic ketoacidosis (DKA) during fasting and dehydration.'],
                  ['Insulin', 'Basal insulin is commonly reduced and short-acting insulin held while the patient is nil by mouth, with glucose monitoring; diabetic patients are often scheduled as first morning cases.'],
                  ['Metformin', 'Handled per the clinic’s protocol, sometimes continued and sometimes held on the procedure day.'],
                ].map(([k, v]) => (
                  <li key={k} className="py-4 grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-6">
                    <span className="font-display text-[16px] text-foreground" style={{ fontVariationSettings: "'opsz' 64" }}>{k}</span>
                    <span className="text-[14.5px] leading-[1.65] text-foreground/80">{v}</span>
                  </li>
                ))}
              </ul>
              <p>
                Many GLP-1 agonists are prescribed for diabetes as well, so a single patient can carry an insulin rule, a GLP-1 rule, and a bowel-prep rule at once. Aescia resolves those overlapping overlays in the authored rule set rather than at the front desk. See{' '}
                <Link href="/glp1-endoscopy-prep" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">GLP-1 screening and prep</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* What Aescia does */}
        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">What Aescia does</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Deliver the rule. Confirm the acknowledgment. Keep the clinician in charge.
            </h2>
            <ol className="divide-y divide-border border-y border-border bg-background">
              {[
                ['Flag every relevant medication on intake', 'Anticoagulants, antiplatelets, insulin, sulfonylureas, SGLT2 inhibitors, and GLP-1 agonists are captured in a structured intake so the right rule can fire for each.'],
                ['Apply the clinic’s authored overlay', 'The hold, bridge, or adjustment your clinic has authored is applied per drug, with the specific stop and restart timing, not a generic instruction.'],
                ['Surface and remind at the right time', 'The instruction reaches the patient when it is actionable, across their channels, with consent captured up front.'],
                ['Confirm before the day of the list', 'The medication steps are checked again in the prep-night confirmation, so staff see who has acknowledged them before the procedure date.'],
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
              The clinical decision stays with the gastroenterologist. Aescia delivers the authored rule consistently, with a named clinical author and a documented guideline trail behind every overlay. This “propose, do not decide” posture is part of why Aescia for Clinics is not a medical device.
            </p>
          </div>
        </section>

        <AscEntityBlock />
        <AscPageCta line="If medication confusion is causing day-of cancellations, the design-partner pilot runs free or under a money-back rebate until Aescia delivers measurable net benefit against your own baseline." />
      </main>
      <Footer />
    </>
  )
}
