import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, medicalStudySchema } from '@/lib/schema'

// /evidence — TGA-compliant. Hard rules followed:
// - No quantitative benefit claims tied to Aescia. No dollar projections,
//   no readmission-reduction figures, no bed-day figures, no percent
//   reductions. Third-party study figures stay in the cited references, not
//   the page body, which describes associations qualitatively.
// - No therapeutic claims about Aescia. The bed-day / capacity framing is an
//   inference from the cited readmission literature, explicitly not an Aescia
//   claim, and the disclaimer says so.
// - Covers two literatures: post-discharge monitoring (Hospitals) and
//   pre-procedure preparation / prehabilitation (Clinics, a non-device tool).
// - Literature-based content only, framed as observations about the
//   published research, not as outcomes Aescia will deliver.
// - Same nav, same footer, same regulatory band as /hospitals.

export const metadata: Metadata = {
  title: 'Clinical evidence',
  description:
    'The published evidence base for structured post-discharge monitoring and for pre-procedure preparation and prehabilitation, and Aescia\'s approach to generating product-specific evidence through the SAFE-Discharge clinical evaluation.',
  alternates: { canonical: '/evidence' },
  openGraph: {
    title: 'Clinical evidence | Aescia',
    description: 'The published evidence base, and our approach to product-specific clinical evaluation.',
    url: '/evidence',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Clinical evidence', url: '/evidence' },
])

