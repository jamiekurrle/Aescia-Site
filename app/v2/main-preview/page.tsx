'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useI18n } from '@/lib/i18n'
import { ClinicalNav, ClinicalFooter, DraftBadge } from '../_clinical-chrome'

const ease = [0.22, 1, 0.36, 1] as const

/* ============================================================================
   TOWN MAP — isometric wireframe town.
   Architectural-blueprint aesthetic: all edges visible, transparent volumes,
   thin white lines on navy. Hospital at the centre as the tallest building.
   Patient-dots travel in iso space between hospital and homes; some turn red
   and trigger a "!" alert before returning to hospital.
   ============================================================================ */

const BLUE = '#5C7A99'   // mist-deep — "stable / monitored"
const RED  = '#B53A2C'   // status-red — "deteriorating"
const LINE_PRIMARY = 'rgba(255,255,255,0.78)'
const LINE_SECONDARY = 'rgba(255,255,255,0.40)'
const LINE_FAINT = 'rgba(255,255,255,0.18)'

/* ----- Isometric projection ------------------------------------------------ */
/* World axes: x = right (in plan), z = down (in plan), y = height.
   Iso projection: x and z become diagonals, y goes straight up. */
const UX = 0.866   // cos(30°)
const UZ = 0.5     // sin(30°)

function iso(x: number, y: number, z: number): { sx: number; sy: number } {
  return {
    sx: (x - z) * UX * 16,   // 16 px/unit horizontal
    sy: (x + z) * UZ * 16 - y * 16,
  }
}

function p(x: number, y: number, z: number): string {
  const { sx, sy } = iso(x, y, z)
  return `${sx.toFixed(2)},${sy.toFixed(2)}`
}

/* ----- Wireframe building --------------------------------------------------- */

type BuildingProps = {
  x: number; z: number          // footprint origin (NW corner in plan)
  w: number; d: number          // width / depth
  h: number                     // height in units
  floors?: number               // horizontal floor slice count
  windows?: number              // vertical window stripe count per face
  emphasis?: boolean            // bold lines (hospital)
}

function Building({ x, z, w, d, h, floors = 0, windows = 0, emphasis = false }: BuildingProps) {
  const stroke = emphasis ? LINE_PRIMARY : LINE_SECONDARY
  const sw = emphasis ? 1.0 : 0.6
  const fillStroke = emphasis ? LINE_SECONDARY : LINE_FAINT

  // 8 vertices
  const v = {
    blf: p(x,     0, z + d),     // bottom-left-front
    brf: p(x + w, 0, z + d),     // bottom-right-front
    brb: p(x + w, 0, z),         // bottom-right-back
    blb: p(x,     0, z),         // bottom-left-back
    tlf: p(x,     h, z + d),
    trf: p(x + w, h, z + d),
    trb: p(x + w, h, z),
    tlb: p(x,     h, z),
  }

  const lines: [string, string][] = [
    // Bottom rectangle
    [v.blf, v.brf], [v.brf, v.brb], [v.brb, v.blb], [v.blb, v.blf],
    // Top rectangle
    [v.tlf, v.trf], [v.trf, v.trb], [v.trb, v.tlb], [v.tlb, v.tlf],
    // Vertical edges
    [v.blf, v.tlf], [v.brf, v.trf], [v.brb, v.trb], [v.blb, v.tlb],
  ]

  // Floor slices (horizontal rectangles at intermediate heights)
  const floorLines: [string, string][] = []
  for (let i = 1; i < floors; i++) {
    const y = (h / floors) * i
    floorLines.push(
      [p(x,     y, z + d), p(x + w, y, z + d)],
      [p(x + w, y, z + d), p(x + w, y, z)],
      [p(x + w, y, z),     p(x,     y, z)],
      [p(x,     y, z),     p(x,     y, z + d)],
    )
  }

  // Window stripes (vertical lines on the two front-facing visible faces)
  const winLines: [string, string][] = []
  for (let i = 1; i < windows; i++) {
    const xx = x + (w / windows) * i
    const zz = z + (d / windows) * i
    // Front face (right side, x+w plane)
    winLines.push([p(x + w, 0, z + d - (d / windows) * i), p(x + w, h, z + d - (d / windows) * i)])
    // Right face (front-z plane)
    winLines.push([p(xx, 0, z + d), p(xx, h, z + d)])
  }

  return (
    <g>
      {/* Outer + vertical edges (heavier) */}
      {lines.map(([a, b], i) => (
        <line key={`o-${i}`} x1={a.split(',')[0]} y1={a.split(',')[1]} x2={b.split(',')[0]} y2={b.split(',')[1]} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      ))}
      {/* Floor slices (lighter) */}
      {floorLines.map(([a, b], i) => (
        <line key={`f-${i}`} x1={a.split(',')[0]} y1={a.split(',')[1]} x2={b.split(',')[0]} y2={b.split(',')[1]} stroke={fillStroke} strokeWidth="0.4" />
      ))}
      {/* Window stripes (lightest) */}
      {winLines.map(([a, b], i) => (
        <line key={`w-${i}`} x1={a.split(',')[0]} y1={a.split(',')[1]} x2={b.split(',')[0]} y2={b.split(',')[1]} stroke={fillStroke} strokeWidth="0.3" />
      ))}
    </g>
  )
}

