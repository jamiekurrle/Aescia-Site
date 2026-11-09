'use client'

import { useEffect, useState } from 'react'
import { useI18n } from '@/lib/i18n'

// Published figures shown over the hero video, one at a time on a long loop.
// Every figure carries its source line; keep them in step with
// Business-Brain (tga-claims-guide, au-cardiac-surgery-readmission-benchmarks).
const METRIC_COUNT = 8
// Display order, strongest first: forgetting, readmission, prep, wrong
// hospital, anxiety, missed adenomas, lost surveillance, Canada.
const ORDER = [4, 2, 1, 6, 3, 5, 7, 8]
const FADE_MS = 400 // keep in step with the 400ms transition below

// Long enough to read the figure and its line once, and no longer.
// Chinese characters carry about a word each, so they count triple.
function holdMs(text: string) {
  const weight = /[぀-鿿]/.test(text) ? 3 : 1
  return Math.min(4600, Math.max(2400, 900 + text.length * weight * 32))
}

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
    }, holdMs(t(`home.metric.${ORDER[index]}.value`) + t(`home.metric.${ORDER[index]}.label`)))
    return () => {
      clearTimeout(hold)
      clearTimeout(swap)
    }
  }, [index, paused, t])

  const n = ORDER[index]

  return (
    <div
      className="w-full max-w-5xl mx-auto text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="metric-fade"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(10px) scale(0.98)' }}
      >
        <p
          className="font-display font-semibold text-[clamp(56px,11vw,180px)] text-balance leading-[0.92] tracking-[-0.04em] text-white [text-shadow:0_4px_40px_rgba(15,26,51,0.55)]"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {t(`home.metric.${n}.value`)}
        </p>
        <p className="mt-5 lg:mt-7 mx-auto max-w-3xl text-[clamp(19px,2.2vw,32px)] leading-[1.3] font-medium text-white [text-shadow:0_2px_24px_rgba(15,26,51,0.6)]">{t(`home.metric.${n}.label`)}</p>
        <p className="mt-4 text-[12px] lg:text-[13px] leading-[1.4] text-white/70">{t(`home.metric.${n}.source`)}</p>
      </div>

      <div className="mt-8 flex justify-center gap-1.5" aria-hidden="true">
        {Array.from({ length: METRIC_COUNT }, (_, i) => (
          <span
            key={i}
            className={`h-[3px] rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-white/85' : 'w-2 bg-white/30'}`}
          />
        ))}
      </div>

      <style jsx>{`
        .metric-fade {
          transition: opacity 400ms ease, transform 400ms ease;
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
