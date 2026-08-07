'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/clinics-kpi'
import { CountUp } from './count-up'

function useKpiT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

// Every figure is stated as its source states it. No card carries a number the
// paper does not print, except c3, which is the midpoint of a range the paper
// does print and says so on its face.
const CARDS = [
  { key: 'c1', value: 93, prefix: '', suffix: '%' },
  { key: 'c2', value: 26, prefix: '−', suffix: '%' },
  { key: 'c3', value: 1011, prefix: '$', suffix: '' },
  { key: 'c4', value: 46, prefix: '', suffix: '%' },
] as const

export function ClinicsKpiCards() {
  const t = useKpiT()
  const ref = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 lg:py-24 px-6 lg:px-10 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <h2
            className="lg:col-span-6 font-display text-[28px] lg:text-[36px] leading-[1.12] tracking-[-0.02em]"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('kpi.title')}
          </h2>
          <p className="lg:col-span-5 lg:col-start-8 text-[14px] leading-[1.65] text-foreground/70 self-end">
            {t('kpi.note')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {CARDS.map((c) => (
            <article key={c.key} className="bg-background p-7 lg:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass mb-6">{t(`kpi.${c.key}.eyebrow`)}</p>
              <div
                className="font-display text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] tabular-nums"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                <CountUp value={c.value} prefix={c.prefix} suffix={c.suffix} started={started} />
              </div>
              <p className="mt-4 text-[13.5px] leading-[1.6] text-foreground/75">{t(`kpi.${c.key}.label`)}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/45">{t(`kpi.${c.key}.src`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
