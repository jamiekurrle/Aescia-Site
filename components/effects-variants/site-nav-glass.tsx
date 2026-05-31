'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useI18n } from '@/lib/i18n'

const LiquidGlass = dynamic(() => import('liquid-glass-react'), { ssr: false })

/**
 * Floating liquid-glass pill nav. Replaces SiteNav on the glass variant page.
 * Effect parameters are conservative — small displacement, low aberration —
 * so the nav reads as a refined floating surface, not novelty.
 */
export function SiteNavGlass() {
  const { t } = useI18n()
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed top-0 inset-x-0 z-50 pointer-events-none"
    >
      <div className="mx-auto max-w-7xl px-6 pt-5 flex justify-center pointer-events-auto">
        {mounted ? (
          <LiquidGlass
            displacementScale={26}
            blurAmount={0.03}
            saturation={108}
            aberrationIntensity={0.4}
            elasticity={0.1}
            cornerRadius={999}
            padding="10px 18px"
            mouseContainer={containerRef}
            mode="standard"
          >
            <div className="flex items-center gap-6 text-white">
              <Link href="/" className="flex items-baseline gap-1.5">
                <span className="font-display text-[18px] leading-none tracking-tight" style={{ fontVariationSettings: "'opsz' 144" }}>
                  Aescia
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] -translate-y-0.5 opacity-70">
                  Health
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-5 text-[13px] tracking-wide">
                <Link href="/platform" className="opacity-85 hover:opacity-100 transition-opacity">{t('nav.platform')}</Link>
                <Link href="/hospitals" className="opacity-85 hover:opacity-100 transition-opacity">{t('nav.hospitals')}</Link>
                <Link href="/clinics" className="opacity-85 hover:opacity-100 transition-opacity">{t('nav.clinics')}</Link>
                <Link href="/evidence" className="opacity-85 hover:opacity-100 transition-opacity">{t('nav.evidence')}</Link>
                <Link href="/contact" className="opacity-85 hover:opacity-100 transition-opacity">{t('nav.contact')}</Link>
              </div>
            </div>
          </LiquidGlass>
        ) : (
          // SSR-safe placeholder so the layout doesn't shift on hydration
          <div className="px-5 py-2.5 rounded-full bg-foreground/40 backdrop-blur text-white text-[13px]">
            <span className="font-display tracking-tight">Aescia</span>
          </div>
        )}
      </div>
    </div>
  )
}
