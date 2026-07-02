import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Terms of use',
  description:
    'Terms of use for the Aescia marketing website: acceptable use, the informational nature of the content, intellectual property owned by Aescia Pty Ltd, governing law in Australia, and how to contact us.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of use | Aescia',
    description:
      'Acceptable use, informational content, intellectual property, and governing law for the Aescia website.',
    url: '/terms',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Terms', url: '/terms' },
])

const pageSchema = webPageSchema({
  url: '/terms',
  name: 'Terms of use',
  description:
    'Terms governing use of the Aescia marketing website, including acceptable use, informational content, intellectual property, and governing law.',
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

export default function TermsPage() {
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
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">Terms</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[68px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Terms of use
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              These terms govern your use of the Aescia website. By using the site, you agree to them.
            </p>
            <p className="mt-6 font-mono text-[13px] uppercase tracking-[0.18em] text-foreground/60">
              Effective date: 2 July 2026
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <Section title="Acceptable use">
              <p>
                You may use this website for lawful purposes, to learn about Aescia and to get in touch
                with us. Please do not attempt to disrupt the site, access it in a way that damages or
                overloads it, or use it to send unlawful or harmful content.
              </p>
            </Section>

            <Section title="Informational content">
              <p>
                The content on this website is provided for general information about Aescia and its
                products. It is not medical advice and does not create a clinician-patient relationship.
                The website is provided on an "as is" basis, and we make no warranty that the information
                is complete, current, or fit for a particular purpose.
              </p>
              <p>
                Aescia for Clinics is a workflow tool that does not propose clinical decisions and is not
                a medical device. Aescia for Hospitals is investigational. Any product descriptions on the
                site are subject to change as the products develop.
              </p>
            </Section>

            <Section title="Intellectual property">
              <p>
                The website, its text, design, and logos are owned by Aescia Pty Ltd or its licensors and
                are protected by intellectual-property law. You may not copy, reproduce, or reuse them
                without our prior written permission, other than for ordinary personal viewing of the
                site.
              </p>
            </Section>

            <Section title="Third-party links">
              <p>
                The site may link to third-party websites. We are not responsible for the content or
                practices of those websites, and a link does not imply endorsement.
              </p>
            </Section>

            <Section title="Governing law">
              <p>
                These terms are governed by the laws of Australia. Any dispute relating to the website or
                these terms is subject to the jurisdiction of the Australian courts.
              </p>
            </Section>

            <Section title="Contact us">
              <p>
                Questions about these terms can be sent to{' '}
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
