'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/security'

function useSecurityT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

const paragraphs = ['security.body.p1', 'security.body.p2', 'security.body.p3']

export function PageContent() {
  const t = useSecurityT()
  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <h1
          className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-10"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {t('security.hero.title')}
        </h1>
        <div className="space-y-6">
          {paragraphs.map((key) => (
            <p key={key} className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/85">
              {t(key)}
            </p>
          ))}
        </div>
        <div className="mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
          >
            {t('security.cta.button')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
