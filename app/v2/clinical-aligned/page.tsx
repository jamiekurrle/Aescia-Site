'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'motion/react'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

const ease = [0.22, 1, 0.36, 1] as const

function HeroAligned() {
  return (
    <section className="relative bg-background pt-40 lg:pt-48 pb-24 lg:pb-32 px-6 lg:px-10 overflow-hidden">
      {/* Soft teal wash, very low opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 80% 0%, oklch(0.47 0.06 175 / 0.06), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-4 mb-12"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Aescia Health
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
                style={{ transformOrigin: 'left' }}
                className="h-px w-12 bg-accent/50"
                aria-hidden="true"
              />
            </motion.div>

            {/* Mirror clinical app's æ ligature mark */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="mb-12 lg:mb-16"
            >
              <h1
                className="font-display text-[80px] sm:text-[120px] lg:text-[180px] xl:text-[220px] leading-[0.9] tracking-[-0.04em] text-foreground"
                style={{ fontVariationSettings: "'opsz' 144" }}
              >
                <span className="inline-block">æ</span>
                <span className="text-accent">.</span>
              </h1>
              <div className="font-mono text-[12px] uppercase tracking-[0.32em] text-foreground/60 mt-2 lg:mt-4">
                Continuous Care
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="font-display text-[28px] sm:text-[40px] lg:text-[52px] leading-[1.08] tracking-[-0.025em] max-w-3xl"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              The space between the discharge note and the follow-up call,
              <span className="text-accent"> filled in.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease }}
              className="mt-8 lg:mt-10 max-w-2xl text-[17px] lg:text-[19px] leading-[1.6] text-foreground/75"
            >
              A continuous-care platform for hospitals and specialty clinics.
              Two product surfaces. One clinical engine. Built in Sydney and
              Montréal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <Link
                href="/platform"
                className="group inline-flex items-center justify-center bg-foreground text-background px-7 py-4 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px] cursor-pointer"
              >
                Explore the platform
                <svg className="w-3.5 h-3.5 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                </svg>
              </Link>
              <Link
                href="https://aescia-clinical.vercel.app"
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center justify-center border border-foreground/20 text-foreground px-7 py-4 text-[14px] font-medium tracking-wide hover:border-foreground hover:bg-foreground/5 transition-colors min-h-[44px] cursor-pointer"
              >
                Open a live demo
                <svg className="w-3.5 h-3.5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 3h7v7M21 3l-9 9M5 5h6v2H7v10h10v-4h2v6H5z" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Side meta column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
            className="lg:col-span-4 space-y-8 border-t lg:border-t-0 lg:border-l border-foreground/15 pt-8 lg:pt-0 lg:pl-10"
          >
            {[
              { k: 'Hospital Monitor', v: 'Investigational SaMD · TGA Class IIa pathway' },
              { k: 'Specialty Clinic', v: 'Workflow software · CDSS-exempt' },
              { k: 'Sites', v: 'Sydney · Montréal · Ontario' },
            ].map((item, i) => (
              <motion.div
                key={item.k}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.95 + i * 0.08, ease }}
                className="border-b border-foreground/10 pb-6 last:border-b-0"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-2">
                  {item.k}
                </div>
                <div className="text-[14px] text-foreground/85 leading-snug">
                  {item.v}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ProductTiles() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const tiles = [
    {
      kind: 'Hospital Monitor',
      title: 'Cardiothoracic discharge.',
      status: 'Trial in preparation · RPAH',
      desc: 'Daily check-ins, escalation triggers tuned to CTS, audit-grade documentation. 500-patient evaluation in preparation.',
    },
    {
      kind: 'Hospital Monitor',
      title: 'Heart-failure follow-up.',
      status: 'In design · TRANSFORM HF',
      desc: 'HFpEF-specific pathway being developed in collaboration with University of Toronto cardiology.',
    },
    {
      kind: 'Specialty Clinic',
      title: 'Endoscopy preparation.',
      status: 'Beachhead · Q4 2026',
      desc: 'Bowel-prep pathway authoring with diabetes, anticoagulation, and GLP-1 modifier modules.',
    },
    {
      kind: 'Specialty Clinic',
      title: 'Anaesthetics preadmission.',
      status: 'Spec locked · 2026',
      desc: 'Pre-op optimisation with medication-hold engine, frailty scoring, and a 20-trigger hard-stop list.',
    },
  ]

  return (
    <section ref={ref} className="bg-secondary/50 py-24 lg:py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center justify-between mb-12 lg:mb-16 flex-wrap gap-4"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent block mb-3">
              Pathways shipping
            </span>
            <h2
              className="font-display text-[30px] lg:text-[44px] leading-[1.08] tracking-[-0.025em]"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              What's being built right now.
            </h2>
          </div>
          <Link
            href="/platform"
            className="text-[13px] font-mono uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground transition-colors"
          >
            View all pathways →
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-foreground/10">
          {tiles.map((tile, i) => (
            <motion.article
              key={tile.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="bg-background p-8 lg:p-10 group cursor-pointer hover:bg-background/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {tile.kind}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/55 border border-foreground/15 px-2 py-1">
                  {tile.status}
                </span>
              </div>
              <h3
                className="font-display text-[26px] lg:text-[30px] leading-[1.15] tracking-[-0.02em] mb-4"
                style={{ fontVariationSettings: "'opsz' 100" }}
              >
                {tile.title}
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-foreground/75 mb-6">
                {tile.desc}
              </p>
              <span className="inline-flex items-center gap-2 text-[13px] text-foreground/85 group-hover:gap-3 transition-all">
                Read more
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                </svg>
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PrincipleStrip() {
  const items = [
    {
      n: '01',
      head: 'Propose, don\'t decide.',
      body: 'Every recommendation is a suggestion to a clinician. The clinician decides. The system records both.',
    },
    {
      n: '02',
      head: 'Clinician-authored.',
      body: 'Pathways are written by the service that runs them. Aescia gives the engine; the clinical team gives the rules.',
    },
    {
      n: '03',
      head: 'Audit before adoption.',
      body: 'Documentation is a side-effect of the workflow, not a separate task. Nothing without provenance.',
    },
    {
      n: '04',
      head: 'Two paths, one platform.',
      body: 'Class IIa software for hospitals. CDSS-exempt workflow for clinics. Same backend; different posture.',
    },
  ]

  return (
    <section className="bg-foreground text-background py-24 lg:py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 lg:mb-20"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass block mb-4">
            How we work
          </span>
          <h2
            className="font-display text-[32px] lg:text-[48px] leading-[1.08] tracking-[-0.025em] max-w-3xl"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            Four constraints we won't trade away.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10">
          {items.map((item, i) => (
            <motion.article
              key={item.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="bg-foreground p-8 lg:p-10"
            >
              <div className="font-mono text-[12px] text-brass tracking-widest mb-8">
                {item.n}
              </div>
              <h3 className="font-display text-[20px] lg:text-[22px] leading-[1.25] tracking-[-0.015em] mb-4 text-background"
                  style={{ fontVariationSettings: "'opsz' 80" }}>
                {item.head}
              </h3>
              <p className="text-[14px] leading-[1.65] text-background/75">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABlock() {
  return (
    <section className="bg-background py-24 lg:py-32 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="border-t border-foreground/15 pt-12 lg:pt-16"
        >
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent block mb-4">
                Get in touch
              </span>
              <h2
                className="font-display text-[34px] lg:text-[52px] leading-[1.05] tracking-[-0.025em]"
                style={{ fontVariationSettings: "'opsz' 144" }}
              >
                If your service still does discharge follow-up by phone tag, we
                should talk.
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-foreground text-background px-7 py-4 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px] cursor-pointer"
              >
                Start a pilot conversation →
              </Link>
              <Link
                href="/evidence"
                className="inline-flex items-center text-[13px] text-foreground/70 hover:text-foreground transition-colors"
              >
                Or read our evidence base
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function ClinicalAligned() {
  return (
    <main className="bg-background min-h-screen">
      <SiteNav />
      <HeroAligned />
      <ProductTiles />
      <PrincipleStrip />
      <CTABlock />
      <Footer />
    </main>
  )
}
