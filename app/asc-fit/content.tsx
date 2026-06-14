'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/asc-fit'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'

// Self-contained translation lookup for /asc-fit. The shared i18n provider
// supplies the active locale; ascfit.* keys live in
// lib/dictionaries/pages/asc-fit.ts and are resolved here with an English
// fallback, mirroring the provider's own fallback behaviour without editing
// lib/i18n.tsx.
function useAscFitT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useAscFitT()

  const bestFit: Array<[string, string]> = [
    [t('ascfit.bestfit.item1.title'), t('ascfit.bestfit.item1.desc')],
    [t('ascfit.bestfit.item2.title'), t('ascfit.bestfit.item2.desc')],
    [t('ascfit.bestfit.item3.title'), t('ascfit.bestfit.item3.desc')],
    [t('ascfit.bestfit.item4.title'), t('ascfit.bestfit.item4.desc')],
    [t('ascfit.bestfit.item5.title'), t('ascfit.bestfit.item5.desc')],
  ]

  const notFit: Array<[string, string]> = [
    [t('ascfit.notfit.item1.title'), t('ascfit.notfit.item1.desc')],
    [t('ascfit.notfit.item2.title'), t('ascfit.notfit.item2.desc')],
    [t('ascfit.notfit.item3.title'), t('ascfit.notfit.item3.desc')],
    [t('ascfit.notfit.item4.title'), t('ascfit.notfit.item4.desc')],
    [t('ascfit.notfit.item5.title'), t('ascfit.notfit.item5.desc')],
  ]

  const instead: Array<[string, string]> = [
    [t('ascfit.instead.item1.title'), t('ascfit.instead.item1.desc')],
    [t('ascfit.instead.item2.title'), t('ascfit.instead.item2.desc')],
    [t('ascfit.instead.item3.title'), t('ascfit.instead.item3.desc')],
    [t('ascfit.instead.item4.title'), t('ascfit.instead.item4.desc')],
  ]

  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              {t('ascfit.hero.eyebrow')}
            </span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('ascfit.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
            {t('ascfit.hero.lede')}
          </p>
          <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('ascfit.hero.scoping')}
          </p>
        </div>
      </section>

      {/* Best fit / not fit, two columns */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border-y border-border">
          {/* Best fit */}
          <div className="bg-background p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('ascfit.bestfit.eyebrow')}</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <ul className="space-y-5 list-none">
              {bestFit.map(([k, v]) => (
                <li key={k} className="grid grid-cols-[22px_1fr] gap-3">
                  <span className="text-accent font-display text-[18px] leading-none pt-0.5" aria-hidden="true">+</span>
                  <div>
                    <div className="text-[15px] text-foreground font-medium mb-1">{k}</div>
                    <div className="text-[13.5px] leading-[1.6] text-foreground/75">{v}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Not fit */}
          <div className="bg-background p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('ascfit.notfit.eyebrow')}</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <ul className="space-y-5 list-none">
              {notFit.map(([k, v]) => (
                <li key={k} className="grid grid-cols-[22px_1fr] gap-3">
                  <span className="text-brass font-display text-[18px] leading-none pt-0.5" aria-hidden="true">&minus;</span>
                  <div>
                    <div className="text-[15px] text-foreground font-medium mb-1">{k}</div>
                    <div className="text-[13.5px] leading-[1.6] text-foreground/75">{v}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Adjacent options */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('ascfit.instead.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('ascfit.instead.title')}
          </h2>
          <ul className="divide-y divide-border border-y border-border">
            {instead.map(([k, v]) => (
              <li key={k} className="py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-2 lg:gap-10">
                <span className="text-[15px] text-foreground font-medium">{k}</span>
                <span className="text-[14.5px] leading-[1.65] text-foreground/80">{v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('ascfit.instead.compare.pre')}{' '}
            <Link href="/compare" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('ascfit.instead.compare.link')}</Link>{t('ascfit.instead.compare.post')}
          </p>
        </div>
      </section>

      <AscEntityBlock />
      <AscPageCta line={t('ascfit.cta.line')} />
    </>
  )
}
