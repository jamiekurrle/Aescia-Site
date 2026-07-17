import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema, faqPageSchema, SITE_LAST_UPDATED } from '@/lib/schema'
import { JURISDICTIONS } from '../engine'
import { FAQ_ITEMS } from '../faq'
import { RESEARCH } from '../research'

const SITE_URL = 'https://www.aesciahealth.com'
const CANONICAL = '/colonoscopy-surveillance/guide'
const URL = `${SITE_URL}${CANONICAL}`

const TITLE = 'Colonoscopy Surveillance Intervals by Guideline'
const DESCRIPTION =
  'Post-polypectomy colonoscopy surveillance intervals across the US, Canadian, Australian, and European guidelines, with common questions and source links.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'article',
    siteName: 'Aescia',
    images: [{ url: `${SITE_URL}/colonoscopy-surveillance-og`, width: 1200, height: 630, alt: 'Colonoscopy surveillance intervals — Aescia' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/colonoscopy-surveillance-og`],
  },
}

export default function SurveillanceGuidePage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Colonoscopy surveillance interval', url: '/colonoscopy-surveillance' },
    { name: 'Guideline reference', url: CANONICAL },
  ])
  const pageSchema = webPageSchema({
    url: CANONICAL,
    name: TITLE,
    description: DESCRIPTION,
    datePublished: '2026-07-17',
    dateModified: SITE_LAST_UPDATED,
    isMedicalPage: true,
    inLanguage: 'en-US',
    breadcrumb: breadcrumbs,
  })
  const faqSchema = { ...faqPageSchema(FAQ_ITEMS.map((f) => ({ q: f.q, a: f.a }))), '@id': `${URL}#faq` }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        {/* Intro ---------------------------------------------------------- */}
        <section className="pt-32 pb-8 lg:pt-40 lg:pb-10 px-6 lg:px-10 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">Guideline reference</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[54px] leading-[1.06] tracking-[-0.03em] mb-5" style={{ fontVariationSettings: "'opsz' 144" }}>
              Colonoscopy surveillance intervals by guideline
            </h1>
            <p className="text-[16px] lg:text-[18px] leading-relaxed text-foreground/72 max-w-2xl">
              How the major post-polypectomy surveillance guidelines set the next colonoscopy interval,
              the questions clinicians ask most, where the field is heading, and the source behind each
              rule, for the US, Canadian, Australian, and European guidelines.
            </p>
            <p className="text-[15px] leading-relaxed text-foreground/72 max-w-2xl mt-6">
              To get an interval for a specific set of findings,{' '}
              <Link href="/colonoscopy-surveillance" className="text-accent hover:underline">use the surveillance interval calculator</Link>.
            </p>
            <p className="text-[13px] leading-relaxed text-foreground/72 max-w-2xl mt-3">
              For health professionals, not personal medical advice. Patients should discuss their
              interval with their doctor.
            </p>
          </div>
        </section>

        {/* FAQ ------------------------------------------------------------ */}
        <section className="px-6 lg:px-10 py-14 lg:py-20 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">Common questions</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h2 className="font-display text-[26px] lg:text-[34px] font-bold tracking-tight mb-8">Colonoscopy surveillance intervals — quick answers</h2>
            <div className="divide-y divide-border">
              {FAQ_ITEMS.map((item) => (
                <div key={item.q} className="py-5">
                  <h3 className="text-[16px] font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-[14px] leading-relaxed text-foreground/80">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where surveillance is heading ---------------------------------- */}
        <section className="px-6 lg:px-10 py-14 lg:py-20 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">What is changing</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <h2 className="font-display text-[26px] lg:text-[34px] font-bold tracking-tight mb-4">Where post-polypectomy surveillance is heading</h2>
            <p className="text-[15px] leading-relaxed text-foreground/72 mb-10 max-w-2xl">Background reading on the evidence and where the guidelines are moving. It does not set the interval for any individual patient, which follows the guideline that applies to them.</p>
            <div className="space-y-10">
              {RESEARCH.map((group) => (
                <div key={group.heading}>
                  <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-foreground/72 mb-4 pb-2 border-b border-border">{group.heading}</h3>
                  <div className="space-y-6">
                    {group.items.map((item) => (
                      <div key={item.title}>
                        <h4 className="text-[15px] font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-[13.5px] leading-relaxed text-foreground/72 mb-1.5">{item.body}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          {item.sources.map((s) => (
                            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-accent hover:underline">{s.label} ↗</a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guideline sources ---------------------------------------------- */}
        <section className="px-6 lg:px-10 py-14 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-mono text-[12px] uppercase tracking-[0.14em] text-foreground/72 mb-6">Guideline sources</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {JURISDICTIONS.map((j) => (
                <a key={j.id} href={j.source.url} target="_blank" rel="noopener noreferrer" className="block bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors">
                  <div className="text-[14px] font-semibold text-foreground mb-1">{j.label}{j.province ? ` · ${j.province}` : ''} · {j.guideline}</div>
                  <div className="text-[12px] text-foreground/72 leading-relaxed">{j.source.name} ↗</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Related tools -------------------------------------------------- */}
        <section className="px-6 lg:px-10 py-14 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-mono text-[12px] uppercase tracking-[0.14em] text-foreground/72 mb-6">Related tools</h2>
            <a href="https://gastroenterology.ucsd.edu/research/labs/gupta/products.html" target="_blank" rel="noopener noreferrer" className="block bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors">
              <div className="text-[14px] font-semibold text-foreground mb-1">Risk Calculator for Metachronous Advanced Neoplasia After Colorectal Polypectomy ↗</div>
              <div className="text-[13px] text-foreground/72 leading-relaxed">From the Gupta laboratory at the University of California San Diego. It estimates an individual patient&apos;s probability of developing advanced neoplasia after polypectomy, which is a different question from the guideline interval this reference gives.</div>
            </a>
          </div>
        </section>

        {/* Back to the calculator ----------------------------------------- */}
        <section className="px-6 lg:px-10 py-14">
          <div className="max-w-4xl mx-auto">
            <div className="bg-secondary/50 border border-border rounded-lg p-5 lg:p-6 mb-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/72 mb-2">Get an interval</div>
              <p className="text-[14px] leading-relaxed text-foreground/80">
                Enter the polyps removed at an index colonoscopy and the{' '}
                <Link href="/colonoscopy-surveillance" className="text-accent hover:underline">surveillance interval calculator</Link>{' '}
                reproduces the published rule for the guideline you select, with its wording and its source.
              </p>
            </div>
            <p className="text-[13px] leading-relaxed text-foreground/72 mb-6">A free reference from Aescia for the endoscopy community, reviewed and periodically updated by the Aescia clinical team.</p>
            <p className="text-[12px] leading-relaxed text-foreground/72">
              Reference for health professionals. Not medical advice. Not a medical device. Does not
              make or replace clinical decisions. We review this reference periodically against the
              source guidelines and update it when they change, but guidelines are revised without
              notice; verify against the current version before acting. If you notice an error, please
              tell us at{' '}
              <a href="mailto:contact@aesciahealth.com" className="text-accent hover:underline">contact@aesciahealth.com</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
