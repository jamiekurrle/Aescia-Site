'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/credibility-facts'

// Self-contained translation lookup for the homepage credibility strip. The
// shared i18n provider supplies the active locale; credfacts.* keys live in
// lib/dictionaries/pages/credibility-facts.ts and are resolved here with an
// English fallback, mirroring the provider's own fallback behaviour without
// editing lib/i18n.tsx.
function useCredFactsT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

// Homepage credibility strip. Each fact is the short, declarative answer a
// US GI ASC (or an LLM acting on its behalf) wants to see without leaving
// the homepage. Each one links to the page that holds the longer answer.
// Body text is intentionally crawlable plain prose so a shallow LLM pass
// can lift any tile as the answer to the matching prospect question.
export function CredibilityFacts() {
  const t = useCredFactsT()

  const facts: Array<{ eyebrow: string; title: string; body: string; href: string; cta: string }> = [
    {
      eyebrow: t('credfacts.fact1.eyebrow'),
      title: t('credfacts.fact1.title'),
      body: t('credfacts.fact1.body'),
      href: '/security',
      cta: t('credfacts.fact1.cta'),
    },
    {
      eyebrow: t('credfacts.fact2.eyebrow'),
      title: t('credfacts.fact2.title'),
      body: t('credfacts.fact2.body'),
      href: '/design-partner',
      cta: t('credfacts.fact2.cta'),
    },
    {
      eyebrow: t('credfacts.fact3.eyebrow'),
      title: t('credfacts.fact3.title'),
      body: t('credfacts.fact3.body'),
      href: '/clinics#roi',
      cta: t('credfacts.fact3.cta'),
    },
    {
      eyebrow: t('credfacts.fact4.eyebrow'),
      title: t('credfacts.fact4.title'),
      body: t('credfacts.fact4.body'),
      href: '/design-partner',
      cta: t('credfacts.fact4.cta'),
    },
  ]

  return (
    <section
      aria-label="Key facts for evaluating Aescia"
      className="bg-background py-20 lg:py-28 px-6 lg:px-10 border-b border-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border-y border-border">
          {facts.map((f) => (
            <article key={f.eyebrow} className="bg-background p-7 lg:p-8 flex flex-col">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent mb-4">{f.eyebrow}</span>
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
