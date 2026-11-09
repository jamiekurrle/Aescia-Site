'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

// Questions patients ask at home. Keys 1-10 and 21-26 belong to the days
// before a procedure, keys 11-20 and 27-32 to the weeks after it.
const BEFORE_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21, 22, 23, 24, 25, 26].map((n) => `home.q.${n}`)
const AFTER_KEYS = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 27, 28, 29, 30, 31, 32].map((n) => `home.q.${n}`)
const PHONE_BEFORE = BEFORE_KEYS.slice(0, 8)
const PHONE_AFTER = AFTER_KEYS.slice(0, 8)

// Each question loops on the same cycle, offset so a new one appears every
// second or so and four to five are on screen at once, overlapping.
const CYCLE_S = 18

function frac(x: number) {
  return x - Math.floor(x)
}

// Quasi-random but fixed positions (no layout shift between renders).
function spot(i: number, seed: number, maxLeft: number) {
  return {
    top: `${(frac(i * 0.6180339 + seed) * 86).toFixed(1)}%`,
    left: `${(frac(i * 0.7548776 + seed * 1.7) * maxLeft).toFixed(1)}%`,
  }
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

  const cloud = (keys: string[], seed: number, maxLeft: number, offsetS: number, className: string) => (
    <div className={`relative ${className}`} aria-hidden="true">
      {keys.map((key, i) => (
        <p
          key={key}
          className="q-pop absolute max-w-[260px] rounded-2xl bg-card text-card-foreground border border-border px-4 py-2.5 text-[14px] leading-[1.4] shadow-[0_10px_30px_rgba(27,39,69,0.10)]"
          style={{
            ...spot(i, seed, maxLeft),
            animationDelay: `${-(i * (CYCLE_S / keys.length) + offsetS).toFixed(2)}s`,
          }}
        >
          {t(key)}
        </p>
      ))}
    </div>
  )

  const centre = (
    <div className="relative z-10">
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
      {/* Wide screens: questions before a procedure appear on the left, after
          surgery on the right, the text between them. */}
      <div className="hidden xl:grid grid-cols-[1fr_minmax(0,34rem)_1fr] gap-12 items-center max-w-[1500px] mx-auto px-10 py-20">
        {cloud(BEFORE_KEYS, 0.11, 42, 0, 'h-[640px]')}
        {centre}
        {cloud(AFTER_KEYS, 0.47, 42, CYCLE_S / 32, 'h-[640px]')}
      </div>

      {/* Phones and tablets: a band of questions above and below the text. */}
      <div className="xl:hidden max-w-2xl mx-auto px-6 py-16">
        {cloud(PHONE_BEFORE, 0.11, 34, 0, 'h-[260px] mb-10')}
        {centre}
        {cloud(PHONE_AFTER, 0.47, 34, CYCLE_S / 16, 'h-[260px] mt-12')}
      </div>

      <style jsx global>{`
        .q-pop {
          opacity: 0;
          animation: q-pop ${CYCLE_S}s ease-in-out infinite;
          will-change: opacity, transform;
        }
        @keyframes q-pop {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.97);
          }
          4% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          26% {
            opacity: 1;
            transform: translateY(-4px) scale(1);
          }
          31% {
            opacity: 0;
            transform: translateY(-10px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .q-pop {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
