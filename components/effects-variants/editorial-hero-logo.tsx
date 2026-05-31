'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useI18n } from '@/lib/i18n'
import { HeroDiagram } from '@/components/hero-diagram'

const LiquidLogo = dynamic(() => import('@/components/liquid-logo/liquid-logo').then((m) => m.LiquidLogo), {
  ssr: false,
  loading: () => null,
})

/**
 * Editorial hero where the liquid-metal shader paints the ENTIRE background.
 *
 * The shader is fed a solid rounded-square mask (`/liquid-bg-mask.svg`) instead
 * of the AE strokes, so the chromatic stripes fill the whole hero rather than
 * a tiny brand mark. The hero sits on Stone (#F4F6FA) instead of Ink so the
 * silver/chrome pools read as bright iridescence, not a cave.
 */
export function EditorialHeroLogo() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-background text-foreground pt-28 lg:pt-32 pb-32 lg:pb-44">
      {/* Full-bleed liquid metal — the actual hero background. */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <LiquidLogo
          src="/liquid-bg-mask.svg"
          params={{
            patternScale: 2.2,
            refraction: 0.012,
            edge: 0.25,
            patternBlur: 0.005,
            liquid: 0.06,
            speed: 0.22,
          }}
          className="block w-full h-full object-cover"
        />
      </div>

      {/* Soft cream wash + brass kiss to warm the silver, plus a fade at
          bottom so type sits cleanly without competing with the shader. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 110% 70% at 20% 10%, oklch(0.97 0.02 80 / 0.55), transparent 55%)',
            'radial-gradient(ellipse 80% 50% at 90% 0%, oklch(0.85 0.07 70 / 0.18), transparent 60%)',
            'linear-gradient(180deg, transparent 40%, oklch(0.97 0.005 85 / 0.55) 100%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[calc(100vh-240px)] lg:min-h-[calc(100vh-220px)]">
        <div className="lg:col-span-7 pt-8 lg:pt-12">
          <div className="flex items-center gap-4 mb-8 lg:mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
              {t('hero.eyebrow')}
            </span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>

          <h1
            className="font-display text-[40px] sm:text-[54px] lg:text-[68px] xl:text-[76px] leading-[1.03] tracking-[-0.03em] text-foreground font-normal"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('hero.title')}
          </h1>

          <p className="mt-8 lg:mt-10 max-w-xl text-[17px] lg:text-[19px] leading-[1.6] text-foreground/80 font-sans">
            {t('hero.subtitle')}
          </p>

          <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <Link
              href="/platform"
              className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
            >
              {t('hero.cta.primary')}
              <svg className="w-3.5 h-3.5 ml-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center text-[14px] text-foreground/75 hover:text-foreground tracking-wide transition-colors group"
            >
              {t('hero.cta.secondary')}
              <svg className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </div>

          <div className="mt-16 lg:mt-24 flex flex-wrap items-center gap-x-6 gap-y-1 text-foreground/70">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55">
              {t('hero.trial.label')}
            </span>
            <a
              href="https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482"
              target="_blank"
              rel="noopener"
              className="font-mono text-[12px] text-brass hover:text-foreground tracking-wide underline decoration-brass/40 underline-offset-4 hover:decoration-foreground/80 transition-colors"
            >
              ACTRN12625001425482
            </a>
            <span className="text-[12px] text-foreground/70">{t('hero.trial.brief')}</span>
            <span className="text-[11px] text-foreground/50">{t('hero.trial.site')}</span>
          </div>
        </div>

        <div className="lg:col-span-5 pt-4 lg:pt-0">
          {/* Trust diagram stays on the right; its own stroke colours read
              fine over the silver liquid background. */}
          <HeroDiagram />
        </div>
      </div>
    </section>
  )
}
