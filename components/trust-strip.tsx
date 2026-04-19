'use client'

import { useI18n } from '@/lib/i18n'

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
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`py-8 lg:py-10 px-4 ${i > 0 ? 'md:border-l border-border' : ''} ${i > 1 ? 'border-t md:border-t-0' : ''} ${i === 1 ? 'border-l' : ''} text-center`}
            >
              <div className="font-mono text-[13px] text-foreground font-medium tracking-wide">{item.value}</div>
              <div className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-foreground/50 font-sans">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
