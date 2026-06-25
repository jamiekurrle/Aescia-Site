'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/safe-discharge'

// Self-contained translation lookup for /safe-discharge. The shared i18n
// provider supplies the active locale; safedischarge.* keys live in
// lib/dictionaries/pages/safe-discharge.ts and are resolved here with an
// English fallback, mirroring the provider's own fallback behaviour without
// editing lib/i18n.tsx.
function useSafeDischargeT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useSafeDischargeT()

  // FAQ entries. Most answers are plain strings; a few carry inline emphasis
  // and are therefore composed from split keys so the <strong> survives.
  const faqs: { qKey: string; a: React.ReactNode }[] = [
    {
      qKey: 'safedischarge.faq.diagnose.q',
      a: t('safedischarge.faq.diagnose.a'),
    },
    {
      qKey: 'safedischarge.faq.missday.q',
      a: t('safedischarge.faq.missday.a'),
    },
    {
      qKey: 'safedischarge.faq.stop.q',
      a: t('safedischarge.faq.stop.a'),
    },
    {
      qKey: 'safedischarge.faq.monitored.q',
      a: (
        <>
          {t('safedischarge.faq.monitored.a.pre')}{' '}
          <strong>{t('safedischarge.faq.monitored.a.strong')}</strong>
        </>
      ),
    },
    {
      qKey: 'safedischarge.faq.cost.q',
      a: t('safedischarge.faq.cost.a'),
    },
    {
      qKey: 'safedischarge.faq.where.q',
      a: t('safedischarge.faq.where.a'),
    },
    {
      qKey: 'safedischarge.faq.harm.q',
      a: t('safedischarge.faq.harm.a'),
    },
    {
      qKey: 'safedischarge.faq.end.q',
      a: t('safedischarge.faq.end.a'),
    },
    {
      qKey: 'safedischarge.faq.other.q',
      a: t('safedischarge.faq.other.a'),
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-10 pb-12 lg:pt-14 lg:pb-16 px-6 lg:px-10 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">
              {t('safedischarge.hero.eyebrow')}
            </span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[36px] sm:text-[46px] lg:text-[56px] leading-[1.04] tracking-[-0.03em] mb-6"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('safedischarge.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/85 max-w-2xl">
            {t('safedischarge.hero.subtitle')}
          </p>
          <p className="mt-4 text-[14px] leading-[1.7] text-foreground/65 max-w-2xl">
            {t('safedischarge.hero.note')}
          </p>
        </div>
      </section>

      {/* Safety callout — must be first thing they read */}
      <section className="py-12 lg:py-14 px-6 lg:px-10 bg-secondary border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="border-l-4 border-foreground pl-6 lg:pl-8">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground mb-3 block">
              {t('safedischarge.safety.eyebrow')}
            </span>
            <h2
              className="font-display font-bold text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] mb-6"
              style={{ fontVariationSettings: "'opsz' 96, 'wght' 700" }}
            >
              {t('safedischarge.safety.title')}
            </h2>
            <ul className="space-y-3 text-[15px] leading-[1.7] text-foreground/85">
              <li>
                {t('safedischarge.safety.item1')}
              </li>
              <li>
                {t('safedischarge.safety.item2')}
              </li>
              <li>
                {t('safedischarge.safety.item3')}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What happens */}
      <section className="py-16 lg:py-20 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">
            {t('safedischarge.whathappens.eyebrow')}
          </span>
          <h2
            className="font-display text-[28px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] mt-4 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('safedischarge.whathappens.title')}
          </h2>
          <ol className="space-y-5 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 list-none">
            <li className="grid grid-cols-[36px_1fr] gap-4">
              <span className="font-mono text-[11px] tracking-[0.18em] text-brass pt-1">01</span>
              <p>{t('safedischarge.whathappens.step1')}</p>
            </li>
            <li className="grid grid-cols-[36px_1fr] gap-4">
              <span className="font-mono text-[11px] tracking-[0.18em] text-brass pt-1">02</span>
              <p>{t('safedischarge.whathappens.step2')}</p>
            </li>
            <li className="grid grid-cols-[36px_1fr] gap-4">
              <span className="font-mono text-[11px] tracking-[0.18em] text-brass pt-1">03</span>
              <p>{t('safedischarge.whathappens.step3')}</p>
            </li>
            <li className="grid grid-cols-[36px_1fr] gap-4">
              <span className="font-mono text-[11px] tracking-[0.18em] text-brass pt-1">04</span>
              <p>{t('safedischarge.whathappens.step4')}</p>
            </li>
          </ol>
        </div>
      </section>

      {/* What you do */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-secondary">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">
            {t('safedischarge.whatwask.eyebrow')}
          </span>
          <h2
            className="font-display text-[28px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] mt-4 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('safedischarge.whatwask.title')}
          </h2>
          <ul className="space-y-4 text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85">
            <li className="pl-5 relative">
              <span className="absolute left-0 top-3 w-2 h-px bg-brass" aria-hidden="true" />
              {t('safedischarge.whatwask.item1')}
            </li>
            <li className="pl-5 relative">
              <span className="absolute left-0 top-3 w-2 h-px bg-brass" aria-hidden="true" />
              {t('safedischarge.whatwask.item2')}
            </li>
            <li className="pl-5 relative">
              <span className="absolute left-0 top-3 w-2 h-px bg-brass" aria-hidden="true" />
              {t('safedischarge.whatwask.item3.pre')}<strong>{t('safedischarge.whatwask.item3.messages')}</strong>{t('safedischarge.whatwask.item3.post')}
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">
            {t('safedischarge.faq.eyebrow')}
          </span>
          <h2
            className="font-display text-[28px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] mt-4 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('safedischarge.faq.title')}
          </h2>
          <dl className="divide-y divide-border border-y border-border">
            {faqs.map((it) => (
              <div key={it.qKey} className="py-6 lg:py-7 grid lg:grid-cols-[260px_1fr] gap-3 lg:gap-10">
                <dt
                  className="font-display text-[18px] lg:text-[20px] leading-[1.3] tracking-[-0.015em] text-foreground"
                  style={{ fontVariationSettings: "'opsz' 72" }}
                >
                  {t(it.qKey)}
                </dt>
                <dd className="text-[14.5px] lg:text-[15.5px] leading-[1.7] text-foreground/85">
                  {it.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Contacts */}
      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-secondary border-t border-border">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">
            {t('safedischarge.contacts.eyebrow')}
          </span>
          <h2
            className="font-display text-[28px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] mt-4 mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('safedischarge.contacts.title')}
          </h2>

          <div className="space-y-10">
            <div className="border-t-4 border-foreground pt-5 bg-background/40 -mx-4 px-4 lg:-mx-6 lg:px-6 py-4 rounded-sm">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">
                  {t('safedischarge.contacts.step1.label')}
                </span>
                <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/70">
                  {t('safedischarge.contacts.step1.tag')}
                </span>
              </div>
              <p className="font-display text-[20px] lg:text-[24px] leading-[1.25] tracking-[-0.015em] text-foreground mb-2"
                 style={{ fontVariationSettings: "'opsz' 96" }}>
                {t('safedischarge.contacts.step1.role')}
                <span className="text-foreground/65"> {t('safedischarge.contacts.step1.roleabbr')}</span>
              </p>
              <p className="text-[14.5px] leading-[1.7] text-foreground/85">
                {t('safedischarge.contacts.step1.body')}
              </p>
              <p className="text-[14px] leading-[1.7] text-foreground/80 mt-2">
                {t('safedischarge.contacts.step1.switch.pre')}{' '}
                <a href="tel:+61295156111" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">
                  02 9515 6111
                </a>
                {' '}{t('safedischarge.contacts.step1.switch.post')}
              </p>
            </div>

            <div className="border-t border-border pt-5 opacity-90">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">
                  {t('safedischarge.contacts.step2.label')}
                </span>
                <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/65">
                  {t('safedischarge.contacts.step2.tag')}
                </span>
              </div>
              <p className="text-[15px] leading-[1.65] text-foreground">
                <strong>Dr Kei Woldendorp</strong>{t('safedischarge.contacts.step2.role')}
              </p>
              <p className="text-[13.5px] leading-[1.7] text-foreground/70 mt-1 italic">
                {t('safedischarge.contacts.step2.note')}
              </p>
              <p className="text-[14px] leading-[1.7] text-foreground/80 mt-2">
                {t('safedischarge.contacts.step2.switch.pre')}{' '}
                <a href="tel:+61295156111" className="underline decoration-accent/40 underline-offset-4 hover:decoration-foreground transition-colors">
                  02 9515 6111
                </a>
                {' '}{t('safedischarge.contacts.step2.switch.post')}
              </p>
              <p className="text-[14px] leading-[1.7] text-foreground/80 mt-1">
                {t('safedischarge.contacts.step2.email.label')}{' '}
                <a href="mailto:kei.woldendorp@health.nsw.gov.au" className="underline decoration-accent/40 underline-offset-4 hover:decoration-foreground transition-colors break-all">
                  kei.woldendorp@health.nsw.gov.au
                </a>
              </p>
            </div>

            <div className="border-t-2 border-brass/60 pt-5">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/70 mb-2 block">
                {t('safedischarge.contacts.ethics.eyebrow')}
              </span>
              <p className="text-[15px] leading-[1.65] text-foreground">
                <strong>{t('safedischarge.contacts.ethics.name')}</strong>
              </p>
              <p className="text-[14px] leading-[1.7] text-foreground/80 mt-1">
                {t('safedischarge.contacts.ethics.call.label')}{' '}
                <a href="tel:+61295156766" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors">
                  02 9515 6766
                </a>
              </p>
              <p className="text-[14px] leading-[1.7] text-foreground/80 mt-1">
                {t('safedischarge.contacts.ethics.email.label')}{' '}
                <a href="mailto:slhd-rpaethics@health.nsw.gov.au" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground transition-colors break-all">
                  slhd-rpaethics@health.nsw.gov.au
                </a>
              </p>
              <p className="text-[12.5px] leading-[1.6] text-foreground/65 mt-2 italic">
                {t('safedischarge.contacts.ethics.protocol')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-12 lg:py-16 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[13px] lg:text-[14px] leading-[1.7] text-foreground/65 italic font-display border-l-2 border-brass/40 pl-5">
            {t('safedischarge.footernote.body')}
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/60 hover:text-foreground transition-colors"
            >
              {t('safedischarge.footernote.home')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
