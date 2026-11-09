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

// Timings. The CSS transitions below use the same values as literals
// (styled-jsx cannot take interpolated constants).
const TYPE_SPEED_MS = 22 // question and label; keep in step with TITLE_SPEED_MS in editorial-hero
const VALUE_SPEED_MS = 55 // the large figure types more slowly
const PAUSE_MS = 880 // beat on the finished question before it shrinks
const SQUEEZE_MS = 320 // question shrinks and the answer opens (320ms below)
const OUT_MS = 640 // both parts roll down and go (480ms + 160ms stagger below)

// Once everything has typed, hold long enough to read the question, figure
// and label once (the source is not counted). Chinese characters carry about
// a word each, so they count triple.
function holdMs(text: string) {
  const weight = /[぀-鿿]/.test(text) ? 3 : 1
  return Math.min(4200, Math.max(2200, 900 + text.length * weight * 22))
}

type Phase = 'ask' | 'answer' | 'out'

export function HeroMetrics() {
  const { t } = useI18n()
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('ask')
  const [paused, setPaused] = useState(false)
  const [askTyped, setAskTyped] = useState(false)
  const [valueTyped, setValueTyped] = useState(false)
  const [labelTyped, setLabelTyped] = useState(false)

  const slide = SLIDES[index]
  const ask = t(`home.ask.${slide.ask}`)
  const value = t(`home.metric.${slide.metric}.value`)
  const label = t(`home.metric.${slide.metric}.label`)
  const source = t(`home.metric.${slide.metric}.source`)

  // A new slide (or a language switch) types out afresh.
  useEffect(() => {
    setAskTyped(false)
    setValueTyped(false)
    setLabelTyped(false)
  }, [ask, value, label])

  useEffect(() => {
    if (paused) return
    let timer: ReturnType<typeof setTimeout> | undefined
    if (phase === 'ask') {
      if (!askTyped) return
      timer = setTimeout(() => setPhase('answer'), PAUSE_MS)
    } else if (phase === 'answer') {
      if (!labelTyped) return
      timer = setTimeout(() => setPhase('out'), holdMs(ask + value + label))
    } else {
      timer = setTimeout(() => {
        setIndex((i) => (i + 1) % SLIDES.length)
        setAskTyped(false)
        setValueTyped(false)
        setLabelTyped(false)
        setPhase('ask')
      }, OUT_MS)
    }
    return () => clearTimeout(timer)
  }, [phase, paused, askTyped, labelTyped, ask, value, label])

  const answering = phase !== 'ask' // question small, answer block open
  const leaving = phase === 'out'

  return (
    <div
      className="w-full max-w-5xl mx-auto text-center h-[clamp(300px,44vh,420px)] flex flex-col justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* The question types out large, then shrinks above its answer in the same type. */}
      <p
        className={`hm-ask hm-roll mx-auto max-w-4xl font-display font-semibold tracking-[-0.02em] text-white text-balance [text-shadow:0_2px_30px_rgba(15,26,51,0.6)] ${
          answering ? 'text-[clamp(22px,2.6vw,38px)] leading-[1.12]' : 'text-[clamp(30px,4.6vw,68px)] leading-[1.05]'
        } ${leaving ? 'hm-gone hm-late' : ''}`}
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        <TypewriterText key={`q-${index}-${ask}`} text={ask} speedMs={TYPE_SPEED_MS} onDone={() => setAskTyped(true)} />
      </p>

      <div
        className={`hm-answer hm-roll ${leaving ? 'hm-gone' : answering ? '' : 'hm-hidden'}`}
        style={{ maxHeight: answering ? 600 : 0 }}
        aria-hidden={!answering}
      >
        <p
          className="mt-4 lg:mt-6 font-display font-semibold text-[clamp(56px,8vw,130px)] leading-[0.92] tracking-[-0.04em] text-white text-balance [text-shadow:0_4px_40px_rgba(15,26,51,0.55)]"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          <span className="relative inline-block pb-[0.06em]">
            {answering ? (
              <TypewriterText
                key={`v-${index}-${value}`}
                text={value}
                speedMs={VALUE_SPEED_MS}
                startDelayMs={SQUEEZE_MS}
                onDone={() => setValueTyped(true)}
              />
            ) : (
              <span className="invisible">{value}</span>
            )}
            <span
              aria-hidden="true"
              className="hm-underline absolute left-0 right-0 bottom-0 h-[0.05em] min-h-[3px] rounded-full bg-white"
              style={{ transform: valueTyped ? 'scaleX(1)' : 'scaleX(0)' }}
            />
          </span>
        </p>
        <p className="mt-4 lg:mt-5 mx-auto max-w-3xl text-[clamp(17px,1.8vw,26px)] leading-[1.3] font-medium text-white [text-shadow:0_2px_24px_rgba(15,26,51,0.6)]">
          {valueTyped ? (
            <TypewriterText
              key={`l-${index}-${label}`}
              text={label}
              speedMs={TYPE_SPEED_MS}
              startDelayMs={200}
              onDone={() => setLabelTyped(true)}
            />
          ) : (
            <span className="invisible">{label}</span>
          )}
        </p>
        <p className="hm-source mt-3 text-[12px] lg:text-[13px] leading-[1.4] text-white/70" style={{ opacity: labelTyped ? 1 : 0 }}>
          {source}
        </p>
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
        .hm-ask {
          transition: font-size 320ms ease, opacity 480ms ease, transform 480ms ease;
        }
        .hm-answer {
          overflow: hidden;
          transition: max-height 320ms ease, opacity 480ms ease, transform 480ms ease;
        }
        .hm-roll {
          opacity: 1;
          transform: none;
        }
        .hm-gone {
          opacity: 0;
          transform: translateY(36px);
        }
        .hm-hidden {
          opacity: 0;
          transform: translateY(12px);
        }
        .hm-late {
          transition-delay: 0ms, 160ms, 160ms;
        }
        .hm-underline {
          transform-origin: left center;
          transition: transform 420ms ease-out;
        }
        :global([dir='rtl']) .hm-underline {
          transform-origin: right center;
        }
        .hm-source {
          transition: opacity 400ms ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .hm-gone,
          .hm-hidden {
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}
