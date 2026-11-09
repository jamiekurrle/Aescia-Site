'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n'

// Questions patients ask at home. Keys 1-10 and 21-26 belong to the days
// before a procedure, keys 11-20 and 27-32 to the weeks after it, and 33-40
// are the worries that run through both. Key 33 ("I don't know what to do.")
// sits on top of each pile when the page loads.
const BEFORE_KEYS = [1, 34, 2, 3, 37, 4, 5, 39, 6, 7, 8, 9, 10, 21, 22, 23, 24, 25, 26, 33].map((n) => `home.q.${n}`)
const AFTER_KEYS = [11, 35, 12, 13, 36, 14, 15, 38, 16, 17, 40, 18, 19, 20, 27, 28, 29, 30, 31, 32, 33].map((n) => `home.q.${n}`)

// Each pile starts with a handful already there, then a new question lands on
// top every EVERY_MS. With two piles on screen that is 2 to 3 a second. The
// oldest fades out once a pile holds `max`.
const EVERY_MS = 850
const FADE_OUT_MS = 700 // keep in step with the 700ms rule below

function frac(x: number) {
  return x - Math.floor(x)
}

// Fixed positions for the starting pile (identical on server and client).
function spot(i: number, seed: number, maxLeft: number) {
  return {
    top: frac(i * 0.6180339 + seed) * 86,
    left: frac(i * 0.7548776 + seed * 1.7) * maxLeft,
  }
}

type Card = { id: number; key: string; top: number; left: number; leaving: boolean }

function QuestionPile({
  keys,
  seed,
  maxLeft,
  start,
  max,
  firstDelayMs,
  className,
}: {
  keys: string[]
  seed: number
  maxLeft: number
  start: number
  max: number
  firstDelayMs: number
  className: string
}) {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  // The starting pile ends with the last key, so "I don't know what to do."
  // is on top.
  const [cards, setCards] = useState<Card[]>(() =>
    keys.slice(-start).map((key, i) => ({ id: i, key, ...spot(i, seed, maxLeft), leaving: false }))
  )
  const next = useRef({ id: start, key: 0 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let visible = false
    let interval: ReturnType<typeof setInterval> | undefined
    let kickoff: ReturnType<typeof setTimeout> | undefined

    const add = () => {
      if (!visible || document.hidden) return
      const id = next.current.id++
      const key = keys[next.current.key++ % keys.length]
      setCards((prev) => {
        const card: Card = { id, key, top: Math.random() * 86, left: Math.random() * maxLeft, leaving: false }
        // Retire the oldest cards beyond `max`, and any card already showing
        // this question, so no text appears twice.
        const settled = prev.filter((c) => !c.leaving)
        const retire = new Set(settled.filter((c) => c.key === key).map((c) => c.id))
        const remaining = settled.filter((c) => !retire.has(c.id))
        remaining.slice(0, Math.max(0, remaining.length + 1 - max)).forEach((c) => retire.add(c.id))
        return [...prev.map((c) => (retire.has(c.id) ? { ...c, leaving: true } : c)), card]
      })
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    if (ref.current) observer.observe(ref.current)
    kickoff = setTimeout(() => {
      add()
      interval = setInterval(add, EVERY_MS)
    }, firstDelayMs)

    return () => {
      observer.disconnect()
      clearTimeout(kickoff)
      clearInterval(interval)
    }
  }, [keys, max, maxLeft, firstDelayMs])

  // Cards that have finished fading are removed here rather than in add(),
  // so a retired card always gets its full fade.
  useEffect(() => {
    if (!cards.some((c) => c.leaving)) return
    const timer = setTimeout(() => setCards((prev) => prev.filter((c) => !c.leaving)), FADE_OUT_MS)
    return () => clearTimeout(timer)
  }, [cards])

  return (
    <div ref={ref} className={`relative ${className}`} aria-hidden="true">
      {cards.map((card) => (
        <p
          key={card.id}
          className={`q-card absolute max-w-[260px] rounded-2xl bg-[#26365e] text-white border border-white/15 px-4 py-2.5 text-[14px] leading-[1.4] shadow-[0_10px_30px_rgba(8,14,30,0.45)] ${
            card.leaving ? 'q-card-leaving' : ''
          }`}
          style={{ top: `${card.top.toFixed(1)}%`, left: `${card.left.toFixed(1)}%` }}
        >
          {t(card.key)}
        </p>
      ))}
    </div>
  )
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

  const centre = (
    <div className="relative z-10">
      <h2
        className="font-display text-[34px] lg:text-[44px] leading-[1.08] tracking-[-0.02em] font-normal"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        {t('home.problem.title')}
      </h2>
      <p className="mt-8 text-[17px] lg:text-[18px] leading-[1.65] text-white/85">{t('home.problem.before')}</p>
      <p className="mt-5 text-[17px] lg:text-[18px] leading-[1.65] text-white/85">{t('home.problem.after')}</p>
      <p
        className="mt-12 font-display text-[30px] lg:text-[38px] leading-[1.1] tracking-[-0.02em]"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        {t('home.problem.tagline')}
      </p>
      <Link
        href="/contact"
        className="mt-8 inline-flex items-center gap-3 bg-white text-[#1B2745] font-medium px-7 py-4 text-[15px] tracking-wide hover:bg-white/90 transition-colors min-h-[48px]"
      >
        {t('cta.button')}
        <Arrow />
      </Link>
    </div>
  )

  return (
    <section className="relative bg-[#1B2745] text-white overflow-hidden">
      {/* Wide screens: questions before a procedure pile up on the left, after
          surgery on the right, the text between them. */}
      <div className="hidden xl:grid grid-cols-[1fr_minmax(0,34rem)_1fr] gap-12 items-center max-w-[1500px] mx-auto px-10 pt-4 pb-20">
        <QuestionPile keys={BEFORE_KEYS} seed={0.11} maxLeft={42} start={10} max={16} firstDelayMs={300} className="h-[640px]" />
        {centre}
        <QuestionPile keys={AFTER_KEYS} seed={0.47} maxLeft={42} start={10} max={16} firstDelayMs={700} className="h-[640px]" />
      </div>

      {/* Phones and tablets: a pile above and below the text. */}
      <div className="xl:hidden max-w-2xl mx-auto px-6 pt-4 pb-16">
        <QuestionPile keys={BEFORE_KEYS} seed={0.11} maxLeft={34} start={6} max={9} firstDelayMs={300} className="h-[260px] mb-10" />
        {centre}
        <QuestionPile keys={AFTER_KEYS} seed={0.47} maxLeft={34} start={6} max={9} firstDelayMs={700} className="h-[260px] mt-12" />
      </div>

      <style jsx global>{`
        .q-card {
          animation: q-land 380ms ease-out both;
          transition: opacity 700ms ease;
        }
        .q-card-leaving {
          opacity: 0;
        }
        @keyframes q-land {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .q-card {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
