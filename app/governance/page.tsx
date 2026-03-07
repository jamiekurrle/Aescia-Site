import { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Governance & Compliance | Aescia Health',
  description:
    'Aescia\'s approach to clinical governance, data security, regulatory compliance, and transparent evaluation practices.',
}

export default function GovernancePage() {
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
              Governance & compliance
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Our approach to clinical governance, data security, regulatory compliance, and transparent operation in healthcare environments.
            </p>
          </div>
        </section>

        {/* Content */}
        <article className="py-16 px-6">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>Clinical governance</h2>
            <p>
              Aescia operates under defined clinical governance frameworks:
            </p>
            <ul>
              <li>
                <strong>Clinician-in-the-loop:</strong> All platform outputs are advisory. Clinical decisions remain with qualified healthcare professionals.
              </li>
              <li>
                <strong>No autonomous actions:</strong> The platform does not make treatment decisions, prescribe medications, or initiate clinical interventions.
              </li>
              <li>
                <strong>Transparent escalation logic:</strong> All risk classification rules are documented, auditable, and explainable to clinical teams.
              </li>
              <li>
                <strong>Configurable to local protocols:</strong> Escalation thresholds and pathways can be adjusted to align with institutional policies.
              </li>
            </ul>

            <h2>Data security & privacy</h2>
            <p>
              Patient data protection is fundamental to our architecture:
            </p>
            <ul>
              <li><strong>In-country data storage:</strong> All patient data is stored within your jurisdiction</li>
              <li><strong>Encryption:</strong> Data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
              <li><strong>Access controls:</strong> Role-based access with audit logging of all data access</li>
              <li><strong>Data minimization:</strong> Only clinically necessary information is collected</li>
              <li><strong>Privacy compliance:</strong> Aligned with local privacy regulations</li>
            </ul>

            <h2>Information security standards</h2>
            <p>
              Development and operations follow recognized security frameworks:
            </p>
            <ul>
              <li><strong>ISO 27001:</strong> Information security management principles</li>
              <li><strong>OWASP:</strong> Secure development practices and vulnerability management</li>
              <li><strong>Regular security assessments:</strong> Penetration testing and vulnerability scanning</li>
              <li><strong>Incident response:</strong> Documented procedures for security event handling</li>
            </ul>

            <h2>Medical device regulation</h2>
            <p>
              Aescia is positioned as Software as a Medical Device (SaMD):
            </p>
            <ul>
              <li><strong>Regulatory framework:</strong> Aligned with local medical device regulations</li>
              <li><strong>IEC 62304:</strong> Medical device software lifecycle development practices</li>
              <li><strong>Risk classification:</strong> Appropriate regulatory pathway based on device classification</li>
              <li><strong>Current status:</strong> Use limited to approved evaluation contexts pending pathway completion</li>
            </ul>

            <h2>Evaluation & evidence practices</h2>
            <p>
              We maintain rigorous standards for clinical evidence:
            </p>
            <ul>
              <li><strong>Time-limited evaluations:</strong> Scoped engagements with predefined endpoints</li>
              <li><strong>Ethics review:</strong> Site-specific ethics approval where required</li>
              <li><strong>Transparent reporting:</strong> Evaluation outcomes reported openly, including negative results</li>
              <li><strong>No deployment without evidence:</strong> We do not seek routine use without demonstrated outcomes</li>
            </ul>

            <h2>Organizational structure</h2>
            <div className="not-prose my-8">
              <div className="bg-secondary rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Legal entities</p>
                    <p className="font-semibold text-foreground">Aescia Pty Ltd (AU)</p>
                    <p className="font-semibold text-foreground">Aescia Inc (Quebec)</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">ABN</p>
                    <p className="font-semibold text-foreground">96 687 840 517</p>
                  </div>
                </div>
              </div>
            </div>

            <h2>Leadership</h2>
            <p>
              Aescia is led by clinicians and technologists with acute care experience:
            </p>
            <ul>
              <li>Clinical leadership with direct experience in post-discharge care pathways</li>
              <li>Technical team with healthcare software development background</li>
              <li>Advisory input from practicing clinicians across target specialties</li>
            </ul>

            <h2>Compliance certifications</h2>
            <p>
              Current and planned compliance documentation:
            </p>
            <ul>
              <li>ISO 27001 principles (in practice)</li>
              <li>IEC 62304 lifecycle practices (documented)</li>
              <li>TGA regulatory pathway (in progress)</li>
              <li>Site-specific ethics approvals (obtained per engagement)</li>
            </ul>

            <div className="bg-accent/10 p-8 rounded-lg mt-12 not-prose border border-accent/20">
              <h3 className="font-semibold text-foreground mb-4">Governance principles</h3>
              <ul className="space-y-3">
                {[
                  'All outputs are advisory—clinicians make decisions',
                  'Escalation logic is transparent and auditable',
                  'Patient data stays in-country',
                  'No deployment without demonstrated evidence',
                  'Configurable to institutional requirements',
                ].map((principle) => (
                  <li key={principle} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-foreground/80">{principle}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-8 border-t border-border not-prose">
              <p className="text-foreground/70 mb-4">Ready to discuss an evaluation?</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-medium px-6 py-3 rounded hover:opacity-90"
              >
                Get in touch
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
