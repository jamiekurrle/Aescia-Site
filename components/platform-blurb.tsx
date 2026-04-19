'use client'

import { useI18n } from '@/lib/i18n'

export function PlatformBlurb() {
  const { t } = useI18n()

  const pills = [
    t('platform.pill.collect'),
    t('platform.pill.follow'),
    t('platform.pill.remind'),
    t('platform.pill.educate'),
  ]

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('platform.eyebrow')}</span>
          </div>
          <h2
            className="font-display text-[34px] lg:text-[44px] leading-[1.08] tracking-[-0.025em]"
            style={{ fontVariationSettings: "'opsz' 120, 'SOFT' 30" }}
          >
            {t('platform.title')}
          </h2>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-[16px] lg:text-[18px] leading-[1.7] text-foreground/75 max-w-2xl">
            {t('platform.body')}
          </p>
          <div className="mt-12 flex flex-wrap gap-2">
            {pills.map((pill, i) => (
              <div
                key={pill}
                className="inline-flex items-center gap-2 border border-border rounded-none px-3.5 py-2 bg-background"
              >
                <span className="font-mono text-[10px] text-foreground/40">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-sans text-[13px] text-foreground tracking-wide">{pill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
