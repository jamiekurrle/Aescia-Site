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

  // The headline sits below the first screen and types out once it scrolls
  // into view. Until then its text is in the page, invisible, so the layout
  // is fixed and crawlers still read the h1.
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const [headlineSeen, setHeadlineSeen] = useState(false)
  useEffect(() => {
    const el = headlineRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadlineSeen(true)
          observer.disconnect()
        }
      },
      // Starts once the headline is clear of the bottom quarter of the screen.
      { threshold: 1, rootMargin: '0px 0px -25% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative bg-[#1B2745] text-white">
      {/* The video holds still behind the first screen and the headline
          below it, which scrolls up over it. */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Static first frame: present in the server HTML so no-JS, crawler,
              reduced-motion, and pre-hydration renders all get the hero
              background immediately. The video, when it mounts, paints over it. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative
              full-bleed background, same asset the video uses as its poster */}
          <img
            src="/hero-poster-v2.jpg"
            alt=""
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
            >
              <source src="/hero-video-v2.webm" type="video/webm" />
              <source src="/hero-video-v2.mp4" type="video/mp4" />
            </video>
          )}
          {/* Shade behind the centred questions so white text reads at full
              contrast over any video frame. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 75% 55% at 50% 50%, rgba(27, 39, 69, 0.55), transparent 75%), linear-gradient(to top, rgba(27, 39, 69, 0.6) 0%, rgba(27, 39, 69, 0.3) 40%, rgba(27, 39, 69, 0.3) 100%)',
            }}
          />
        </div>
      </div>

      {/* First screen: questions answered by published figures. */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-28 pb-8 min-h-[78svh] flex items-center justify-center">
        <HeroMetrics />
      </div>

      {/* After a short scroll: the headline, over a deepening shade. */}
      <div
        className="relative"
        style={{
          background:
            'linear-gradient(to bottom, rgba(27, 39, 69, 0) 0%, rgba(27, 39, 69, 0.78) 45%, rgba(27, 39, 69, 0.95) 100%)',
        }}
      >
        <div
          className="max-w-3xl mx-auto px-6 lg:px-10 pt-10 lg:pt-14 pb-24 lg:pb-32 min-h-[56svh] flex flex-col items-center justify-center text-center"
        >
          <h1
            ref={headlineRef}
            className="font-display text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.04] tracking-[-0.03em] text-white font-normal"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {headlineSeen ? (
              <TypewriterText text={t('home.hero.title')} speedMs={TITLE_SPEED_MS} onDone={() => setTitleDone(true)} />
            ) : (
              <span className="invisible">{t('home.hero.title')}</span>
            )}
          </h1>

          <div className={`hero-reveal mt-9 ${titleDone ? 'hero-reveal-in' : ''}`}>
            <Link
              href="/platform"
              className="inline-flex items-center justify-center bg-white text-[#1B2745] px-7 py-4 text-[15px] font-medium tracking-wide hover:bg-white/90 transition-colors min-h-[48px]"
            >
              {t('home.hero.cta')}
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
