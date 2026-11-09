'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

// Security and privacy facts already published on /security and /privacy.
// Add an item here only once the page it rests on says the same thing.
export function HomeTrust() {
  const { t } = useI18n()

  const items = [
    { value: t('trust.item1.value'), label: t('trust.item1.label') },
    { value: t('trust.item2.value'), label: t('trust.item2.label') },
    { value: t('home.trust.host.value'), label: t('home.trust.host.label') },
    { value: t('home.trust.app.value'), label: t('home.trust.app.label') },
    { value: t('trust.item3.value'), label: t('trust.item3.label') },
  ]

  return (
    <section className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 text-center">
        <h2
          className="font-display text-[28px] lg:text-[36px] leading-[1.1] tracking-[-0.02em] font-semibold"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {t('home.trust.title')}
        </h2>
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-8">
          {items.map((item) => (
            <li key={item.value}>
              <p className="text-[17px] lg:text-[18px] font-semibold text-foreground">{item.value}</p>
              <p className="mt-1 text-[15px] leading-[1.45] text-foreground/70">{item.label}</p>
            </li>
          ))}
        </ul>
        <Link
          href="/security"
          className="mt-10 inline-flex items-center gap-2 text-[15px] font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
        >
          {t('home.trust.link')}
        </Link>
      </div>
    </section>
  )
}