const literature: Array<[string, string, string, string]> = [
  ['Jencks SF, Williams MV, Coleman EA (2009)', 'Rehospitalizations among patients in the Medicare fee-for-service program.', 'New England Journal of Medicine', '360:1418-1428'],
  ['van Walraven C, et al. (2011)', 'Proportion of hospital readmissions deemed avoidable: a systematic review.', 'Canadian Medical Association Journal', '183(7):E391-E402'],
  ['Leppin AL, et al. (2014)', 'Preventing 30-day hospital readmissions: a systematic review and meta-analysis of randomized trials.', 'JAMA Internal Medicine', '174(7):1095-1107'],
  ['Hansen LO, et al. (2011)', 'Interventions to reduce 30-day rehospitalization: a systematic review.', 'Annals of Internal Medicine', '155(8):520-528'],
  ['Skořepa P, et al. (2024)', 'The impact of prehabilitation on outcomes in frail and high-risk patients undergoing major abdominal surgery: a systematic review and meta-analysis.', 'Clinical Nutrition', '2024; doi:10.1016/j.clnu.2024.01.020'],
  ['Yadlapati R, et al. (2015)', 'Predictors of inadequate inpatient colonoscopy preparation and its association with hospital length of stay and costs.', 'Digestive Diseases and Sciences', '60(11):3482-3490'],
]

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
        {/* Hero */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Clinical evidence</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              The published base, and how we add to it.
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              The published evidence base for structured post-discharge monitoring, and Aescia&rsquo;s approach to generating product-specific evidence through rigorous clinical evaluation.
            </p>
          </div>
        </section>

        {/* Published evidence base */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Published literature</span>
            <h2
              className="font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              The evidence base for post-discharge monitoring.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                The published literature on early hospital readmission has been consistent across two decades of analysis. Jencks and colleagues, working in the United States Medicare population, established that a meaningful fraction of inpatient discharges are followed by readmission within 30 days. Van Walraven and colleagues, in a systematic review across multiple countries, reported that a substantial proportion of those readmissions are judged avoidable by treating clinicians on retrospective review.
              </p>
              <p>
                Leppin and colleagues, in a meta-analysis of randomised trials, reported that interventions involving structured patient contact during the post-discharge window are associated with reduced readmission rates. Hansen and colleagues, in a parallel systematic review, classified the interventions that have been studied and noted that combinations of pre-discharge and post-discharge components tend to outperform single-element approaches.
              </p>
              <p>
                This bears on hospital capacity as much as on the patient. Because an avoided readmission is an inpatient stay that does not happen, the readmission literature is, in effect, also a literature about bed-days: in high-acuity surgical units, where the bed is the binding constraint, fewer avoidable readmissions and a smoother recovery mean bed-days returned to the service. Whether any particular monitoring approach achieves that, and to what degree, is an empirical question that each product must answer in its own trial.
              </p>
              <p>
                The literature describes the territory; it does not characterise any specific software product, including Aescia. Citations are listed below.
              </p>
            </div>
            <p className="mt-10 text-[13px] leading-[1.7] text-foreground/65 italic font-display border-l-2 border-brass/40 pl-4 max-w-3xl">
              The findings above are observations about the published literature on post-discharge care. They are not statements about the performance, intended use, or expected outcomes of Aescia for Hospitals. Aescia makes no claim to reduce readmissions, length of stay, or bed-days; that is precisely what the SAFE-Discharge trial is designed to evaluate.
            </p>
          </div>
        </section>

        {/* Preparation and length of stay (Clinics, non-device) */}
        <section className="py-24 lg:py-32 px-6 lg:px-10 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Before the procedure</span>
            <h2
              className="font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              What happens before shapes what happens after.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                A second body of published research looks at the period before a procedure or operation. Systematic reviews of prehabilitation in higher-risk patients before major surgery have reported associations with shorter hospital stays and fewer severe complications, though the evidence is still developing and not every study finds the same effect. In endoscopy, inadequate bowel preparation has been associated with longer inpatient stays and higher hospitalisation costs.
              </p>
              <p>
                Aescia for Clinics is a workflow and patient-preparation platform. It delivers clinician-authored preparation pathways, medication-hold guidance, and timed reminders into a patient web app, in the patient&rsquo;s own language. It is not a medical device and does not propose clinical decisions. The studies below describe the published evidence on preparation and prehabilitation; Aescia&rsquo;s role is to deliver those clinician-authored steps reliably and at scale, not to claim a clinical outcome of its own.
              </p>
            </div>
            <p className="mt-10 text-[13px] leading-[1.7] text-foreground/65 italic font-display border-l-2 border-brass/40 pl-4 max-w-3xl">
              These are observations about the published literature on preparation and prehabilitation. They are not statements about the performance or expected outcomes of Aescia for Clinics.
            </p>
          </div>
        </section>

        {/* Our clinical programme */}
        <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Active programme</span>
              <h2
                className="font-display text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                Our clinical programme.
              </h2>
              <p className="text-[15px] mt-5 text-foreground/80 leading-relaxed max-w-md">
                Aescia&rsquo;s product-specific evidence is generated through structured clinical evaluation. Our active programme is SAFE-Discharge: a prospective single-centre evaluation at the Royal Prince Alfred Hospital cardiothoracic surgical unit in Sydney. The trial is registered with the Australian New Zealand Clinical Trials Registry. This page does not recruit trial participants.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <dl className="divide-y divide-border border-y border-border">
                {([
                  [
                    'Registration',
                    <a
                      key="anzctr"
                      href="https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482"
                      target="_blank"
                      rel="noopener"
                      className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors"
                      aria-label="View SAFE-Discharge trial registration on ANZCTR (opens in a new window)"
                    >
                      ACTRN12625001425482
                    </a>,
                    true,
                  ],
                  ['Site', 'Royal Prince Alfred Hospital, Sydney', false],
                  ['Unit', 'Cardiothoracic Surgery Unit', false],
                  ['Sponsor', 'Sydney Local Health District (SLHD)', false],
                  ['Principal Investigator', 'Dr Kei Woldendorp, The Baird Institute', false],
                  ['Population', 'Adult patients post cardiothoracic surgery (CABG, valve, thoracic procedures)', false],
                  ['Sample size', '550 patients (50 interim + 500 main), single centre', false],
                  ['Status', 'Ethics approved. Site-specific governance in progress.', false],
                ] as Array<[string, React.ReactNode, boolean]>).map(([k, v, mono], i) => (
                  <div key={i} className="grid grid-cols-[180px_1fr] gap-6 py-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/65">{k}</dt>
                    <dd className={`text-[15px] text-foreground ${mono ? 'font-mono text-[14px]' : ''}`}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Approach to evaluation */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Approach</span>
            <h2
              className="font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6 mb-10"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              How we evaluate.
            </h2>
            <dl className="divide-y divide-border border-y border-border">
              {[
                ['Scoped evaluations', 'Each clinical evaluation is scoped to a defined service line, population, and post-discharge window. Generalisation beyond that scope is not claimed.'],
                ['Predefined endpoints', 'Endpoints, sample sizes, and analysis plans are pre-specified before enrolment opens. Interim analyses are pre-specified where used.'],
                ['Transparent reporting', 'We report what the trial shows, whatever it shows. Negative or null results are reported in the same form as positive results.'],
                ['Ethics and governance', 'All evaluations run under approval from the relevant Human Research Ethics Committee and site-specific research governance.'],
                ['Independent oversight', 'Sponsor responsibility sits with the trial-sponsoring institution. Aescia does not arbitrate clinical interpretation of trial outcomes.'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[180px_1fr] gap-6 py-6">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">{k}</dt>
                  <dd className="text-[14.5px] lg:text-[15px] leading-[1.7] text-foreground/85">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Regulatory posture */}
        <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Regulatory posture</span>
            <h2
              className="font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6 mb-10"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Where we are with regulators.
            </h2>
            <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
              <p>
                Aescia for Hospitals is an investigational Software as a Medical Device. The intended classification is Class IIa under TGA Rule 3.4. A regulatory submission for ARTG inclusion is in preparation; the product has not been submitted, is not registered, and is not available for commercial supply.
              </p>
              <p>
                The software lifecycle follows IEC 62304:2006+A1:2015 processes, implemented and documented internally. ISO 13485:2016 quality-system implementation and ISO/IEC 27001:2022 information-security controls are in place; certifications under those standards have not been obtained and no third-party conformity assessment has been undertaken.
              </p>
              <p>
                Clinical outputs from Aescia for Hospitals are advisory and require clinician review. The product does not autonomously act on patient responses; the treating clinical team remains the decision-maker for any change in care.
              </p>
            </div>
            <div className="mt-10">
              <Link
                href="/governance"
                className="inline-flex items-center gap-2.5 text-[13px] text-foreground font-medium tracking-wide border-b border-brass pb-1.5 hover:border-foreground transition-colors"
              >
                Read full governance and security posture
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Published references */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">References</span>
            <h2
              className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-10"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              Published references.
            </h2>
            <ol className="space-y-6 text-[15px] leading-[1.7] text-foreground/80 list-none">
              {literature.map(([authors, title, journal, vol]) => (
                <li key={title} className="grid grid-cols-[90px_1fr] gap-6 border-b border-border pb-6">
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
            <p className="text-[15px] text-foreground/80 flex-1">For the regulatory and security posture in detail:</p>
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
