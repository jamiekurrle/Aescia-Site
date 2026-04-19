'use client'

import { useI18n } from '@/lib/i18n'

/**
 * Three pillars, restrained. Uses hairline top borders instead of boxed
 * cards. Reads as an editorial three-column, not a marketing grid.
 */
export function Pillars() {
  const { t } = useI18n()

  const items = [
    { key: 'transparent', n: '01' },
    { key: 'clinician', n: '02' },
    { key: 'dual', n: '03' },
  ]

  return (
    <section className="bg-background py-28 lg:py-40 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <h2
            className="font-display text-[34px] lg:text-[46px] leading-[1.08] tracking-[-0.025em]"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('pillars.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {items.map((item) => (
            <article key={item.key} className="border-t border-foreground/15 pt-8">
              <div className="flex items-center gap-3 mb-10">
                <span className="font-mono text-[12px] text-brass tracking-widest">{item.n}</span>
              </div>
              <h3
                className="font-display text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] mb-4"
                style={{ fontVariationSettings: "'opsz' 80" }}
              >
                {t(`pillars.${item.key}.title`)}
              </h3>
              <p className="text-[14.5px] lg:text-[15px] leading-[1.7] text-foreground/75">
                {t(`pillars.${item.key}.desc`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
