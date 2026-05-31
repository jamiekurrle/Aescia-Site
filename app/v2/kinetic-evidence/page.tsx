'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

const ease = [0.22, 1, 0.36, 1] as const

/* Animated continuous-care loop. Discharge → check-in → escalation → resolved → discharge. */
function CareLoopDiagram() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const nodes = [
    { id: 'discharge', label: 'Discharge', x: 200, y: 80, role: 'origin' },
    { id: 'checkin', label: 'Check-in', x: 340, y: 200, role: 'work' },
    { id: 'escalation', label: 'Escalation', x: 200, y: 320, role: 'risk' },
    { id: 'resolved', label: 'Resolved', x: 60, y: 200, role: 'work' },
  ]

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      className="w-full h-auto max-w-md mx-auto"
      role="img"
      aria-label="Continuous-care loop: discharge, check-in, escalation, resolved"
    >
      <defs>
        <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.47 0.06 175)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="oklch(0.47 0.06 175)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow */}
      <circle cx="200" cy="200" r="160" fill="url(#ringGlow)" />

      {/* Loop path */}
      <motion.circle
        cx="200"
        cy="200"
        r="140"
        fill="none"
        stroke="oklch(0.47 0.06 175)"
        strokeWidth="0.75"
        strokeDasharray="3 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 2, ease }}
      />

      {/* Continuous orbiting dot */}
      {inView && (
        <motion.circle
          r="5"
          fill="oklch(0.73 0.09 80)"
          animate={{
            cx: [200, 340, 200, 60, 200],
            cy: [60, 200, 340, 200, 60],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            delay: 1.5,
          }}
        />
      )}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="36"
            fill="oklch(0.96 0.01 85)"
            stroke={node.role === 'risk' ? 'oklch(0.73 0.09 80)' : 'oklch(0.22 0.02 200)'}
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease }}
          />
          <motion.text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            className="font-mono"
            fontSize="10"
            fill="oklch(0.22 0.02 200)"
            style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.7 + i * 0.15 }}
          >
            {node.label}
          </motion.text>
        </g>
      ))}

      {/* Centre label */}
      <motion.text
        x="200"
        y="195"
        textAnchor="middle"
        fontSize="11"
        fill="oklch(0.42 0.015 200)"
        className="font-mono"
        style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        Continuous
      </motion.text>
      <motion.text
        x="200"
        y="215"
        textAnchor="middle"
        fontSize="11"
        fill="oklch(0.42 0.015 200)"
        className="font-mono"
        style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.6 }}
      >
        Care
      </motion.text>
    </svg>
  )
}

function HeroKinetic() {
  return (
    <section className="relative bg-foreground text-background pt-32 lg:pt-40 pb-24 lg:pb-32 px-6 lg:px-10 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 100% 50%, oklch(0.47 0.06 175 / 0.18), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
              Continuous care, by construction
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              style={{ transformOrigin: 'left' }}
              className="h-px w-12 bg-brass/60"
            />
          </motion.div>

          <h1
            className="font-display text-[44px] sm:text-[60px] lg:text-[78px] leading-[1.02] tracking-[-0.03em]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="block"
            >
              The week after discharge
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="block text-brass"
            >
              isn't a gap.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease }}
              className="block"
            >
              It's the work.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
            className="mt-10 max-w-xl text-[17px] lg:text-[19px] leading-[1.6] text-background/80"
          >
            Aescia is a continuous-care platform. Hospitals get structured
            post-discharge monitoring. Specialty clinics get intake, prep, and
            follow-up workflow. Same engine. Same standard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease }}
            className="mt-12 flex flex-col sm:flex-row gap-5"
          >
            <Link
              href="/platform"
              className="group inline-flex items-center justify-center bg-background text-foreground px-7 py-4 text-[14px] font-medium tracking-wide hover:bg-background/90 transition-colors min-h-[44px] cursor-pointer"
            >
              See the platform
              <svg className="w-3.5 h-3.5 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
            <Link
              href="/evidence"
              className="inline-flex items-center justify-center text-[14px] text-background/80 hover:text-background tracking-wide transition-colors min-h-[44px] cursor-pointer"
            >
              The evidence base →
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="lg:col-span-5"
        >
          <CareLoopDiagram />
        </motion.div>
      </div>
    </section>
  )
}

