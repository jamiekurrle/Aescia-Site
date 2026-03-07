import { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'How Aescia Works | Aescia Health',
  description:
    'Learn how Aescia enables structured post-discharge follow-up through daily patient check-ins, automatic risk classification, and prioritized clinical worklists.',
}

export default function SolutionPage() {
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
              How Aescia works
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              A scalable baseline layer of follow-up that identifies deterioration before it escalates to emergency presentation or readmission.
            </p>
          </div>
        </section>

        {/* Content */}
        <article className="py-16 px-6">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>Overview</h2>
            <p>
              Aescia provides structured post-discharge monitoring through a three-part system: patient-facing check-ins, automatic risk classification, and a clinical worklist interface.
            </p>

            <h2>1. Daily patient check-ins</h2>
            <p>
              Patients complete brief daily questionnaires through the Aescia app. These questionnaires are:
            </p>
            <ul>
              <li><strong>Tailored</strong> to the patient's procedure, diagnosis, and individual risk factors</li>
              <li><strong>Brief</strong>—typically under 2 minutes to complete</li>
              <li><strong>Structured</strong>—using validated symptom scales where available</li>
              <li><strong>Scheduled</strong>—delivered at consistent times to establish routine</li>
            </ul>
            <p>
              The questionnaires cover symptoms relevant to post-discharge deterioration, including pain, wound status, breathing, energy levels, and procedure-specific indicators.
            </p>

            <h2 id="patient-experience">The patient experience</h2>
            <p>
              From the patient's perspective, Aescia provides:
            </p>
            <ul>
              <li>A clear channel to report concerns to their clinical team</li>
              <li>Reassurance that their recovery is being monitored</li>
              <li>Immediate guidance for concerning symptoms</li>
              <li>Reduced anxiety about "bothering" the hospital with questions</li>
            </ul>
            <p>
              Patients can add free-text notes and photos where clinically relevant. The app provides automatic acknowledgment of submissions and guidance based on response content.
            </p>

            <h2>2. Automatic risk classification</h2>
            <p>
              Patient responses are automatically classified into <strong>five urgency levels</strong> using rule-based, transparent thresholds:
            </p>
            <div className="not-prose my-8">
              <div className="space-y-3">
                {[
                  { level: 'Level 1', color: 'bg-green-500', desc: 'Recovery progressing normally' },
                  { level: 'Level 2', color: 'bg-green-300', desc: 'Minor concerns, monitor' },
                  { level: 'Level 3', color: 'bg-yellow-400', desc: 'Moderate concern, review recommended' },
                  { level: 'Level 4', color: 'bg-orange-500', desc: 'Elevated concern, prompt review' },
                  { level: 'Level 5', color: 'bg-red-500', desc: 'Urgent, immediate clinical review' },
                ].map((item) => (
                  <div key={item.level} className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                    <div className={`w-4 h-4 rounded-full ${item.color}`} />
                    <div>
                      <span className="font-semibold text-foreground">{item.level}:</span>
                      <span className="text-foreground/70 ml-2">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p>
              The classification logic is:
            </p>
            <ul>
              <li><strong>Rule-based</strong>—no opaque machine learning models</li>
              <li><strong>Transparent</strong>—clinicians can see exactly why a patient was flagged</li>
              <li><strong>Auditable</strong>—full logging of all classifications and the inputs that produced them</li>
              <li><strong>Configurable</strong>—thresholds can be adjusted to local protocols</li>
            </ul>

            <h2>3. Prioritized clinical worklist</h2>
            <p>
              Rather than continuous alerts, clinical teams see a <strong>single prioritized worklist</strong> ordered by urgency. This design:
            </p>
            <ul>
              <li>Reduces alert fatigue by consolidating notifications</li>
              <li>Ensures highest-risk patients are always visible at the top</li>
              <li>Allows small clinical teams to oversee follow-up for large discharge cohorts</li>
              <li>Provides full context for each patient in a single view</li>
            </ul>
            <p>
              The worklist shows patient history, trend data, and the specific responses that triggered elevation. Clinicians can take action directly from the interface—calling patients, scheduling follow-up, or escalating to specialist review.
            </p>

            <h2>Clinical integration</h2>
            <p>
              Aescia is designed to complement, not replace, existing clinical workflows:
            </p>
            <ul>
              <li><strong>Not a replacement for clinical judgment</strong>—all outputs are advisory</li>
              <li><strong>Integrates with existing escalation pathways</strong>—fits into hospital-in-the-home, outpatient, and nurse-led models</li>
              <li><strong>Does not require new infrastructure</strong>—runs on standard mobile devices and web browsers</li>
              <li><strong>Configurable to local protocols</strong>—adapts to institutional preferences</li>
            </ul>

            <h2>Technical architecture</h2>
            <p>
              The platform is built on:
            </p>
            <ul>
              <li>In-country data storage with encryption in transit and at rest</li>
              <li>Development following IEC 62304 medical device software lifecycle practices</li>
              <li>Compliance with ISO 27001 information security principles</li>
              <li>HIPAA-aligned data handling practices</li>
            </ul>

            <div className="mt-12 pt-8 border-t border-border not-prose">
              <p className="text-foreground/70 mb-4">See the clinical evidence</p>
              <Link
                href="/evidence"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-medium px-6 py-3 rounded hover:opacity-90"
              >
                Evidence & outcomes
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
