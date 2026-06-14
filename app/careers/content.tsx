'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/careers'
import { OPEN_ROLES, APPLY_EMAIL } from '@/lib/careers'

// Self-contained translation lookup for /careers. The shared i18n provider
// supplies the active locale; careers.* keys live in
// lib/dictionaries/pages/careers.ts and are resolved here with an English
// fallback, mirroring the provider's own fallback behaviour without editing
// lib/i18n.tsx.
function useCareersT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useCareersT()

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('careers.hero.eyebrow')}</span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('careers.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
            {t('careers.hero.body')}
          </p>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('careers.roles.eyebrow')}</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>

          {OPEN_ROLES.length === 0 ? (
            <p className="text-[16px] leading-[1.7] text-foreground/80 max-w-2xl">
              {t('careers.roles.empty.pre')}
              <a href={`mailto:${APPLY_EMAIL}`} className="underline underline-offset-4 decoration-brass decoration-2">
                {APPLY_EMAIL}
              </a>
              {t('careers.roles.empty.post')}
            </p>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {OPEN_ROLES.map((role) => (
                <li key={role.slug}>
                  <Link
                    href={`/careers/${role.slug}`}
                    className="group block py-8 lg:py-10 px-2 lg:px-4 -mx-2 lg:-mx-4 transition-colors hover:bg-secondary/60"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 lg:gap-12 lg:items-center">
                      <div>
                        <h2
                          className="font-display text-[24px] lg:text-[30px] leading-[1.15] tracking-[-0.02em] mb-3"
                          style={{ fontVariationSettings: "'opsz' 96" }}
                        >
                          {role.title}
                        </h2>
                        <p className="text-[15px] lg:text-[16px] leading-[1.6] text-foreground/75 max-w-2xl">
                          {role.summary}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/60">
                          <span>{role.team}</span>
                          <span>{role.location}</span>
                          <span>{role.engagement}</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-2 text-[13px] font-medium tracking-wide text-foreground whitespace-nowrap">
                        {t('careers.roles.viewrole')}
                        <svg
                          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Spontaneous applications */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('careers.spontaneous.eyebrow')}</span>
          <h2
            className="font-display text-[28px] lg:text-[40px] leading-[1.2] tracking-[-0.02em] mt-6 mb-6"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('careers.spontaneous.title')}
          </h2>
          <p className="text-[15px] leading-[1.7] text-foreground/80 max-w-2xl mx-auto mb-10">
            {t('careers.spontaneous.body')}
          </p>
          <a
            href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(t('careers.spontaneous.subject'))}`}
            className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
          >
            {t('careers.spontaneous.cta')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </a>
        </div>
      </section>
    </>
  )
}
