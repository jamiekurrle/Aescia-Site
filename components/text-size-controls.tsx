'use client'

import { useEffect, useState } from 'react'

// Patient-facing pages skew toward an older audience (the SAFE-Discharge
// cohort is post-CTS-surgery, typically 60+). Give them a visible "A · A+ ·
// A++" control to bump body text without sending them into browser settings.
// The choice persists in localStorage so a reload keeps their preference.
//
// The buttons sit in the SiteNav next to the FR language switcher. They set
// data-text-size on main[data-page="safe-discharge"], and globals.css uses
// CSS `zoom` to scale that subtree. zoom is supported across all modern
// browsers (Chrome/Edge/Safari forever, Firefox 126+ since 2024) and
// reflows text properly rather than clipping like transform: scale.

type Size = 'default' | 'large' | 'xlarge'

const SIZES: { key: Size; label: string; description: string }[] = [
  { key: 'default', label: 'A',   description: 'Default text size' },
  { key: 'large',   label: 'A+',  description: 'Larger text' },
  { key: 'xlarge',  label: 'A++', description: 'Largest text' },
]

const STORAGE_KEY = 'aescia-text-size'

export function TextSizeControls() {
  const [size, setSize] = useState<Size>('default')

  // Restore preference on mount. We don't read localStorage during first
  // render because that would mismatch SSR — hydrate first, then apply.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Size | null
      if (saved === 'large' || saved === 'xlarge' || saved === 'default') {
        setSize(saved)
      }
    } catch {
      // localStorage unavailable (private mode, sandbox); use default.
    }
  }, [])

  // Apply the scale to main[data-page="safe-discharge"]. The buttons render
  // inside the (fixed) SiteNav, which lives outside main, so we look up the
  // target by selector rather than carrying a ref through.
  useEffect(() => {
    const main = document.querySelector('main[data-page="safe-discharge"]')
    if (main instanceof HTMLElement) {
      main.dataset.textSize = size
    }
    try {
      localStorage.setItem(STORAGE_KEY, size)
    } catch {
      // ignore
    }
  }, [size])

  return (
    <div
      role="group"
      aria-label="Text size"
      className="inline-flex items-stretch"
    >
      {SIZES.map((s, i) => {
        const active = size === s.key
        return (
          <button
            key={s.key}
            type="button"
            onClick={() => setSize(s.key)}
            aria-pressed={active}
            aria-label={s.description}
            className={[
              'font-mono font-medium tracking-wider uppercase',
              'min-h-[36px] flex items-center justify-center transition-colors',
              'border border-current/30',
              i > 0 ? 'border-l-0' : '',
              i === 0 ? 'text-[10px] px-2 min-w-[30px]'
                : i === 1 ? 'text-[11px] px-2 min-w-[34px]'
                : 'text-[12px] px-2 min-w-[40px]',
              active
                ? 'bg-foreground text-background border-foreground'
                : 'opacity-75 hover:opacity-100',
            ].join(' ')}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
