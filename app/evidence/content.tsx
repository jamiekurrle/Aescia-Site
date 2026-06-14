'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/evidence'

function useEvidenceT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useEvidenceT()

  const literature: Array<[string, string, string, string]> = [
    [t('evidence.page.ref1.authors'), t('evidence.page.ref1.title'), t('evidence.page.ref1.journal'), '360:1418-1428'],
    [t('evidence.page.ref2.authors'), t('evidence.page.ref2.title'), t('evidence.page.ref2.journal'), '183(7):E391-E402'],
    [t('evidence.page.ref3.authors'), t('evidence.page.ref3.title'), t('evidence.page.ref3.journal'), '174(7):1095-1107'],
    [t('evidence.page.ref4.authors'), t('evidence.page.ref4.title'), t('evidence.page.ref4.journal'), '155(8):520-528'],
    [t('evidence.page.ref5.authors'), t('evidence.page.ref5.title'), t('evidence.page.ref5.journal'), '2024; doi:10.1016/j.clnu.2024.01.020'],
    [t('evidence.page.ref6.authors'), t('evidence.page.ref6.title'), t('evidence.page.ref6.journal'), '60(11):3482-3490'],
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('evidence.page.hero.eyebrow')}</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('evidence.page.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
            {t('evidence.page.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Published evidence base */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('evidence.page.base.eyebrow')}</span>
          <h2
            className="font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('evidence.page.base.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('evidence.page.base.p1')}
            </p>
            <p>
              {t('evidence.page.base.p2')}
            </p>
            <p>
              {t('evidence.page.base.p3')}
            </p>
            <p>
              {t('evidence.page.base.p4')}
            </p>
          </div>
          <p className="mt-10 text-[13px] leading-[1.7] text-foreground/65 italic font-display border-l-2 border-brass/40 pl-4 max-w-3xl">
            {t('evidence.page.base.disclaimer')}
          </p>
        </div>
      </section>

      {/* Preparation and length of stay (Clinics, non-device) */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('evidence.page.prep.eyebrow')}</span>
          <h2
            className="font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('evidence.page.prep.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('evidence.page.prep.p1')}
            </p>
            <p>
              {t('evidence.page.prep.p2')}
            </p>
          </div>
          <p className="mt-10 text-[13px] leading-[1.7] text-foreground/65 italic font-display border-l-2 border-brass/40 pl-4 max-w-3xl">
            {t('evidence.page.prep.disclaimer')}
          </p>
        </div>
      </section>

      {/* Our clinical programme */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('evidence.page.programme.eyebrow')}</span>
            <h2
              className="font-display text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              {t('evidence.page.programme.title')}
            </h2>
            <p className="text-[15px] mt-5 text-foreground/80 leading-relaxed max-w-md">
              {t('evidence.page.programme.body')}
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="divide-y divide-border border-y border-border">
              {([
                [
                  t('evidence.page.programme.row.registration.label'),
                  <a
                    key="anzctr"
                    href="https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482"
                    target="_blank"
                    rel="noopener"
                    className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors"
                    aria-label={t('evidence.page.programme.row.registration.aria')}
                  >
                    ACTRN12625001425482
                  </a>,
                  true,
                ],
                [t('evidence.page.programme.row.site.label'), t('evidence.page.programme.row.site.value'), false],
                [t('evidence.page.programme.row.unit.label'), t('evidence.page.programme.row.unit.value'), false],
                [t('evidence.page.programme.row.sponsor.label'), t('evidence.page.programme.row.sponsor.value'), false],
                [t('evidence.page.programme.row.pi.label'), t('evidence.page.programme.row.pi.value'), false],
                [t('evidence.page.programme.row.population.label'), t('evidence.page.programme.row.population.value'), false],
                [t('evidence.page.programme.row.sample.label'), t('evidence.page.programme.row.sample.value'), false],
                [t('evidence.page.programme.row.status.label'), t('evidence.page.programme.row.status.value'), false],
              ] as Array<[string, React.ReactNode, boolean]>).map(([k, v, mono], i) => (
                <div key={i} className="grid grid-cols-[180px_1fr] gap-6 py-6">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/65">{k}</dt>
                  <dd className={`text-[15px] text-foreground ${mono ? 'font-mono text-[14px]' : ''}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Approach to evaluation */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('evidence.page.approach.eyebrow')}</span>
          <h2
            className="font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6 mb-10"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('evidence.page.approach.title')}
          </h2>
          <dl className="divide-y divide-border border-y border-border">
            {[
              [t('evidence.page.approach.scoped.title'), t('evidence.page.approach.scoped.desc')],
              [t('evidence.page.approach.endpoints.title'), t('evidence.page.approach.endpoints.desc')],
              [t('evidence.page.approach.reporting.title'), t('evidence.page.approach.reporting.desc')],
              [t('evidence.page.approach.ethics.title'), t('evidence.page.approach.ethics.desc')],
              [t('evidence.page.approach.oversight.title'), t('evidence.page.approach.oversight.desc')],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[180px_1fr] gap-6 py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">{k}</dt>
                <dd className="text-[14.5px] lg:text-[15px] leading-[1.7] text-foreground/85">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Regulatory posture */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('evidence.page.regulatory.eyebrow')}</span>
          <h2
            className="font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6 mb-10"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('evidence.page.regulatory.title')}
          </h2>
          <div className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
            <p>
              {t('evidence.page.regulatory.p1')}
            </p>
            <p>
              {t('evidence.page.regulatory.p2')}
            </p>
            <p>
              {t('evidence.page.regulatory.p3')}
            </p>
          </div>
          <div className="mt-10">
            <Link
              href="/governance"
              className="inline-flex items-center gap-2.5 text-[13px] text-foreground font-medium tracking-wide border-b border-brass pb-1.5 hover:border-foreground transition-colors"
            >
              {t('evidence.page.regulatory.cta')}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Published references */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('evidence.page.references.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mt-6 mb-10"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('evidence.page.references.title')}
          </h2>
          <ol className="space-y-6 text-[15px] leading-[1.7] text-foreground/80 list-none">
            {literature.map(([authors, title, journal, vol]) => (
              <li key={title} className="grid grid-cols-[90px_1fr] gap-6 border-b border-border pb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/60 pt-1">{t('evidence.page.references.item.label')}</span>
                <div>
                  <div className="text-foreground mb-1">{authors}</div>
                  <div className="italic">{title}</div>
                  <div className="text-foreground/65 font-mono text-[12px] mt-1">{journal}, {vol}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
          <p className="text-[15px] text-foreground/80 flex-1">{t('evidence.page.footercta.text')}</p>
          <Link
            href="/governance"
            className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
          >
            {t('evidence.page.footercta.button')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
