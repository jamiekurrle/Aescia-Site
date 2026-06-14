'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/faq'

// Self-contained translation lookup for /faq. The shared i18n provider supplies
// the active locale; faq.* keys live in lib/dictionaries/pages/faq.ts and are
// resolved here with an English fallback, mirroring the provider's own fallback
// behaviour without editing lib/i18n.tsx.
function useFaqT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

// Section key prefixes in display order. Each section has an eyebrow key plus a
// run of question keys; the JSON-LD schema (built in page.tsx) carries the same
// English Q&A content for retrieval-augmented LLMs.
const SECTIONS: { eyebrow: string; items: string[] }[] = [
  { eyebrow: 'faq.company.eyebrow', items: ['faq.company.q1', 'faq.company.q2', 'faq.company.q3', 'faq.company.q4', 'faq.company.q5'] },
  { eyebrow: 'faq.products.eyebrow', items: ['faq.products.q1', 'faq.products.q2', 'faq.products.q3', 'faq.products.q4'] },
  { eyebrow: 'faq.regulatory.eyebrow', items: ['faq.regulatory.q1', 'faq.regulatory.q2', 'faq.regulatory.q3', 'faq.regulatory.q4', 'faq.regulatory.q5'] },
  { eyebrow: 'faq.buying.eyebrow', items: ['faq.buying.q1', 'faq.buying.q2', 'faq.buying.q3', 'faq.buying.q4', 'faq.buying.q5'] },
  { eyebrow: 'faq.endoscopy.eyebrow', items: ['faq.endoscopy.q1', 'faq.endoscopy.q2', 'faq.endoscopy.q3', 'faq.endoscopy.q4', 'faq.endoscopy.q5', 'faq.endoscopy.q6'] },
  { eyebrow: 'faq.diligence.eyebrow', items: ['faq.diligence.q1', 'faq.diligence.q2', 'faq.diligence.q3', 'faq.diligence.q4', 'faq.diligence.q5'] },
]

export function PageContent() {
  const t = useFaqT()
  return (
    <main id="main" className="bg-background min-h-screen">
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('faq.eyebrow')}</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('faq.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
            {t('faq.hero.intro')}
          </p>
        </div>
      </section>

      {SECTIONS.map((section, sIdx) => (
        <section key={section.eyebrow} className={`py-20 lg:py-24 px-6 lg:px-10 ${sIdx % 2 === 1 ? 'bg-secondary' : ''}`}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t(section.eyebrow)}</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <dl className="divide-y divide-border border-y border-border">
              {section.items.map((it) => (
                <div key={it} className="py-8 lg:py-10 grid lg:grid-cols-[280px_1fr] gap-4 lg:gap-12">
                  <dt
                    className="font-display text-[20px] lg:text-[24px] leading-[1.25] tracking-[-0.018em] text-foreground"
                    style={{ fontVariationSettings: "'opsz' 80" }}
                  >
                    {t(`${it}.q`)}
                  </dt>
                  <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">{t(`${it}.a`)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ))}

      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
          <p className="text-[15px] text-foreground/80 flex-1">{t('faq.cta.text')}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
          >
            {t('faq.cta.button')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
