'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { useI18n } from '@/lib/i18n'

// Entries are ordered newest-first. Numbered keys (7..1) reflect chronological index.
const entryNumbers = [7, 6, 5, 4, 3, 2, 1] as const

export function UpdatesContent() {
  const { t } = useI18n()

  const entries = entryNumbers.map((n) => ({
    date: t(`updates.entry${n}.date`),
    tag: t(`updates.entry${n}.tag`),
    title: t(`updates.entry${n}.title`),
    body: t(`updates.entry${n}.body`),
    anchor: `e${n}`,
  }))

  return (
    <>
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('updates.eyebrow')}</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              {t('updates.title')}
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              {t('updates.subtitle')}
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <ol className="divide-y divide-border border-y border-border">
              {entries.map((entry) => (
                <li key={entry.anchor} id={entry.anchor} className="py-10 lg:py-12 grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-10">
                  <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-3">
                    <span className="font-mono text-[12px] tracking-wide text-foreground/80">{entry.date}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent border border-accent/40 px-2 py-1">
                      {entry.tag}
                    </span>
                  </div>
                  <article>
                    <h2
                      className="font-display text-[22px] lg:text-[28px] leading-[1.2] tracking-[-0.018em] mb-4"
                      style={{ fontVariationSettings: "'opsz' 80" }}
                    >
                      {entry.title}
                    </h2>
                    <p className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/80 max-w-2xl">{entry.body}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-[15px] text-foreground/80 flex-1">
              Want to follow along? Write to us and we will put you on a short update list.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
            >
              {t('updates.cta')}
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
