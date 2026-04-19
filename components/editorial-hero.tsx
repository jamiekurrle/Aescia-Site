'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { HeroDiagram } from './hero-diagram'

export function EditorialHero() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-foreground text-background pt-28 lg:pt-32 pb-20 lg:pb-24">
      {/* Abstract cardiac-surface topography background */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background: [
            'radial-gradient(ellipse 140% 80% at 30% 120%, oklch(0.47 0.06 175 / 0.55), transparent 60%)',
            'radial-gradient(ellipse 90% 60% at 85% 15%, oklch(0.73 0.09 80 / 0.18), transparent 55%)',
            'radial-gradient(ellipse 120% 70% at 50% 50%, oklch(0.35 0.04 200 / 0.4), transparent 70%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />
      {/* Fine horizontal line work */}
      <div
        className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, oklch(0.96 0.01 85) 3px, oklch(0.96 0.01 85) 3.5px)',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 60%, #000 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 60%, #000 40%, transparent 90%)',
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[calc(100vh-200px)] lg:min-h-[calc(100vh-180px)]">
        <div className="lg:col-span-7 pt-8 lg:pt-12">
          <div className="flex items-center gap-4 mb-8 lg:mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('hero.eyebrow')}</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>

          <h1
            className="font-display text-[40px] sm:text-[54px] lg:text-[68px] xl:text-[76px] leading-[1.03] tracking-[-0.03em] text-background font-normal"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('hero.title')}
          </h1>

          <p className="mt-8 lg:mt-10 max-w-2xl text-[17px] lg:text-[19px] leading-[1.65] text-background/85 font-sans">
            {t('hero.subtitle')}
          </p>

          <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-3">
            <Link
              href="/platform"
              className="inline-flex items-center justify-center bg-background text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-background/90 transition-colors min-h-[44px]"
            >
              {t('hero.cta.primary')}
              <svg className="w-3.5 h-3.5 ml-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-transparent text-background border border-background/40 px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-background/5 transition-colors min-h-[44px]"
            >
              {t('hero.cta.secondary')}
            </Link>
          </div>

          <div className="mt-14 lg:mt-20 flex flex-wrap items-center gap-x-6 gap-y-1 text-background/75">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/70">{t('hero.trial.label')}</span>
            <span className="font-mono text-[12px] text-brass tracking-wide">ACTRN12625001425482</span>
            <span className="text-[12px] text-background/75">{t('hero.trial.brief')}</span>
            <span className="text-[11px] text-background/60">{t('hero.trial.site')}</span>
          </div>
        </div>

        <div className="lg:col-span-5 pt-4 lg:pt-0">
          <HeroDiagram />
        </div>
      </div>
    </section>
  )
}
