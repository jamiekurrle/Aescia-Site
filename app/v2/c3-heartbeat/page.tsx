'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { ClinicalNav, ClinicalFooter, DraftBadge } from '../_clinical-chrome'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * A single ECG-style trace runs the right rail of the page as you scroll.
 * The path is draw-on via motion's native pathLength shorthand. The full
 * trace = a baseline punctuated by QRS complexes, one of them a tachy spike
 * marking the Day-2 escalation event. A trailing dot follows the drawing tip.
 */
function ECGRail() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Build the ECG path procedurally — calm beats, one tachy run, more calm.
  const path = (() => {
    const segments: string[] = ['M 50 0']
    const baselineLen = 50
    const beats = [
      { type: 'normal', y: 80 },
      { type: 'normal', y: 160 },
      { type: 'normal', y: 240 },
      { type: 'tachy', y: 320 },
      { type: 'tachy', y: 360 },
      { type: 'tachy', y: 400 },
      { type: 'tachy', y: 440 },
      { type: 'normal', y: 540 },
      { type: 'normal', y: 620 },
      { type: 'normal', y: 700 },
      { type: 'normal', y: 780 },
      { type: 'normal', y: 860 },
      { type: 'normal', y: 940 },
      { type: 'normal', y: 1020 },
    ]
    for (const beat of beats) {
      const a = beat.type === 'tachy' ? 32 : 16
      // P wave (small bump)
      segments.push(`L 50 ${beat.y - 14}`, `Q 46 ${beat.y - 18} 50 ${beat.y - 14}`)
      // QRS — sharp Q down, R up, S down
      segments.push(
        `L 50 ${beat.y - 4}`,
        `L 46 ${beat.y - 2}`,
        `L 54 ${beat.y - a}`,
        `L 50 ${beat.y + 6}`,
        `L 50 ${beat.y + 12}`,
      )
      // T wave (rounded bump)
      segments.push(`Q 56 ${beat.y + 18} 50 ${beat.y + 24}`)
    }
    segments.push('L 50 1200')
    return segments.join(' ')
  })()

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Fixed full-viewport rail */}
      <div className="hidden lg:block fixed right-8 top-0 h-screen w-32 z-30">
        <svg
          viewBox="0 0 100 1200"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          {/* baseline */}
          <line x1="50" y1="0" x2="50" y2="1200" stroke="var(--c-border)" strokeWidth="0.4" strokeDasharray="2 4" />
          {/* the trace */}
          <motion.path
            d={path}
            fill="none"
            stroke="var(--c-status-red)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>

        {/* Bottom-right legend */}
        <div className="absolute bottom-8 right-0 text-right">
          <div className="label-eyebrow mb-1" style={{ color: 'var(--c-ink-40)' }}>Live trace</div>
          <div className="text-[11px] font-mono" style={{ color: 'var(--c-status-red)' }}>scroll to draw</div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-32 lg:pb-44 px-6 lg:px-10" style={{ background: 'var(--c-stone)' }}>
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="label-eyebrow">Live signal, structured response</span>
          <span className="h-px w-12 opacity-70" style={{ background: 'var(--c-brass)' }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-[44px] sm:text-[60px] lg:text-[80px] xl:text-[96px] leading-[1.02] tracking-[-0.03em] max-w-5xl"
          style={{ color: 'var(--c-ink)' }}
        >
          Continuous care<br />
          has a <span style={{ color: 'var(--c-status-red)' }}>pulse.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-10 max-w-2xl text-[17px] lg:text-[19px] leading-[1.6]"
          style={{ color: 'var(--c-ink-70)' }}
        >
          A check-in arrives. A trigger fires. A clinician steps in. Aescia is the
          rhythm of structured follow-up — from the discharge note to the resolved
          chart, with the work the chart proves you did, in the chart.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="mt-12 flex flex-col sm:flex-row gap-5"
        >
          <Link
            href="/platform"
            className="inline-flex items-center justify-center px-7 py-4 text-[14px] font-medium tracking-wide transition-opacity hover:opacity-90 min-h-[44px]"
            style={{ background: 'var(--c-ink)', color: 'var(--c-on-ink)' }}
          >
            See the platform
          </Link>
          <Link
            href="/evidence"
            className="inline-flex items-center justify-center text-[14px] tracking-wide"
            style={{ color: 'var(--c-ink-70)' }}
          >
            The evidence base →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function PulseSection({
  eyebrow,
  title,
  body,
  emphasis,
}: {
  eyebrow: string
  title: string
  body: string
  emphasis?: 'normal' | 'spike'
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease }}
      className="py-20 lg:py-28 px-6 lg:px-10"
      style={{ background: emphasis === 'spike' ? 'var(--c-paper)' : 'var(--c-stone)' }}
    >
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="label-eyebrow" style={{ color: emphasis === 'spike' ? 'var(--c-status-red)' : 'var(--c-ink-60)' }}>
            {eyebrow}
          </span>
          {emphasis === 'spike' && (
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--c-status-red)' }} />
          )}
        </div>
        <h2 className="text-[28px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mb-6" style={{ color: 'var(--c-ink)' }}>
          {title}
        </h2>
        <p className="text-[16px] lg:text-[18px] leading-[1.65]" style={{ color: 'var(--c-ink-70)' }}>
          {body}
        </p>
      </div>
    </motion.section>
  )
}

function ClosingCTA() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 relative" style={{ background: 'var(--c-ink)', color: 'var(--c-on-ink)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-[36px] lg:text-[56px] leading-[1.05] tracking-[-0.025em]"
        >
          Continuous care, on the chart, on the clock.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-[14px] font-medium tracking-wide transition-opacity hover:opacity-90 min-h-[44px]"
            style={{ background: 'var(--c-on-ink)', color: 'var(--c-ink)' }}
          >
            Start a conversation
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <div className="theme-clinical min-h-screen relative">
      <ClinicalNav />
      <ECGRail />
      <main className="relative">
        <Hero />
        <PulseSection
          eyebrow="Day 0 · Discharge"
          title="The discharge summary lands. The pathway begins."
          body="When the discharge is written, Aescia activates the matching clinician-authored monitoring schedule. The patient leaves with a check-in cadence already running."
        />
        <PulseSection
          eyebrow="Day 1–2 · Quiet baseline"
          title="Most days are calm. The signal stays steady."
          body="Daily check-ins arrive. Symptoms within thresholds. The clinical team sees a clean strip — exactly what it should be — without paying clinician hours to confirm it."
        />
        <PulseSection
          eyebrow="Day 2 · Escalation event"
          title="When the line spikes, someone is already looking."
          body="An out-of-range answer crosses the escalation threshold. The pathway triggers a contact attempt, surfaces the patient on the worklist, and notes everything for the chart. Before the patient is back in ED."
          emphasis="spike"
        />
        <PulseSection
          eyebrow="Day 7 · Resolved"
          title="The week closes with documentation, not phone tag."
          body="The full pathway, every check-in, every escalation, every clinician decision — written down, in the audit trail, ready for the chart. The standard your service would set if it had the staffing."
        />
        <ClosingCTA />
      </main>
      <ClinicalFooter />
      <DraftBadge variant="C3 — Heartbeat" />
    </div>
  )
}
