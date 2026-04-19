'use client'

import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'

export function RegulatoryBand() {
  const { t } = useI18n()
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem('regband.dismissed') : null
    if (stored === '1') setDismissed(true)
  }, [])

  if (dismissed) return null

  return (
    <div
      role="note"
      aria-label="Regulatory notice"
      className="relative z-[60] bg-foreground text-background border-b border-background/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2.5 flex items-start gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass flex-shrink-0 pt-[3px]">Investigational</span>
        <p className="text-[12px] leading-[1.55] text-background/85 flex-1">
          {t('regband.body')}
        </p>
        <button
          onClick={() => {
            setDismissed(true)
            if (typeof window !== 'undefined') sessionStorage.setItem('regband.dismissed', '1')
          }}
          className="flex-shrink-0 text-background/60 hover:text-background transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
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
