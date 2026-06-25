'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/medication-management-before-endoscopy'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'

// Self-contained translation lookup for /medication-management-before-endoscopy.
// The shared i18n provider supplies the active locale; medmgmt.* keys live in
// lib/dictionaries/pages/medication-management-before-endoscopy.ts and are
// resolved here with an English fallback, mirroring the provider's own fallback
// behaviour without editing lib/i18n.tsx.
function useMedmgmtT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useMedmgmtT()

  const bloodThinners: Array<[string, string]> = [
    [t('medmgmt.bt.warfarin.k'), t('medmgmt.bt.warfarin.v')],
    [t('medmgmt.bt.doac.k'), t('medmgmt.bt.doac.v')],
    [t('medmgmt.bt.aspirin.k'), t('medmgmt.bt.aspirin.v')],
    [t('medmgmt.bt.p2y12.k'), t('medmgmt.bt.p2y12.v')],
  ]

  const diabetes: Array<[string, string]> = [
    [t('medmgmt.dm.sulfonylureas.k'), t('medmgmt.dm.sulfonylureas.v')],
    [t('medmgmt.dm.sglt2.k'), t('medmgmt.dm.sglt2.v')],
    [t('medmgmt.dm.insulin.k'), t('medmgmt.dm.insulin.v')],
    [t('medmgmt.dm.metformin.k'), t('medmgmt.dm.metformin.v')],
  ]

  const steps: Array<[string, string]> = [
    [t('medmgmt.does.item1.title'), t('medmgmt.does.item1.desc')],
    [t('medmgmt.does.item2.title'), t('medmgmt.does.item2.desc')],
    [t('medmgmt.does.item3.title'), t('medmgmt.does.item3.desc')],
    [t('medmgmt.does.item4.title'), t('medmgmt.does.item4.desc')],
  ]

  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">
              {t('medmgmt.hero.eyebrow')}
            </span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('medmgmt.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
            {t('medmgmt.hero.lede')}
          </p>
          <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('medmgmt.hero.disclaimer')}
          </p>
        </div>
      </section>

      {/* Blood thinners */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('medmgmt.bt.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('medmgmt.bt.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('medmgmt.bt.intro')}
            </p>
            <ul className="space-y-3 list-none border-y border-border divide-y divide-border">
              {bloodThinners.map(([k, v]) => (
                <li key={k} className="py-4 grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-6">
                  <span className="font-display text-[16px] text-foreground" style={{ fontVariationSettings: "'opsz' 64" }}>{k}</span>
                  <span className="text-[14.5px] leading-[1.65] text-foreground/80">{v}</span>
                </li>
              ))}
            </ul>
            <p>
              {t('medmgmt.bt.outro')}
            </p>
          </div>
        </div>
      </section>

      {/* Diabetes */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">{t('medmgmt.dm.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('medmgmt.dm.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('medmgmt.dm.intro')}
            </p>
            <ul className="space-y-3 list-none border-y border-border divide-y divide-border">
              {diabetes.map(([k, v]) => (
                <li key={k} className="py-4 grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-6">
                  <span className="font-display text-[16px] text-foreground" style={{ fontVariationSettings: "'opsz' 64" }}>{k}</span>
                  <span className="text-[14.5px] leading-[1.65] text-foreground/80">{v}</span>
                </li>
              ))}
            </ul>
            <p>
              {t('medmgmt.dm.outro.pre')}{' '}
              <Link href="/glp1-endoscopy-prep" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('medmgmt.dm.outro.link')}</Link>{t('medmgmt.dm.outro.post')}
            </p>
          </div>
        </div>
      </section>

      {/* What Aescia does */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('medmgmt.does.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('medmgmt.does.title')}
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
          <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('medmgmt.does.footnote')}
          </p>
        </div>
      </section>

      <AscEntityBlock />
      <AscPageCta line={t('medmgmt.cta.line')} />
    </>
  )
}
