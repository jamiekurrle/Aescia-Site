'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

const ease = [0.22, 1, 0.36, 1] as const

function HeroV1() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const gradientY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const gradientOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])

  const titleWords = ['A', 'continuous-care', 'platform', 'for', 'hospitals', 'and', 'specialty', 'clinics.']

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-foreground text-background pt-32 lg:pt-40 pb-32 lg:pb-44"
    >
      <motion.div
        style={{ y: gradientY, opacity: gradientOpacity }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(ellipse 140% 80% at 30% 120%, oklch(0.47 0.06 175 / 0.36), transparent 60%)',
              'radial-gradient(ellipse 90% 60% at 85% 15%, oklch(0.73 0.09 80 / 0.10), transparent 55%)',
            ].join(', '),
          }}
        />
      </motion.div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
            Continuous-care infrastructure
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            style={{ transformOrigin: 'left' }}
            className="h-px w-16 bg-brass/60"
            aria-hidden="true"
          />
        </motion.div>

        <h1
          className="font-display text-[44px] sm:text-[60px] lg:text-[78px] xl:text-[92px] leading-[1.02] tracking-[-0.03em] text-background font-normal max-w-5xl"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
          className="mt-10 lg:mt-14 max-w-2xl text-[17px] lg:text-[19px] leading-[1.6] text-background/85"
        >
          Structured patient follow-up for hospitals. Streamlined intake and
          preparation for specialty clinics. One platform, two product surfaces,
          built around the work clinicians already do.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease }}
          className="mt-12 lg:mt-16 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
        >
          <Link
            href="/platform"
            className="group inline-flex items-center justify-center bg-background text-foreground px-7 py-4 text-[14px] font-medium tracking-wide hover:bg-background/90 transition-colors min-h-[44px] cursor-pointer"
          >
            See the platform
            <motion.svg
              className="w-3.5 h-3.5 ml-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </motion.svg>
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center text-[14px] text-background/80 hover:text-background tracking-wide transition-colors cursor-pointer"
          >
            Talk to the team
            <svg className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-20 lg:mt-28 grid grid-cols-3 gap-6 lg:gap-12 max-w-3xl border-t border-background/15 pt-8"
        >
          {[
            { k: 'Founded', v: '2025' },
            { k: 'Headquartered', v: 'Sydney · Montréal' },
            { k: 'Active trial', v: 'RPAH cardiothoracic' },
          ].map((item, i) => (
            <motion.div
              key={item.k}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + i * 0.1, ease }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/55 mb-2">
                {item.k}
              </div>
              <div className="text-[15px] lg:text-[16px] text-background/90">
                {item.v}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function RevealSection({
  eyebrow,
  title,
  children,
  className = '',
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className={`bg-background py-28 lg:py-40 px-6 lg:px-10 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            style={{ transformOrigin: 'left' }}
            className="h-px w-12 bg-accent/50"
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="font-display text-[34px] lg:text-[52px] leading-[1.08] tracking-[-0.025em] max-w-3xl mb-16 lg:mb-20"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

function AudienceTiles() {
  const cards = [
    {
      eyebrow: 'For hospitals',
      tag: 'Investigational SaMD',
      title: 'Structured discharge follow-up that reads like a clinician wrote it.',
      desc:
        'Continuous post-discharge monitoring with clinician-authored pathways, escalation triggers tuned to your service, and audit-grade documentation by default.',
      cta: 'Hospital Monitor →',
      href: '/hospitals',
      dark: true,
    },
    {
      eyebrow: 'For specialty clinics',
      tag: 'Workflow software',
      title: 'Specialty intake, preparation, and follow-up — one place.',
      desc:
        'Pathway templates for endoscopy, anaesthetics preadmission, and other specialty workflows. No clinical decision-support classification. Quick to deploy, slow to break.',
      cta: 'Specialty Clinic →',
      href: '/clinics',
      dark: false,
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-px bg-foreground/10">
      {cards.map((card, i) => (
        <motion.div
          key={card.href}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: i * 0.1, ease }}
          className={card.dark ? 'bg-foreground text-background' : 'bg-secondary text-foreground'}
        >
          <Link href={card.href} className="group block p-10 lg:p-14 h-full">
            <div className="flex items-center justify-between mb-12 gap-4 flex-wrap">
              <span className={`font-mono text-[11px] uppercase tracking-[0.22em] ${card.dark ? 'text-brass' : 'text-accent'}`}>
                {card.eyebrow}
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-[0.15em] border px-2 py-1 ${card.dark ? 'border-background/20 text-background/60' : 'border-foreground/20 text-foreground/60'}`}>
                {card.tag}
              </span>
            </div>
            <h3
              className="font-display text-[28px] lg:text-[36px] leading-[1.12] tracking-[-0.025em] mb-6"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              {card.title}
            </h3>
            <p className={`text-[15px] lg:text-[16px] leading-[1.65] mb-10 ${card.dark ? 'text-background/80' : 'text-foreground/75'}`}>
              {card.desc}
            </p>
            <span className="inline-flex items-center gap-2.5 text-[13px] font-medium tracking-wide group-hover:gap-4 transition-all">
              {card.cta}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

function PillarsV1() {
  const items = [
    {
      n: '01',
      title: 'Transparent by construction.',
      desc:
        'Every recommendation traces back to a clinician-authored rule. Every patient interaction lands in the audit trail. No black-box scores asking you to trust them.',
    },
    {
      n: '02',
      title: 'Clinician at the centre.',
      desc:
        'The platform proposes; clinicians decide. Pathways are written by the people who run the service, not borrowed from a generic template library.',
    },
    {
      n: '03',
      title: 'Two surfaces, one platform.',
      desc:
        'Hospital Monitor is regulated software for post-discharge work. Specialty Clinic is a workflow tool that stays inside the CDSS exemption. Same engine.',
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-12 md:gap-16">
      {items.map((item, i) => (
        <motion.article
          key={item.n}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: i * 0.1, ease }}
          className="border-t border-foreground/15 pt-8"
        >
          <span className="font-mono text-[12px] text-brass tracking-widest block mb-10">
            {item.n}
          </span>
          <h3
            className="font-display text-[24px] lg:text-[28px] leading-[1.2] tracking-[-0.02em] mb-5"
            style={{ fontVariationSettings: "'opsz' 80" }}
          >
            {item.title}
          </h3>
          <p className="text-[15px] leading-[1.7] text-foreground/75">
            {item.desc}
          </p>
        </motion.article>
      ))}
    </div>
  )
}

function CTABand() {
  return (
    <section className="bg-foreground text-background py-24 lg:py-32 px-6 lg:px-10 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.73 0.09 80 / 0.12), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-[36px] lg:text-[56px] leading-[1.05] tracking-[-0.025em] mb-8"
        >
          Build the discharge week you'd want for your own family.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-background text-foreground px-8 py-4 text-[14px] font-medium tracking-wide hover:bg-background/90 transition-colors min-h-[44px] cursor-pointer"
          >
            Start a conversation
          </Link>
          <Link
            href="/evidence"
            className="inline-flex items-center justify-center text-[14px] text-background/80 hover:text-background tracking-wide transition-colors min-h-[44px] cursor-pointer"
          >
            Read the evidence base →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function EditorialMotion() {
  return (
    <main className="bg-background min-h-screen">
      <SiteNav transparent />
      <HeroV1 />
      <RevealSection eyebrow="Two products, one platform" title="Built for the two places follow-up gets dropped.">
        <AudienceTiles />
      </RevealSection>
      <RevealSection eyebrow="Operating principles" title="The constraints we hold ourselves to." className="bg-secondary/40">
        <PillarsV1 />
      </RevealSection>
      <CTABand />
      <Footer />
    </main>
  )
}
