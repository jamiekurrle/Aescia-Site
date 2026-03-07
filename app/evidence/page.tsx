import { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Clinical Evidence | Aescia Health',
  description:
    'Evidence supporting post-discharge monitoring, projected health system impact, and Aescia\'s approach to clinical evaluation and outcome measurement.',
}

export default function EvidencePage() {
  return (
    <>
      <SiteNav />
      <main className="bg-background min-h-screen">
        {/* Header */}
        <section className="pt-32 pb-16 px-6 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <Link href="/" className="text-sm text-accent mb-8 inline-block hover:underline">
              ← Back to home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Clinical evidence & health system impact
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              The evidence base for post-discharge monitoring, projected outcomes, and our approach to rigorous clinical evaluation.
            </p>
          </div>
        </section>

        {/* Content */}
        <article className="py-16 px-6">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>Evidence for post-discharge monitoring</h2>
            <p>
              The clinical rationale for structured post-discharge monitoring is well-established in the literature:
            </p>
            <ul>
              <li>
                <strong>Readmission rates:</strong> 5–15% of patients are readmitted within 30 days across most surgical and medical cohorts
              </li>
              <li>
                <strong>Preventability:</strong> Retrospective analyses consistently estimate 30–50% of readmissions are potentially preventable
              </li>
              <li>
                <strong>Timing:</strong> Most preventable readmissions occur in the first 7–14 days post-discharge, when monitoring is most valuable
              </li>
              <li>
                <strong>Intervention points:</strong> Early identification of deterioration allows management through outpatient review, community care, or telephone advice—avoiding emergency presentation
              </li>
            </ul>

            <h2>Projected health system impact</h2>
            <p>
              Conservative modeling based on published literature suggests the following impact at a typical large hospital:
            </p>

            <div className="not-prose my-8">
              <div className="bg-secondary rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="font-semibold text-foreground">Cardiothoracic surgery cohort example</h3>
                  <p className="text-sm text-foreground/70">Based on 800 annual discharges</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  <div className="p-6">
                    <div className="text-3xl font-bold text-accent mb-2">25–30</div>
                    <p className="text-foreground/70">Readmissions prevented annually</p>
                    <p className="text-sm text-foreground/50 mt-2">Assuming 8% baseline rate, 40% reduction in preventable returns</p>
                  </div>
                  <div className="p-6">
                    <div className="text-3xl font-bold text-accent mb-2">100–150</div>
                    <p className="text-foreground/70">Bed-days recovered annually</p>
                    <p className="text-sm text-foreground/50 mt-2">From avoided readmissions plus earlier confident discharge</p>
                  </div>
                </div>
              </div>
            </div>

            <h3>Economic value</h3>
            <p>
              The recovered bed capacity translates to significant operational value:
            </p>
            <ul>
              <li><strong>Direct cost avoidance:</strong> Each avoided readmission saves the direct cost of the admission episode</li>
              <li><strong>Throughput improvement:</strong> Freed bed-days can be reutilized at approximately 70% efficiency</li>
              <li><strong>Combined value:</strong> $8.1M+ in projected annual operational value for a single high-volume surgical unit</li>
            </ul>
            <p>
              These projections are conservative estimates based on published literature. Actual outcomes will be measured through structured clinical evaluation.
            </p>

            <h2>Our approach to evaluation</h2>
            <p>
              Aescia engages with health services through <strong>scoped, time-limited clinical evaluations</strong> with:
            </p>
            <ul>
              <li>Predefined endpoints and success criteria</li>
              <li>Transparent outcome reporting</li>
              <li>Site-specific ethics and governance approvals</li>
              <li>Comparison against matched historical cohorts where appropriate</li>
            </ul>
            <p>
              We do not seek routine clinical deployment without appropriate evidence. Our commercial model is aligned with demonstrated outcomes.
            </p>

            <h2>Regulatory posture</h2>
            <p>
              Aescia is positioned as <strong>Software as a Medical Device (SaMD)</strong>:
            </p>
            <ul>
              <li>Current use is limited to approved evaluation contexts</li>
              <li>Development follows IEC 62304 software lifecycle practices</li>
              <li>Risk classification and regulatory pathway completion is in progress</li>
              <li>All clinical outputs are advisory and require clinician review</li>
            </ul>

            <h2>Published references</h2>
            <p>
              Key literature supporting the clinical rationale:
            </p>
            <ul>
              <li>
                Jencks SF, et al. (2009). Rehospitalizations among patients in the Medicare fee-for-service program. <em>NEJM</em>.
              </li>
              <li>
                van Walraven C, et al. (2011). Proportion of hospital readmissions deemed avoidable: a systematic review. <em>CMAJ</em>.
              </li>
              <li>
                Leppin AL, et al. (2014). Preventing 30-day hospital readmissions: a systematic review and meta-analysis. <em>JAMA Internal Medicine</em>.
              </li>
              <li>
                Hansen LO, et al. (2011). Interventions to reduce 30-day rehospitalization: a systematic review. <em>Annals of Internal Medicine</em>.
              </li>
            </ul>

            <div className="bg-secondary p-8 rounded-lg mt-12 not-prose">
              <h3 className="font-semibold text-foreground mb-4">Key projections</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-accent">30–50%</div>
                  <p className="text-sm text-foreground/70">Readmissions potentially preventable</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">70%</div>
                  <p className="text-sm text-foreground/70">Reutilization of freed bed-days</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">$8.1M+</div>
                  <p className="text-sm text-foreground/70">Projected annual value per unit</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border not-prose">
              <p className="text-foreground/70 mb-4">Learn about our governance framework</p>
              <Link
                href="/governance"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-medium px-6 py-3 rounded hover:opacity-90"
              >
                Governance & compliance
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
