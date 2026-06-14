'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/bowel-prep-software'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'

// Self-contained translation lookup for /bowel-prep-software. The shared i18n
// provider supplies the active locale; bowelprep.* keys live in
// lib/dictionaries/pages/bowel-prep-software.ts and are resolved here with an
// English fallback, mirroring the provider's own fallback behaviour without
// editing lib/i18n.tsx.
function useBowelPrepT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useBowelPrepT()

  const pathwaySteps: Array<[string, string]> = [
    [t('bowelprep.changes.item1.title'), t('bowelprep.changes.item1.desc')],
    [t('bowelprep.changes.item2.title'), t('bowelprep.changes.item2.desc')],
    [t('bowelprep.changes.item3.title'), t('bowelprep.changes.item3.desc')],
    [t('bowelprep.changes.item4.title'), t('bowelprep.changes.item4.desc')],
    [t('bowelprep.changes.item5.title'), t('bowelprep.changes.item5.desc')],
  ]

  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              {t('bowelprep.hero.eyebrow')}
            </span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('bowelprep.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
            {t('bowelprep.hero.lede')}
          </p>
          <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('bowelprep.hero.disclaimer')}
          </p>
        </div>
      </section>

      {/* The problem, sourced */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('bowelprep.problem.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('bowelprep.problem.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('bowelprep.problem.p1')}
            </p>
            <p>
              {t('bowelprep.problem.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* What a structured pathway does */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('bowelprep.changes.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('bowelprep.changes.title')}
          </h2>
          <ol className="divide-y divide-border border-y border-border bg-background">
            {pathwaySteps.map(([k, v], i) => (
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

      {/* Realistic ceiling */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('bowelprep.ceiling.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('bowelprep.ceiling.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('bowelprep.ceiling.p1')}
            </p>
            <p>
              {t('bowelprep.ceiling.p2.pre')}{' '}
              <Link href="/clinics#roi" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('bowelprep.ceiling.p2.link')}</Link>{' '}
              {t('bowelprep.ceiling.p2.post')}
            </p>
          </div>
          <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('bowelprep.related.pre')}{' '}
            <Link href="/colonoscopy-no-show-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('bowelprep.related.link1')}</Link>,{' '}
            <Link href="/prep-aware-backfill" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('bowelprep.related.link2')}</Link>, {t('bowelprep.related.mid')}{' '}
            <Link href="/endoscopy-pre-procedure-workflow" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('bowelprep.related.link3')}</Link>.
          </p>
        </div>
      </section>

      <AscEntityBlock />
      <AscPageCta line={t('bowelprep.cta.line')} />
    </>
  )
}
