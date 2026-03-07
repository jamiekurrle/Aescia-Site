'use client'

import { useEffect, useRef } from 'react'

export function Hero() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    const t = setTimeout(() => {
      el.style.width = '100%'
    }, 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-10 pt-32 overflow-hidden">
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklch, var(--color-border) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--color-border) 60%, transparent) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Accent dot cluster */}
      <div aria-hidden className="absolute top-32 right-10 md:right-24 flex flex-col gap-3 opacity-30">
        {[...Array(5)].map((_, r) => (
          <div key={r} className="flex gap-3">
            {[...Array(5)].map((_, c) => (
              <div
                key={c}
                className="w-1 h-1 rounded-full bg-accent"
                style={{ opacity: (r + c) % 2 === 0 ? 1 : 0.4 }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Tag line */}
        <p className="text-xs tracking-widest uppercase text-accent mb-8 font-medium">
          Digital Health · Post-Discharge Care
        </p>

        {/* Headline */}
        <h1 className="font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[1.05] text-foreground text-balance max-w-4xl mb-10">
          Post-discharge monitoring that fits real clinical workflows.
        </h1>

        {/* Divider line animation */}
        <div
          ref={lineRef}
          className="h-px bg-foreground mb-10 transition-all duration-1000 ease-out"
          style={{ width: '0%' }}
          aria-hidden
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-foreground text-primary-foreground px-7 py-4 text-xs tracking-widest uppercase hover:bg-accent transition-colors duration-300"
          >
            Contact us
            <span aria-hidden className="text-base leading-none">→</span>
          </a>
          <a
            href="#about"
            className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2"
          >
            Learn more
            <span aria-hidden>↓</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
      >
        <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Scroll</span>
        <div className="w-px h-10 bg-foreground animate-pulse" />
      </div>
    </section>
  )
}
