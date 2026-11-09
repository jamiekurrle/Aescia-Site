'use client'

import { useEffect, useState } from 'react'
import { useI18n } from '@/lib/i18n'

// Published figures shown over the hero video, one at a time on a long loop.
// Every figure carries its source line; keep them in step with
// Business-Brain (tga-claims-guide, au-cardiac-surgery-readmission-benchmarks).
const METRIC_COUNT = 8
const HOLD_MS = 5600
const FADE_MS = 700

export function HeroMetrics() {
  const { t } = useI18n()
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    let swap: ReturnType<typeof setTimeout>
    const hold = setTimeout(() => {
      setVisible(false)
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % METRIC_COUNT)
        setVisible(true)
      }, FADE_MS)
    }, HOLD_MS)
    return () => {
      clearTimeout(hold)
      clearTimeout(swap)
    }
  }, [index, paused])

  const n = index + 1

  return (
    <div
      className="max-w-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="metric-fade"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(6px)' }}
      >
        <p
          className="font-display text-[48px] sm:text-[60px] lg:text-[72px] leading-[1] tracking-[-0.03em] text-white"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {t(`home.metric.${n}.value`)}
        </p>
        <p className="mt-3 text-[17px] lg:text-[19px] leading-[1.45] text-white/90">{t(`home.metric.${n}.label`)}</p>
        <p className="mt-3 text-[12px] leading-[1.4] text-white/60">{t(`home.metric.${n}.source`)}</p>
      </div>

      <div className="mt-6 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: METRIC_COUNT }, (_, i) => (
          <span
            key={i}
            className={`h-[3px] rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-white/85' : 'w-2 bg-white/30'}`}
          />
        ))}
      </div>

      <style jsx>{`
        .metric-fade {
          transition: opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .metric-fade {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}
