'use client'

import { useI18n } from '@/lib/i18n'

export function EvidenceRibbon() {
  const { t } = useI18n()

  const facts = [
    { value: t('evidence.fact1.value'), label: t('evidence.fact1.label'), mono: true },
    { value: t('evidence.fact2.value'), label: t('evidence.fact2.label'), mono: false },
    { value: t('evidence.fact3.value'), label: t('evidence.fact3.label'), mono: false },
  ]

  return (
    <section className="bg-background py-28 lg:py-40 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('evidence.eyebrow')}</span>
          </div>
          <h2
            className="font-display text-[34px] lg:text-[46px] leading-[1.08] tracking-[-0.025em] mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('evidence.title')}
          </h2>
          <p className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/75 max-w-lg">
            {t('evidence.body')}
          </p>
          {/* /evidence CTA temporarily removed pending TGA-compliant rewrite of the page. */}
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <dl className="grid gap-0">
            {facts.map((fact, i) => (
              <div
                key={i}
                className={`py-8 lg:py-10 grid grid-cols-[auto_1fr] gap-8 items-baseline ${
                  i > 0 ? 'border-t border-border' : ''
                }`}
              >
                <dt
                  className={`${
                    fact.mono ? 'font-mono text-[18px] lg:text-[20px]' : 'font-display text-[40px] lg:text-[52px]'
                  } text-foreground tracking-tight leading-none`}
                  style={
                    !fact.mono
                      ? { fontVariationSettings: "'opsz' 144" }
                      : undefined
                  }
                >
                  {fact.value}
                </dt>
                <dd className="text-[12px] lg:text-[13px] uppercase tracking-[0.18em] text-foreground/55 font-sans">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
