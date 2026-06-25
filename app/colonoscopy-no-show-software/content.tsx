'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/colonoscopy-no-show-software'
import { AscEntityBlock } from '@/components/asc-entity-block'
import { AscPageCta } from '@/components/asc-page-cta'

// Self-contained translation lookup for /colonoscopy-no-show-software. The
// shared i18n provider supplies the active locale; noshow.* keys live in
// lib/dictionaries/pages/colonoscopy-no-show-software.ts and are resolved here
// with an English fallback, mirroring the provider's own fallback behaviour
// without editing lib/i18n.tsx.
function useNoShowT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useNoShowT()

  const steps: Array<[string, string]> = [
    [t('noshow.how.step1.title'), t('noshow.how.step1.desc')],
    [t('noshow.how.step2.title'), t('noshow.how.step2.desc')],
    [t('noshow.how.step3.title'), t('noshow.how.step3.desc')],
    [t('noshow.how.step4.title'), t('noshow.how.step4.desc')],
    [t('noshow.how.step5.title'), t('noshow.how.step5.desc')],
  ]

  return (
    <>
      {/* Hero — H1 is the buyer question; the lead is the self-contained answer */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">
              {t('noshow.hero.eyebrow')}
            </span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[38px] sm:text-[50px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('noshow.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[20px] leading-[1.6] text-foreground font-display max-w-3xl border-l-2 border-accent pl-5">
            {t('noshow.hero.lede')}
          </p>
          <p className="mt-6 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('noshow.hero.disclaimer')}
          </p>
        </div>
      </section>

      {/* Why endoscopy no-shows are different */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('noshow.why.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('noshow.why.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('noshow.why.p1')}
            </p>
            <p>
              {t('noshow.why.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* How Aescia reduces no-shows — machine-extractable steps */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">{t('noshow.how.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('noshow.how.title')}
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
            {t('noshow.how.deepdives.pre')}{' '}
            <Link href="/glp1-endoscopy-prep" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('noshow.how.deepdives.link1')}</Link>,{' '}
            <Link href="/medication-management-before-endoscopy" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('noshow.how.deepdives.link2')}</Link>,{' '}
            <Link href="/bowel-prep-software" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('noshow.how.deepdives.link3')}</Link>, {t('noshow.how.deepdives.and')}{' '}
            <Link href="/prep-aware-backfill" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('noshow.how.deepdives.link4')}</Link>.
          </p>
        </div>
      </section>

      {/* The numbers — point to the calculator, do not assert Aescia's own % */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('noshow.numbers.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('noshow.numbers.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('noshow.numbers.p1')}
            </p>
            <p>
              {t('noshow.numbers.p2.pre')}{' '}
              <Link href="/clinics#roi" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('noshow.numbers.p2.link')}</Link>{' '}
              {t('noshow.numbers.p2.post')}
            </p>
          </div>
        </div>
      </section>

      {/* Where Aescia is not the right fit */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">{t('noshow.scope.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('noshow.scope.title')}
          </h2>
          <ul className="space-y-4 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl list-none">
            <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>{t('noshow.scope.item1')}</span></li>
            <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>{t('noshow.scope.item2')}</span></li>
            <li className="grid grid-cols-[20px_1fr] gap-3"><span className="text-accent pt-0.5" aria-hidden="true">&mdash;</span><span>{t('noshow.scope.item3')}</span></li>
          </ul>
          <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70 max-w-3xl">
            {t('noshow.scope.links.pre')}{' '}
            <Link href="/asc-fit" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('noshow.scope.links.link1')}</Link>{' '}
            {t('noshow.scope.links.mid')}{' '}
            <Link href="/compare" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">{t('noshow.scope.links.link2')}</Link>.
          </p>
        </div>
      </section>

      <AscEntityBlock />
      <AscPageCta line={t('noshow.cta.line')} />
    </>
  )
}
