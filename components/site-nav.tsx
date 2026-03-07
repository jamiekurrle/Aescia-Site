'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useI18n, LanguageSwitcher } from '@/lib/i18n'

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useI18n()

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border fixed top-0 inset-x-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/ae-mark.png" alt="Aescia" width={28} height={28} />
          <span className="text-sm font-semibold text-foreground">Aescia</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/problem" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            {t('nav.problem')}
          </Link>
          <Link href="/solution" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            {t('nav.solution')}
          </Link>
          <Link href="/evidence" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            {t('nav.evidence')}
          </Link>
          <Link href="/governance" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
            {t('nav.governance')}
          </Link>
        </div>

        {/* Desktop CTA + Language */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="bg-accent text-accent-foreground text-sm font-medium px-6 py-2 rounded hover:opacity-90 transition-opacity"
          >
            {t('nav.contact')}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/problem"
              className="block text-sm text-foreground/70 hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.problem')}
            </Link>
            <Link
              href="/solution"
              className="block text-sm text-foreground/70 hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.solution')}
            </Link>
            <Link
              href="/evidence"
              className="block text-sm text-foreground/70 hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.evidence')}
            </Link>
            <Link
              href="/governance"
              className="block text-sm text-foreground/70 hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.governance')}
            </Link>
            <Link
              href="/contact"
              className="block bg-accent text-accent-foreground text-sm font-medium px-6 py-2 rounded text-center hover:opacity-90 mt-4"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
