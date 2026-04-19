'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function EditorialHero() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-foreground text-background min-h-[100vh] flex items-end">
      {/* Abstract cardiac-surface topography background, pure CSS.
          Radial + conic gradients read as an observation surface without a claim. */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background: [
            'radial-gradient(ellipse 140% 80% at 30% 120%, oklch(0.47 0.06 175 / 0.55), transparent 60%)',
            'radial-gradient(ellipse 90% 60% at 85% 15%, oklch(0.73 0.09 80 / 0.22), transparent 55%)',
            'radial-gradient(ellipse 120% 70% at 50% 50%, oklch(0.35 0.04 200 / 0.4), transparent 70%)',
          ].join(', '),
        }}
      />
      {/* Fine horizontal line work for scientific surface texture */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, oklch(0.96 0.01 85) 3px, oklch(0.96 0.01 85) 3.5px)',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 60%, #000 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 60%, #000 40%, transparent 90%)',
        }}
      />
      {/* Contour wave, subtle */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full opacity-[0.35]"
        height="220"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="contour" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="oklch(0.47 0.06 175)" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="oklch(0.73 0.09 80)" stopOpacity="0.9" />
            <stop offset="1" stopColor="oklch(0.47 0.06 175)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M 0 ${180 - i * 18} C 360 ${150 - i * 14} 720 ${210 - i * 12} 1080 ${170 - i * 16} S 1440 ${160 - i * 18} 1440 ${160 - i * 18}`}
            fill="none"
            stroke="url(#contour)"
            strokeWidth={0.75}
          />
        ))}
      </svg>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24 lg:pt-48 lg:pb-28">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('hero.eyebrow')}</span>
            <span className="h-px w-10 bg-brass/50" />
          </div>

          <h1
            className="font-display text-[44px] sm:text-[58px] lg:text-[78px] leading-[1.02] tracking-[-0.03em] text-background font-normal"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}
          >
            {t('hero.title')}
          </h1>

          <p className="mt-10 max-w-2xl text-[17px] lg:text-[19px] leading-[1.65] text-background/75 font-sans">
            {t('hero.subtitle')}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
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
        </div>

        <div className="hidden lg:flex absolute right-10 bottom-24 flex-col items-end gap-1.5 text-right">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/75">{t('hero.trial.label')}</span>
          <span className="font-mono text-[13px] text-brass tracking-wide">ACTRN12625001425482</span>
          <span className="text-[12px] text-background/80">{t('hero.trial.brief')}</span>
          <span className="text-[11px] text-background/65 mt-1">{t('hero.trial.site')}</span>
        </div>
      </div>
    </section>
  )
}
