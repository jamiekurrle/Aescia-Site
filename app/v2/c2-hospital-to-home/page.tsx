'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ClinicalNav, ClinicalFooter, DraftBadge } from '../_clinical-chrome'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Hero centerpiece: a hospital building cross-fades into a home as the user
 * scrolls through a 3-screen-tall pinned section. A travelling dot below the
 * pair walks Day 0 → Day 7 to reinforce the journey.
 */
function MorphHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const hospitalOpacity = useTransform(scrollYProgress, [0, 0.45, 0.55], [1, 1, 0])
  const homeOpacity = useTransform(scrollYProgress, [0.45, 0.55, 1], [0, 1, 1])
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const dotX = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const captionStage = useTransform(scrollYProgress, [0, 1], [0, 3.999])

  return (
    <section ref={ref} style={{ background: 'var(--c-stone)', height: '300vh' }} className="relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="label-eyebrow">From discharge to recovery</span>
              <span className="h-px w-12 opacity-70" style={{ background: 'var(--c-brass)' }} />
            </motion.div>

            <h1 className="text-[44px] sm:text-[60px] lg:text-[72px] leading-[1.02] tracking-[-0.03em]" style={{ color: 'var(--c-ink)' }}>
              The hospital{' '}
              <span style={{ color: 'var(--c-mist-deep)' }}>doesn't end</span>
              <br />
              at the front door.
            </h1>

            <p className="mt-8 text-[16px] lg:text-[18px] leading-[1.65] max-w-md" style={{ color: 'var(--c-ink-70)' }}>
              Aescia carries the clinical eye home with the patient. Daily check-ins,
              escalation triggers, audit-grade documentation — the discharge week,
              treated as the work it actually is.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/platform"
                className="inline-flex items-center justify-center px-7 py-4 text-[14px] font-medium tracking-wide transition-opacity hover:opacity-90 min-h-[44px]"
                style={{ background: 'var(--c-ink)', color: 'var(--c-on-ink)' }}
              >
                See the platform
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center text-[14px] tracking-wide"
                style={{ color: 'var(--c-ink-70)' }}
              >
                Talk to the team →
              </Link>
            </div>

            <Captions stage={captionStage} />
          </div>

          {/* Right: morphing diagram */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-square max-w-xl mx-auto">
              <motion.svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full"
                style={{ opacity: hospitalOpacity }}
                aria-hidden="true"
              >
                <line x1="40" y1="340" x2="360" y2="340" stroke="var(--c-ink)" strokeWidth="0.75" />
                <rect x="100" y="120" width="200" height="220" fill="var(--c-paper)" stroke="var(--c-ink)" strokeWidth="1.25" />
                <rect x="170" y="80" width="60" height="40" fill="var(--c-paper)" stroke="var(--c-ink)" strokeWidth="1.25" />
                <rect x="194" y="88" width="12" height="24" fill="var(--c-status-red)" />
                <rect x="188" y="94" width="24" height="12" fill="var(--c-status-red)" />
                {[0, 1, 2, 3].map((row) =>
                  [0, 1, 2, 3].map((col) => (
                    <rect
                      key={`w-${row}-${col}`}
                      x={120 + col * 45}
                      y={150 + row * 45}
                      width="28"
                      height="28"
                      fill="var(--c-tint-mist)"
                      stroke="var(--c-ink)"
                      strokeWidth="0.5"
                    />
                  ))
                )}
                <rect x="180" y="295" width="40" height="45" fill="var(--c-ink)" />
                <line x1="100" y1="120" x2="300" y2="120" stroke="var(--c-ink)" strokeWidth="1" />
                <text
                  x="200"
                  y="375"
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--c-ink-60)"
                  className="font-mono"
                  style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  Discharge
                </text>
              </motion.svg>

              <motion.svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full"
                style={{ opacity: homeOpacity }}
                aria-hidden="true"
              >
                <line x1="40" y1="340" x2="360" y2="340" stroke="var(--c-ink)" strokeWidth="0.75" />
                <line x1="60" y1="340" x2="60" y2="290" stroke="var(--c-ink)" strokeWidth="1" />
                <circle cx="60" cy="270" r="22" fill="var(--c-tint-mist)" stroke="var(--c-ink)" strokeWidth="1" />
                <rect x="130" y="200" width="180" height="140" fill="var(--c-paper)" stroke="var(--c-ink)" strokeWidth="1.25" />
                <polygon points="120,200 220,120 320,200" fill="var(--c-paper)" stroke="var(--c-ink)" strokeWidth="1.25" strokeLinejoin="round" />
                <rect x="270" y="135" width="18" height="40" fill="var(--c-paper)" stroke="var(--c-ink)" strokeWidth="1" />
                <rect x="200" y="270" width="40" height="70" fill="var(--c-ink)" />
                <circle cx="232" cy="305" r="2" fill="var(--c-brass)" />
                <rect x="150" y="225" width="35" height="35" fill="var(--c-tint-mist)" stroke="var(--c-ink)" strokeWidth="0.75" />
                <line x1="167.5" y1="225" x2="167.5" y2="260" stroke="var(--c-ink)" strokeWidth="0.5" />
                <line x1="150" y1="242.5" x2="185" y2="242.5" stroke="var(--c-ink)" strokeWidth="0.5" />
                <rect x="255" y="225" width="35" height="35" fill="var(--c-tint-mist)" stroke="var(--c-ink)" strokeWidth="0.75" />
                <line x1="272.5" y1="225" x2="272.5" y2="260" stroke="var(--c-ink)" strokeWidth="0.5" />
                <line x1="255" y1="242.5" x2="290" y2="242.5" stroke="var(--c-ink)" strokeWidth="0.5" />
                <g transform="translate(335, 230)">
                  <circle r="14" fill="none" stroke="var(--c-brass)" strokeWidth="0.75" strokeDasharray="2 3" />
                  <path
                    d="M -6 0 L -3 0 L -1 -4 L 1 4 L 3 -4 L 5 0 L 8 0"
                    fill="none"
                    stroke="var(--c-status-red)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                </g>
                <text
                  x="200"
                  y="375"
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--c-ink-60)"
                  className="font-mono"
                  style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  Home, monitored
                </text>
              </motion.svg>
            </div>

            <div className="mt-10 px-4">
              <div className="relative h-px w-full" style={{ background: 'var(--c-border)' }}>
                <motion.div
                  className="absolute left-0 top-0 h-px"
                  style={{ width: lineWidth, background: 'var(--c-brass)' }}
                />
                <motion.div
                  className="absolute -top-1 w-2 h-2 rounded-full"
                  style={{ left: dotX, background: 'var(--c-brass)', x: '-50%' }}
                />
              </div>
              <div className="flex justify-between mt-3 label-eyebrow">
                <span>Day 0 · Discharge</span>
                <span>Day 7 · Resolved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CAPTIONS = [
  'A patient is discharged. Until now, structured care ended here.',
  'A clinician-authored pathway begins. Daily check-ins. Symptom thresholds.',
  'Risk surfaces early. The team sees it before the patient is back in ED.',
  'Documentation writes itself. The chart updates as a side-effect.',
]

