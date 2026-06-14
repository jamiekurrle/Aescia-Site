'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/design-partner'

// Self-contained translation lookup for /design-partner. The shared i18n
// provider supplies the active locale; designpartner.* keys live in
// lib/dictionaries/pages/design-partner.ts and are resolved here with an English
// fallback, mirroring the provider's own fallback behaviour without editing
// lib/i18n.tsx.
function useDesignPartnerT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useDesignPartnerT()

  const programTerms: Array<{ k: string; v: React.ReactNode }> = [
    {
      k: t('designpartner.terms.who.k'),
      v: t('designpartner.terms.who.v'),
    },
    {
      k: t('designpartner.terms.takes.k'),
      v: t('designpartner.terms.takes.v'),
    },
    {
      k: t('designpartner.terms.commercial.k'),
      v: t('designpartner.terms.commercial.v'),
    },
    {
      k: t('designpartner.terms.measure.k'),
      v: (
        <>
          {t('designpartner.terms.measure.intro')}
          <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-brass">
            <li>{t('designpartner.terms.measure.item1')}</li>
            <li>{t('designpartner.terms.measure.item2')}</li>
            <li>{t('designpartner.terms.measure.item3')}</li>
            <li>{t('designpartner.terms.measure.item4')}</li>
          </ul>
          <p className="mt-3 text-foreground/70 text-[14px]">{t('designpartner.terms.measure.note')}</p>
        </>
      ),
    },
    {
      k: t('designpartner.terms.how.k'),
      v: t('designpartner.terms.how.v'),
    },
    {
      k: t('designpartner.terms.shape.k'),
      v: t('designpartner.terms.shape.v'),
    },
    {
      k: t('designpartner.terms.adjudication.k'),
      v: t('designpartner.terms.adjudication.v'),
    },
    {
      k: t('designpartner.terms.exit.k'),
      v: t('designpartner.terms.exit.v'),
    },
    {
      k: t('designpartner.terms.support.k'),
      v: t('designpartner.terms.support.v'),
    },
    {
      k: t('designpartner.terms.return.k'),
      v: t('designpartner.terms.return.v'),
    },
  ]

  const principles = [
    {
      n: '01',
      title: t('designpartner.principles.item1.title'),
      desc: t('designpartner.principles.item1.desc'),
    },
    {
      n: '02',
      title: t('designpartner.principles.item2.title'),
      desc: t('designpartner.principles.item2.desc'),
    },
    {
      n: '03',
      title: t('designpartner.principles.item3.title'),
      desc: t('designpartner.principles.item3.desc'),
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('designpartner.hero.eyebrow')}</span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('designpartner.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
            {t('designpartner.hero.subtitle')}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact?intent=design-partner"
              className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
            >
              {t('designpartner.hero.cta.primary')}
            </Link>
            <Link
              href="/clinics#roi"
              className="inline-flex items-center justify-center border border-foreground/30 text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/5 transition-colors min-h-[44px]"
            >
              {t('designpartner.hero.cta.secondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* The principles at a glance */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('designpartner.principles.eyebrow')}</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border-y border-border">
            {principles.map((it) => (
              <article key={it.n} className="bg-background p-7 lg:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-mono text-[12px] text-brass tracking-widest">{it.n}</span>
                  <span className="h-px w-5 bg-brass/60" aria-hidden="true" />
                </div>
                <h3
                  className="font-display text-[20px] lg:text-[24px] leading-[1.2] tracking-[-0.02em] mb-4"
                  style={{ fontVariationSettings: "'opsz' 80" }}
                >
                  {it.title}
                </h3>
                <p className="text-[14.5px] leading-[1.7] text-foreground/75">{it.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Program terms in full */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('designpartner.terms.eyebrow')}</span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <dl className="divide-y divide-border border-y border-border bg-background">
            {programTerms.map((row) => (
              <div key={row.k} className="py-8 lg:py-10 px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-12">
                <dt
                  className="font-display text-[18px] lg:text-[22px] leading-[1.25] tracking-[-0.018em] text-foreground"
                  style={{ fontVariationSettings: "'opsz' 80" }}
                >
                  {row.k}
                </dt>
                <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What this is not */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('designpartner.notwhat.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] mt-6 mb-10"
            style={{ fontVariationSettings: "'opsz' 96" }}
          >
            {t('designpartner.notwhat.title')}
          </h2>
          <ul className="space-y-7">
            <li className="border-l-2 border-brass/60 pl-5">
              <p className="text-[16px] leading-[1.7] text-foreground/85">
                <strong className="text-foreground">{t('designpartner.notwhat.item1.lead')}</strong> {t('designpartner.notwhat.item1.body')}
              </p>
            </li>
            <li className="border-l-2 border-brass/60 pl-5">
              <p className="text-[16px] leading-[1.7] text-foreground/85">
                <strong className="text-foreground">{t('designpartner.notwhat.item2.lead')}</strong> {t('designpartner.notwhat.item2.body')}
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('designpartner.cta.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.2] tracking-[-0.02em] mt-6 mb-6 text-background"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('designpartner.cta.title')}
          </h2>
          <p className="text-[15px] leading-[1.7] text-background/80 max-w-2xl mx-auto mb-10">
            {t('designpartner.cta.body')}
          </p>
          <Link
            href="/contact?intent=design-partner"
            className="inline-flex items-center gap-2.5 bg-background text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-background/90 transition-colors min-h-[44px]"
          >
            {t('designpartner.cta.button')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
