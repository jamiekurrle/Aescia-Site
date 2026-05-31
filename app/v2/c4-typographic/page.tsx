'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { ClinicalNav, ClinicalFooter, DraftBadge } from '../_clinical-chrome'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Pure-typography editorial spread. NYT Magazine / Pentagram poster aesthetic.
 * No imagery, no diagrams. The typography IS the design.
 */
function MegaHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section ref={ref} className="relative pt-32 lg:pt-40 pb-24 px-6 lg:px-10 overflow-hidden" style={{ background: 'var(--c-stone)' }}>
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="label-eyebrow">Issue 01 · The discharge week</span>
          <span className="h-px flex-1 opacity-50" style={{ background: 'var(--c-ink-60)' }} />
          <span className="label-eyebrow">aesciahealth.com</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          style={{ y: y1, color: 'var(--c-ink)' }}
          className="leading-[0.86] tracking-[-0.05em] font-bold"
        >
          <div className="text-[24vw] lg:text-[20vw] xl:text-[18vw]">CONT-</div>
          <div className="text-[24vw] lg:text-[20vw] xl:text-[18vw] -mt-[0.06em]">
            INUOUS<span style={{ color: 'var(--c-brass)' }}>.</span>
          </div>
        </motion.h1>

        <motion.div
          style={{ y: y2 }}
          className="grid lg:grid-cols-12 gap-10 mt-12 lg:mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="lg:col-span-5 lg:col-start-1"
          >
            <p className="text-[16px] leading-[1.65]" style={{ color: 'var(--c-ink-70)' }}>
              <span className="float-left text-[64px] leading-[0.85] mr-3 mt-1 font-bold" style={{ color: 'var(--c-ink)' }}>
                T
              </span>
              he week after a patient is discharged is the week the work is most likely
              to fall through. Phone tag. Half-finished documentation. A readmission no
              one saw coming. Aescia is the platform that treats the discharge week as
              the work it is.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="lg:col-span-3 lg:col-start-9"
          >
            <div className="label-eyebrow mb-3">Filed under</div>
            <ul className="text-[14px] space-y-1" style={{ color: 'var(--c-ink-90)' }}>
              <li>Hospital Monitor — TGA Class IIa</li>
              <li>Specialty Clinic — workflow</li>
              <li>RPAH cardiothoracic trial</li>
              <li>Sydney · Montréal</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function PullQuote() {
  return (
    <section className="py-32 lg:py-44 px-6 lg:px-10" style={{ background: 'var(--c-paper)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="grid lg:grid-cols-12 gap-8 items-start"
        >
          <div className="lg:col-span-1">
            <div className="text-[120px] leading-[0.6] font-bold" style={{ color: 'var(--c-brass)' }}>
              "
            </div>
          </div>
          <div className="lg:col-span-10">
            <h2 className="text-[36px] lg:text-[64px] xl:text-[80px] leading-[1.05] tracking-[-0.03em] font-bold" style={{ color: 'var(--c-ink)' }}>
              The discharge note is not the end of the story. It's the start of a week
              we usually don't have language for.
            </h2>
            <div className="mt-8 label-eyebrow">— Founder's letter, in progress</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function NumberedSpread() {
  const items = [
    {
      n: '01',
      t: 'TWO PRODUCTS, ONE PLATFORM',
      d: 'Hospital Monitor is regulated software for post-discharge work. Specialty Clinic is a workflow tool that stays inside the CDSS exemption. They share an engine and a posture: clinician-authored, audit-aware, transparent.',
    },
    {
      n: '02',
      t: 'PROPOSE, NEVER DECIDE',
      d: 'The platform suggests; clinicians decide. Every recommendation traces to a clinician-authored rule. Every clinician override is captured for the chart. No black-box scores, no autonomy that wasn\'t asked for.',
    },
    {
      n: '03',
      t: 'BUILT FOR THE LONG WEEK',
      d: 'The week between discharge and resolution is where the value sits and where the risk hides. Aescia is built around that week — the schedule, the symptom thresholds, the escalation, the documentation — not bolted on as an afterthought.',
    },
  ]

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: 'var(--c-stone)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="border-y py-2 mb-16 flex items-center justify-between text-[12px]" style={{ borderColor: 'var(--c-ink)' }}>
          <span className="font-mono uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--c-ink)' }}>
            Three principles
          </span>
          <span className="font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--c-ink-60)' }}>
            01 — 03
          </span>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {items.map((item, i) => (
            <motion.article
              key={item.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start border-t pt-10"
              style={{ borderColor: 'var(--c-border)' }}
            >
              <div className="lg:col-span-2">
                <div className="text-[80px] lg:text-[100px] leading-[0.85] font-bold" style={{ color: 'var(--c-brass)' }}>
                  {item.n}
                </div>
              </div>
              <div className="lg:col-span-10 grid lg:grid-cols-10 gap-8">
                <h3 className="lg:col-span-7 text-[28px] lg:text-[42px] leading-[1.05] tracking-[-0.025em] font-bold" style={{ color: 'var(--c-ink)' }}>
                  {item.t}
                </h3>
                <p className="lg:col-span-3 text-[15px] leading-[1.7]" style={{ color: 'var(--c-ink-70)' }}>
                  {item.d}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function MastheadCTA() {
  return (
    <section className="py-32 lg:py-44 px-6 lg:px-10" style={{ background: 'var(--c-ink)', color: 'var(--c-on-ink)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-[14vw] lg:text-[12vw] leading-[0.9] tracking-[-0.04em] font-bold"
        >
          BUILD<br />
          THE<br />
          <span style={{ color: 'var(--c-brass)' }}>WEEK.</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-16 grid lg:grid-cols-12 gap-8 items-end"
        >
          <p className="lg:col-span-7 text-[18px] lg:text-[22px] leading-[1.4]" style={{ color: 'var(--c-on-ink-70)' }}>
            If your service still does discharge follow-up by phone tag, we should talk.
          </p>
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-[14px] font-medium tracking-wide transition-opacity hover:opacity-90 min-h-[44px]"
              style={{ background: 'var(--c-on-ink)', color: 'var(--c-ink)' }}
            >
              Start a conversation
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center justify-center px-8 py-4 text-[14px] font-medium tracking-wide border min-h-[44px]"
              style={{ borderColor: 'var(--c-on-ink-50)', color: 'var(--c-on-ink)' }}
            >
              See the platform
            </Link>
          </div>
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
        <MegaHero />
        <PullQuote />
        <NumberedSpread />
        <MastheadCTA />
      </main>
      <ClinicalFooter />
      <DraftBadge variant="C4 — Typographic" />
    </div>
  )
}
