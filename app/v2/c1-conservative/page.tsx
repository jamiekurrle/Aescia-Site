'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { useI18n } from '@/lib/i18n'
import { ClinicalNav, ClinicalFooter, DraftBadge } from '../_clinical-chrome'

const ease = [0.22, 1, 0.36, 1] as const

function Hero() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mistY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  const titleWords = t('hero.title').split(' ')

  return (
    <section ref={ref} className="relative">
      {/* NAVY hero (copy + CTAs) */}
      <div className="relative pt-32 lg:pt-40 pb-20 lg:pb-24 overflow-hidden" style={{ background: 'var(--c-ink)', color: 'var(--c-on-ink)' }}>
        <motion.div
          style={{ y: mistY }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 110% 60% at 75% 0%, rgba(168, 194, 216, 0.18), transparent 65%), radial-gradient(ellipse 90% 50% at 10% 100%, rgba(184, 157, 106, 0.14), transparent 60%)',
            }}
          />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: 'var(--c-brass)' }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c-brass)' }} />
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

          <h1 className="text-[44px] sm:text-[60px] lg:text-[78px] xl:text-[92px] leading-[1.02] tracking-[-0.03em] max-w-5xl" style={{ color: 'var(--c-on-ink)' }}>
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease }}
                className="inline-block mr-[0.25em]"
                style={{ color: 'var(--c-on-ink)' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
            className="mt-10 lg:mt-14 max-w-2xl text-[17px] lg:text-[19px] leading-[1.6]"
            style={{ color: 'var(--c-on-ink-70)' }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease }}
            className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6"
          >
            <Link
              href="/platform"
              className="inline-flex items-center justify-center px-7 py-4 text-[14px] font-semibold tracking-wide transition-opacity hover:opacity-90 min-h-[44px] cursor-pointer shadow-sm"
              style={{ background: 'var(--c-brass)', color: 'var(--c-ink)' }}
            >
              {t('hero.cta.primary')}
              <svg className="w-3.5 h-3.5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-7 py-4 text-[14px] font-medium tracking-wide transition-colors min-h-[44px] cursor-pointer border-2"
              style={{ borderColor: 'rgba(255,255,255,0.40)', color: 'var(--c-on-ink)' }}
            >
              {t('hero.cta.secondary')}
              <svg className="w-3.5 h-3.5 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* STONE band — meta info pulled into a stone strip at the bottom of the hero */}
      <div className="relative overflow-hidden border-b" style={{ background: 'var(--c-stone)', color: 'var(--c-ink)', borderColor: 'var(--c-border)' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 100% at 100% 50%, rgba(184,157,106,0.10), transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold mb-3 inline-flex items-center gap-2" style={{ color: 'var(--c-brass)' }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--c-brass)' }} />
                {t('hero.trial.label')}
              </div>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-[18px] lg:text-[20px] font-semibold" style={{ color: 'var(--c-ink)' }}>
                  {t('hero.trial.brief')}
                </span>
                <span className="text-[14px] lg:text-[15px]" style={{ color: 'var(--c-ink-70)' }}>
                  {t('hero.trial.site')}
                </span>
              </div>
            </div>
            <div className="lg:col-span-3 lg:text-right">
              <Link
                href="/evidence"
                className="group inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide"
                style={{ color: 'var(--c-ink)' }}
              >
                {t('evidence.cta')}
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
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
      desc: 'Continuous post-discharge monitoring with clinician-authored pathways, escalation triggers tuned to your service, and audit-grade documentation by default.',
      cta: 'Hospital Monitor →',
      href: '/hospitals',
      dark: true,
    },
    {
      eyebrow: 'For specialty clinics',
      tag: 'Workflow software',
      title: 'Specialty intake, preparation, and follow-up — one place.',
      desc: 'Pathway templates for endoscopy, anaesthetics preadmission, and other specialty workflows. No clinical decision-support classification. Quick to deploy, slow to break.',
      cta: 'Specialty Clinic →',
      href: '/clinics',
      dark: false,
    },
  ]

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: 'var(--c-stone)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: 'var(--c-brass)' }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c-brass)' }} />
            Two products, one platform
          </span>
          <h2 className="text-[34px] lg:text-[52px] leading-[1.08] tracking-[-0.025em] max-w-3xl mt-2" style={{ color: 'var(--c-ink)' }}>
            Built for the two places follow-up gets dropped.
          </h2>
        </motion.div>

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
              <Link href={card.href} className="group block p-10 lg:p-14 h-full">
                <div className="flex items-center justify-between mb-12 gap-4 flex-wrap">
                  <span
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] font-bold"
                    style={{ color: 'var(--c-brass)' }}
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c-brass)' }} />
                    {card.eyebrow}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.15em] font-semibold rounded-full px-3 py-1"
                    style={{
                      background: 'var(--c-brass)',
                      color: 'var(--c-ink)',
                    }}
                  >
                    {card.tag}
                  </span>
                </div>
                <h3 className="text-[28px] lg:text-[36px] leading-[1.12] tracking-[-0.025em] mb-6">
                  {card.title}
                </h3>
                <p className="text-[15px] lg:text-[16px] leading-[1.65] mb-10" style={{ color: card.dark ? 'var(--c-on-ink-70)' : 'var(--c-ink-70)' }}>
                  {card.desc}
                </p>
                <span
                  className="inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-wide group-hover:gap-4 transition-all"
                  style={{ color: card.dark ? 'var(--c-brass)' : 'var(--c-ink)' }}
                >
                  {card.cta}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pillars() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const items = [
    { n: '01', t: 'Transparent by construction.', d: 'Every recommendation traces back to a clinician-authored rule. Every patient interaction lands in the audit trail.' },
    { n: '02', t: 'Clinician at the centre.', d: 'The platform proposes; clinicians decide. Pathways are written by the people who run the service.' },
    { n: '03', t: 'Two surfaces, one platform.', d: 'Hospital Monitor is regulated software. Specialty Clinic is a workflow tool. Same engine, different posture.' },
  ]

  return (
    <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: 'var(--c-paper)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: 'var(--c-brass)' }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c-brass)' }} />
            Operating principles
          </span>
          <h2 className="text-[34px] lg:text-[48px] leading-[1.08] tracking-[-0.025em] max-w-3xl mt-2" style={{ color: 'var(--c-ink)' }}>
            The constraints we hold ourselves to.
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-12">
          {items.map((item, i) => (
            <motion.article
              key={item.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="border-t-2 pt-8"
              style={{ borderColor: 'var(--c-brass)' }}
            >
              <div className="flex items-center gap-3 mb-10">
                <span className="font-mono text-[12px] tracking-widest font-bold" style={{ color: 'var(--c-brass)' }}>
                  {item.n}
                </span>
                <span className="h-px flex-1 max-w-[40px]" style={{ background: 'var(--c-brass)', opacity: 0.6 }} />
              </div>
              <h3 className="text-[22px] lg:text-[24px] leading-[1.2] tracking-[-0.015em] mb-4" style={{ color: 'var(--c-ink)' }}>
                {item.t}
              </h3>
              <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--c-ink-70)' }}>
                {item.d}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABand() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 relative overflow-hidden" style={{ background: 'var(--c-ink)', color: 'var(--c-on-ink)' }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(184, 157, 106, 0.15), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] font-semibold mb-8"
          style={{ color: 'var(--c-brass)' }}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c-brass)' }} />
          Get in touch
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-[36px] lg:text-[56px] leading-[1.05] tracking-[-0.025em]"
        >
          Build the discharge week you'd want for your own family.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-12 flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-[14px] font-semibold tracking-wide transition-opacity hover:opacity-90 min-h-[44px] shadow-sm"
            style={{ background: 'var(--c-brass)', color: 'var(--c-ink)' }}
          >
            Start a conversation
            <svg className="w-3.5 h-3.5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
          <Link
            href="/evidence"
            className="inline-flex items-center justify-center px-8 py-4 text-[14px] font-medium tracking-wide transition-colors min-h-[44px] border-2"
            style={{ borderColor: 'rgba(255,255,255,0.30)', color: 'var(--c-on-ink)' }}
          >
            Read the evidence base →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function Conservative() {
  return (
    <div className="theme-clinical min-h-screen">
      <ClinicalNav />
      <main>
        <Hero />
        <AudienceTiles />
        <Pillars />
        <CTABand />
      </main>
      <ClinicalFooter />
      <DraftBadge variant="C1 — Conservative" />
    </div>
  )
}
