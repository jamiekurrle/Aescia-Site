'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/glp1-endoscopy-prep'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'

// Self-contained translation lookup for /glp1-endoscopy-prep. The shared i18n
// provider supplies the active locale; glp1.* keys live in
// lib/dictionaries/pages/glp1-endoscopy-prep.ts and are resolved here with an
// English fallback, mirroring the provider's own fallback behaviour without
// editing lib/i18n.tsx.
function useGlp1T() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useGlp1T()

  const steps: Array<[string, string]> = [
    [t('glp1.steps.item1.title'), t('glp1.steps.item1.desc')],
    [t('glp1.steps.item2.title'), t('glp1.steps.item2.desc')],
    [t('glp1.steps.item3.title'), t('glp1.steps.item3.desc')],
    [t('glp1.steps.item4.title'), t('glp1.steps.item4.desc')],
  ]

  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              {t('glp1.hero.eyebrow')}
            </span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('glp1.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
            {t('glp1.hero.lede')}
          </p>
          <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('glp1.hero.disclaimer')}
          </p>
        </div>
      </section>

      {/* Why GLP-1 matters for endoscopy */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('glp1.why.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('glp1.why.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('glp1.why.para1')}
            </p>
            <p>
              {t('glp1.why.para2')}
            </p>
            <p>
              {t('glp1.why.para3')}
            </p>
          </div>
        </div>
      </section>

      {/* What Aescia does */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('glp1.does.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('glp1.does.title')}
          </h2>
          <ol className="divide-y divide-border border-y border-border bg-background">
            {steps.map(([k, v], i) => (
              <li key={k} className="py-7 px-5 lg:px-8 grid grid-cols-[44px_1fr] gap-4 lg:gap-8 items-start">
                <span className="font-mono text-[12px] text-brass tracking-widest pt-1">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="font-display text-[18px] lg:text-[20px] leading-[1.25] tracking-[-0.015em] text-foreground mb-2" style={{ fontVariationSettings: "'opsz' 72" }}>{k}</div>
                  <div className="text-[14.5px] lg:text-[15px] leading-[1.65] text-foreground/80 max-w-2xl">{v}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Honest ceiling */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('glp1.scope.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('glp1.scope.title')}
          </h2>
          <ul className="space-y-4 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl list-none">
            <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>{t('glp1.scope.item1')}</span></li>
            <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>{t('glp1.scope.item2')}</span></li>
            <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>{t('glp1.scope.item3')}</span></li>
          </ul>
          <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('glp1.related.pre')}{' '}
            <Link href="/medication-management-before-endoscopy" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('glp1.related.link1')}</Link>,{' '}
            <Link href="/bowel-prep-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('glp1.related.link2')}</Link>{t('glp1.related.mid')}{' '}
            <Link href="/colonoscopy-no-show-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('glp1.related.link3')}</Link>{t('glp1.related.post')}
          </p>
        </div>
      </section>

      <AscEntityBlock />
      <AscPageCta line={t('glp1.cta.line')} />
    </>
  )
}