/* ----- Ground street between two iso points -------------------------------- */
function Street({ from, to }: { from: { x: number; z: number }; to: { x: number; z: number } }) {
  const a = iso(from.x, 0, from.z)
  const b = iso(to.x, 0, to.z)
  return (
    <line
      x1={a.sx}
      y1={a.sy}
      x2={b.sx}
      y2={b.sy}
      stroke={LINE_FAINT}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  )
}

function StreetCentre({ from, to }: { from: { x: number; z: number }; to: { x: number; z: number } }) {
  const a = iso(from.x, 0, from.z)
  const b = iso(to.x, 0, to.z)
  return (
    <line
      x1={a.sx}
      y1={a.sy}
      x2={b.sx}
      y2={b.sy}
      stroke="rgba(255,255,255,0.30)"
      strokeWidth="0.4"
      strokeDasharray="2 4"
    />
  )
}

/* --- Building primitives ---------------------------------------------------- */

/* --- Town layout (in iso world coords; units = ~16 px on screen) ----------- */

type Home = {
  cx: number; cz: number   // home centre in iso world (xz plane)
  w: number; d: number; h: number  // building footprint and height
  floors?: number          // floor slice count
  windows?: number         // window stripe count per face
  deteriorates: boolean
}

// Hospital sits at world origin (0, 0, 0). Footprint is centred on (0,0).
const HOSPITAL = { cx: 0, cz: 0, w: 5, d: 5, h: 5.5, floors: 5, windows: 4 }

const HOMES: Home[] = [
  { cx: -8.5,  cz: -5.5, w: 2.4, d: 2.4, h: 2.5, floors: 2, windows: 2, deteriorates: false },  // NW house
  { cx: -10.5, cz:  1,   w: 2.2, d: 2.4, h: 4.0, floors: 4, windows: 2, deteriorates: true  },  // W taller
  { cx: -7.5,  cz:  7.5, w: 2.4, d: 2.4, h: 2.4, floors: 2, windows: 2, deteriorates: false },  // SW
  { cx:  3.5,  cz:  9,   w: 2.6, d: 2.6, h: 3.2, floors: 3, windows: 2, deteriorates: false },  // S
  { cx:  9.5,  cz:  4,   w: 2.4, d: 2.4, h: 5.0, floors: 5, windows: 2, deteriorates: true  },  // E apartment
  { cx:  8,    cz: -6,   w: 2.4, d: 2.4, h: 2.6, floors: 2, windows: 2, deteriorates: false },  // NE
  { cx: -2,    cz: -10,  w: 3.0, d: 3.0, h: 4.5, floors: 4, windows: 3, deteriorates: false },  // N civic / office
]

