'use client'

import { useRef, useState, useEffect, useMemo } from 'react'

/**
 * Cohort-trajectory hero visual.
 *
 * Static subject: an illustrative 30-day post-discharge window. Eight
 * faint patient sparklines hold a steady band. Patient D dips around
 * day 11; the platform "flags" it; the trajectory recovers by day 18.
 *
 * Progressive enhancements:
 *   - On mount, each trajectory strokes in left-to-right on a stagger.
 *   - A slow "observation sweep" travels the 30-day window on loop.
 *   - The flag pulses in as the sweep passes it.
 *   - On desktop, cursor X maps to a "day cursor" that reveals each
 *     patient's value that day, and the caption above updates.
 *   - Reduced-motion users get a static final frame.
 *
 * The diagram carries explicit ILLUSTRATIVE labelling and an aria
 * caption saying it does not depict real clinical data.
 */
export function HeroDiagram() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [mounted, setMounted] = useState(false)
  const [cursorDay, setCursorDay] = useState<number | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const rows = 8
  const days = 30
  const viewW = 520
  const viewH = 420
  const pad = { l: 64, r: 24, t: 36, b: 44 }
  const plotW = viewW - pad.l - pad.r
  const plotH = viewH - pad.t - pad.b
  const rowH = plotH / rows

  // Highlighted row and dip position.
  const hiRowIdx = 3
  const hiY0 = pad.t + hiRowIdx * rowH + rowH / 2
  const dipCenter = 11

  // Pre-computed steady trace values per day, per non-highlighted row.
  const steadySeeds = [0.22, -0.18, 0.08, -0.3, 0.14, 0.36, -0.12]

  function steadyY(rowIdx: number, seed: number, day: number): number {
    const y0 = pad.t + rowIdx * rowH + rowH / 2
    const amp = 3.2
    const phase = (day / days) * Math.PI * 6 + seed * Math.PI
    return y0 + Math.sin(phase) * amp + Math.cos(phase * 1.7) * amp * 0.4
  }

  function hiY(day: number): number {
    const dipWidth = 5.2
    const dipDepth = 22
    const u = (day - dipCenter) / dipWidth
    const dip = dipDepth * Math.exp(-u * u)
    const wave = Math.sin((day / days) * Math.PI * 4) * 1.3
    return hiY0 + dip + wave
  }

  const paths = useMemo(() => {
    const steady: string[] = []
    for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
      if (rowIdx === hiRowIdx) continue
      const seedIdx = rowIdx > hiRowIdx ? rowIdx - 1 : rowIdx
      const seed = steadySeeds[seedIdx]
      const pts: string[] = []
      for (let i = 0; i <= days; i++) {
        const x = pad.l + (i / days) * plotW
        const y = steadyY(rowIdx, seed, i)
        pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
      }
      steady.push(pts.join(' '))
    }
    const hi: string[] = []
    for (let i = 0; i <= days; i++) {
      const x = pad.l + (i / days) * plotW
      const y = hiY(i)
      hi.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
    }
    return { steady, hi: hi.join(' ') }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const flagX = pad.l + (dipCenter / days) * plotW
  const flagY = hiY(dipCenter)

  // Cursor handling
  function onMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const xPx = e.clientX - rect.left
    // Convert to viewBox coords
    const xVb = (xPx / rect.width) * viewW
    if (xVb < pad.l || xVb > viewW - pad.r) {
      setCursorDay(null)
      return
    }
    const dayFloat = ((xVb - pad.l) / plotW) * days
    const day = Math.round(Math.max(0, Math.min(days, dayFloat)))
    setCursorDay(day)
  }

  const cursorX = cursorDay !== null ? pad.l + (cursorDay / days) * plotW : null
  const dayMarkers = [1, 15, 30]
  const labels = ['Patient A', 'Patient B', 'Patient C', 'Patient D', 'Patient E', 'Patient F', 'Patient G', 'Patient H']

  // Caption copy
  const captionCopy = useMemo(() => {
    if (cursorDay === null) return 'COHORT · 30-DAY POST-DISCHARGE WINDOW'
    if (cursorDay === 0) return 'DAY 0 · DISCHARGE'
    if (cursorDay >= 8 && cursorDay <= 13)
      return `DAY ${cursorDay} · PATIENT D DIPS · FLAGGED DAY ${dipCenter}`
    if (cursorDay >= 14 && cursorDay <= 18) return `DAY ${cursorDay} · PATIENT D RECOVERING`
    if (cursorDay >= 25) return `DAY ${cursorDay} · APPROACHING FIRST CLINIC VISIT`
    return `DAY ${cursorDay} · STEADY RECOVERY BAND`
  }, [cursorDay])

  return (
    <div
      className="w-full max-w-[520px] mx-auto"
      role="img"
      aria-label="Illustrative cohort trajectory over the 30-day post-discharge window. Seven patients hold a steady recovery. Patient D dips around day eleven and is flagged by the platform. Abstract. Does not depict clinical data."
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewW} ${viewH}`}
        className={`w-full h-auto transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
        focusable="false"
        onMouseMove={onMove}
        onMouseLeave={() => setCursorDay(null)}
      >
        <defs>
          <linearGradient id="traceFade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="oklch(0.96 0.01 85)" stopOpacity="0" />
            <stop offset="0.08" stopColor="oklch(0.96 0.01 85)" stopOpacity="0.55" />
            <stop offset="0.92" stopColor="oklch(0.96 0.01 85)" stopOpacity="0.55" />
            <stop offset="1" stopColor="oklch(0.96 0.01 85)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hiTrace" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="oklch(0.96 0.01 85)" stopOpacity="0.3" />
            <stop offset="0.35" stopColor="oklch(0.96 0.01 85)" stopOpacity="0.95" />
            <stop offset="0.75" stopColor="oklch(0.73 0.09 80)" stopOpacity="1" />
            <stop offset="1" stopColor="oklch(0.96 0.01 85)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="sweepGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.73 0.09 80)" stopOpacity="0" />
            <stop offset="0.2" stopColor="oklch(0.73 0.09 80)" stopOpacity="0.55" />
            <stop offset="0.8" stopColor="oklch(0.73 0.09 80)" stopOpacity="0.55" />
            <stop offset="1" stopColor="oklch(0.73 0.09 80)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Left-hand patient labels */}
        {labels.map((label, i) => {
          const y = pad.t + i * rowH + rowH / 2 + 3
          const isHi = i === hiRowIdx
          return (
            <text
              key={label}
              x={pad.l - 10}
              y={y}
              textAnchor="end"
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '8px',
                letterSpacing: '0.1em',
                fill: 'oklch(0.96 0.01 85)',
                opacity: isHi ? 0.9 : 0.35,
              }}
            >
              {label.toUpperCase()}
            </text>
          )
        })}

        {/* Baselines */}
        {Array.from({ length: rows }).map((_, i) => {
          const y = pad.t + i * rowH + rowH / 2
          return (
            <line
              key={i}
              x1={pad.l}
              x2={viewW - pad.r}
              y1={y}
              y2={y}
              stroke="oklch(0.96 0.01 85)"
              strokeOpacity={0.06}
              strokeWidth={0.5}
            />
          )
        })}

        {/* Day markers */}
        {dayMarkers.map((d) => {
          const x = pad.l + (d / days) * plotW
          return (
            <g key={d}>
              <line x1={x} x2={x} y1={pad.t} y2={viewH - pad.b + 6} stroke="oklch(0.96 0.01 85)" strokeOpacity={0.08} strokeWidth={0.5} />
              <text
                x={x}
                y={viewH - pad.b + 18}
                textAnchor="middle"
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '8px',
                  letterSpacing: '0.1em',
                  fill: 'oklch(0.96 0.01 85)',
                  opacity: 0.5,
                }}
              >
                DAY {d}
              </text>
            </g>
          )
        })}

        {/* Steady traces: stagger-draw in on mount */}
        {paths.steady.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#traceFade)"
            strokeWidth={1}
            strokeLinecap="round"
            className={`hero-trace-steady hero-trace-steady-${i}`}
          />
        ))}

        {/* Highlighted trace */}
        <path
          d={paths.hi}
          fill="none"
          stroke="url(#hiTrace)"
          strokeWidth={1.5}
          strokeLinecap="round"
          className="hero-trace-hi"
        />

        {/* Flag */}
        <g className="hero-flag" style={{ transformBox: 'fill-box', transformOrigin: `${flagX}px ${flagY}px` } as React.CSSProperties}>
          <circle cx={flagX} cy={flagY} r={10} fill="oklch(0.73 0.09 80)" fillOpacity={0.15} />
          <circle cx={flagX} cy={flagY} r={5} fill="oklch(0.73 0.09 80)" fillOpacity={0.55} />
          <circle cx={flagX} cy={flagY} r={2.4} fill="oklch(0.73 0.09 80)" />
        </g>
        <line
          x1={flagX + 8}
          x2={flagX + 44}
          y1={flagY}
          y2={flagY}
          stroke="oklch(0.73 0.09 80)"
          strokeOpacity={0.5}
          strokeWidth={0.5}
          className="hero-flag-line"
        />
        <text
          x={flagX + 48}
          y={flagY + 3}
          textAnchor="start"
          className="hero-flag-label"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '8.5px',
            letterSpacing: '0.1em',
            fill: 'oklch(0.73 0.09 80)',
          }}
        >
          DAY {dipCenter} · FLAG
        </text>

        {/* Auto sweep line (pauses when cursor is active) */}
        {cursorDay === null && (
          <g className="hero-sweep" aria-hidden>
            <line
              x1={pad.l}
              x2={pad.l}
              y1={pad.t - 4}
              y2={viewH - pad.b + 4}
              stroke="url(#sweepGrad)"
              strokeWidth={1.2}
            />
          </g>
        )}

        {/* Cursor-driven column highlight */}
        {cursorX !== null && cursorDay !== null && (
          <g className="hero-cursor">
            <line
              x1={cursorX}
              x2={cursorX}
              y1={pad.t - 6}
              y2={viewH - pad.b + 6}
              stroke="oklch(0.73 0.09 80)"
              strokeOpacity={0.65}
              strokeWidth={1}
            />
            {/* Per-row dots showing each patient's value at cursorDay */}
            {labels.map((_, i) => {
              let y: number
              if (i === hiRowIdx) {
                y = hiY(cursorDay)
              } else {
                const seedIdx = i > hiRowIdx ? i - 1 : i
                y = steadyY(i, steadySeeds[seedIdx], cursorDay)
              }
              const isHi = i === hiRowIdx
              return (
                <circle
                  key={i}
                  cx={cursorX}
                  cy={y}
                  r={isHi ? 2.5 : 1.6}
                  fill={isHi ? 'oklch(0.73 0.09 80)' : 'oklch(0.96 0.01 85)'}
                  fillOpacity={isHi ? 1 : 0.8}
                />
              )
            })}
          </g>
        )}

        {/* Top caption (swaps based on cursor) */}
        <text
          x={pad.l}
          y={pad.t - 14}
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            letterSpacing: '0.18em',
            fill: cursorDay !== null ? 'oklch(0.73 0.09 80)' : 'oklch(0.73 0.09 80)',
          }}
        >
          {captionCopy}
        </text>
        <text
          x={viewW - pad.r}
          y={pad.t - 14}
          textAnchor="end"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            letterSpacing: '0.18em',
            fill: 'oklch(0.96 0.01 85)',
            opacity: 0.55,
          }}
        >
          ILLUSTRATIVE
        </text>
      </svg>

      <style jsx>{`
        /* Stagger-draw on mount. Each steady trace has ~760 path length cap;
           we set pathLength attribute in CSS by using stroke-dasharray+offset. */
        @keyframes drawIn {
          from {
            stroke-dasharray: 1400;
            stroke-dashoffset: 1400;
          }
          to {
            stroke-dasharray: 1400;
            stroke-dashoffset: 0;
          }
        }
        @keyframes drawInHi {
          from {
            stroke-dasharray: 1400;
            stroke-dashoffset: 1400;
            opacity: 0.3;
          }
          to {
            stroke-dasharray: 1400;
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        @keyframes sweep {
          0% { transform: translateX(0); opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { transform: translateX(${plotW}px); opacity: 0; }
        }
        @keyframes flagReveal {
          0%, 45% { opacity: 0; transform: scale(0.6); }
          58% { opacity: 1; transform: scale(1.25); }
          72% { opacity: 1; transform: scale(1); }
          92%, 100% { opacity: 1; transform: scale(1); }
        }
        @keyframes flagLineFade {
          0%, 58% { opacity: 0; }
          70% { opacity: 1; }
          92%, 100% { opacity: 1; }
        }

        :global(.hero-trace-steady) {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: drawIn 2.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }
        :global(.hero-trace-steady-0) { animation-delay: 0.1s; }
        :global(.hero-trace-steady-1) { animation-delay: 0.2s; }
        :global(.hero-trace-steady-2) { animation-delay: 0.3s; }
        :global(.hero-trace-steady-3) { animation-delay: 0.5s; }
        :global(.hero-trace-steady-4) { animation-delay: 0.6s; }
        :global(.hero-trace-steady-5) { animation-delay: 0.7s; }
        :global(.hero-trace-steady-6) { animation-delay: 0.8s; }

        :global(.hero-trace-hi) {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: drawInHi 2.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.4s forwards;
        }

        :global(.hero-sweep) {
          animation: sweep 18s ease-in-out infinite;
          transform-origin: left center;
        }
        :global(.hero-flag) {
          opacity: 0;
          animation: flagReveal 18s ease-in-out infinite;
        }
        :global(.hero-flag-line),
        :global(.hero-flag-label) {
          opacity: 0;
          animation: flagLineFade 18s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.hero-trace-steady),
          :global(.hero-trace-hi) {
            stroke-dasharray: none;
            stroke-dashoffset: 0;
            animation: none;
            opacity: 1;
          }
          :global(.hero-sweep) {
            animation: none;
            opacity: 0.3;
            transform: translateX(${plotW * 0.55}px);
          }
          :global(.hero-flag),
          :global(.hero-flag-line),
          :global(.hero-flag-label) {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}
