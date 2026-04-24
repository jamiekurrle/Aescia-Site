'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { useI18n } from '@/lib/i18n'

type Person = {
  initials: string
  nameKey: string
  roleKey: string
  bioKey: string
}

const founders: Person[] = [
  { initials: 'JK', nameKey: 'team.james.name', roleKey: 'team.james.role', bioKey: 'team.james.bio' },
  { initials: 'VD', nameKey: 'team.vasken.name', roleKey: 'team.vasken.role', bioKey: 'team.vasken.bio' },
]

const operating: Person[] = [
  { initials: 'JC', nameKey: 'team.josh.name', roleKey: 'team.josh.role', bioKey: 'team.josh.bio' },
  { initials: 'SK', nameKey: 'team.shannon.name', roleKey: 'team.shannon.role', bioKey: 'team.shannon.bio' },
]

export function TeamContent() {
  const { t } = useI18n()

  return (
    <>
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('team.eyebrow')}</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[76px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              {t('team.title')}
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              {t('team.subtitle')}
            </p>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('team.founders.eyebrow')}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {founders.map((p) => (
                <article key={p.nameKey} className="bg-background p-8 lg:p-10">
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 border border-foreground/25 flex items-center justify-center font-mono text-[13px] tracking-widest text-foreground/80 mb-6"
                  >
                    {p.initials}
                  </div>
                  <h3
                    className="font-display text-[24px] lg:text-[28px] leading-[1.2] tracking-[-0.018em] mb-2"
                    style={{ fontVariationSettings: "'opsz' 80" }}
                  >
                    {t(p.nameKey)}
                  </h3>
                  <p className="text-[13px] text-foreground/75 mb-5 italic">{t(p.roleKey)}</p>
                  <p className="text-[14px] leading-[1.65] text-foreground/80 max-w-md">{t(p.bioKey)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 mb-14">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('team.operating.eyebrow')}</span>
                </div>
                <h2
                  className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em]"
                  style={{ fontVariationSettings: "'opsz' 120" }}
                >
                  {t('team.operating.title')}
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {operating.map((p) => (
                <article key={p.nameKey} className="bg-secondary p-7 lg:p-9">
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 border border-foreground/25 flex items-center justify-center font-mono text-[13px] tracking-widest text-foreground/80 mb-6"
                  >
                    {p.initials}
                  </div>
                  <h3
                    className="font-display text-[20px] lg:text-[22px] leading-[1.2] tracking-[-0.015em] mb-2"
                    style={{ fontVariationSettings: "'opsz' 72" }}
                  >
                    {t(p.nameKey)}
                  </h3>
                  <p className="text-[12.5px] text-foreground/75 mb-5 italic">{t(p.roleKey)}</p>
                  <p className="text-[13.5px] leading-[1.65] text-foreground/80">{t(p.bioKey)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 mb-12">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('team.clinical.eyebrow')}</span>
                </div>
                <h2
                  className="font-display text-[30px] lg:text-[40px] leading-[1.08] tracking-[-0.025em]"
                  style={{ fontVariationSettings: "'opsz' 120" }}
                >
                  {t('team.clinical.title')}
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/80">
                  {t('team.clinical.body')}
                </p>
              </div>
            </div>

            <article className="bg-background border-t-2 border-accent p-8 lg:p-10 max-w-2xl">
              <div
                aria-hidden="true"
                className="w-12 h-12 border border-foreground/25 flex items-center justify-center font-mono text-[13px] tracking-widest text-foreground/80 mb-6"
              >
                KW
              </div>
              <h3
                className="font-display text-[24px] lg:text-[28px] leading-[1.2] tracking-[-0.018em] mb-2"
                style={{ fontVariationSettings: "'opsz' 80" }}
              >
                {t('team.kei.name')}
              </h3>
              <p className="text-[13px] text-foreground/75 mb-4 italic">{t('team.kei.role')}</p>
              <p className="text-[14px] leading-[1.65] text-foreground/80">{t('team.kei.bio')}</p>
            </article>
          </div>
        </section>

        <section className="py-20 lg:py-24 px-6 lg:px-10 bg-secondary border-t border-border">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('team.advisory.eyebrow')}</span>
              </div>
              <h2
                className="font-display text-[28px] lg:text-[38px] leading-[1.1] tracking-[-0.025em]"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                {t('team.advisory.title')}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/80 mb-5">
                {t('team.advisory.body')}
              </p>
              <p className="text-[14px] leading-[1.7] text-foreground/70">
                {t('team.advisory.body2')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-[15px] text-foreground/80 flex-1">{t('team.cta.label')}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
            >
              {t('team.cta.button')}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