function Captions({ stage }: { stage: MotionValue<number> }) {
  return (
    <div className="mt-10 lg:mt-12 border-l-2 pl-5" style={{ borderColor: 'var(--c-mist-deep)' }}>
      <div className="label-eyebrow mb-3">Scroll to follow the week</div>
      <div className="relative h-[80px]">
        {CAPTIONS.map((c, i) => (
          <CaptionLine key={i} text={c} index={i} stage={stage} />
        ))}
      </div>
    </div>
  )
}

function CaptionLine({ text, index, stage }: { text: string; index: number; stage: MotionValue<number> }) {
  const opacity = useTransform(stage, (v: number) => {
    const dist = Math.abs(v - index)
    return dist < 0.5 ? 1 - dist * 1.5 : 0
  })
  return (
    <motion.p
      style={{ opacity, color: 'var(--c-ink-90)' }}
      className="absolute inset-0 text-[15px] lg:text-[17px] leading-[1.55]"
    >
      {text}
    </motion.p>
  )
}

function ProductPair() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: 'var(--c-paper)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <span className="label-eyebrow block mb-4">Two surfaces</span>
          <h2 className="text-[32px] lg:text-[48px] leading-[1.08] tracking-[-0.025em] max-w-3xl" style={{ color: 'var(--c-ink)' }}>
            Same engine. Different posture for each setting.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px" style={{ background: 'var(--c-border-cool)' }}>
          {[
            {
              tag: 'Hospital Monitor',
              status: 'Investigational SaMD',
              t: 'Post-discharge monitoring, regulated.',
              d: 'For clinical teams running discharge follow-up at scale. Audit-grade, escalation-aware.',
              href: '/hospitals',
            },
            {
              tag: 'Specialty Clinic',
              status: 'Workflow software',
              t: 'Intake, prep, follow-up — together.',
              d: 'For specialty clinics that lose hours a week to phone tag and ad-hoc preparation.',
              href: '/clinics',
            },
          ].map((p) => (
            <Link
              key={p.tag}
              href={p.href}
              className="group block p-10 lg:p-14 transition-opacity hover:opacity-95"
              style={{ background: 'var(--c-paper)' }}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: 'var(--c-mist-deep)' }}>
                  {p.tag}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] border px-2 py-1" style={{ borderColor: 'var(--c-border-cool)', color: 'var(--c-ink-60)' }}>
                  {p.status}
                </span>
              </div>
              <h3 className="text-[26px] lg:text-[32px] leading-[1.12] tracking-[-0.025em] mb-5" style={{ color: 'var(--c-ink)' }}>
                {p.t}
              </h3>
              <p className="text-[15px] lg:text-[16px] leading-[1.65]" style={{ color: 'var(--c-ink-70)' }}>
                {p.d}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <div className="theme-clinical min-h-screen">
      <ClinicalNav />
      <main>
        <MorphHero />
        <ProductPair />
      </main>
      <ClinicalFooter />
      <DraftBadge variant="C2 — Hospital → Home" />
    </div>
  )
}
