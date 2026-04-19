'use client'

import { useI18n } from '@/lib/i18n'

/**
 * One confident line of security posture, centered, quiet type.
 * Replaces a 4-cell box grid that fought the calm of the hero below it.
 */
export function TrustStrip() {
  const { t } = useI18n()

  const items = [
    { value: t('trust.item1.value'), label: t('trust.item1.label') },
    { value: t('trust.item2.value'), label: t('trust.item2.label') },
    { value: t('trust.item3.value'), label: t('trust.item3.label') },
    { value: t('trust.item4.value'), label: t('trust.item4.label') },
  ]

  return (
    <section className="bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 lg:py-10">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
          {items.map((item, i) => (
            <li key={i} className="inline-flex items-baseline gap-2">
              <span className="font-mono text-[12px] text-foreground tracking-wide">{item.value}</span>
              <span className="text-[11px] text-foreground/55 tracking-wide">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
