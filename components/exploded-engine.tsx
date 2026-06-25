'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/exploded-engine'

/**
 * Five pathway-step primitives rendered as a deck of cards. On mount
 * the cards sit stacked in 3D depth (the "deck"). When the section
 * enters the viewport the cards fan into their final grid positions.
 * This is the visual metaphor for the composable pathway engine:
 * one stack, five primitives, every protocol.
 *
 * No scroll-jacking. IntersectionObserver triggers the fan-out once
 * when the section is 35% visible. Respects prefers-reduced-motion
 * by rendering the final grid immediately.
 */

// Self-contained translation lookup for the ExplodedEngine component. The shared
// i18n provider supplies the active locale; engine.* keys live in
// lib/dictionaries/pages/exploded-engine.ts and are resolved here with an English
// fallback, mirroring the provider's own fallback behaviour without editing
// lib/i18n.tsx.
function useEngineT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function ExplodedEngine() {
  const ref = useRef<HTMLDivElement>(null)
  const [exploded, setExploded] = useState(false)
  const t = useEngineT()

  // num values stay literal ('01'..'05'); name and body resolve against the
  // active locale.
  const STEPS = [
    { num: '01', name: t('engine.s1.name'), body: t('engine.s1.body') },
    { num: '02', name: t('engine.s2.name'), body: t('engine.s2.body') },
    { num: '03', name: t('engine.s3.name'), body: t('engine.s3.body') },
    { num: '04', name: t('engine.s4.name'), body: t('engine.s4.body') },
    { num: '05', name: t('engine.s5.name'), body: t('engine.s5.body') },
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setExploded(true)
      return
    }
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExploded(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full">
      {/* Desktop / tablet: a 5-column grid. Non-exploded state pulls each
          card back toward centre using its own-width percentages, creating
          a stacked deck effect. Exploded state releases to the grid. */}
      <div
        className="hidden md:grid grid-cols-5 gap-5 lg:gap-6"
        style={{ perspective: '1800px', perspectiveOrigin: '50% 50%' }}
      >
        {STEPS.map((step, i) => {
          // Distance from centre column (index 2)
          const fromCentre = i - 2
          // When not exploded, translate to the centre using element-width %
          const stackedTranslateX = -fromCentre * 100
          // Slight Y nudge per card so stacked state shows a subtle deck
          const stackedTranslateY = Math.abs(fromCentre) * 6
          // Push outer cards further back in z to accent depth
          const stackedTranslateZ = -Math.abs(fromCentre) * 30
          const stackedRotateY = fromCentre * 3

          return (
            <article
              key={step.num}
              className="group relative bg-background border border-foreground/15 p-6 lg:p-7 shadow-[0_18px_40px_-24px_rgba(11,31,42,0.55)] transition-all duration-[1100ms]"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${(STEPS.length - 1 - i) * 80}ms`,
                transform: exploded
                  ? 'translate3d(0, 0, 0) rotateY(0deg)'
                  : `translate3d(${stackedTranslateX}%, ${stackedTranslateY}px, ${stackedTranslateZ}px) rotateY(${stackedRotateY}deg)`,
                transformStyle: 'preserve-3d',
                zIndex: exploded ? 10 : 20 - Math.abs(fromCentre),
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] text-brass tracking-widest">{step.num}</span>
                <span className="h-px w-6 bg-brass/60" aria-hidden="true" />
              </div>
              <h3
                className="font-display text-[20px] lg:text-[22px] leading-[1.15] tracking-[-0.018em] mb-3"
                style={{ fontVariationSettings: "'opsz' 80" }}
              >
                {step.name}
              </h3>
              <p className="text-[12.5px] lg:text-[13px] leading-[1.55] text-foreground/75">{step.body}</p>
            </article>
          )
        })}
      </div>

      {/* Caption under the fan, visible only when exploded */}
      <p
        className={`hidden md:block text-center mt-10 lg:mt-14 font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/60 transition-opacity duration-[800ms]`}
        style={{ transitionDelay: '600ms', opacity: exploded ? 1 : 0 }}
      >
        {t('engine.caption')}
</p>

      {/* Mobile: simple stack, no 3D. Shown always. */}
      <ol className="md:hidden grid gap-3">
        {STEPS.map((step) => (
          <li key={step.num} className="bg-background border border-foreground/15 p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] text-brass tracking-widest">{step.num}</span>
              <span className="h-px w-6 bg-brass/60" aria-hidden="true" />
            </div>
            <h3
              className="font-display text-[20px] leading-[1.15] tracking-[-0.018em] mb-2"
              style={{ fontVariationSettings: "'opsz' 80" }}
            >
              {step.name}
            </h3>
            <p className="text-[13px] leading-[1.55] text-foreground/75">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
