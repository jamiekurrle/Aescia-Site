'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/integrations'

// Self-contained translation lookup for /integrations. The shared i18n provider
// supplies the active locale; integrations.* keys live in
// lib/dictionaries/pages/integrations.ts and are resolved here with an English
// fallback, mirroring the provider's own fallback behaviour without editing
// lib/i18n.tsx.
function useIntegrationsT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

const APPROACH_ITEMS: { term: string; desc: string }[] = [
  { term: 'integrations.approach.item1.term', desc: 'integrations.approach.item1.desc' },
  { term: 'integrations.approach.item2.term', desc: 'integrations.approach.item2.desc' },
  { term: 'integrations.approach.item3.term', desc: 'integrations.approach.item3.desc' },
  { term: 'integrations.approach.item4.term', desc: 'integrations.approach.item4.desc' },
]

export function PageContent() {
  const t = useIntegrationsT()
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('integrations.hero.eyebrow')}</span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('integrations.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
            {t('integrations.hero.body')}
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('integrations.approach.eyebrow')}</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <dl className="divide-y divide-border border-y border-border">
            {APPROACH_ITEMS.map(({ term, desc }) => (
              <div key={term} className="py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-3 lg:gap-12">
                <dt
                  className="font-display text-[19px] lg:text-[24px] leading-[1.25] tracking-[-0.018em] text-foreground"
                  style={{ fontVariationSettings: "'opsz' 80" }}
                >
                  {t(term)}
                </dt>
                <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">{t(desc)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
          <p className="text-[15px] text-foreground/80 flex-1">{t('integrations.cta.body')}</p>
          <Link
            href="/contact?intent=integrations"
            className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
          >
            {t('integrations.cta.button')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