/* --- Patient dot in iso space + alert badge -------------------------------- */

function PatientDot({ home, index, total }: { home: Home; index: number; total: number }) {
  const reducedMotion = useReducedMotion()
  const start = iso(0, 0.4, 0)              // hospital roof level (slight lift off ground)
  const end = iso(home.cx, 0.4, home.cz)    // home roof level

  if (reducedMotion) {
    return <circle cx={end.sx} cy={end.sy} r={3.5} fill={home.deteriorates ? RED : BLUE} />
  }

  const cycle = 14
  const stagger = (cycle / total) * index

  if (home.deteriorates) {
    return (
      <motion.circle
        r={3.5}
        initial={{ cx: start.sx, cy: start.sy, fill: BLUE, opacity: 0 }}
        animate={{
          cx: [start.sx, end.sx, end.sx, end.sx, start.sx, start.sx],
          cy: [start.sy, end.sy, end.sy, end.sy, start.sy, start.sy],
          fill: [BLUE, BLUE, BLUE, RED, RED, RED],
          opacity: [0, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: cycle,
          times: [0, 0.18, 0.50, 0.58, 0.85, 1],
          repeat: Infinity,
          ease: 'easeInOut',
          delay: stagger,
        }}
      />
    )
  }

  return (
    <motion.circle
      r={3.5}
      initial={{ cx: start.sx, cy: start.sy, fill: BLUE, opacity: 0 }}
      animate={{
        cx: [start.sx, end.sx, end.sx, end.sx],
        cy: [start.sy, end.sy, end.sy, end.sy],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: cycle,
        times: [0, 0.18, 0.85, 1],
        repeat: Infinity,
        ease: 'easeInOut',
        delay: stagger,
      }}
    />
  )
}

/**
 * Floats above a deteriorating home during the red phase of the dot cycle.
 * Synchronised to the same cycle/stagger as the dot.
 */
function AlertBadge({ home, index, total }: { home: Home; index: number; total: number }) {
  const reducedMotion = useReducedMotion()
  if (!home.deteriorates) return null
  const above = iso(home.cx, home.h + 0.8, home.cz)

  if (reducedMotion) {
    return (
      <g transform={`translate(${above.sx}, ${above.sy})`}>
        <circle r="6" fill={RED} stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
        <text x="0" y="2.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="white">!</text>
      </g>
    )
  }

  const cycle = 14
  const stagger = (cycle / total) * index

  return (
    <motion.g
      transform={`translate(${above.sx}, ${above.sy})`}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{
        opacity: [0, 0, 0, 1, 1, 0],
        scale: [0.4, 0.4, 0.4, 1.2, 1, 0.6],
      }}
      transition={{
        duration: cycle,
        times: [0, 0.45, 0.50, 0.58, 0.80, 0.88],
        repeat: Infinity,
        ease: 'easeOut',
        delay: stagger,
      }}
      style={{ transformOrigin: `${above.sx}px ${above.sy}px` }}
    >
      <circle r="7" fill={RED} stroke="rgba(255,255,255,0.85)" strokeWidth="0.6" />
      <text x="0" y="3" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" style={{ fontFamily: 'inherit' }}>!</text>
      {/* radiating ring for emphasis */}
      <motion.circle
        r="7"
        fill="none"
        stroke={RED}
        strokeWidth="0.6"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 2.2, 2.2], opacity: [0.7, 0, 0] }}
        transition={{
          duration: 1.6,
          times: [0, 0.6, 1],
          repeat: Infinity,
          ease: 'easeOut',
          delay: stagger + cycle * 0.50,
          repeatDelay: cycle - 1.6,
        }}
        style={{ transformOrigin: 'center' }}
      />
    </motion.g>
  )
}

/* --- The town -------------------------------------------------------------- */

