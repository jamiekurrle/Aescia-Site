import { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'The Problem | Aescia Health',
  description:
    'Post-discharge monitoring gaps lead to preventable readmissions. Learn about the clinical problem Aescia addresses and the opportunity for improvement.',
}

export default function ProblemPage() {
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
              The problem: High-risk days go unmonitored
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Most patients are discharged from hospital without structured, proactive follow-up—yet the days immediately after discharge carry the highest clinical risk.
            </p>
          </div>
        </section>

        {/* Content */}
        <article className="py-16 px-6">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>The post-discharge risk window</h2>
            <p>
              Across patient populations, <strong>5 to 15% of patients are readmitted within 30 days</strong> of discharge. Retrospective analyses consistently suggest that <strong>30 to 50% of these readmissions are potentially preventable</strong>, often related to:
            </p>
            <ul>
              <li>Delayed recognition of clinical deterioration</li>
              <li>Medication-related issues</li>
              <li>Gaps in post-discharge support and monitoring</li>
              <li>Incomplete patient understanding of warning signs</li>
            </ul>

            <h2>Why current approaches fall short</h2>
            <p>
              High-touch follow-up models like hospital-in-the-home are effective but resource-intensive. They reach only <strong>3 to 7% of discharges</strong>. The majority of patients receive little or no structured follow-up once they leave hospital.
            </p>
            <p>
              In the absence of reliable monitoring at home, clinicians must manage risk conservatively:
            </p>
            <ul>
              <li>Patients may remain in hospital longer than medically necessary</li>
              <li>Bed capacity is consumed during the highest-risk recovery period</li>
              <li>Hospital throughput is limited by conservative discharge practices</li>
            </ul>

            <h2>The gap in the system</h2>
            <p>
              What's missing is a <strong>scalable baseline layer of follow-up</strong> that routinely checks in with discharged patients, provides guidance, and identifies early deterioration before it escalates to emergency presentation or readmission.
            </p>
            <p>
              This layer must be:
            </p>
            <ul>
              <li><strong>Low-burden</strong> for patients—simple enough for daily completion</li>
              <li><strong>Scalable</strong> for clinical teams—not requiring 1:1 phone follow-up</li>
              <li><strong>Transparent</strong> in escalation logic—clinicians must trust and understand the system</li>
              <li><strong>Integrated</strong> with existing workflows—not a separate system to monitor</li>
            </ul>

            <h2>The opportunity</h2>
            <p>
              By establishing a reliable channel between discharged patients and clinical teams, hospitals can:
            </p>
            <ul>
              <li>Identify deterioration earlier, when intervention is less costly</li>
              <li>Discharge patients confidently when medically ready</li>
              <li>Free bed capacity without compromising safety</li>
              <li>Generate outcome data to demonstrate quality improvement</li>
            </ul>

            <div className="bg-secondary p-8 rounded-lg mt-12 not-prose">
              <h3 className="font-semibold text-foreground mb-4">Key statistics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-accent">5–15%</div>
                  <p className="text-sm text-foreground/70">30-day readmission rate</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">30–50%</div>
                  <p className="text-sm text-foreground/70">Potentially preventable</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">3–7%</div>
                  <p className="text-sm text-foreground/70">Covered by HITH programs</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border not-prose">
              <p className="text-foreground/70 mb-4">Ready to see the solution?</p>
              <Link
                href="/solution"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-medium px-6 py-3 rounded hover:opacity-90"
              >
                How Aescia works
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
