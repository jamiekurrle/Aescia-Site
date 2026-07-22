'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/instrument-panel'
import { CountUp } from './count-up'

// Resolves ip.* keys against the active locale with an English fallback,
// mirroring the exploded-engine dictionary pattern.
function usePanelT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

const STATS = [
  { key: 's1', value: 54, suffix: '%' },
  { key: 's2', value: 15, suffix: '%' },
  { key: 's3', value: 8, suffix: '%' },
  { key: 's4', value: 550, suffix: '', proof: true },
] as const

export function InstrumentPanel() {
  const t = usePanelT()
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
    <section ref={ref} className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">{t('ip.eyebrow')}</span>
          <span className="h-px w-10 bg-accent/50" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {STATS.map((s) => (
            <div key={s.key} className="border-l border-border pl-5">
              <div
                className={`font-display text-[40px] lg:text-[52px] leading-none tracking-[-0.02em] tabular-nums ${
                  'proof' in s && s.proof ? 'text-brass' : 'text-foreground'
                }`}
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                <CountUp value={s.value} suffix={s.suffix} started={started} />
              </div>
              <p className="mt-3 text-[13.5px] leading-[1.5] text-foreground/75 max-w-[26ch]">{t(`ip.${s.key}.label`)}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/45">{t(`ip.${s.key}.src`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
