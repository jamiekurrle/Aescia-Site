'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { HeroDiagram } from './hero-diagram'

export function EditorialHero() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-foreground text-background pt-28 lg:pt-32 pb-32 lg:pb-44">
      {/* Calm static gradient. Single layer. No overlays fighting each other. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 140% 80% at 30% 120%, oklch(0.47 0.06 175 / 0.32), transparent 60%)',
            'radial-gradient(ellipse 90% 60% at 85% 15%, oklch(0.73 0.09 80 / 0.08), transparent 55%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[calc(100vh-240px)] lg:min-h-[calc(100vh-220px)]">
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

          <p className="mt-8 lg:mt-10 max-w-xl text-[17px] lg:text-[19px] leading-[1.6] text-background/85 font-sans">
            {t('hero.subtitle')}
          </p>

          <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
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
              className="inline-flex items-center text-[14px] text-background/80 hover:text-background tracking-wide transition-colors group"
            >
              {t('hero.cta.secondary')}
              <svg className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </div>

          <div className="mt-16 lg:mt-24 flex flex-wrap items-center gap-x-6 gap-y-1 text-background/75">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/60">{t('hero.trial.label')}</span>
            <a
              href="https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482"
              target="_blank"
              rel="noopener"
              className="font-mono text-[12px] text-brass hover:text-background tracking-wide underline decoration-brass/40 underline-offset-4 hover:decoration-background/80 transition-colors"
              aria-label="View SAFE-Discharge trial registration on ANZCTR (opens in a new window)"
            >
              ACTRN12625001425482
            </a>
            <span className="text-[12px] text-background/75">{t('hero.trial.brief')}</span>
            <span className="text-[11px] text-background/55">{t('hero.trial.site')}</span>
          </div>
        </div>

        <div className="lg:col-span-5 pt-4 lg:pt-0">
          <HeroDiagram />
        </div>
      </div>
    </section>
  )
}
