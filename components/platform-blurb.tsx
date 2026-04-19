'use client'

import { useI18n } from '@/lib/i18n'
import { ExplodedEngine } from './exploded-engine'

export function PlatformBlurb() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-16 mb-20 lg:mb-28">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('platform.eyebrow')}</span>
            </div>
            <h2
              className="font-display text-[34px] lg:text-[46px] leading-[1.08] tracking-[-0.025em]"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              {t('platform.title')}
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[16px] lg:text-[18px] leading-[1.7] text-foreground/80 max-w-2xl">
              {t('platform.body')}
            </p>
          </div>
        </div>

        <ExplodedEngine />
      </div>
    </section>
  )
}
