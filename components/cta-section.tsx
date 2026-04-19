'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function CTASection() {
  const { t } = useI18n()

  return (
    <section className="relative bg-foreground text-background py-28 lg:py-36 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% 100%, oklch(0.47 0.06 175 / 0.45), transparent 60%), radial-gradient(ellipse 80% 50% at 70% 0%, oklch(0.73 0.09 80 / 0.18), transparent 60%)',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2
          className="font-display text-[38px] lg:text-[56px] leading-[1.05] tracking-[-0.03em] mb-6"
          style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}
        >
          {t('cta.title')}
        </h2>
        <p className="text-[16px] lg:text-[18px] leading-[1.6] text-background/70 mb-12 max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-background text-foreground font-medium px-8 py-4 text-[14px] tracking-wide hover:bg-background/90 transition-colors"
        >
          {t('cta.button')}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
