'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { TypewriterText } from './typewriter-text'

// A short story over the hero video. Each slide comes in threes: a question
// patients ask, the published figure behind it, then what Aescia does about
// it, typed beneath while the first two stay up. Every figure carries its
// source line; keep them in step with Business-Brain (the 2026-11-08 and
// 2026-11-09 homepage captures). Story lines follow the TGA claims guide:
// Aescia delivers the team's content, the team decides.
type Slide = { ask: number; metric: number; say: number } | { say: number }
const SLIDES: Slide[] = [
  { ask: 7, metric: 9, say: 5 }, // tell the surgeon? -> over 4 in 10 complications at home -> check-ins before and after
  { ask: 1, metric: 4, say: 1 }, // forgot what the care team said -> 40 to 80% forgotten -> instructions when you need them
  { ask: 3, metric: 1, say: 6 }, // unsure the prep worked -> up to 1 in 4 inadequate -> each prep step on time
  { say: 4 }, // no one left wondering what to do
]

// Timings. The CSS transitions below use the same values as literals
// (styled-jsx cannot take interpolated constants).
const TYPE_SPEED_MS = 22 // question and label; keep in step with TITLE_SPEED_MS in editorial-hero
const VALUE_SPEED_MS = 55 // the large figure types more slowly
const PAUSE_MS = 1380 // time to read the finished question before it shrinks
const SQUEEZE_MS = 320 // question shrinks and the answer opens (320ms below)
const OUT_MS = 640 // both parts roll down and go (480ms + 160ms stagger below)

// Once everything has typed, hold long enough to read the question, figure
// and label once (the source is not counted). Chinese characters carry about
// a word each, so they count triple.
function holdMs(text: string) {
  const weight = /[぀-鿿]/.test(text) ? 3 : 1
  return Math.min(4200, Math.max(2200, 900 + text.length * weight * 22))
}

type Phase = 'ask' | 'answer' | 'do' | 'out'

export function HeroMetrics() {
  const { t } = useI18n()
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('ask')
  const [paused, setPaused] = useState(false)
  const [askTyped, setAskTyped] = useState(false)
  const [valueTyped, setValueTyped] = useState(false)
  const [labelTyped, setLabelTyped] = useState(false)
  const [doTyped, setDoTyped] = useState(false)
  // While answered, the question's width is pinned in em so it shrinks with
  // its font size and keeps the same line breaks it had at full size.
  const [askWidthEm, setAskWidthEm] = useState<number | null>(null)
  const askRef = useRef<HTMLParagraphElement>(null)

  const slide = SLIDES[index]
  const statement = !('ask' in slide)
  const ask = 'ask' in slide ? t(`home.ask.${slide.ask}`) : t(`home.story.${slide.say}`)
  const value = 'ask' in slide ? t(`home.metric.${slide.metric}.value`) : ''
  const label = 'ask' in slide ? t(`home.metric.${slide.metric}.label`) : ''
  const source = 'ask' in slide ? t(`home.metric.${slide.metric}.source`) : ''
  const doLine = 'ask' in slide ? t(`home.story.${slide.say}`) : ''

  // A new slide (or a language switch) types out afresh.
  useEffect(() => {
    setAskTyped(false)
    setValueTyped(false)
    setLabelTyped(false)
    setDoTyped(false)
  }, [ask, value, label, doLine])

  useEffect(() => {
    if (paused) return
    let timer: ReturnType<typeof setTimeout> | undefined
    if (phase === 'ask') {
      if (!askTyped) return
      // A story line has no answer: read it, then it rolls away.
      if (statement) {
        timer = setTimeout(() => setPhase('out'), holdMs(ask))
        return () => clearTimeout(timer)
      }
      timer = setTimeout(() => {
        const el = askRef.current
        if (el) {
          const fontPx = parseFloat(getComputedStyle(el).fontSize)
          if (fontPx > 0) setAskWidthEm(el.getBoundingClientRect().width / fontPx)
        }
        setPhase('answer')
      }, PAUSE_MS)
    } else if (phase === 'answer') {
      // Read the figure and its label, then Aescia's line types beneath.
      if (!labelTyped) return
      timer = setTimeout(() => setPhase('do'), holdMs(value + label))
    } else if (phase === 'do') {
      if (!doTyped) return
      timer = setTimeout(() => setPhase('out'), holdMs(doLine))
    } else {
      timer = setTimeout(() => {
        setIndex((i) => (i + 1) % SLIDES.length)
        setAskTyped(false)
        setValueTyped(false)
        setLabelTyped(false)
        setDoTyped(false)
        setAskWidthEm(null)
        setPhase('ask')
      }, OUT_MS)
    }
    return () => clearTimeout(timer)
  }, [phase, paused, askTyped, labelTyped, doTyped, statement, ask, value, label, doLine])

  const answering = !statement && phase !== 'ask' // question small, answer block open
  const doing = !statement && (phase === 'do' || phase === 'out')
  const leaving = phase === 'out'

  return (
    <div
      className="w-full max-w-5xl mx-auto text-center flex flex-col justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* The question types out large, then shrinks above its answer in the same type. */}
      <p
        ref={askRef}
        className={`hm-ask hm-roll mx-auto max-w-4xl font-display tracking-[-0.02em] ${statement ? 'font-normal' : 'font-semibold'} text-white text-balance [text-shadow:0_2px_30px_rgba(15,26,51,0.6)] ${
          answering ? 'text-[clamp(22px,2.6vw,38px)] leading-[1.12]' : 'text-[clamp(30px,4.6vw,68px)] leading-[1.05]'
        } ${leaving ? 'hm-gone hm-late' : ''}`}
        style={{
          fontVariationSettings: "'opsz' 144",
          maxWidth: answering && askWidthEm ? `${askWidthEm}em` : undefined,
        }}
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
        {/* What Aescia does, typed beneath the question and figure. Its space
            is held from the moment the answer opens so nothing shifts. */}
        <p
          className="mt-8 lg:mt-10 mx-auto max-w-3xl font-display font-normal text-[clamp(22px,2.4vw,34px)] leading-[1.15] tracking-[-0.01em] text-white text-balance [text-shadow:0_2px_30px_rgba(15,26,51,0.6)]"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {doing ? (
            <TypewriterText key={`d-${index}-${doLine}`} text={doLine} speedMs={TYPE_SPEED_MS} onDone={() => setDoTyped(true)} />
          ) : (
            <span className="invisible">{doLine}</span>
          )}
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
