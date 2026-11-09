'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

// Questions patients ask at home. The first ten belong to the days before a
// procedure, the last ten to the weeks after it, so they scroll past in the
// same order as the two paragraphs in the pinned centre column.
const BEFORE_COUNT = 10
const AFTER_COUNT = 10
const QUESTION_KEYS = Array.from({ length: BEFORE_COUNT + AFTER_COUNT }, (_, i) => `home.q.${i + 1}`)

// Desktop placement: alternate sides, each half of the scroll holds its own
// ten questions, and a small fixed inset pattern keeps the edges uneven.
const INSETS = [2, 6, 3.5, 8, 1.5, 5, 7, 3, 6.5, 2.5]
function placement(i: number) {
  const half = i < BEFORE_COUNT ? 0 : 1
  const j = half === 0 ? i : i - BEFORE_COUNT
  const count = half === 0 ? BEFORE_COUNT : AFTER_COUNT
  const start = half === 0 ? 5 : 53
  const span = 40
  const top = start + (j / (count - 1)) * span
  const side: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right'
  return { top, side, inset: INSETS[j % INSETS.length] }
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v))
}

function Arrow() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
    </svg>
  )
}

export function QuestionField() {
  const { t } = useI18n()
  const fieldRef = useRef<HTMLDivElement>(null)
  const bubbleRefs = useRef<(HTMLElement | null)[]>([])
  const beforeRef = useRef<HTMLParagraphElement>(null)
  const afterRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const paint = () => {
      frame = 0
      const vh = window.innerHeight
      const still = reduce.matches

      // Each question is fully visible through the middle of the screen and
      // fades out towards the top and bottom edges.
      for (const el of bubbleRefs.current) {
        if (!el || el.offsetParent === null) continue
        const r = el.getBoundingClientRect()
        const c = (r.top + r.height / 2) / vh
        const d = Math.abs(c - 0.5)
        const o = clamp(1 - (d - 0.14) / 0.3, 0, 1)
        el.style.opacity = String(still ? Math.max(o, 0.25) : o)
        el.style.transform = still ? 'none' : `translateY(${((c - 0.5) * -36).toFixed(1)}px)`
      }

      // Pinned centre column: the "before" paragraph is bright for the first
      // half of the scroll, the "after" paragraph for the second.
      const field = fieldRef.current
      if (field && field.offsetParent !== null && beforeRef.current && afterRef.current) {
        const r = field.getBoundingClientRect()
        const p = clamp(-r.top / Math.max(1, r.height - vh), 0, 1)
        const b = clamp((0.56 - p) / 0.12, 0, 1)
        const a = clamp((p - 0.44) / 0.12, 0, 1)
        beforeRef.current.style.opacity = String(0.3 + 0.7 * b)
        afterRef.current.style.opacity = String(0.3 + 0.7 * a)
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    reduce.addEventListener('change', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      reduce.removeEventListener('change', onScroll)
    }
  }, [])

  const bubbleClass =
    'max-w-[280px] rounded-2xl bg-card text-card-foreground border border-border px-5 py-3.5 text-[15px] leading-[1.45] shadow-[0_10px_30px_rgba(27,39,69,0.08)] will-change-transform transition-opacity duration-150'

  const title = (
    <h2
      className="font-display text-[34px] lg:text-[46px] leading-[1.08] tracking-[-0.02em] font-normal"
      style={{ fontVariationSettings: "'opsz' 144" }}
    >
      {t('home.problem.title')}
    </h2>
  )

  return (
    <section className="relative bg-background text-foreground">
      {/* Wide screens: tall scroll field, pinned centre text, questions drifting
          through the side gutters. */}
      <div ref={fieldRef} className="relative hidden xl:block" style={{ height: '280vh' }}>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="max-w-xl px-6">
            {title}
            <p ref={beforeRef} className="mt-10 text-[19px] leading-[1.65] text-foreground/85 transition-opacity duration-300">
              {t('home.problem.before')}
            </p>
            <p ref={afterRef} className="mt-6 text-[19px] leading-[1.65] text-foreground/85 transition-opacity duration-300" style={{ opacity: 0.3 }}>
              {t('home.problem.after')}
            </p>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none max-w-[1600px] mx-auto" aria-hidden="true">
          {QUESTION_KEYS.map((key, i) => {
            const { top, side, inset } = placement(i)
            return (
              <p
                key={key}
                ref={(el) => {
                  bubbleRefs.current[i] = el
                }}
                className={`absolute ${bubbleClass} ${side === 'left' ? 'rounded-bl-md' : 'rounded-br-md'}`}
                style={{ top: `${top}%`, [side]: `${inset}%`, opacity: 0 }}
              >
                {t(key)}
              </p>
            )
          })}
        </div>
      </div>

      {/* Phones and tablets: the same text, then the questions as a
          conversation that fades in and out as it scrolls past. */}
      <div className="xl:hidden max-w-2xl mx-auto px-6 pt-24 pb-8">
        {title}
        <p className="mt-8 text-[17px] leading-[1.65] text-foreground/85">{t('home.problem.before')}</p>
        <div className="mt-10 space-y-4">
          {QUESTION_KEYS.slice(0, BEFORE_COUNT).map((key, i) => (
            <div key={key} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <p
                ref={(el) => {
                  bubbleRefs.current[BEFORE_COUNT + AFTER_COUNT + i] = el
                }}
                className={`${bubbleClass} ${i % 2 === 0 ? 'rounded-bl-md' : 'rounded-br-md'}`}
              >
                {t(key)}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-14 text-[17px] leading-[1.65] text-foreground/85">{t('home.problem.after')}</p>
        <div className="mt-10 space-y-4">
          {QUESTION_KEYS.slice(BEFORE_COUNT).map((key, i) => (
            <div key={key} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <p
                ref={(el) => {
                  bubbleRefs.current[2 * BEFORE_COUNT + AFTER_COUNT + i] = el
                }}
                className={`${bubbleClass} ${i % 2 === 0 ? 'rounded-bl-md' : 'rounded-br-md'}`}
              >
                {t(key)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-16 xl:pt-8 pb-28 lg:pb-36 text-center">
        <p
          className="font-display text-[34px] lg:text-[54px] leading-[1.08] tracking-[-0.02em] text-foreground"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {t('home.problem.tagline')}
        </p>
        <Link
          href="/contact"
          className="mt-12 inline-flex items-center gap-3 bg-foreground text-background font-medium px-8 py-4 text-[15px] tracking-wide hover:bg-foreground/90 transition-colors min-h-[48px]"
        >
          {t('cta.button')}
          <Arrow />
        </Link>
      </div>
    </section>
  )
}
