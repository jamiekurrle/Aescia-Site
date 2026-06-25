'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/team-james-kurrle'

// Self-contained translation lookup for /team/james-kurrle. The shared i18n
// provider supplies the active locale; jameskurrle.* keys live in
// lib/dictionaries/pages/team-james-kurrle.ts and are resolved here with an
// English fallback, mirroring the provider's own fallback behaviour without
// editing lib/i18n.tsx.
function useJamesKurrleT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useJamesKurrleT()

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 lg:px-10 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <nav aria-label={t('jameskurrle.breadcrumb.aria')} className="mb-8 font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/60">
            <Link href="/team" className="hover:text-foreground">{t('jameskurrle.breadcrumb.team')}</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <span className="text-foreground/85">{t('jameskurrle.breadcrumb.name')}</span>
          </nav>
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('jameskurrle.eyebrow')}</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-4"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('jameskurrle.name')}
          </h1>
          <p className="text-[15px] font-mono uppercase tracking-[0.18em] text-foreground/70">
            {t('jameskurrle.title')}
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="prose-aescia text-[16px] lg:text-[17px] leading-[1.75] text-foreground/85 space-y-6">
            <p>
              {t('jameskurrle.bio.p1')}
            </p>
            <p>
              {t('jameskurrle.bio.p2')}
            </p>
            <p>
              {t('jameskurrle.bio.p3.pre')}
              <a
                href="https://www.linkedin.com/in/jameskurrle/"
                target="_blank"
                rel="me noopener"
                className="underline decoration-brass/60 underline-offset-4 hover:decoration-foreground transition-colors"
              >
                {t('jameskurrle.bio.p3.link')}
              </a>
              {t('jameskurrle.bio.p3.post')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-secondary border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-display text-[24px] lg:text-[32px] leading-[1.15] tracking-[-0.02em] mb-8"
            style={{ fontVariationSettings: "'opsz' 96" }}
          >
            {t('jameskurrle.press.title')}
          </h2>
          <ul className="divide-y divide-border border-y border-border">
            <li className="py-6 grid sm:grid-cols-[110px_1fr] gap-3 sm:gap-6">
              <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-foreground/65 pt-1">{t('jameskurrle.press.item1.date')}</span>
              <div>
                <p className="text-[15px] leading-[1.6] text-foreground mb-1.5">
                  <a
                    href="https://www.concordia.ca/news/stories/2025/10/20/beat-the-odds-connects-concordia-students-with-district-3-startups.html"
                    target="_blank"
                    rel="noopener"
                    className="underline decoration-brass/50 underline-offset-4 hover:decoration-foreground transition-colors"
                  >
                    {t('jameskurrle.press.item1.headline')}
                  </a>
                </p>
                <p className="text-[13px] text-foreground/70 italic">{t('jameskurrle.press.item1.source')}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
          <p className="text-[15px] text-foreground/80 flex-1">{t('jameskurrle.cta.prompt')}</p>
          <Link
            href="/team"
            className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
          >
            {t('jameskurrle.cta.button')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
