'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { HeroDiagram } from './hero-diagram'
import { TypewriterText } from './typewriter-text'

function Arrow() {
  return (
    <svg className="w-3.5 h-3.5 ml-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
    </svg>
  )
}

const TITLE_SPEED_MS = 16
const HOSPITALS_START_GAP_MS = 250

export function EditorialHero() {
  const { t } = useI18n()
  const [clinicsTitleDone, setClinicsTitleDone] = useState(false)
  const [hospitalsTitleDone, setHospitalsTitleDone] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Hospitals starts a quarter second after Clinics finishes typing, rather
  // than both racing at once. Computed from Clinics' own length so the gap
  // holds even if that copy changes length later.
  const hospitalsStartDelayMs = t('clinics.title').length * TITLE_SPEED_MS + HOSPITALS_START_GAP_MS

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-foreground text-background pt-28 lg:pt-32 pb-24 lg:pb-32">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-foreground/35" aria-hidden="true" />

      {/* Reuses each product page's own reviewed hero copy so the homepage
          gives both equal billing side by side, rather than leading with
          one and footnoting the other in a shared paragraph. */}
      <h1 className="sr-only">Aescia. Pre-procedure software for endoscopy ASCs, plus post-discharge monitoring.</h1>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-4 mb-10 lg:mb-14">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('hero.eyebrow')}</span>
          <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
        </div>

        <div className="divide-y divide-background/15">
          <div className="max-w-3xl pb-12 lg:pb-14">
            <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-background/55">{t('clinics.eyebrow')}</span>

            <h2
              className="font-display text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.08] tracking-[-0.02em] text-background font-normal mt-3"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              <TypewriterText text={t('clinics.title')} speedMs={TITLE_SPEED_MS} onDone={() => setClinicsTitleDone(true)} />
            </h2>

            <p
              className={`hero-reveal mt-6 max-w-md text-[15px] lg:text-[16px] leading-[1.6] text-background/80 font-sans ${clinicsTitleDone ? 'hero-reveal-in' : ''}`}
            >
              {t('clinics.subtitle')}
            </p>

            <div className={`hero-reveal hero-reveal-delay-1 mt-8 ${clinicsTitleDone ? 'hero-reveal-in' : ''}`}>
              <Link
                href="/clinics"
                className="inline-flex items-center justify-center bg-background text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-background/90 transition-colors min-h-[44px]"
              >
                {t('nav.clinics')}
                <Arrow />
              </Link>
            </div>
          </div>

          <div className="max-w-3xl pt-12 lg:pt-14">
            <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-background/55">{t('hospitals.eyebrow')}</span>

            <h2
              className="font-display text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.08] tracking-[-0.02em] text-background font-normal mt-3"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              <TypewriterText
                text={t('hospitals.title')}
                speedMs={TITLE_SPEED_MS}
                startDelayMs={hospitalsStartDelayMs}
                onDone={() => setHospitalsTitleDone(true)}
              />
            </h2>

            <p
              className={`hero-reveal mt-6 max-w-md text-[15px] lg:text-[16px] leading-[1.6] text-background/80 font-sans ${hospitalsTitleDone ? 'hero-reveal-in' : ''}`}
            >
              {t('hospitals.subtitle')}
            </p>

            <div className={`hero-reveal hero-reveal-delay-1 mt-8 ${hospitalsTitleDone ? 'hero-reveal-in' : ''}`}>
              <Link
                href="/hospitals"
                className="inline-flex items-center justify-center bg-background text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-background/90 transition-colors min-h-[44px]"
              >
                {t('nav.hospitals')}
                <Arrow />
              </Link>
            </div>

            <div className={`hero-reveal hero-reveal-delay-1 mt-10 lg:mt-12 ${hospitalsTitleDone ? 'hero-reveal-in' : ''}`}>
              <HeroDiagram />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-reveal {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .hero-reveal-delay-1 {
          transition-delay: 0.08s;
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
