'use client'

import { useI18n } from '@/lib/i18n'

export function Pillars() {
  const { t } = useI18n()

  const items = [
    { key: 'transparent', n: '01' },
    { key: 'clinician', n: '02' },
    { key: 'dual', n: '03' },
  ]

  return (
    <section className="bg-secondary py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <h2
            className="font-display text-[34px] lg:text-[46px] leading-[1.08] tracking-[-0.025em]"
            style={{ fontVariationSettings: "'opsz' 120, 'SOFT' 30" }}
          >
            {t('pillars.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {items.map((item) => (
            <div key={item.key} className="bg-secondary p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-10">
                <span className="font-mono text-[12px] text-brass tracking-widest">{item.n}</span>
                <span className="h-px w-8 bg-brass/50" />
              </div>
              <h3
                className="font-display text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] mb-4"
                style={{ fontVariationSettings: "'opsz' 80, 'SOFT' 30" }}
              >
                {t(`pillars.${item.key}.title`)}
              </h3>
              <p className="text-[14px] lg:text-[15px] leading-[1.65] text-foreground/70">
                {t(`pillars.${item.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
