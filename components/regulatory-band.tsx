'use client'

import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'

export function RegulatoryBand() {
  const { t } = useI18n()
  const [dismissed, setDismissed] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem('regband.dismissed') : null
    if (stored === '1') setDismissed(true)
  }, [])

  if (dismissed) return null

  function dismiss() {
    setDismissed(true)
    if (typeof window !== 'undefined') sessionStorage.setItem('regband.dismissed', '1')
  }

  const monitor = (
    <p className="text-[12px] leading-[1.55] text-background/85">
      <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-background/65 mr-2">
        {t('regband.monitor.label')}
      </span>
      {t('regband.monitor.body')}
    </p>
  )
  const clinic = (
    <p className="text-[12px] leading-[1.55] text-background/85">
      <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-background/65 mr-2">
        {t('regband.clinic.label')}
      </span>
      {t('regband.clinic.body')}
    </p>
  )

  return (
    <div
      role="note"
      aria-label="Regulatory notice"
      className="bg-foreground text-background border-b border-background/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2.5 md:py-3 flex items-start gap-3 md:gap-4">
        {/* Eyebrow: shown on tablet/desktop. On mobile it lives inside the toggle. */}
        <span className="hidden md:block font-mono text-[13px] uppercase tracking-[0.22em] text-brass flex-shrink-0 pt-[3px]">
          {t('regband.eyebrow')}
        </span>

        {/* Tablet/desktop: full two-column disclosure */}
        <div className="hidden md:grid flex-1 md:grid-cols-2 gap-x-8 gap-y-2">
          {monitor}
          {clinic}
        </div>

        {/* Mobile: one compact line, tap to expand */}
        <div className="flex-1 min-w-0 md:hidden">
          {expanded ? (
            <div className="space-y-2">
              {monitor}
              {clinic}
              <button
                onClick={() => setExpanded(false)}
                className="font-mono text-[13px] uppercase tracking-[0.18em] text-brass inline-flex items-center gap-1 min-h-[28px]"
              >
                {t('regband.less')}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 15l-6-6-6 6" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setExpanded(true)}
              aria-expanded={false}
              aria-label={t('regband.more')}
              className="flex items-center gap-2 w-full text-left min-h-[28px]"
            >
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass flex-shrink-0">
                {t('regband.eyebrow')}
              </span>
              <span className="text-[11px] leading-[1.3] text-background/70 truncate min-w-0">
                {t('regband.short')}
              </span>
              <svg className="w-3 h-3 flex-shrink-0 text-background/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 9l6 6 6-6" />
              </svg>
            </button>
          )}
        </div>

        <button
          onClick={dismiss}
          className="flex-shrink-0 text-background/60 hover:text-background transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center -mt-1"
          aria-label={t('regband.dismiss')}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
