import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, medicalStudySchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Evidence, regulatory posture, and the SAFE-Discharge trial',
  description:
    'A public accounting of the SAFE-Discharge trial, the intended Class IIa pathway for Aescia for Hospitals, and the workflow boundary of Aescia for Clinics. What we claim. What we do not.',
  alternates: { canonical: '/evidence' },
  openGraph: {
    title: 'Aescia Evidence | Where we are today',
    description: 'SAFE-Discharge trial detail and the claims we are careful not to make.',
    url: '/evidence',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Evidence', url: '/evidence' },
])

export default function EvidencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalStudySchema) }}
      />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Evidence</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[76px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Where we are today, and what we are careful not to say.
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              Aescia for Hospitals is in active clinical evaluation through the SAFE-Discharge trial. It is an investigational Software as a Medical Device. A regulatory application has not yet been lodged. This page is a public accounting of what is running, what it is measuring, and what we will claim only once it is earned. This page does not recruit trial participants.
            </p>
          </div>
        </section>

        {/* Trial block */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Active programme</span>
              <h2
                className="font-display text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                SAFE-Discharge
              </h2>
              <p className="text-[14px] mt-5 text-foreground/75 leading-relaxed">
                A prospective single-centre evaluation of Aescia for cardiothoracic post-discharge monitoring at the Royal Prince Alfred Hospital in Sydney. A 50-patient interim cohort is pre-specified, followed by a 500-patient main cohort; 550 patients total. Registered with the Australian New Zealand Clinical Trials Registry. Principal Investigator Dr Kei Woldendorp. Ethics approved; site-specific governance in progress at time of writing.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <dl className="divide-y divide-border border-y border-border">
                {[
                  ['Registration', 'ACTRN12625001425482', true],
                  ['Internal identifier', 'AES-SAFE-CTS-001', true],
                  ['Site', 'Royal Prince Alfred Hospital, Sydney', false],
                  ['Unit', 'Cardiothoracic Surgery Unit', false],
                  ['Principal Investigator', 'Dr Kei Woldendorp, The Baird Institute', false],
                  ['Population', 'Adult patients post cardiothoracic surgery (CABG, valve, thoracic procedures)', false],
                  ['Sample size', '550 patients (50 interim + 500 main), single centre', false],
                  ['Design', 'Prospective, historically controlled, structured post-discharge monitoring across the 30-day post-discharge window', false],
                  ['Interim analysis', 'Pre-specified at 50 patients enrolled', false],
                  ['Secondary endpoint', 'Alert burden: fewer than 1 nurse-actionable flag per patient per week over the 30-day window', false],
                  ['Status', 'Ethics approved. Site-specific governance and IT assessment in progress. First participants expected on site activation.', false],
                ].map(([k, v, mono], i) => (
                  <div key={i} className="grid grid-cols-[180px_1fr] gap-6 py-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/65">{k as string}</dt>
                    <dd className={`text-[15px] text-foreground ${mono ? 'font-mono text-[14px]' : ''}`}>{v as string}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Claim surface */}
        <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <h2
              className="font-display text-[32px] lg:text-[48px] leading-[1.08] tracking-[-0.025em] mb-16 max-w-2xl"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Our honest claim surface.
            </h2>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="border-t-2 border-foreground pt-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70 mb-5 block">What we claim</span>
                <ul className="space-y-5 text-[15px] leading-[1.65] text-foreground/85">
                  <li>That structured daily follow-up is a known gap across the first 30 days after a high-acuity surgical discharge, widely described in the published literature.</li>
                  <li>That transparent, rule-based prioritisation, authored by practising clinicians, is a defensible design choice for a safety-focused software layer.</li>
                  <li>That our patient-facing check-ins are built with the nursing workflow in mind, to produce one prioritised list rather than a new inbox.</li>
                  <li>That Aescia for Clinics is a workflow tool for specialty clinics and that it is not a medical device.</li>
                </ul>
              </div>
              <div className="border-t-2 border-brass pt-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass mb-5 block">What we do not claim</span>
                <ul className="space-y-5 text-[15px] leading-[1.65] text-foreground/85">
                  <li>That Aescia for Hospitals has been shown to reduce readmissions. The SAFE-Discharge trial is running. We will report what the trial shows, whatever it shows.</li>
                  <li>That Aescia for Hospitals is approved, listed, cleared, or certified as a medical device in any jurisdiction. A regulatory application has not yet been lodged.</li>
                  <li>Specific modelled financial outcomes as if they were observed results. Economic estimates exist for internal planning and are shared on request, clearly labelled as estimates.</li>
                  <li>That Aescia for Clinics makes or informs clinical decisions. It delivers clinician-authored educational content, reminders, and structured prep, and escalates exceptions to the team.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Literature */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Background literature</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-10"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              The territory our trial is entering.
            </h2>
            <ol className="space-y-6 text-[15px] leading-[1.7] text-foreground/80 list-none">
              {[
                ['Jencks SF, Williams MV, Coleman EA (2009)', 'Rehospitalizations among patients in the Medicare fee-for-service program.', 'NEJM', '360:1418-1428'],
                ['van Walraven C, et al. (2011)', 'Proportion of hospital readmissions deemed avoidable: a systematic review.', 'CMAJ', '183(7):E391-E402'],
                ['Leppin AL, et al. (2014)', 'Preventing 30-day hospital readmissions: a systematic review and meta-analysis of randomized trials.', 'JAMA Internal Medicine', '174(7):1095-1107'],
                ['Hansen LO, et al. (2011)', 'Interventions to reduce 30-day rehospitalization: a systematic review.', 'Annals of Internal Medicine', '155(8):520-528'],
              ].map(([authors, title, journal, vol]) => (
                <li key={title as string} className="grid grid-cols-[90px_1fr] gap-6 border-b border-border pb-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/60 pt-1">Paper</span>
                  <div>
                    <div className="text-foreground mb-1">{authors}</div>
                    <div className="italic">{title}</div>
                    <div className="text-foreground/65 font-mono text-[12px] mt-1">{journal}, {vol}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-[15px] text-foreground/80 flex-1">Looking for the governance and security posture?</p>
            <Link
              href="/governance"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
            >
              Read governance
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
