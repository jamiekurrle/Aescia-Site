'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function CTASection() {
  const { t } = useI18n()

  return (
    <section className="relative bg-foreground text-background py-32 lg:py-44 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 70% at 50% 100%, oklch(0.47 0.06 175 / 0.28), transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2
          className="font-display text-[38px] lg:text-[56px] leading-[1.05] tracking-[-0.03em] mb-8"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {t('cta.title')}
        </h2>
        <p className="text-[16px] lg:text-[18px] leading-[1.6] text-background/75 mb-14 max-w-xl mx-auto">
          {t('cta.subtitle')}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-background text-foreground font-medium px-8 py-4 text-[14px] tracking-wide hover:bg-background/90 transition-colors"
        >
          {t('cta.button')}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
