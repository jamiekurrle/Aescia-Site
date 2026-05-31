'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ClinicalNav, ClinicalFooter, DraftBadge } from '../_clinical-chrome'

const ease = [0.22, 1, 0.36, 1] as const

const ORBIT_NODES = [
  { angle: 0, label: 'Daily check-in', kind: 'work' },
  { angle: 60, label: 'Symptom flag', kind: 'risk' },
  { angle: 120, label: 'Escalation', kind: 'risk' },
  { angle: 180, label: 'Clinician note', kind: 'work' },
  { angle: 240, label: 'Audit log', kind: 'work' },
  { angle: 300, label: 'Resolution', kind: 'work' },
]

function CareOrbit() {
  const radius = 180

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square">
      <svg viewBox="-250 -250 500 500" className="w-full h-full" aria-label="Care orbit: signals orbiting the patient">
        {/* Outer ring */}
        <circle cx="0" cy="0" r={radius} fill="none" stroke="var(--c-border-cool)" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle cx="0" cy="0" r={radius - 50} fill="none" stroke="var(--c-border-cool)" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle cx="0" cy="0" r={radius + 30} fill="none" stroke="var(--c-mist)" strokeWidth="0.4" strokeDasharray="1 6" />

        {/* Patient at centre */}
        <motion.g
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
        >
          <circle cx="0" cy="0" r="48" fill="var(--c-ink)" />
          <text
            x="0"
            y="-2"
            textAnchor="middle"
            fontSize="10"
            fill="var(--c-on-ink-70)"
            className="font-mono"
            style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            Patient
          </text>
          <text
            x="0"
            y="14"
            textAnchor="middle"
            fontSize="14"
            fill="var(--c-on-ink)"
            fontWeight="600"
          >
            at home
          </text>
        </motion.g>

        {/* Orbit nodes */}
        {ORBIT_NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180
          const x = Math.cos(rad) * radius
          const y = Math.sin(rad) * radius
          const isRisk = node.kind === 'risk'
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease }}
            >
              {/* connector line */}
              <line
                x1="0"
                y1="0"
                x2={x * 0.78}
                y2={y * 0.78}
                stroke={isRisk ? 'var(--c-status-red)' : 'var(--c-mist-deep)'}
                strokeWidth="0.6"
                opacity="0.5"
                strokeDasharray={isRisk ? '0' : '2 3'}
              />
              <circle
                cx={x}
                cy={y}
                r="32"
                fill="var(--c-paper)"
                stroke={isRisk ? 'var(--c-status-red)' : 'var(--c-ink)'}
                strokeWidth="1"
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize="9"
                fill={isRisk ? 'var(--c-status-red)' : 'var(--c-ink-70)'}
                className="font-mono"
                style={{ letterSpacing: '0.06em' }}
              >
                {node.label.toUpperCase()}
              </text>
            </motion.g>
          )
        })}

        {/* Continuous orbiter — a packet/signal travelling the ring */}
        <motion.circle
          r="4"
          fill="var(--c-brass)"
          animate={{
            cx: ORBIT_NODES.map((n) => Math.cos((n.angle * Math.PI) / 180) * (radius + 30)),
            cy: ORBIT_NODES.map((n) => Math.sin((n.angle * Math.PI) / 180) * (radius + 30)),
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
            delay: 1.5,
          }}
        />

        {/* Centre legend */}
        <text x="0" y="240" textAnchor="middle" fontSize="9" fill="var(--c-ink-40)" className="font-mono" style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          The clinical signal stays in orbit
        </text>
      </svg>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 px-6 lg:px-10" style={{ background: 'var(--c-stone)' }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="label-eyebrow">The patient is the centre</span>
            <span className="h-px w-12 opacity-70" style={{ background: 'var(--c-brass)' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-[44px] sm:text-[60px] lg:text-[76px] leading-[1.02] tracking-[-0.03em]"
            style={{ color: 'var(--c-ink)' }}
          >
            Continuous care, in <span style={{ color: 'var(--c-mist-deep)' }}>orbit</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-8 lg:mt-10 max-w-xl text-[17px] lg:text-[19px] leading-[1.6]"
            style={{ color: 'var(--c-ink-70)' }}
          >
            Every check-in. Every flag. Every clinician note. Every audit entry.
            Aescia keeps the signal moving around the patient — and the chart up
            to date — without asking the clinical team to chase it.
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
              className="inline-flex items-center text-[14px] tracking-wide"
              style={{ color: 'var(--c-ink-70)' }}
            >
              The evidence base →
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="lg:col-span-6"
        >
          <CareOrbit />
        </motion.div>
      </div>
    </section>
  )
}

function SignalsLegend() {
  const signals = [
    { kind: 'work', t: 'Check-ins', d: 'Daily symptom + obs prompts. SMS, three minutes, scored against thresholds.' },
    { kind: 'risk', t: 'Flags', d: 'Out-of-range answers fire an escalation. The patient surfaces on the worklist.' },
    { kind: 'work', t: 'Notes', d: 'Clinician decisions are captured inline — including the why, not just the what.' },
    { kind: 'work', t: 'Audit', d: 'Every interaction lands in the trail. The chart updates as a side-effect, not a task.' },
  ]

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
          <span className="label-eyebrow block mb-4">Signals in the orbit</span>
          <h2 className="text-[32px] lg:text-[48px] leading-[1.08] tracking-[-0.025em] max-w-3xl" style={{ color: 'var(--c-ink)' }}>
            Four signals. One audit trail. The chart written as the work happens.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'var(--c-border-cool)' }}>
          {signals.map((s, i) => (
            <motion.article
              key={s.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="p-8 lg:p-10"
              style={{ background: 'var(--c-paper)' }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: s.kind === 'risk' ? 'var(--c-status-red)' : 'var(--c-mist-deep)' }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: s.kind === 'risk' ? 'var(--c-status-red)' : 'var(--c-mist-deep)' }}>
                  {s.kind === 'risk' ? 'Risk' : 'Work'}
                </span>
              </div>
              <h3 className="text-[20px] lg:text-[22px] leading-[1.2] tracking-[-0.015em] mb-4" style={{ color: 'var(--c-ink)' }}>
                {s.t}
              </h3>
              <p className="text-[14px] leading-[1.65]" style={{ color: 'var(--c-ink-70)' }}>
                {s.d}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingCTA() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: 'var(--c-ink)', color: 'var(--c-on-ink)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-[36px] lg:text-[56px] leading-[1.05] tracking-[-0.025em]"
        >
          Keep the signal in orbit.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-12 flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-[14px] font-medium tracking-wide transition-opacity hover:opacity-90 min-h-[44px]"
            style={{ background: 'var(--c-on-ink)', color: 'var(--c-ink)' }}
          >
            Start a conversation
          </Link>
          <Link
            href="/evidence"
            className="inline-flex items-center justify-center text-[14px] tracking-wide min-h-[44px]"
            style={{ color: 'var(--c-on-ink-70)' }}
          >
            The evidence base →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <div className="theme-clinical min-h-screen">
      <ClinicalNav />
      <main>
        <Hero />
        <SignalsLegend />
        <ClosingCTA />
      </main>
      <ClinicalFooter />
      <DraftBadge variant="C6 — Care Orbit" />
    </div>
  )
}
