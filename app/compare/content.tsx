'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/compare'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'

// Self-contained translation lookup for /compare. The shared i18n provider
// supplies the active locale; compare.* keys live in
// lib/dictionaries/pages/compare.ts and are resolved here with an English
// fallback, mirroring the provider's own fallback behaviour without editing
// lib/i18n.tsx.
function useCompareT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

type Row = {
  capability: string
  aescia: string
  engagement: string
  texting: string
  block: string
}

export function PageContent() {
  const t = useCompareT()

  const rows: Row[] = [
    {
      capability: t('compare.row1.capability'),
      aescia: t('compare.row1.aescia'),
      engagement: t('compare.row1.engagement'),
      texting: t('compare.row1.texting'),
      block: t('compare.row1.block'),
    },
    {
      capability: t('compare.row2.capability'),
      aescia: t('compare.row2.aescia'),
      engagement: t('compare.row2.engagement'),
      texting: t('compare.row2.texting'),
      block: t('compare.row2.block'),
    },
    {
      capability: t('compare.row3.capability'),
      aescia: t('compare.row3.aescia'),
      engagement: t('compare.row3.engagement'),
      texting: t('compare.row3.texting'),
      block: t('compare.row3.block'),
    },
    {
      capability: t('compare.row4.capability'),
      aescia: t('compare.row4.aescia'),
      engagement: t('compare.row4.engagement'),
      texting: t('compare.row4.texting'),
      block: t('compare.row4.block'),
    },
    {
      capability: t('compare.row5.capability'),
      aescia: t('compare.row5.aescia'),
      engagement: t('compare.row5.engagement'),
      texting: t('compare.row5.texting'),
      block: t('compare.row5.block'),
    },
    {
      capability: t('compare.row6.capability'),
      aescia: t('compare.row6.aescia'),
      engagement: t('compare.row6.engagement'),
      texting: t('compare.row6.texting'),
      block: t('compare.row6.block'),
    },
    {
      capability: t('compare.row7.capability'),
      aescia: t('compare.row7.aescia'),
      engagement: t('compare.row7.engagement'),
      texting: t('compare.row7.texting'),
      block: t('compare.row7.block'),
    },
    {
      capability: t('compare.row8.capability'),
      aescia: t('compare.row8.aescia'),
      engagement: t('compare.row8.engagement'),
      texting: t('compare.row8.texting'),
      block: t('compare.row8.block'),
    },
    {
      capability: t('compare.row9.capability'),
      aescia: t('compare.row9.aescia'),
      engagement: t('compare.row9.engagement'),
      texting: t('compare.row9.texting'),
      block: t('compare.row9.block'),
    },
  ]

  const columns: Array<{ key: keyof Row; label: string }> = [
    { key: 'aescia', label: t('compare.col.aescia') },
    { key: 'engagement', label: t('compare.col.engagement') },
    { key: 'texting', label: t('compare.col.texting') },
    { key: 'block', label: t('compare.col.block') },
  ]

  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              {t('compare.hero.eyebrow')}
            </span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('compare.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
            {t('compare.hero.lede')}
          </p>
          <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('compare.hero.note')}
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('compare.table.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-10"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('compare.table.title')}
          </h2>
          <div className="overflow-x-auto border border-border">
            <table className="w-full border-collapse min-w-[860px] text-left">
              <caption className="sr-only">
                {t('compare.table.caption')}
              </caption>
              <thead>
                <tr className="bg-secondary">
                  <th
                    scope="col"
                    className="align-bottom p-4 lg:p-5 border-b border-border font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/60 w-[200px]"
                  >
                    {t('compare.table.col.capability')}
                  </th>
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      className={`align-bottom p-4 lg:p-5 border-b border-l border-border font-display text-[14px] lg:text-[15px] leading-[1.25] tracking-[-0.01em] ${c.key === 'aescia' ? 'text-foreground bg-accent/5' : 'text-foreground/80'}`}
                      style={{ fontVariationSettings: "'opsz' 48" }}
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.capability} className="align-top">
                    <th
                      scope="row"
                      className="p-4 lg:p-5 border-b border-border text-[13.5px] leading-[1.45] text-foreground font-medium"
                    >
                      {row.capability}
                    </th>
                    {columns.map((c) => (
                      <td
                        key={c.key}
                        className={`p-4 lg:p-5 border-b border-l border-border text-[13px] leading-[1.55] text-foreground/80 ${c.key === 'aescia' ? 'bg-accent/5 text-foreground/90' : ''}`}
                      >
                        {row[c.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[12px] text-foreground/55 lg:hidden">{t('compare.table.scrollhint')}</p>
        </div>
      </section>

      {/* Where it compounds — the synergy case */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('compare.compounds.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('compare.compounds.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('compare.compounds.intro')}
            </p>
            <ul className="space-y-3 list-none border-y border-border divide-y divide-border">
              <li className="py-4 grid grid-cols-1 sm:grid-cols-[210px_1fr] gap-1 sm:gap-6">
                <span className="font-display text-[16px] text-foreground" style={{ fontVariationSettings: "'opsz' 64" }}>{t('compare.compounds.item1.title')}</span>
                <span className="text-[14.5px] leading-[1.65] text-foreground/80">{t('compare.compounds.item1.desc')}</span>
              </li>
              <li className="py-4 grid grid-cols-1 sm:grid-cols-[210px_1fr] gap-1 sm:gap-6">
                <span className="font-display text-[16px] text-foreground" style={{ fontVariationSettings: "'opsz' 64" }}>{t('compare.compounds.item2.title')}</span>
                <span className="text-[14.5px] leading-[1.65] text-foreground/80">{t('compare.compounds.item2.desc')}</span>
              </li>
              <li className="py-4 grid grid-cols-1 sm:grid-cols-[210px_1fr] gap-1 sm:gap-6">
                <span className="font-display text-[16px] text-foreground" style={{ fontVariationSettings: "'opsz' 64" }}>{t('compare.compounds.item3.title')}</span>
                <span className="text-[14.5px] leading-[1.65] text-foreground/80">{t('compare.compounds.item3.desc')}</span>
              </li>
            </ul>
            <p>
              {t('compare.compounds.outro')}
            </p>
          </div>
        </div>
      </section>

      {/* Where competitors are stronger */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('compare.fair.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('compare.fair.title')}
          </h2>
          <ul className="space-y-4 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl list-none">
            <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>{t('compare.fair.item1')}</span></li>
            <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>{t('compare.fair.item2')}</span></li>
            <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>{t('compare.fair.item3')}</span></li>
          </ul>
          <p className="mt-8 text-[15px] leading-[1.7] text-foreground/85 max-w-3xl">
            {t('compare.fair.close.pre')}{' '}
            <Link href="/asc-fit" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('compare.fair.close.link')}</Link>{t('compare.fair.close.post')}
          </p>
        </div>
      </section>

      <AscEntityBlock />
      <AscPageCta />
    </>
  )
}
