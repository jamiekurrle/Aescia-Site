'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

// Questions patients ask at home. Keys 1-10 and 21-26 belong to the days
// before a procedure, keys 11-20 and 27-32 to the weeks after it.
const BEFORE_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21, 22, 23, 24, 25, 26].map((n) => `home.q.${n}`)
const AFTER_KEYS = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 27, 28, 29, 30, 31, 32].map((n) => `home.q.${n}`)

// Small fixed offsets so each column's edge is uneven rather than ruled.
const OFFSETS = [0, 36, 12, 52, 4, 28, 60, 16, 44, 8, 32, 0, 48, 20, 56, 24]

// Phones: a shorter mix, alternating before and after.
const PHONE_KEYS = BEFORE_KEYS.slice(0, 6).flatMap((k, i) => [k, AFTER_KEYS[i]])

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
  const bubbles = useRef<(HTMLElement | null)[]>([])

  // Each question is fully visible through the middle of the screen and fades
  // towards the top and bottom edges as the page scrolls.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const paint = () => {
      frame = 0
      const vh = window.innerHeight
      for (const el of bubbles.current) {
        if (!el || el.offsetParent === null) continue
        const r = el.getBoundingClientRect()
        const d = Math.abs((r.top + r.height / 2) / vh - 0.5)
        const o = clamp(1 - (d - 0.28) / 0.24, 0, 1)
        el.style.opacity = String(reduce.matches ? Math.max(o, 0.35) : o)
        el.style.transform = reduce.matches ? 'none' : `translateY(${(((r.top + r.height / 2) / vh - 0.5) * -24).toFixed(1)}px)`
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const bubbleClass =
    'max-w-[300px] rounded-2xl bg-card text-card-foreground border border-border px-4 py-2 text-[14px] leading-[1.35] shadow-[0_8px_24px_rgba(27,39,69,0.07)] will-change-transform'

  let n = 0
  const bubble = (key: string, side: 'left' | 'right', offset = 0) => {
    const i = n++
    return (
      <p
        key={`${side}-${key}-${i}`}
        ref={(el) => {
          bubbles.current[i] = el
        }}
        className={`${bubbleClass} ${side === 'left' ? 'rounded-br-md' : 'rounded-bl-md'}`}
        style={offset ? (side === 'left' ? { marginRight: offset } : { marginLeft: offset }) : undefined}
      >
        {t(key)}
      </p>
    )
  }

  const centre = (
    <div>
      <h2
        className="font-display text-[34px] lg:text-[44px] leading-[1.08] tracking-[-0.02em] font-normal"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        {t('home.problem.title')}
      </h2>
      <p className="mt-8 text-[17px] lg:text-[18px] leading-[1.65] text-foreground/85">{t('home.problem.before')}</p>
      <p className="mt-5 text-[17px] lg:text-[18px] leading-[1.65] text-foreground/85">{t('home.problem.after')}</p>
      <p
        className="mt-12 font-display text-[30px] lg:text-[38px] leading-[1.1] tracking-[-0.02em]"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        {t('home.problem.tagline')}
      </p>
      <Link
        href="/contact"
        className="mt-8 inline-flex items-center gap-3 bg-foreground text-background font-medium px-7 py-4 text-[15px] tracking-wide hover:bg-foreground/90 transition-colors min-h-[48px]"
      >
        {t('cta.button')}
        <Arrow />
      </Link>
    </div>
  )

  return (
    <section className="relative bg-background text-foreground overflow-hidden">
      {/* Wide screens: questions before a procedure on the left, after surgery
          on the right, the text between them. */}
      <div className="hidden xl:grid grid-cols-[1fr_minmax(0,34rem)_1fr] gap-12 items-center max-w-[1500px] mx-auto px-10 py-16">
        <div className="flex flex-col items-end gap-2" aria-hidden="true">
          {BEFORE_KEYS.map((k, i) => bubble(k, 'left', OFFSETS[i]))}
        </div>
        {centre}
        <div className="flex flex-col items-start gap-2" aria-hidden="true">
          {AFTER_KEYS.map((k, i) => bubble(k, 'right', OFFSETS[(i + 5) % OFFSETS.length]))}
        </div>
      </div>

      {/* Phones and tablets: the text, then a shorter set of questions. */}
      <div className="xl:hidden max-w-2xl mx-auto px-6 py-20">
        <div className="flex flex-wrap gap-2 mb-12" aria-hidden="true">
          {PHONE_KEYS.slice(0, 6).map((k) => bubble(k, 'right'))}
        </div>
        {centre}
        <div className="flex flex-wrap justify-end gap-2 mt-12" aria-hidden="true">
          {PHONE_KEYS.slice(6).map((k) => bubble(k, 'left'))}
        </div>
      </div>
    </section>
  )
}
