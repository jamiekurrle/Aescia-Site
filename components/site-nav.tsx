'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useI18n, LanguageSwitcher } from '@/lib/i18n'
import { RegulatoryBand } from '@/components/regulatory-band'

export function SiteNav({
  transparent = false,
  showRegulatoryBand = true,
}: {
  transparent?: boolean
  // Pages aimed at a known audience (e.g. /safe-discharge for trial
  // participants) can pass `false` to hide the SaMD-classification band,
  // which is intended for general public visitors.
  showRegulatoryBand?: boolean
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const useTransparent = transparent && !scrolled

  const navLinkClass = useTransparent
    ? 'text-[13px] text-white/85 hover:text-white transition-colors tracking-wide min-h-[36px] flex items-center'
    : 'text-[13px] text-foreground/80 hover:text-foreground transition-colors tracking-wide min-h-[36px] flex items-center'

  const wrapperClass = useTransparent
    ? 'bg-transparent'
    : 'bg-background/92 backdrop-blur-md border-b border-border'

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      {showRegulatoryBand && <RegulatoryBand />}
      <nav
        aria-label={t('nav.primary')}
        className={`transition-colors duration-500 ${wrapperClass}`}
      >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1.5 group">
          <span
            className={`font-display text-[22px] leading-none tracking-tight ${
              useTransparent ? 'text-white' : 'text-foreground'
            }`}
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Aescia
          </span>
          <span
            className={`font-mono text-[9px] uppercase tracking-[0.18em] -translate-y-0.5 ${
              useTransparent ? 'text-white/65' : 'text-foreground/60'
            }`}
          >
            Health
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link href="/platform" className={navLinkClass}>{t('nav.platform')}</Link>
          <Link href="/hospitals" className={navLinkClass}>{t('nav.hospitals')}</Link>
          <Link href="/clinics" className={navLinkClass}>{t('nav.clinics')}</Link>
          <Link href="/evidence" className={navLinkClass}>{t('nav.evidence')}</Link>
          <Link href="/updates" className={navLinkClass}>{t('nav.updates')}</Link>
          <Link href="/team" className={navLinkClass}>{t('nav.team')}</Link>
          <Link href="/contact" className={navLinkClass}>{t('nav.contact')}</Link>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className={`text-[13px] font-medium px-5 py-2.5 rounded-none border transition-colors min-h-[40px] flex items-center ${
              useTransparent
                ? 'bg-white text-foreground border-white hover:bg-white/90'
                : 'bg-foreground text-background border-foreground hover:bg-foreground/90'
            }`}
          >
            {t('nav.cta')}
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? t('nav.menu.close') : t('nav.menu.open')}
            className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center ${useTransparent ? 'text-white' : 'text-foreground'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 17h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-nav" className="lg:hidden border-t border-border bg-background">
          <div className="px-6 py-6 space-y-1">
            <Link href="/platform" className="block py-3 text-[15px] text-foreground/85 hover:text-foreground" onClick={() => setMobileOpen(false)}>{t('nav.platform')}</Link>
            <Link href="/hospitals" className="block py-3 text-[15px] text-foreground/85 hover:text-foreground" onClick={() => setMobileOpen(false)}>{t('nav.hospitals')}</Link>
            <Link href="/clinics" className="block py-3 text-[15px] text-foreground/85 hover:text-foreground" onClick={() => setMobileOpen(false)}>{t('nav.clinics')}</Link>
            <Link href="/evidence" className="block py-3 text-[15px] text-foreground/85 hover:text-foreground" onClick={() => setMobileOpen(false)}>{t('nav.evidence')}</Link>
            <Link href="/updates" className="block py-3 text-[15px] text-foreground/85 hover:text-foreground" onClick={() => setMobileOpen(false)}>{t('nav.updates')}</Link>
            <Link href="/team" className="block py-3 text-[15px] text-foreground/85 hover:text-foreground" onClick={() => setMobileOpen(false)}>{t('nav.team')}</Link>
            <Link href="/contact" className="block py-3 text-[15px] text-foreground/85 hover:text-foreground" onClick={() => setMobileOpen(false)}>{t('nav.contact')}</Link>
            <Link
              href="/contact"
              className="block bg-foreground text-background text-[14px] font-medium px-5 py-3.5 text-center mt-6 min-h-[44px]"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.cta')}
            </Link>
          </div>
        </div>
      )}
      </nav>
    </div>
  )
}
