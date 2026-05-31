import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'How Aescia fits with your systems',
  description:
    'Aescia is pre-first-customer and has no named EMR or practice-management integration live yet. A clinic can start with manual data or a simple export; any deeper data exchange is scoped with each customer and is designed to be a quick setup.',
  alternates: { canonical: '/integrations' },
  openGraph: {
    title: 'Integration approach | Aescia',
    description: 'No named integration is live yet. Manual to start; deeper data exchange scoped per customer.',
    url: '/integrations',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Integrations', url: '/integrations' },
])

const pageSchema = webPageSchema({
  url: '/integrations',
  name: 'How Aescia fits with your systems',
  description:
    'Aescia\'s integration approach. Pre-first-customer: no named EMR or practice-management integration is live. Manual data to start; any deeper data exchange is scoped per customer.',
})

export default function IntegrationsPage() {
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
        {/* Hero */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Integration</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              How Aescia fits with your systems.
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              The honest version. Aescia is pre-first-customer, so there is no named electronic medical record or practice-management integration running in the field yet. This page tells you how a deployment actually starts and how integration gets scoped, rather than listing capabilities we have not field-proven.
            </p>
          </div>
        </section>

        {/* Approach */}
        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">How it works</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <dl className="divide-y divide-border border-y border-border">
              {[
                [
                  'You can start with no integration',
                  'A clinic or unit can begin with manual entry or a simple export of the patient list. Nothing has to be wired into your systems for Aescia to run a first pathway.',
                ],
                [
                  'Deeper data exchange is scoped with you',
                  'If you want Aescia to read from or write to an existing system, we scope that with your IT team for your specific environment, and document the work before any contract is signed. We do not claim a pre-built connector we have not run with a customer.',
                ],
                [
                  'Designed to be a quick setup',
                  'The product is built to deploy in weeks, not quarters, and to add one prioritised list rather than a second portal your team has to log into.',
                ],
                [
                  'We will tell you the lift up front',
                  'If your environment means a manual path to begin with, the pilot memo says so before you commit. Discovering that mid-pilot is the kind of surprise that quietly eats the value, so we put it in writing first.',
                ],
              ].map(([k, v]) => (
                <div key={k} className="py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-3 lg:gap-12">
                  <dt
                    className="font-display text-[19px] lg:text-[24px] leading-[1.25] tracking-[-0.018em] text-foreground"
                    style={{ fontVariationSettings: "'opsz' 80" }}
                  >
                    {k}
                  </dt>
                  <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-[15px] text-foreground/80 flex-1">Tell us the systems your clinic or unit runs. We will return a one-page setup memo before any pilot starts.</p>
            <Link
              href="/contact?intent=integrations"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
            >
              Ask about setup
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
