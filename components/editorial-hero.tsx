'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { TypewriterText } from './typewriter-text'
import { HeroMetrics } from './hero-metrics'

function Arrow() {
  return (
    <svg className="w-3.5 h-3.5 ml-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
    </svg>
  )
}

const TITLE_SPEED_MS = 22

export function EditorialHero() {
  const { t } = useI18n()
  const [titleDone, setTitleDone] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // The video element only mounts once we know the visitor has not asked for
  // reduced motion and is not on a data-saver connection, so those browsers
  // never request the file at all; the static poster underneath is their hero
  // background. The change listener honours a mid-session reduced-motion
  // toggle in both directions (Save-Data is read once at mount).
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const update = () => setShowVideo(!mql.matches && !connection?.saveData)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  // The video mounts after hydration, so the autoplay attribute alone is not
  // reliably honoured on a dynamically inserted element; kick playback
  // explicitly and ignore the rejection if the browser refuses (the poster
  // stays visible).
  useEffect(() => {
    if (!showVideo) return
    videoRef.current?.play().catch(() => {})
  }, [showVideo])

  return (
    <section className="relative overflow-hidden bg-[#1B2745] text-white min-h-[100svh] flex items-end">
      {/* Static first frame: present in the server HTML so no-JS, crawler,
          reduced-motion, and pre-hydration renders all get the hero
          background immediately. The video, when it mounts, paints over it. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative
          full-bleed background, same asset the video uses as its poster */}
      <img
        src="/hero-poster-v2.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster-v2.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/hero-video-v2.webm" type="video/webm" />
          <source src="/hero-video-v2.mp4" type="video/mp4" />
        </video>
      )}
      {/* Shade behind the centred figures and the headline at the foot of the
          frame, so white text reads at full contrast over any video frame. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 45%, rgba(27, 39, 69, 0.55), transparent 75%), linear-gradient(to top, rgba(27, 39, 69, 0.92) 0%, rgba(27, 39, 69, 0.5) 35%, rgba(27, 39, 69, 0.3) 100%)',
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 lg:pt-32 pb-16 lg:pb-24 min-h-[100svh] flex flex-col">
        {/* Published figures, one at a time, in the middle of the frame. */}
        <div className="flex-1 flex items-center justify-center py-10 lg:py-14">
          <HeroMetrics />
        </div>

        <div className="max-w-3xl">
          <h1
            className="font-display text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.04] tracking-[-0.03em] text-white font-normal"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            <TypewriterText text={t('home.hero.title')} speedMs={TITLE_SPEED_MS} onDone={() => setTitleDone(true)} />
          </h1>

          <p
            className={`hero-reveal mt-5 max-w-xl text-[17px] lg:text-[19px] leading-[1.55] text-white/90 font-sans ${titleDone ? 'hero-reveal-in' : ''}`}
          >
            {t('home.hero.subtitle')}
          </p>

          <div className={`hero-reveal hero-reveal-delay-1 mt-8 ${titleDone ? 'hero-reveal-in' : ''}`}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-[#1B2745] px-7 py-4 text-[15px] font-medium tracking-wide hover:bg-white/90 transition-colors min-h-[48px]"
            >
              {t('cta.button')}
              <Arrow />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-reveal {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .hero-reveal-delay-1 {
          transition-delay: 0.12s;
        }
        .hero-reveal-in {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
