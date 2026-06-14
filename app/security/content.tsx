'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/security'

function useSecurityT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

// Sub-processors. Listed in plain text so the page survives a shallow LLM read.
// Each field is a translation key resolved against the 'security' namespace.
const subProcessors: Array<{ vendor: string; purposeKey: string; regionKey: string; noteKey: string }> = [
  {
    vendor: 'Google Cloud (Firebase Hosting, Cloud Run, Firebase Authentication)',
    purposeKey: 'security.subprocessors.google.purpose',
    regionKey: 'security.subprocessors.google.region',
    noteKey: 'security.subprocessors.google.note',
  },
  {
    vendor: 'Twilio',
    purposeKey: 'security.subprocessors.twilio.purpose',
    regionKey: 'security.subprocessors.twilio.region',
    noteKey: 'security.subprocessors.twilio.note',
  },
  {
    vendor: 'Vercel',
    purposeKey: 'security.subprocessors.vercel.purpose',
    regionKey: 'security.subprocessors.vercel.region',
    noteKey: 'security.subprocessors.vercel.note',
  },
  {
    vendor: 'Supabase',
    purposeKey: 'security.subprocessors.supabase.purpose',
    regionKey: 'security.subprocessors.supabase.region',
    noteKey: 'security.subprocessors.supabase.note',
  },
  {
    vendor: 'Resend',
    purposeKey: 'security.subprocessors.resend.purpose',
    regionKey: 'security.subprocessors.resend.region',
    noteKey: 'security.subprocessors.resend.note',
  },
]

// One row per item the page must answer. Question and answer are translation keys.
const compliance: Array<{ qKey: string; aKey: string }> = [
  { qKey: 'security.compliance.hosting.q', aKey: 'security.compliance.hosting.a' },
  { qKey: 'security.compliance.privacy.q', aKey: 'security.compliance.privacy.a' },
  { qKey: 'security.compliance.agreement.q', aKey: 'security.compliance.agreement.a' },
  { qKey: 'security.compliance.soc2.q', aKey: 'security.compliance.soc2.a' },
  { qKey: 'security.compliance.breach.q', aKey: 'security.compliance.breach.a' },
  { qKey: 'security.compliance.ownership.q', aKey: 'security.compliance.ownership.a' },
  { qKey: 'security.compliance.subprocessors.q', aKey: 'security.compliance.subprocessors.a' },
  { qKey: 'security.compliance.encryption.q', aKey: 'security.compliance.encryption.a' },
  { qKey: 'security.compliance.lifecycle.q', aKey: 'security.compliance.lifecycle.a' },
  { qKey: 'security.compliance.pentest.q', aKey: 'security.compliance.pentest.a' },
]

// Exit terms / data portability. Label and value are translation keys.
const exitTerms: Array<{ kKey: string; vKey: string }> = [
  { kKey: 'security.exit.notice.k', vKey: 'security.exit.notice.v' },
  { kKey: 'security.exit.export.k', vKey: 'security.exit.export.v' },
  { kKey: 'security.exit.copies.k', vKey: 'security.exit.copies.v' },
  { kKey: 'security.exit.pathway.k', vKey: 'security.exit.pathway.v' },
  { kKey: 'security.exit.pricing.k', vKey: 'security.exit.pricing.v' },
]

export function PageContent() {
  const t = useSecurityT()
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('security.hero.eyebrow')}</span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('security.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
            {t('security.hero.subtitle')}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact?intent=security-pack"
              className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
            >
              {t('security.hero.cta.primary')}
            </Link>
            <Link
              href="/contact?intent=data-agreement"
              className="inline-flex items-center justify-center border border-foreground/30 text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/5 transition-colors min-h-[44px]"
            >
              {t('security.hero.cta.secondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance answers, one row per question */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('security.answers.eyebrow')}</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <dl className="divide-y divide-border border-y border-border">
            {compliance.map((row) => (
              <div key={row.qKey} className="py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-12">
                <dt
                  className="font-display text-[20px] lg:text-[24px] leading-[1.25] tracking-[-0.018em] text-foreground"
                  style={{ fontVariationSettings: "'opsz' 80" }}
                >
                  {t(row.qKey)}
                </dt>
                <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">{t(row.aKey)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Sub-processors */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('security.subprocessors.eyebrow')}</span>
              <h2
                className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] mt-6"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                {t('security.subprocessors.title')}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80">
                {t('security.subprocessors.body')}
              </p>
            </div>
          </div>
          <dl className="divide-y divide-border border-y border-border bg-background">
            {subProcessors.map((sp) => (
              <div key={sp.vendor} className="py-7 px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[280px_1fr_200px] gap-4 lg:gap-8 items-start">
                <dt className="font-display text-[17px] lg:text-[18px] leading-[1.3] tracking-[-0.015em] text-foreground" style={{ fontVariationSettings: "'opsz' 72" }}>
                  {sp.vendor}
                </dt>
                <dd className="text-[14px] leading-[1.65] text-foreground/80">
                  <div>{t(sp.purposeKey)}</div>
                  <div className="mt-2 text-foreground/60 text-[13px]">{t(sp.noteKey)}</div>
                </dd>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{t(sp.regionKey)}</span>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Exit terms / data portability */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('security.exit.eyebrow')}</span>
          <h2
            className="font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6 mb-10"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('security.exit.title')}
          </h2>
          <dl className="divide-y divide-border border-y border-border">
            {exitTerms.map((row) => (
              <div key={row.kKey} className="grid grid-cols-[140px_1fr] gap-4 lg:gap-8 py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70 pt-1">{t(row.kKey)}</dt>
                <dd className="text-[15px] lg:text-[16px] leading-[1.65] text-foreground/85">{t(row.vKey)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
          <p className="text-[15px] text-foreground/80 flex-1">{t('security.footercta.body')}</p>
          <Link
            href="/contact?intent=security-pack"
            className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
          >
            {t('security.footercta.button')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
