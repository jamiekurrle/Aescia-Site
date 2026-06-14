'use client'

import Link from 'next/link'

// Homepage credibility strip. Each fact is the short, declarative answer a
// US GI ASC (or an LLM acting on its behalf) wants to see without leaving
// the homepage. Each one links to the page that holds the longer answer.
// Body text is intentionally crawlable plain prose so a shallow LLM pass
// can lift any tile as the answer to the matching prospect question.
export function CredibilityFacts() {
  const facts: Array<{ eyebrow: string; title: string; body: string; href: string; cta: string }> = [
    {
      eyebrow: 'Data and privacy',
      title: 'Data hosted in country with the relevant agreement in place.',
      body:
        'Aescia hosts customer data in the customer\'s jurisdiction on Google Cloud and signs the relevant data agreement (BAA in the US, DPA under the GDPR, the equivalent under the Australian Privacy Principles or PIPEDA) before any patient data is exchanged. SOC 2 path opens with the first design-partner contract.',
      href: '/security',
      cta: 'Read the security pack',
    },
    {
      eyebrow: 'Getting started',
      title: 'Designed to deploy quickly.',
      body:
        'Aescia is pre-first-customer and says so plainly. A clinic can start with manual data entry or a simple export, with no integration required to begin. Any deeper data exchange with your systems is scoped with you.',
      href: '/design-partner',
      cta: 'How we start with you',
    },
    {
      eyebrow: 'Economics',
      title: 'Run your own numbers on /clinics.',
      body:
        'Interactive ROI calculator with conservative, expected, and better-case bands anchored to Beran 2024 (n=358,257), Allen 2023 ASC facility fees, and Mehta 2021 intervention outcomes. No point estimates. Assumptions are visible.',
      href: '/clinics#roi',
      cta: 'Open the calculator',
    },
    {
      eyebrow: 'First customers',
      title: 'A structured first-customer program.',
      body:
        'A small named set of ASCs. Outcomes pre-specified in writing before the pilot starts, measured against the customer\'s own historical data, adjudicated by the customer\'s QA committee. Commercial terms negotiated per deal.',
      href: '/design-partner',
      cta: 'Read the program terms',
    },
  ]

  return (
    <section
      aria-labelledby="credibility-heading"
      className="bg-background py-20 lg:py-28 px-6 lg:px-10 border-b border-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-4 mb-12 lg:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">What a US ASC asks first</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <h2
            id="credibility-heading"
            className="font-display text-[24px] lg:text-[34px] leading-[1.15] tracking-[-0.02em] max-w-2xl"
            style={{ fontVariationSettings: "'opsz' 96" }}
          >
            Four answers, on the page. Long versions are one click away.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border-y border-border">
          {facts.map((f) => (
            <article key={f.eyebrow} className="bg-background p-7 lg:p-8 flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-4">{f.eyebrow}</span>
              <h3
                className="font-display text-[19px] lg:text-[21px] leading-[1.25] tracking-[-0.015em] mb-4"
                style={{ fontVariationSettings: "'opsz' 80" }}
              >
                {f.title}
              </h3>
              <p className="text-[13.5px] leading-[1.7] text-foreground/75 flex-1">{f.body}</p>
              <Link
                href={f.href}
                className="mt-6 inline-flex items-center gap-2 text-[13px] text-foreground font-medium tracking-wide border-b border-brass pb-1 hover:border-foreground transition-colors self-start"
              >
                {f.cta}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
