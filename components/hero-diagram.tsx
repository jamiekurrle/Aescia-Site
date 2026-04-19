'use client'

/**
 * A cohort-trajectory diagram for the hero.
 * Eight faint patient sparklines over a 14-day window. Seven stay in
 * the steady band. One dips on day 6, is flagged by Aescia on day 7,
 * and returns to the steady band by day 11. A sweep line moves
 * left-to-right on a slow loop to signal continuous observation.
 *
 * Abstract by design. Does not claim clinical effect.
 */
export function HeroDiagram() {
  const rows = 8
  const days = 14
  const viewW = 520
  const viewH = 420
  const pad = { l: 64, r: 24, t: 36, b: 44 }
  const plotW = viewW - pad.l - pad.r
  const plotH = viewH - pad.t - pad.b
  const rowH = plotH / rows

  // Pre-computed "steady band" traces, seeded so they look organic but render the same each paint.
  const steadySeeds = [0.22, -0.18, 0.08, -0.3, 0.14, 0.36, -0.12]
  function steadyPath(rowIdx: number, seed: number): string {
    const y0 = pad.t + rowIdx * rowH + rowH / 2
    const amp = 3.2
    const pts: string[] = []
    for (let i = 0; i <= days; i++) {
      const x = pad.l + (i / days) * plotW
      const phase = (i / days) * Math.PI * 4 + seed * Math.PI
      const y = y0 + Math.sin(phase) * amp + Math.cos(phase * 1.7) * amp * 0.4
      pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
    }
    return pts.join(' ')
  }

  // The highlighted trajectory. Gentle baseline, dip around day 6-8, recovery through day 11.
  const hiRowIdx = 3
  const hiY0 = pad.t + hiRowIdx * rowH + rowH / 2
  function highlightedPath(): string {
    const pts: string[] = []
    const dipCenter = 7
    const dipWidth = 3.2
    const dipDepth = 22
    for (let i = 0; i <= days; i++) {
      const x = pad.l + (i / days) * plotW
      const u = (i - dipCenter) / dipWidth
      const dip = dipDepth * Math.exp(-u * u)
      const wave = Math.sin((i / days) * Math.PI * 3) * 1.5
      const y = hiY0 + dip + wave
      pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
    }
    return pts.join(' ')
  }

  // Flag position (where Aescia surfaces the dip). Day 7, at the trough.
  const flagX = pad.l + (7 / days) * plotW
  const flagY = hiY0 + 22 // roughly at the trough depth

  // Day markers
  const dayMarkers = [1, 7, 14]

  const labels = ['Patient A', 'Patient B', 'Patient C', 'Patient D', 'Patient E', 'Patient F', 'Patient G', 'Patient H']

  return (
    <div className="w-full max-w-[520px] mx-auto" role="img" aria-label="Illustrative cohort trajectory. Seven patients hold a steady recovery; one dips around day seven and is flagged by the platform. Abstract and does not depict clinical data.">
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="w-full h-auto"
        aria-hidden="true"
        focusable="false"
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
            <stop offset="0.2" stopColor="oklch(0.73 0.09 80)" stopOpacity="0.6" />
            <stop offset="0.8" stopColor="oklch(0.73 0.09 80)" stopOpacity="0.6" />
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
              className={isHi ? 'fill-[oklch(0.96_0.01_85)]' : 'fill-[oklch(0.96_0.01_85)]'}
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '8px',
                letterSpacing: '0.1em',
                opacity: isHi ? 0.9 : 0.35,
              }}
            >
              {label.toUpperCase()}
            </text>
          )
        })}

        {/* Grid baselines */}
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

        {/* Day markers bottom */}
        {dayMarkers.map((d) => {
          const x = pad.l + (d / days) * plotW
          return (
            <g key={d}>
              <line x1={x} x2={x} y1={pad.t} y2={viewH - pad.b + 6} stroke="oklch(0.96 0.01 85)" strokeOpacity={0.08} strokeWidth={0.5} />
              <text
                x={x}
                y={viewH - pad.b + 18}
                textAnchor="middle"
                className="fill-[oklch(0.96_0.01_85)]"
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '8px',
                  letterSpacing: '0.1em',
                  opacity: 0.45,
                }}
              >
                DAY {d}
              </text>
            </g>
          )
        })}

        {/* Steady traces */}
        {Array.from({ length: rows }).map((_, i) => {
          if (i === hiRowIdx) return null
          const seedIdx = i > hiRowIdx ? i - 1 : i
          return (
            <path
              key={i}
              d={steadyPath(i, steadySeeds[seedIdx])}
              fill="none"
              stroke="url(#traceFade)"
              strokeWidth={1}
              strokeLinecap="round"
            />
          )
        })}

        {/* Highlighted trace (the one that dips) */}
        <path
          d={highlightedPath()}
          fill="none"
          stroke="url(#hiTrace)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* Flag point */}
        <g className="aescia-flag">
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
        />
        <text
          x={flagX + 48}
          y={flagY + 3}
          textAnchor="start"
          className="fill-[oklch(0.73_0.09_80)]"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '8.5px',
            letterSpacing: '0.1em',
          }}
        >
          DAY 7 · FLAG
        </text>

        {/* Sweep line, animated left-to-right */}
        <g className="aescia-sweep">
          <line
            x1={pad.l}
            x2={pad.l}
            y1={pad.t - 4}
            y2={viewH - pad.b + 4}
            stroke="url(#sweepGrad)"
            strokeWidth={1.2}
          />
        </g>

        {/* Top caption */}
        <text
          x={pad.l}
          y={pad.t - 14}
          className="fill-[oklch(0.73_0.09_80)]"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            letterSpacing: '0.18em',
          }}
        >
          COHORT · 14-DAY POST-DISCHARGE WINDOW
        </text>
        <text
          x={viewW - pad.r}
          y={pad.t - 14}
          textAnchor="end"
          className="fill-[oklch(0.96_0.01_85)]"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '9px',
            letterSpacing: '0.18em',
            opacity: 0.55,
          }}
        >
          ILLUSTRATIVE
        </text>
      </svg>

      <style jsx>{`
        @keyframes sweep {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translateX(${plotW}px);
            opacity: 0;
          }
        }
        @keyframes flagPulse {
          0%,
          40% {
            opacity: 0;
            transform: scale(0.6);
          }
          55% {
            opacity: 1;
            transform: scale(1.15);
          }
          70% {
            opacity: 1;
            transform: scale(1);
          }
          92%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        :global(.aescia-sweep) {
          animation: sweep 14s ease-in-out infinite;
          transform-origin: left center;
        }
        :global(.aescia-flag) {
          animation: flagPulse 14s ease-in-out infinite;
          transform-origin: ${flagX}px ${flagY}px;
          transform-box: fill-box;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.aescia-sweep) {
            animation: none;
            opacity: 0.25;
            transform: translateX(${plotW / 2}px);
          }
          :global(.aescia-flag) {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}
