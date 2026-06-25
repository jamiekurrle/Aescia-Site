'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/prep-aware-backfill'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'

// Self-contained translation lookup for /prep-aware-backfill. The shared i18n
// provider supplies the active locale; backfill.* keys live in
// lib/dictionaries/pages/prep-aware-backfill.ts and are resolved here with an
// English fallback, mirroring the provider's own fallback behaviour without
// editing lib/i18n.tsx.
function useBackfillT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useBackfillT()

  const loop: Array<[string, string]> = [
    [t('backfill.recovery.step1.title'), t('backfill.recovery.step1.desc')],
    [t('backfill.recovery.step2.title'), t('backfill.recovery.step2.desc')],
    [t('backfill.recovery.step3.title'), t('backfill.recovery.step3.desc')],
    [t('backfill.recovery.step4.title'), t('backfill.recovery.step4.desc')],
    [t('backfill.recovery.step5.title'), t('backfill.recovery.step5.desc')],
    [t('backfill.recovery.step6.title'), t('backfill.recovery.step6.desc')],
  ]

  const contrast: Array<{ generic: string; aescia: string }> = [
    { generic: t('backfill.table.row1.generic'), aescia: t('backfill.table.row1.aescia') },
    { generic: t('backfill.table.row2.generic'), aescia: t('backfill.table.row2.aescia') },
    { generic: t('backfill.table.row3.generic'), aescia: t('backfill.table.row3.aescia') },
    { generic: t('backfill.table.row4.generic'), aescia: t('backfill.table.row4.aescia') },
  ]

  return (
    <>
      {/* Hero — lead with the commercial recovery angle, keep the honest definition */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">
              {t('backfill.hero.eyebrow')}
            </span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('backfill.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
            {t('backfill.hero.lede')}
          </p>
          <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('backfill.hero.sub')}
          </p>
        </div>
      </section>

      {/* Why prep-blind fails */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('backfill.problem.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('backfill.problem.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('backfill.problem.p1')}
            </p>
            <p>
              {t('backfill.problem.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* The recovery loop */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">{t('backfill.recovery.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-6"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('backfill.recovery.title')}
          </h2>
          <p className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl mb-10">
            {t('backfill.recovery.intro')}
          </p>
          <ol className="divide-y divide-border border-y border-border bg-background">
            {loop.map(([k, v], i) => (
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
            {t('backfill.recovery.note.pre')}
            <Link href="/bowel-prep-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('backfill.recovery.note.link')}</Link>{t('backfill.recovery.note.post')}
          </p>
        </div>
      </section>

      {/* Eligibility + contrast table */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('backfill.eligibility.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('backfill.eligibility.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('backfill.eligibility.p1')}
            </p>
            <p>
              {t('backfill.eligibility.p2')}
            </p>
          </div>
          <div className="mt-10 overflow-x-auto border border-border">
            <table className="w-full border-collapse min-w-[560px] text-left">
              <caption className="sr-only">
                {t('backfill.table.caption')}
              </caption>
              <thead>
                <tr className="bg-secondary">
                  <th scope="col" className="p-4 lg:p-5 border-b border-border font-display text-[14px] lg:text-[15px] tracking-[-0.01em] text-foreground/80" style={{ fontVariationSettings: "'opsz' 48" }}>{t('backfill.table.head.generic')}</th>
                  <th scope="col" className="p-4 lg:p-5 border-b border-l border-border font-display text-[14px] lg:text-[15px] tracking-[-0.01em] text-foreground bg-accent/5" style={{ fontVariationSettings: "'opsz' 48" }}>{t('backfill.table.head.aescia')}</th>
                </tr>
              </thead>
              <tbody>
                {contrast.map((row) => (
                  <tr key={row.generic} className="align-top">
                    <td className="p-4 lg:p-5 border-b border-border text-[13.5px] leading-[1.55] text-foreground/80">{row.generic}</td>
                    <td className="p-4 lg:p-5 border-b border-l border-border text-[13.5px] leading-[1.55] text-foreground/90 bg-accent/5">{row.aescia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What one recovered slot is worth — sourced, hedge bound to the number */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">{t('backfill.worth.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('backfill.worth.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('backfill.worth.p1')}
            </p>
            <p className="text-[14px] text-foreground/70 border-l-2 border-brass/50 pl-4">
              {t('backfill.worth.p2.pre')}
              <Link href="/clinics#roi" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('backfill.worth.p2.link')}</Link>{t('backfill.worth.p2.post')}
            </p>
          </div>
        </div>
      </section>

      {/* Realistic ceiling — honesty */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('backfill.ceiling.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('backfill.ceiling.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('backfill.ceiling.p1')}
            </p>
            <p>
              {t('backfill.ceiling.p2')}
            </p>
          </div>
          <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('backfill.ceiling.links.pre')}
            <Link href="/compare" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('backfill.ceiling.links.compare')}</Link>{t('backfill.ceiling.links.mid')}
            <Link href="/asc-fit" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('backfill.ceiling.links.fit')}</Link>{t('backfill.ceiling.links.post')}
          </p>
        </div>
      </section>

      <AscEntityBlock />
      <AscPageCta line={t('backfill.cta.line')} />
    </>
  )
}
