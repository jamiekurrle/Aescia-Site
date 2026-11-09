'use client'

import { useEffect, useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { TypewriterText } from './typewriter-text'

// Three questions over the hero video, each answered by a published figure.
// Every figure carries its source line; keep them in step with
// Business-Brain (au-cardiac-surgery-readmission-benchmarks and the
// 2026-11-08 homepage capture).
const SLIDES = [
  { ask: 1, metric: 4 }, // anxious, not knowing what to do -> 40 to 80% forgotten
  { ask: 2, metric: 2 }, // whether to call the surgical team -> 1 in 8 back in hospital
  { ask: 3, metric: 1 }, // unsure the prep worked -> up to 1 in 4 inadequate
]
const FADE_MS = 400 // keep in step with the 400ms transitions below
const TYPE_SPEED_MS = 22 // keep in step with TITLE_SPEED_MS in editorial-hero
const AFTER_TYPED_MS = 1100 // pause on the finished question before the answer

// Long enough to read the text once, and no longer. Chinese characters carry
// about a word each, so they count triple.
function readMs(text: string, min: number, max: number) {
  const weight = /[぀-鿿]/.test(text) ? 3 : 1
  return Math.min(max, Math.max(min, 700 + text.length * weight * 32))
}

type Phase = 'ask' | 'answer' | 'out'

export function HeroMetrics() {
  const { t } = useI18n()
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('ask')
  const [paused, setPaused] = useState(false)
  const [typed, setTyped] = useState(false)

  const slide = SLIDES[index]
  const ask = t(`home.ask.${slide.ask}`)
  const value = t(`home.metric.${slide.metric}.value`)
  const label = t(`home.metric.${slide.metric}.label`)
  const source = t(`home.metric.${slide.metric}.source`)

  // A new question (next slide or a language switch) types out afresh.
  useEffect(() => setTyped(false), [ask])

  useEffect(() => {
    if (paused) return
    let timer: ReturnType<typeof setTimeout>
    if (phase === 'ask') {
      // The question types out first; the answer follows a beat after.
      if (!typed) return
      timer = setTimeout(() => setPhase('answer'), AFTER_TYPED_MS)
    } else if (phase === 'answer') {
      timer = setTimeout(() => setPhase('out'), readMs(value + label, 2600, 4400))
    } else {
      timer = setTimeout(() => {
        setIndex((i) => (i + 1) % SLIDES.length)
        setTyped(false)
        setPhase('ask')
      }, FADE_MS)
    }
    return () => clearTimeout(timer)
  }, [phase, paused, typed, value, label])

  const answered = phase === 'answer'
  const shown = phase !== 'out'

  return (
    <div
      className="w-full max-w-5xl mx-auto text-center h-[clamp(300px,44vh,420px)] flex flex-col justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hm-fade" style={{ opacity: shown ? 1 : 0 }}>
        {/* The question starts large, then shrinks above its answer in the same type. */}
        <p
          className={`hm-ask mx-auto max-w-4xl font-display font-semibold tracking-[-0.02em] text-white text-balance [text-shadow:0_2px_30px_rgba(15,26,51,0.6)] ${
            answered ? 'text-[clamp(22px,2.6vw,38px)] leading-[1.12]' : 'text-[clamp(30px,4.6vw,68px)] leading-[1.05]'
          }`}
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          <TypewriterText key={`${index}-${ask}`} text={ask} speedMs={TYPE_SPEED_MS} onDone={() => setTyped(true)} />
        </p>

        <div
          className="hm-answer"
          style={{
            opacity: answered ? 1 : 0,
            transform: answered ? 'none' : 'translateY(12px) scale(0.98)',
            maxHeight: answered ? 600 : 0,
          }}
          aria-hidden={!answered}
        >
          <p
            className="mt-4 lg:mt-6 font-display font-semibold text-[clamp(56px,8vw,130px)] leading-[0.92] tracking-[-0.04em] text-white text-balance [text-shadow:0_4px_40px_rgba(15,26,51,0.55)]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {value}
          </p>
          <p className="mt-4 lg:mt-5 mx-auto max-w-3xl text-[clamp(17px,1.8vw,26px)] leading-[1.3] font-medium text-white [text-shadow:0_2px_24px_rgba(15,26,51,0.6)]">
            {label}
          </p>
          <p className="mt-3 text-[12px] lg:text-[13px] leading-[1.4] text-white/70">{source}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-1.5" aria-hidden="true">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`h-[3px] rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-white/85' : 'w-2 bg-white/30'}`}
          />
        ))}
      </div>

      <style jsx>{`
        .hm-fade {
          transition: opacity 400ms ease;
        }
        .hm-ask {
          transition: font-size 400ms ease;
        }
        .hm-answer {
          overflow: hidden;
          transition: opacity 400ms ease, transform 400ms ease, max-height 400ms ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .hm-answer {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}
