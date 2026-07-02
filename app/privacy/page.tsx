import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'How Aescia handles personal and health information: in-country hosting on Google Cloud, encryption in transit and at rest, named sub-processors, a signed data agreement before any patient data is exchanged, and alignment with the Australian Privacy Act, PIPEDA, and Quebec Law 25.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy policy | Aescia',
    description:
      'In-country hosting, encryption, named sub-processors, signed data agreements, and privacy-law alignment across Australia and Canada.',
    url: '/privacy',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Privacy', url: '/privacy' },
])

const pageSchema = webPageSchema({
  url: '/privacy',
  name: 'Privacy policy',
  description:
    'How Aescia collects, hosts, protects, and returns personal and health information, and how it aligns with the Australian Privacy Act, PIPEDA, and Quebec Law 25.',
})

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 border-b border-border last:border-b-0">
      <h2
        className="font-display text-[24px] lg:text-[30px] leading-[1.2] tracking-[-0.02em] mb-5"
        style={{ fontVariationSettings: "'opsz' 100" }}
      >
        {title}
      </h2>
      <div className="space-y-4 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
        {children}
      </div>
    </section>
  )
}

export default function PrivacyPage() {
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
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">Privacy</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[68px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Privacy policy
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              This policy explains how Aescia handles personal and health information. It sits alongside
              the technical detail on our{' '}
              <a href="/security" className="underline underline-offset-4 decoration-brass decoration-2">
                security page
              </a>
              .
            </p>
            <p className="mt-6 font-mono text-[13px] uppercase tracking-[0.18em] text-foreground/60">
              Effective date: 2 July 2026
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <Section title="Who we are">
              <p>
                The data controller is Aescia Pty Ltd (ABN 96 687 840 517), incorporated in Australia,
                with Canadian affiliate entities. In this policy, "Aescia", "we", and "us" refer to
                Aescia Pty Ltd and its affiliates.
              </p>
              <p>
                Aescia is developing pre-procedure pathway software and investigational post-discharge
                monitoring. This policy will be updated as the products reach commercial availability.
              </p>
            </Section>

            <Section title="Information we collect">
              <p>
                From visitors to this marketing site, we collect the information you provide through the
                contact form (such as your name, role, organisation, and message) and basic analytics on
                how the site is used. We do not collect patient health information through this website.
              </p>
              <p>
                Where Aescia processes patient data on behalf of a healthcare customer, that processing is
                governed by the agreement described below and by the customer's own privacy notices, not
                by this website policy.
              </p>
            </Section>

            <Section title="Where your data is hosted">
              <p>
                Customer data is hosted on Google Cloud in region, in the australia-southeast (Sydney)
                region, with per-tenant isolation so one customer's data is kept separate from another's.
              </p>
              <p>
                Data is encrypted in transit using Transport Layer Security (TLS) 1.3 and at rest using
                the Advanced Encryption Standard (AES-256). Access to systems that hold customer data
                requires multi-factor authentication (MFA).
              </p>
            </Section>

            <Section title="Sub-processors">
              <p>
                We use a small set of sub-processors to run the service. These include Google Cloud
                (hosting), Resend (email), Twilio (SMS), and PostHog (product analytics). Each is engaged
                under terms that require appropriate handling of the data they process on our behalf.
              </p>
            </Section>

            <Section title="Agreements before patient data is exchanged">
              <p>
                A Business Associate Agreement (BAA) or Data Processing Agreement (DPA) is signed before
                any patient data is exchanged with a healthcare customer. The agreement sets out the
                purpose of processing, the security obligations, and the handling of data on exit.
              </p>
            </Section>

            <Section title="How we align with privacy law">
              <p>
                Aescia aligns its handling of personal information with the Australian Privacy Act 1988
                and the Australian Privacy Principles, with Canada's Personal Information Protection and
                Electronic Documents Act (PIPEDA), and with Quebec's Law 25.
              </p>
              <p>
                If a data breach that is likely to cause serious harm occurs, we will notify affected
                individuals and the relevant regulator under the Notifiable Data Breaches scheme and the
                equivalent obligations in the jurisdictions above.
              </p>
            </Section>

            <Section title="Data export and deletion">
              <p>
                On exit, customers can export their data, and data is deleted with a certificate of
                destruction provided on request. Individuals can ask us to access or correct the personal
                information we hold about them.
              </p>
            </Section>

            <Section title="Contact us about privacy">
              <p>
                For privacy requests or questions about this policy, contact us at{' '}
                <a href="mailto:contact@aesciahealth.com" className="underline underline-offset-4 decoration-brass decoration-2">
                  contact@aesciahealth.com
                </a>
                .
              </p>
            </Section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
