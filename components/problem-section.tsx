'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function ProblemSection() {
  const { t } = useI18n()

  return (
    <section className="relative bg-background text-foreground py-28 lg:py-40">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <h2
          className="font-display text-[34px] lg:text-[48px] leading-[1.08] tracking-[-0.02em] font-normal"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {t('home.problem.title')}
        </h2>
        <p className="mt-10 text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80">
          {t('home.problem.before')}
        </p>
        <p className="mt-6 text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80">
          {t('home.problem.after')}
        </p>
        <p
          className="mt-16 lg:mt-20 font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.02em] text-primary"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {t('home.problem.tagline')}
        </p>
        <Link
          href="/contact"
          className="mt-12 inline-flex items-center gap-3 bg-foreground text-background font-medium px-8 py-4 text-[14px] tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
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
