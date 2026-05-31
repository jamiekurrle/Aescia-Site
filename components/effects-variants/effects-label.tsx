'use client'

import Link from 'next/link'

type VariantKey = 'gradient' | 'logo' | 'glass' | 'r3f'

const order: { key: VariantKey; label: string; href: string }[] = [
  { key: 'gradient', label: 'Gradient', href: '/v2/effects/gradient' },
  { key: 'logo', label: 'Logo', href: '/v2/effects/logo' },
  { key: 'glass', label: 'Glass', href: '/v2/effects/glass' },
  { key: 'r3f', label: 'R3F', href: '/v2/effects/r3f' },
]

/**
 * Tiny floating breadcrumb shown on every effects-variant page so reviewers
 * can hop between variants without going back to the index.
 */
export function EffectsLabel({ name, current }: { name: string; current: VariantKey }) {
  return (
    <div className="fixed bottom-5 right-5 z-[60] pointer-events-auto">
      <div className="bg-foreground/95 text-background backdrop-blur-md border border-background/15 rounded-none px-4 py-3 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
            Effects sandbox
          </span>
          <span className="font-mono text-[10px] text-background/40">/</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/80">
            {name}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {order.map((v) => (
            <Link
              key={v.key}
              href={v.href}
              className={`px-2 py-1 text-[10px] tracking-wide transition-colors ${
                v.key === current
                  ? 'bg-brass text-foreground'
                  : 'bg-background/10 text-background/70 hover:bg-background/20 hover:text-background'
              }`}
            >
              {v.label}
            </Link>
          ))}
          <Link
            href="/v2/effects"
            className="ml-2 px-2 py-1 text-[10px] tracking-wide text-background/60 hover:text-background underline decoration-background/30 underline-offset-2"
          >
            Index
          </Link>
        </div>
      </div>
    </div>
  )
}
