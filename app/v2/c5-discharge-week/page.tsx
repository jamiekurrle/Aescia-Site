'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { ClinicalNav, ClinicalFooter, DraftBadge } from '../_clinical-chrome'

const ease = [0.22, 1, 0.36, 1] as const

const DAYS = [
  {
    day: 'Day 0',
    sub: 'Discharge',
    title: 'The patient walks out the door.',
    body: 'The discharge summary is filed. The cardiothoracic monitoring pathway activates. A first contact-window opens.',
    status: 'green',
    note: 'Pathway: AES-CTS-001',
  },
  {
    day: 'Day 1',
    sub: 'First check-in',
    title: 'A symptom and obs prompt arrives by SMS.',
    body: 'Pain score, breathing, swelling, sleep. Three minutes. Auto-scored against thresholds the surgical team set.',
    status: 'green',
    note: '8 of 8 patients responded',
  },
  {
    day: 'Day 2',
    sub: 'Escalation',
    title: 'One patient crosses a respiratory threshold.',
    body: 'The pathway escalates: the on-call CTS registrar sees the patient on top of the worklist within 12 minutes. Phone contact within the hour.',
    status: 'red',
    note: '1 escalation · 0 missed',
  },
  {
    day: 'Day 3',
    sub: 'Resolved',
    title: 'Issue triaged. No readmission. Note in the chart.',
    body: 'The escalation closes with documented clinician decision. The patient continues the pathway. The chart updates as a side-effect, not a separate task.',
    status: 'amber',
    note: 'Time-to-decision: 47 min',
  },
  {
    day: 'Day 5',
    sub: 'Quiet',
    title: 'Daily check-ins. Symptoms within range.',
    body: 'The strip stays clean. The clinical team gets the signal that everything is on track without paying clinician hours to confirm it.',
    status: 'green',
    note: 'No new flags',
  },
  {
    day: 'Day 7',
    sub: 'Closure',
    title: 'The pathway closes with audit-grade documentation.',
    body: 'Every check-in, every escalation, every decision is captured. The week the chart usually has no language for, in the chart.',
    status: 'green',
    note: 'Pathway complete',
  },
]

function DischargeWeek() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  // Translate horizontal track. 6 days = scroll across roughly 6 viewports.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-83.333%'])
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={ref} style={{ background: 'var(--c-stone)', height: '600vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Top label bar */}
        <div className="px-6 lg:px-10 pt-28 pb-6">
          <div className="max-w-7xl mx-auto flex items-end justify-between gap-6 flex-wrap">
            <div>
              <span className="label-eyebrow block mb-3">A week with Aescia</span>
              <h1 className="text-[32px] lg:text-[48px] leading-[1.05] tracking-[-0.025em]" style={{ color: 'var(--c-ink)' }}>
                Day 0 → Day 7. Scroll to walk it.
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/platform" className="text-[13px] underline-offset-4 hover:underline" style={{ color: 'var(--c-ink-70)' }}>
                See the platform
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-medium tracking-wide min-h-[40px]"
                style={{ background: 'var(--c-ink)', color: 'var(--c-on-ink)' }}
              >
                Talk to the team
              </Link>
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 relative overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full"
          >
            {DAYS.map((d, i) => (
              <DayCard key={i} {...d} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Bottom progress bar */}
        <div className="px-6 lg:px-10 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative h-px w-full mb-3" style={{ background: 'var(--c-border)' }}>
              <motion.div
                className="absolute left-0 top-0 h-px"
                style={{ width: progress, background: 'var(--c-brass)' }}
              />
            </div>
            <div className="flex justify-between label-eyebrow">
              <span>Day 0</span>
              <span>Day 7 — pathway complete</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DayCard({ day, sub, title, body, status, note, index }: typeof DAYS[number] & { index: number }) {
  const statusColor =
    status === 'red' ? 'var(--c-status-red)' :
    status === 'amber' ? 'var(--c-status-amber)' : 'var(--c-status-green)'
  const statusLabel =
    status === 'red' ? 'ESCALATION' :
    status === 'amber' ? 'ACTIVE' : 'ON TRACK'

  return (
    <article
      className="w-screen flex-shrink-0 px-6 lg:px-16 flex items-center"
      style={{ borderLeft: index === 0 ? 'none' : '1px solid var(--c-border)' }}
    >
      <div className="max-w-5xl mx-auto w-full grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[80px] lg:text-[120px] leading-[0.85] font-bold" style={{ color: 'var(--c-ink)' }}>
              {day.replace('Day ', '')}
            </span>
            <div className="flex flex-col">
              <span className="label-eyebrow">{day}</span>
              <span className="text-[18px] lg:text-[22px] font-medium" style={{ color: 'var(--c-ink-70)' }}>
                {sub}
              </span>
            </div>
          </div>
          <h2 className="text-[26px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] mb-5" style={{ color: 'var(--c-ink)' }}>
            {title}
          </h2>
          <p className="text-[15px] lg:text-[17px] leading-[1.65] max-w-xl" style={{ color: 'var(--c-ink-70)' }}>
            {body}
          </p>
        </div>

        <div className="lg:col-span-5 lg:pl-10 lg:border-l space-y-6" style={{ borderColor: 'var(--c-border)' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border" style={{ borderColor: statusColor, color: statusColor }}>
            <span className="w-2 h-2 rounded-full" style={{ background: statusColor }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold">
              {statusLabel}
            </span>
          </div>
          <div className="border-t pt-6" style={{ borderColor: 'var(--c-border)' }}>
            <div className="label-eyebrow mb-2">Pathway state</div>
            <div className="text-[15px]" style={{ color: 'var(--c-ink-90)' }}>
              {note}
            </div>
          </div>
        </div>
      </div>
    </article>
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
          <span className="label-eyebrow block mb-4">What runs the week</span>
          <h2 className="text-[32px] lg:text-[48px] leading-[1.08] tracking-[-0.025em]" style={{ color: 'var(--c-ink)' }}>
            One platform. Two product surfaces.
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-px" style={{ background: 'var(--c-border-cool)' }}>
          {[
            { tag: 'Hospital Monitor', t: 'Discharge follow-up, regulated.', d: 'Audit-grade post-discharge monitoring for clinical teams. TGA Class IIa pathway.', href: '/hospitals' },
            { tag: 'Specialty Clinic', t: 'Intake, prep, follow-up.', d: 'Workflow software for specialty clinics. CDSS-exempt. Quick to deploy.', href: '/clinics' },
          ].map((p) => (
            <Link key={p.tag} href={p.href} className="group block p-10 lg:p-14 transition-opacity hover:opacity-95" style={{ background: 'var(--c-paper)' }}>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold block mb-8" style={{ color: 'var(--c-mist-deep)' }}>
                {p.tag}
              </span>
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
        <DischargeWeek />
        <ProductPair />
      </main>
      <ClinicalFooter />
      <DraftBadge variant="C5 — Discharge Week" />
    </div>
  )
}
