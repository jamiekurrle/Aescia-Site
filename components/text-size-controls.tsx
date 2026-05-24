'use client'

import { useEffect, useState } from 'react'

// Patient-facing pages skew toward an older audience (the SAFE-Discharge
// cohort is post-CTS-surgery, typically 60+). Give them a visible "A · A+ ·
// A++" control to bump body text without sending them into browser settings.
// The choice persists in localStorage so a reload keeps their preference.
//
// Mechanism: we set a data-text-size attribute on the host main element, and
// globals.css uses CSS `zoom` to scale that subtree. zoom is supported across
// all modern browsers (Chrome/Edge/Safari forever, Firefox 126+ since 2024)
// and reflows text properly rather than just clipping like transform: scale.

type Size = 'default' | 'large' | 'xlarge'

const SIZES: { key: Size; label: string; description: string }[] = [
  { key: 'default', label: 'A',   description: 'Default text size' },
  { key: 'large',   label: 'A+',  description: 'Larger text' },
  { key: 'xlarge',  label: 'A++', description: 'Largest text' },
]

const STORAGE_KEY = 'aescia-text-size'

export function TextSizeControls() {
  const [size, setSize] = useState<Size>('default')

  // Restore preference on mount. We don't read localStorage during the first
  // render because that would mismatch SSR — instead we hydrate, then apply.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Size | null
      if (saved === 'large' || saved === 'xlarge' || saved === 'default') {
        setSize(saved)
      }
    } catch {
      // localStorage unavailable (private mode, sandbox); just use default.
    }
  }, [])

  // Apply the scale to the page main. We look up the main element rather
  // than passing a ref through because the controls render *inside* main,
  // and we want to scale main itself so the controls scale with the rest.
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
    <div className="flex items-center justify-center gap-3 py-4 px-6 lg:px-10 border-b border-border bg-background">
      <span
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/65"
        id="text-size-label"
      >
        Text size
      </span>
      <div
        role="group"
        aria-labelledby="text-size-label"
        className="inline-flex items-stretch border border-border rounded-sm overflow-hidden"
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
                'px-3 py-1.5 min-h-[36px] min-w-[44px] flex items-center justify-center transition-colors',
                'font-display leading-none',
                i === 0 ? 'text-[14px]' : i === 1 ? 'text-[16px]' : 'text-[18px]',
                active
                  ? 'bg-foreground text-background'
                  : 'bg-background text-foreground/80 hover:bg-secondary',
                i > 0 ? 'border-l border-border' : '',
              ].join(' ')}
            >
              {s.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