function TownMap() {
  // Compute viewBox to fit the iso projection comfortably
  return (
    <svg
      viewBox="-280 -200 560 420"
      className="w-full h-auto"
      role="img"
      aria-label="An isometric wireframe town. The hospital sits at the centre as the tallest building. Patient-dots leave the hospital toward houses; some turn red and trigger an alert before returning to hospital."
    >
      {/* Ground plane — a faint iso quad to hint at the land */}
      <polygon
        points={`${p(-15, 0, -15)} ${p(15, 0, -15)} ${p(15, 0, 15)} ${p(-15, 0, 15)}`}
        fill="rgba(255,255,255,0.015)"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="0.4"
      />

      {/* Ground grid lines (iso) */}
      <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.3">
        {Array.from({ length: 11 }).map((_, i) => {
          const t = -15 + i * 3
          return (
            <g key={i}>
              <line x1={iso(t, 0, -15).sx} y1={iso(t, 0, -15).sy} x2={iso(t, 0, 15).sx} y2={iso(t, 0, 15).sy} />
              <line x1={iso(-15, 0, t).sx} y1={iso(-15, 0, t).sy} x2={iso(15, 0, t).sx} y2={iso(15, 0, t).sy} />
            </g>
          )
        })}
      </g>

      {/* Streets — straight iso lines from hospital to each home (faint corridor) */}
      {HOMES.map((h, i) => (
        <g key={`st-${i}`}>
          <Street from={{ x: 0, z: 0 }} to={{ x: h.cx, z: h.cz }} />
          <StreetCentre from={{ x: 0, z: 0 }} to={{ x: h.cx, z: h.cz }} />
        </g>
      ))}

      {/* Homes — wireframe boxes with floor slices and windows */}
      {HOMES.map((h, i) => (
        <Building
          key={`b-${i}`}
          x={h.cx - h.w / 2}
          z={h.cz - h.d / 2}
          w={h.w}
          d={h.d}
          h={h.h}
          floors={h.floors}
          windows={h.windows}
        />
      ))}

      {/* Hospital — central, tallest, drawn with emphasis */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <Building
          x={HOSPITAL.cx - HOSPITAL.w / 2}
          z={HOSPITAL.cz - HOSPITAL.d / 2}
          w={HOSPITAL.w}
          d={HOSPITAL.d}
          h={HOSPITAL.h}
          floors={HOSPITAL.floors}
          windows={HOSPITAL.windows}
          emphasis
        />
        {/* Brass cross floating above the hospital roof */}
        {(() => {
          const top = iso(0, HOSPITAL.h + 1.6, 0)
          return (
            <g transform={`translate(${top.sx}, ${top.sy})`}>
              <rect x="-2.5" y="-7" width="5" height="14" fill="#B89D6A" />
              <rect x="-7" y="-2.5" width="14" height="5" fill="#B89D6A" />
            </g>
          )
        })()}
        {/* Hospital label */}
        {(() => {
          const labelPos = iso(HOSPITAL.cx, -0.5, HOSPITAL.cz + 5)
          return (
            <text
              x={labelPos.sx}
              y={labelPos.sy + 14}
              textAnchor="middle"
              fontSize="8"
              fill="rgba(255,255,255,0.78)"
              className="font-mono"
              style={{ letterSpacing: '0.26em', textTransform: 'uppercase' }}
            >
              Hospital
            </text>
          )
        })()}
      </motion.g>

      {/* Patient dots — animate in iso screen space */}
      {HOMES.map((h, i) => (
        <PatientDot key={`d-${i}`} home={h} index={i} total={HOMES.length} />
      ))}

      {/* Alert badges — only render for deteriorating homes; sync to red phase */}
      {HOMES.map((h, i) =>
        h.deteriorates ? <AlertBadge key={`a-${i}`} home={h} index={i} total={HOMES.length} /> : null
      )}

      {/* Legend (positioned in screen coords near bottom of viewBox) */}
      <g transform="translate(-260, 200)">
        <circle cx="0" cy="0" r="3" fill={BLUE} />
        <text x="8" y="3" fontSize="7" fill="rgba(255,255,255,0.55)" className="font-mono" style={{ letterSpacing: '0.14em' }}>
          STABLE · MONITORED AT HOME
        </text>
      </g>
      <g transform="translate(60, 200)">
        <circle cx="0" cy="0" r="3" fill={RED} />
        <text x="8" y="3" fontSize="7" fill="rgba(255,255,255,0.55)" className="font-mono" style={{ letterSpacing: '0.14em' }}>
          ESCALATING · RETURN TO HOSPITAL
        </text>
      </g>
    </svg>
  )
}

/* ============================================================================
   NAVY HERO — uses the town map. Replaces the white hero entirely.
   ============================================================================ */

function NavyHero() {
  const { t } = useI18n()

  return (
    <section className="relative pt-32 lg:pt-36 pb-24 lg:pb-32 px-6 lg:px-10 overflow-hidden" style={{ background: 'var(--c-ink)', color: 'var(--c-on-ink)' }}>
      {/* Brass + mist glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 80% 0%, rgba(168,194,216,0.18), transparent 60%), radial-gradient(ellipse 70% 50% at 0% 100%, rgba(184,157,106,0.10), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: 'var(--c-brass-soft)' }}>
              {t('hero.eyebrow')}
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              style={{ transformOrigin: 'left', background: 'var(--c-brass)' }}
              className="h-px w-12 opacity-80"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
            className="text-[40px] sm:text-[54px] lg:text-[68px] xl:text-[78px] leading-[1.04] tracking-[-0.03em] max-w-2xl"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-8 lg:mt-10 max-w-xl text-[17px] lg:text-[19px] leading-[1.6]"
            style={{ color: 'var(--c-on-ink-70)' }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6"
          >
            <Link
              href="/platform"
              className="group inline-flex items-center justify-center px-7 py-4 text-[14px] font-medium tracking-wide transition-opacity hover:opacity-90 min-h-[44px]"
              style={{ background: 'var(--c-on-ink)', color: 'var(--c-ink)' }}
            >
              {t('hero.cta.primary')}
              <svg className="w-3.5 h-3.5 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center text-[14px] tracking-wide transition-opacity"
              style={{ color: 'var(--c-on-ink-70)' }}
            >
              {t('hero.cta.secondary')}
              <svg className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16 lg:mt-24 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-8"
            style={{ borderColor: 'rgba(255,255,255,0.15)' }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--c-on-ink-50)' }}>
              {t('hero.trial.label')}
            </span>
            <span className="font-mono text-[12px]" style={{ color: 'var(--c-brass-soft)' }}>
              {t('hero.trial.brief')}
            </span>
            <span className="text-[12px]" style={{ color: 'var(--c-on-ink-70)' }}>
              {t('hero.trial.site')}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="lg:col-span-5"
        >
          <TownMap />
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================================
   TRUST STRIP
   ============================================================================ */

function TrustStrip() {
  const { t } = useI18n()
  const items = [
    { value: t('trust.item1.value'), label: t('trust.item1.label') },
    { value: t('trust.item2.value'), label: t('trust.item2.label') },
    { value: t('trust.item3.value'), label: t('trust.item3.label') },
    { value: t('trust.item4.value'), label: t('trust.item4.label') },
  ]
  return (
    <section className="border-y" style={{ background: 'var(--c-stone)', borderColor: 'var(--c-border)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 lg:py-10">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
          {items.map((item, i) => (
            <li key={i} className="inline-flex items-baseline gap-2">
              <span className="font-mono text-[12px] tracking-wide font-semibold" style={{ color: 'var(--c-ink)' }}>
                {item.value}
              </span>
              <span className="text-[11px] tracking-wide" style={{ color: 'var(--c-ink-60)' }}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ============================================================================
   AUDIENCE SPLIT
   ============================================================================ */

function AudienceSplit() {
  const { t } = useI18n()
  const cards = [
    {
      eyebrow: t('split.hospital.eyebrow'),
      regtag: t('split.hospital.regtag'),
      title: t('split.hospital.title'),
      desc: t('split.hospital.desc'),
      cta: t('split.hospital.cta'),
      href: '/hospitals',
      dark: true,
    },
    {
      eyebrow: t('split.clinic.eyebrow'),
      regtag: t('split.clinic.regtag'),
      title: t('split.clinic.title'),
      desc: t('split.clinic.desc'),
      cta: t('split.clinic.cta'),
      href: '/clinics',
      dark: false,
    },
  ]

  return (
    <section style={{ background: 'var(--c-stone)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-px" style={{ background: 'var(--c-border-cool)' }}>
          {cards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              style={{
                background: card.dark ? 'var(--c-ink)' : 'var(--c-paper)',
                color: card.dark ? 'var(--c-on-ink)' : 'var(--c-ink)',
              }}
            >
              <Link href={card.href} className="group block px-8 lg:px-12 py-16 lg:py-20 h-full">
                <div className="flex items-center justify-between mb-10 gap-3 flex-wrap">
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold"
                    style={{ color: card.dark ? 'var(--c-brass-soft)' : 'var(--c-mist-deep)' }}
                  >
                    {card.eyebrow}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.15em] border px-2 py-1"
                    style={{
                      borderColor: card.dark ? 'rgba(255,255,255,0.20)' : 'var(--c-border-cool)',
                      color: card.dark ? 'var(--c-on-ink-70)' : 'var(--c-ink-60)',
                    }}
                  >
                    {card.regtag}
                  </span>
                </div>
                <h3 className="text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mb-6 max-w-md">
                  {card.title}
                </h3>
                <p className="text-[15px] lg:text-[16px] leading-[1.6] max-w-md mb-10" style={{ color: card.dark ? 'var(--c-on-ink-70)' : 'var(--c-ink-70)' }}>
                  {card.desc}
                </p>
                <span className="inline-flex items-center gap-2.5 text-[13px] font-medium tracking-wide group-hover:gap-4 transition-all">
                  {card.cta}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================================
   PLATFORM BLURB (with five-step pill row)
   ============================================================================ */

function PlatformBlurb() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const pills = ['platform.pill.collect', 'platform.pill.follow', 'platform.pill.remind', 'platform.pill.educate', 'platform.pill.export']

  return (
    <section ref={ref} className="py-24 lg:py-36 px-6 lg:px-10" style={{ background: 'var(--c-paper)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-5"
          >
            <span className="label-eyebrow block mb-6" style={{ color: 'var(--c-mist-deep)' }}>
              {t('platform.eyebrow')}
            </span>
            <h2 className="text-[34px] lg:text-[46px] leading-[1.08] tracking-[-0.025em]" style={{ color: 'var(--c-ink)' }}>
              {t('platform.title')}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <p className="text-[16px] lg:text-[18px] leading-[1.7] max-w-2xl" style={{ color: 'var(--c-ink-70)' }}>
              {t('platform.body')}
            </p>
          </motion.div>
        </div>

        {/* Five-step pill row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="grid grid-cols-2 md:grid-cols-5 gap-px mt-8"
          style={{ background: 'var(--c-border-cool)' }}
        >
          {pills.map((p, i) => (
            <div key={p} className="px-6 py-8 text-center" style={{ background: 'var(--c-paper)' }}>
              <span className="font-mono text-[10px] tracking-widest block mb-3" style={{ color: 'var(--c-brass)' }}>
                0{i + 1}
              </span>
              <div className="text-[16px] font-semibold tracking-tight" style={{ color: 'var(--c-ink)' }}>
                {t(p)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================================
   PILLARS
   ============================================================================ */

function Pillars() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const items = [
    { n: '01', title: t('pillars.transparent.title'), desc: t('pillars.transparent.desc') },
    { n: '02', title: t('pillars.clinician.title'),    desc: t('pillars.clinician.desc') },
    { n: '03', title: t('pillars.dual.title'),         desc: t('pillars.dual.desc') },
  ]

  return (
    <section ref={ref} className="py-24 lg:py-36 px-6 lg:px-10" style={{ background: 'var(--c-stone)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl mb-16 lg:mb-20"
        >
          <h2 className="text-[34px] lg:text-[46px] leading-[1.08] tracking-[-0.025em]" style={{ color: 'var(--c-ink)' }}>
            {t('pillars.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {items.map((item, i) => (
            <motion.article
              key={item.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="border-t pt-8"
              style={{ borderColor: 'var(--c-border)' }}
            >
              <span className="font-mono text-[12px] tracking-widest block mb-10" style={{ color: 'var(--c-brass)' }}>
                {item.n}
              </span>
              <h3 className="text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.015em] mb-4" style={{ color: 'var(--c-ink)' }}>
                {item.title}
              </h3>
              <p className="text-[14.5px] lg:text-[15px] leading-[1.7]" style={{ color: 'var(--c-ink-70)' }}>
                {item.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================================
   EVIDENCE RIBBON
   ============================================================================ */

function EvidenceRibbon() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const facts = [
    { value: t('evidence.fact1.value'), label: t('evidence.fact1.label'), mono: true },
    { value: t('evidence.fact2.value'), label: t('evidence.fact2.label'), mono: false },
    { value: t('evidence.fact3.value'), label: t('evidence.fact3.label'), mono: false },
  ]

  return (
    <section ref={ref} className="py-28 lg:py-40 border-t px-6 lg:px-10" style={{ background: 'var(--c-paper)', borderColor: 'var(--c-border)' }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="lg:col-span-5"
        >
          <span className="label-eyebrow block mb-6" style={{ color: 'var(--c-brass)' }}>
            {t('evidence.eyebrow')}
          </span>
          <h2 className="text-[34px] lg:text-[46px] leading-[1.08] tracking-[-0.025em] mb-8" style={{ color: 'var(--c-ink)' }}>
            {t('evidence.title')}
          </h2>
          <p className="text-[15px] lg:text-[16px] leading-[1.7] max-w-lg" style={{ color: 'var(--c-ink-70)' }}>
            {t('evidence.body')}
          </p>
          <Link
            href="/evidence"
            className="inline-flex items-center gap-2.5 mt-10 text-[14px] font-medium tracking-wide group"
            style={{ color: 'var(--c-ink)' }}
          >
            {t('evidence.cta')}
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="lg:col-span-6 lg:col-start-7"
        >
          <dl className="grid gap-0">
            {facts.map((fact, i) => (
              <div
                key={i}
                className={`py-8 lg:py-10 grid grid-cols-[auto_1fr] gap-8 items-baseline ${i > 0 ? 'border-t' : ''}`}
                style={{ borderColor: 'var(--c-border)' }}
              >
                <dt
                  className={fact.mono ? 'font-mono text-[18px] lg:text-[20px]' : 'text-[40px] lg:text-[52px] font-bold'}
                  style={{ color: 'var(--c-ink)', letterSpacing: '-0.025em', lineHeight: 1 }}
                >
                  {fact.value}
                </dt>
                <dd className="text-[12px] lg:text-[13px] uppercase tracking-[0.18em]" style={{ color: 'var(--c-ink-60)' }}>
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================================
   PARTNERS STRIP
   ============================================================================ */

const partnerLinks: Record<number, string | undefined> = {
  1: 'https://www.slhd.nsw.gov.au/rpa/',
  2: 'https://www.bairdinstitute.org.au',
  3: 'https://www.slhd.nsw.gov.au/rpa/ias/',
  4: 'https://www.cheoresearch.ca',
  5: 'https://district3.co',
  6: 'https://medtechcompass.org.au/',
}

function PartnersStrip() {
  const { t } = useI18n()
  const partners = [1, 2, 3, 4, 5, 6].map((n) => ({
    name: t(`partners.item${n}.name`),
    role: t(`partners.item${n}.role`),
    n: String(n).padStart(2, '0'),
    href: partnerLinks[n],
  }))

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 border-t" style={{ background: 'var(--c-stone)', borderColor: 'var(--c-border)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="label-eyebrow" style={{ color: 'var(--c-brass)' }}>
                {t('partners.eyebrow')}
              </span>
              <span className="h-px w-10 opacity-70" style={{ background: 'var(--c-brass)' }} />
            </div>
            <h2 className="text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em]" style={{ color: 'var(--c-ink)' }}>
              {t('partners.title')}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[16px] lg:text-[17px] leading-[1.7] mb-8" style={{ color: 'var(--c-ink-70)' }}>
              {t('partners.body')}
            </p>
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 items-baseline border-l-2 pl-5" style={{ borderColor: 'var(--c-mist-deep)' }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: 'var(--c-mist-deep)' }}>
                {t('partners.trial.label')}
              </span>
              <a
                href="https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482"
                target="_blank"
                rel="noopener"
                className="font-mono text-[14px] underline decoration-[1px] underline-offset-4 hover:decoration-[2px]"
                style={{ color: 'var(--c-ink)' }}
              >
                {t('partners.trial.value')}
              </a>
            </div>
          </div>
        </div>

        <ul
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-px border-y"
          style={{ background: 'var(--c-border-cool)', borderColor: 'var(--c-border)' }}
        >
          {partners.map((p) => {
            const inner = (
              <>
                <span className="font-mono text-[10px] tracking-widest mb-4" style={{ color: 'var(--c-brass)' }}>
                  {p.n}
                </span>
                <p className="text-[16px] lg:text-[17px] leading-[1.25] tracking-[-0.01em] mb-3 font-semibold" style={{ color: 'var(--c-ink)' }}>
                  {p.name}
                </p>
                <p className="text-[12.5px] leading-[1.55] mt-auto" style={{ color: 'var(--c-ink-70)' }}>
                  {p.role}
                </p>
              </>
            )
            return (
              <li key={p.n} className="flex" style={{ background: 'var(--c-paper)' }}>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener"
                    className="flex flex-col p-6 lg:p-7 min-h-[160px] w-full transition-colors hover:opacity-90"
                  >
                    {inner}
                    <span className="sr-only">(opens in a new window)</span>
                  </a>
                ) : (
                  <div className="flex flex-col p-6 lg:p-7 min-h-[160px] w-full">{inner}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ============================================================================
   CTA
   ============================================================================ */

function CTASection() {
  const { t } = useI18n()
  return (
    <section className="relative py-32 lg:py-44 overflow-hidden" style={{ background: 'var(--c-ink)', color: 'var(--c-on-ink)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 70% at 50% 100%, rgba(168,194,216,0.18), transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-[38px] lg:text-[56px] leading-[1.05] tracking-[-0.03em] mb-8"
        >
          {t('cta.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="text-[16px] lg:text-[18px] leading-[1.6] mb-14 max-w-xl mx-auto"
          style={{ color: 'var(--c-on-ink-70)' }}
        >
          {t('cta.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 font-medium px-8 py-4 text-[14px] tracking-wide transition-opacity hover:opacity-90 min-h-[44px]"
            style={{ background: 'var(--c-on-ink)', color: 'var(--c-ink)' }}
          >
            {t('cta.button')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================================
   PAGE
   ============================================================================ */

export default function MainPreview() {
  return (
    <div className="theme-clinical min-h-screen">
      <ClinicalNav />
      <main>
        <NavyHero />
        <AudienceSplit />
        <TrustStrip />
        <PlatformBlurb />
        <Pillars />
        <EvidenceRibbon />
        <PartnersStrip />
        <CTASection />
      </main>
      <ClinicalFooter />
      <DraftBadge variant="Main preview" />
    </div>
  )
}
