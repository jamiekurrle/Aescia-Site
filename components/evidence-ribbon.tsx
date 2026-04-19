'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function EvidenceRibbon() {
  const { t } = useI18n()

  const facts = [
    { value: t('evidence.fact1.value'), label: t('evidence.fact1.label'), mono: true },
    { value: t('evidence.fact2.value'), label: t('evidence.fact2.label'), mono: false },
    { value: t('evidence.fact3.value'), label: t('evidence.fact3.label'), mono: false },
  ]

  return (
    <section className="bg-background py-24 lg:py-32 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('evidence.eyebrow')}</span>
          </div>
          <h2
            className="font-display text-[34px] lg:text-[46px] leading-[1.08] tracking-[-0.025em] mb-8"
            style={{ fontVariationSettings: "'opsz' 120, 'SOFT' 30" }}
          >
            {t('evidence.title')}
          </h2>
          <p className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/75">
            {t('evidence.body')}
          </p>
          <Link
            href="/evidence"
            className="inline-flex items-center gap-2.5 mt-10 text-[13px] text-foreground font-medium tracking-wide border-b border-brass pb-1.5 hover:border-foreground transition-colors"
          >
            {t('evidence.cta')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="grid gap-0">
            {facts.map((fact, i) => (
              <div
                key={i}
                className={`py-8 lg:py-10 grid grid-cols-[auto_1fr] gap-8 items-baseline ${
                  i > 0 ? 'border-t border-border' : ''
                }`}
              >
                <span
                  className={`${
                    fact.mono ? 'font-mono text-[18px] lg:text-[21px]' : 'font-display text-[40px] lg:text-[56px]'
                  } text-foreground tracking-tight leading-none`}
                  style={
                    !fact.mono
                      ? { fontVariationSettings: "'opsz' 144, 'SOFT' 30" }
                      : undefined
                  }
                >
                  {fact.value}
                </span>
                <span className="text-[12px] lg:text-[13px] uppercase tracking-[0.18em] text-foreground/55 font-sans">
                  {fact.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