/* Marquee evidence ribbon — institutional names + activity types */
function EvidenceMarquee() {
  const items = [
    'RPAH · Sydney',
    'Cardiothoracic discharge trial',
    'Baird Institute · Sydney',
    'CHEO · Ottawa',
    'University of Toronto · TRANSFORM HF',
    'Montfort · Ottawa',
    'MGH Foundation · Montréal',
    'Concordia District 3',
    'GESA faculty network',
  ]

  return (
    <section className="bg-secondary/40 py-12 border-y border-foreground/10 overflow-hidden">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55 text-center mb-8">
        Working with —
      </div>
      <div className="relative">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 text-[14px] lg:text-[15px] text-foreground/70"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-brass/60" aria-hidden="true" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* Sticky scroll narrative — builds the platform piece by piece */
function StickyNarrative() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const stage = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3])

  const stages = [
    {
      label: '01',
      head: 'A patient is discharged.',
      sub: 'The clinical team writes the discharge summary. The patient walks out the door. Until now, that\'s where structured care ended.',
    },
    {
      label: '02',
      head: 'The pathway begins.',
      sub: 'Aescia starts a clinician-authored monitoring pathway. Daily check-ins. Symptom thresholds. The schedule the service would run if it had the staffing.',
    },
    {
      label: '03',
      head: 'Risk surfaces early.',
      sub: 'When a check-in crosses a threshold, an escalation triggers. The clinical team sees it before the patient is back in ED.',
    },
    {
      label: '04',
      head: 'Documentation writes itself.',
      sub: 'Every check-in, every escalation, every clinician decision is captured for audit. The chart updates as a side-effect, not a separate task.',
    },
  ]

  return (
    <section ref={ref} className="bg-background relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex items-center px-6 lg:px-10">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent block mb-4">
              How it actually works
            </span>
            <h2
              className="font-display text-[34px] lg:text-[52px] leading-[1.08] tracking-[-0.025em] max-w-md"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              The discharge week, from the inside.
            </h2>
            <p className="mt-6 text-[15px] lg:text-[16px] leading-[1.65] text-foreground/70 max-w-md">
              Scroll to see the pathway run.
            </p>

            <div className="mt-12 space-y-3">
              {stages.map((s, i) => (
                <ProgressDot key={i} stage={stage} index={i} label={s.label} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 relative min-h-[300px]">
            {stages.map((s, i) => (
              <StageCard key={i} stage={stage} index={i} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProgressDot({ stage, index, label }: { stage: any; index: number; label: string }) {
  const isActive = useTransform(stage, (v: number) => Math.floor(v) === index)
  const opacity = useTransform(stage, (v: number) => (Math.floor(v) >= index ? 1 : 0.35))

  return (
    <motion.div className="flex items-center gap-4" style={{ opacity }}>
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{
          backgroundColor: useTransform(isActive, (a: boolean) =>
            a ? 'oklch(0.73 0.09 80)' : 'oklch(0.42 0.015 200)'
          ),
        }}
      />
      <span className="font-mono text-[11px] tracking-widest text-foreground/70">
        {label}
      </span>
    </motion.div>
  )
}

function StageCard({
  stage,
  index,
  head,
  sub,
}: {
  stage: any
  index: number
  label: string
  head: string
  sub: string
}) {
  const opacity = useTransform(stage, (v: number) => {
    const dist = Math.abs(v - index)
    return dist < 0.5 ? 1 - dist * 2 : 0
  })
  const y = useTransform(stage, (v: number) => (v - index) * 40)

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <h3
        className="font-display text-[40px] lg:text-[64px] leading-[1.05] tracking-[-0.025em]"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        {head}
      </h3>
      <p className="mt-6 text-[17px] lg:text-[19px] leading-[1.6] text-foreground/75 max-w-xl">
        {sub}
      </p>
    </motion.div>
  )
}

function ProductSurfaces() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-foreground text-background py-24 lg:py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass block mb-4">
            Two surfaces
          </span>
          <h2
            className="font-display text-[34px] lg:text-[52px] leading-[1.08] tracking-[-0.025em] max-w-3xl"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Same engine. Different posture for each setting.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-background/15">
          {[
            {
              tag: 'Hospital Monitor',
              status: 'Investigational SaMD · TGA Class IIa pathway',
              title: 'Post-discharge monitoring, regulated.',
              desc:
                'For clinical teams running discharge follow-up at scale. Audit-grade, escalation-aware, designed to fit inside how a service already operates.',
              href: '/hospitals',
            },
            {
              tag: 'Specialty Clinic',
              status: 'Workflow software · CDSS-exempt',
              title: 'Intake, prep, follow-up — together.',
              desc:
                'For specialty clinics that lose hours a week to phone tag and ad-hoc preparation. Pathways the clinical lead authors. No CDS classification baggage.',
              href: '/clinics',
            },
          ].map((p, i) => (
            <motion.div
              key={p.tag}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease }}
              className="bg-foreground p-10 lg:p-14"
            >
              <div className="flex items-center justify-between mb-12 gap-3 flex-wrap">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
                  {p.tag}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-background/55 border border-background/20 px-2 py-1">
                  {p.status}
                </span>
              </div>
              <h3
                className="font-display text-[28px] lg:text-[36px] leading-[1.12] tracking-[-0.025em] mb-6"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                {p.title}
              </h3>
              <p className="text-[15px] lg:text-[16px] leading-[1.65] text-background/80 mb-10">
                {p.desc}
              </p>
              <Link
                href={p.href}
                className="group inline-flex items-center gap-2.5 text-[13px] font-medium tracking-wide text-background hover:gap-4 transition-all"
              >
                Read more
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingCTA() {
  return (
    <section className="bg-background py-32 lg:py-40 px-6 lg:px-10 overflow-hidden relative">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, oklch(0.47 0.06 175 / 0.10), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-[40px] lg:text-[68px] leading-[1.05] tracking-[-0.03em]"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          Build the discharge week you'd want for your own family.
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
            className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px] cursor-pointer"
          >
            Start a conversation
          </Link>
          <Link
            href="/evidence"
            className="inline-flex items-center justify-center text-[14px] text-foreground/75 hover:text-foreground tracking-wide transition-colors min-h-[44px] cursor-pointer"
          >
            The evidence base →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function KineticEvidence() {
  return (
    <main className="bg-background min-h-screen">
      <SiteNav transparent />
      <HeroKinetic />
      <EvidenceMarquee />
      <StickyNarrative />
      <ProductSurfaces />
      <ClosingCTA />
      <Footer />
    </main>
  )
}
