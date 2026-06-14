'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/endoscopy-pre-procedure-workflow'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'

// Self-contained translation lookup for /endoscopy-pre-procedure-workflow. The
// shared i18n provider supplies the active locale; endoworkflow.* keys live in
// lib/dictionaries/pages/endoscopy-pre-procedure-workflow.ts and are resolved
// here with an English fallback, mirroring the provider's own fallback
// behaviour without editing lib/i18n.tsx.
function useEndoworkflowT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useEndoworkflowT()

  const journey: Array<[string, string]> = [
    [t('endoworkflow.journey.item1.title'), t('endoworkflow.journey.item1.desc')],
    [t('endoworkflow.journey.item2.title'), t('endoworkflow.journey.item2.desc')],
    [t('endoworkflow.journey.item3.title'), t('endoworkflow.journey.item3.desc')],
    [t('endoworkflow.journey.item4.title'), t('endoworkflow.journey.item4.desc')],
    [t('endoworkflow.journey.item5.title'), t('endoworkflow.journey.item5.desc')],
    [t('endoworkflow.journey.item6.title'), t('endoworkflow.journey.item6.desc')],
  ]

  const covers: Array<[string, string]> = [
    [t('endoworkflow.covers.item1.title'), t('endoworkflow.covers.item1.desc')],
    [t('endoworkflow.covers.item2.title'), t('endoworkflow.covers.item2.desc')],
    [t('endoworkflow.covers.item3.title'), t('endoworkflow.covers.item3.desc')],
    [t('endoworkflow.covers.item4.title'), t('endoworkflow.covers.item4.desc')],
    [t('endoworkflow.covers.item5.title'), t('endoworkflow.covers.item5.desc')],
    [t('endoworkflow.covers.item6.title'), t('endoworkflow.covers.item6.desc')],
  ]

  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              {t('endoworkflow.hero.eyebrow')}
            </span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('endoworkflow.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
            {t('endoworkflow.hero.lede')}
          </p>
          <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('endoworkflow.hero.disclaimer')}
          </p>
        </div>
      </section>

      {/* The journey, as a timeline */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('endoworkflow.journey.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('endoworkflow.journey.title')}
          </h2>
          <ol className="divide-y divide-border border-y border-border">
            {journey.map(([k, v]) => (
              <li key={k} className="py-7 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-2 lg:gap-10">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent pt-1">{k}</div>
                <div className="text-[15px] leading-[1.7] text-foreground/85 max-w-2xl">{v}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What the pathway covers — feature grid */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('endoworkflow.covers.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('endoworkflow.covers.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-border border-y border-border">
            {covers.map(([k, v]) => (
              <div key={k} className="bg-background p-7 lg:p-8">
                <h3 className="font-display text-[18px] lg:text-[20px] leading-[1.25] tracking-[-0.015em] mb-3" style={{ fontVariationSettings: "'opsz' 72" }}>{k}</h3>
                <p className="text-[14px] leading-[1.65] text-foreground/80">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('endoworkflow.covers.deepdives.pre')}
            <Link href="/glp1-endoscopy-prep" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('endoworkflow.covers.deepdives.link1')}</Link>{t('endoworkflow.covers.deepdives.sep1')}
            <Link href="/medication-management-before-endoscopy" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('endoworkflow.covers.deepdives.link2')}</Link>{t('endoworkflow.covers.deepdives.sep2')}
            <Link href="/bowel-prep-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('endoworkflow.covers.deepdives.link3')}</Link>{t('endoworkflow.covers.deepdives.sep3')}
            <Link href="/colonoscopy-no-show-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('endoworkflow.covers.deepdives.link4')}</Link>{t('endoworkflow.covers.deepdives.post')}
          </p>
        </div>
      </section>

      {/* How pathways are authored */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('endoworkflow.authored.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('endoworkflow.authored.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('endoworkflow.authored.para1')}
            </p>
            <p>
              {t('endoworkflow.authored.para2')}
            </p>
          </div>
        </div>
      </section>

      {/* On the roadmap: procedure-length risk score. Planned, not built. ML is
          used here for back-end/operational analysis (list planning), kept
          separate from the clinician-authored patient-facing alert rules, and
          framed as operational (not a clinical decision) to stay non-device. */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('endoworkflow.roadmap.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('endoworkflow.roadmap.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('endoworkflow.roadmap.para1')}
            </p>
            <p>
              {t('endoworkflow.roadmap.para2')}
            </p>
            <p className="text-[14px] text-foreground/70 border-l-2 border-brass/50 pl-4">
              {t('endoworkflow.roadmap.note')}
            </p>
          </div>
        </div>
      </section>

      <AscEntityBlock />
      <AscPageCta />
    </>
  )
}
