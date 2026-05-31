'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ClinicalNav, ClinicalFooter } from './_clinical-chrome'

const ease = [0.22, 1, 0.36, 1] as const

const NEW_VARIANTS = [
  {
    href: '/v2/main-preview',
    label: '★ Main preview — full homepage',
    title: 'C1 conservative, navy hero, town-map animation. Full site copy.',
    desc:
      'The whole homepage rendered in the C1 theme. Navy hero with a small line-art town: hospital at centre, six houses, patient-dots leaving the hospital blue, settling at home, and a couple turning red and travelling back. All sections from the live site, copy preserved via i18n.',
    note: 'The "build the main site into this theme" page. Start here.',
  },
  {
    href: '/v2/c1-conservative',
    label: 'C1 — Conservative',
    title: 'V1 vibe, clinical palette.',
    desc:
      'Same calm bones as the editorial draft you liked, redone in stone + ink + Geist. Word-by-word hero, audience tiles, principles. No surprises.',
    note: 'Lowest risk. Ship Monday.',
  },
  {
    href: '/v2/c2-hospital-to-home',
    label: 'C2 — Hospital → Home',
    title: 'A hospital morphs into a home as you scroll.',
    desc:
      'Pinned hero with a building→house cross-fade and a Day 0 → Day 7 traveller line. The whole "the discharge note is the start of the story" idea, in motion.',
    note: 'Most literal of the wild ideas. Strong narrative hook.',
  },
  {
    href: '/v2/c3-heartbeat',
    label: 'C3 — Heartbeat',
    title: 'A continuous ECG runs the right rail of the page.',
    desc:
      'A single trace lengthens as you scroll. Most days are calm baseline; one section spikes (Day 2 escalation event). Sound-of-the-monitor as a structural device.',
    note: 'High craft. Risk: too clinical for some readers.',
  },
  {
    href: '/v2/c4-typographic',
    label: 'C4 — Typographic',
    title: 'NYT magazine spread. Type as the design.',
    desc:
      'Massive Geist set at 18vw. No diagrams, no images. Drop caps, pull quotes, numbered editorial sections. Reads like a long-form magazine cover story.',
    note: 'Most distinctive. Best for press, investor, brand work.',
  },
  {
    href: '/v2/c5-discharge-week',
    label: 'C5 — Discharge Week',
    title: 'Horizontal scroll through Day 0 → Day 7.',
    desc:
      'Pinned section translates a 6-card horizontal track. Each day is a beat — quiet, escalation, resolved, quiet, closure. Status colours from the clinical palette.',
    note: 'Most "demo-able". Great for live walk-throughs.',
  },
  {
    href: '/v2/c6-care-orbit',
    label: 'C6 — Care Orbit',
    title: 'Patient at the centre, signals in orbit.',
    desc:
      'Six labelled signal nodes orbit the patient (check-in, flag, escalation, note, audit, resolution). A brass packet circulates around the outer ring continuously.',
    note: 'Closest to the V3 you saw before, restyled in clinical palette.',
  },
]

const LEGACY_VARIANTS = [
  {
    href: '/v2/editorial-motion',
    label: 'V1 — Editorial Motion (legacy)',
    desc: 'Original V1 you said was decent. Marketing palette (Pine + Bone + Brass + Fraunces).',
  },
  {
    href: '/v2/clinical-aligned',
    label: 'V2 — Clinical-Aligned (legacy)',
    desc: 'Earlier attempt in the marketing palette + Fraunces. Superseded by C1.',
  },
  {
    href: '/v2/kinetic-evidence',
    label: 'V3 — Kinetic Evidence (legacy)',
    desc: 'Earlier attempt in the marketing palette + Fraunces. Superseded by C6.',
  },
]

export default function V2Index() {
  return (
    <div className="theme-clinical min-h-screen">
      <ClinicalNav />
      <main>
        <section className="pt-40 pb-20 px-6 lg:px-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-4 mb-10"
            >
              <span className="label-eyebrow">Internal — site refresh review</span>
              <span className="h-px w-12 opacity-70" style={{ background: 'var(--c-brass)' }} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="text-[44px] lg:text-[68px] leading-[1.04] tracking-[-0.03em] mb-6"
              style={{ color: 'var(--c-ink)' }}
            >
              Six drafts of the new aesciahealth.com.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="text-[17px] lg:text-[19px] leading-[1.65] max-w-2xl"
              style={{ color: 'var(--c-ink-70)' }}
            >
              All six are built in the aescia-clinical UI palette: cool stone surface,
              navy ink, Geist sans throughout, mist + brass accents. One conservative
              drop-in, five wild swings. Pick the bones; we'll build the rest of the
              site on it.
            </motion.p>
          </div>
        </section>

        <section className="px-6 lg:px-10 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="border-t" style={{ borderColor: 'var(--c-border)' }}>
              {NEW_VARIANTS.map((v, i) => (
                <motion.div
                  key={v.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.07, ease }}
                  className="border-b"
                  style={{ borderColor: 'var(--c-border)' }}
                >
                  <Link
                    href={v.href}
                    className="group block py-10 lg:py-12 transition-colors hover:bg-[var(--c-stone-soft)] -mx-4 px-4"
                  >
                    <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-baseline">
                      <div className="lg:col-span-3">
                        <span className="label-eyebrow block mb-2" style={{ color: 'var(--c-mist-deep)' }}>
                          {v.label}
                        </span>
                        <span className="font-mono text-[10px] tracking-wide" style={{ color: 'var(--c-ink-40)' }}>
                          {v.note}
                        </span>
                      </div>
                      <div className="lg:col-span-7">
                        <h2 className="text-[24px] lg:text-[30px] leading-[1.18] tracking-[-0.02em] mb-3" style={{ color: 'var(--c-ink)' }}>
                          {v.title}
                        </h2>
                        <p className="text-[15px] lg:text-[16px] leading-[1.65]" style={{ color: 'var(--c-ink-70)' }}>
                          {v.desc}
                        </p>
                      </div>
                      <div className="lg:col-span-2 lg:text-right">
                        <span className="inline-flex items-center gap-2 text-[13px] font-medium group-hover:gap-3 transition-all" style={{ color: 'var(--c-ink)' }}>
                          Open
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-10 pb-24">
          <div className="max-w-6xl mx-auto pt-12 border-t" style={{ borderColor: 'var(--c-border)' }}>
            <div className="label-eyebrow mb-6">Earlier drafts (marketing palette)</div>
            <div className="grid md:grid-cols-3 gap-6">
              {LEGACY_VARIANTS.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  className="block p-6 border transition-colors hover:bg-[var(--c-stone-soft)]"
                  style={{ borderColor: 'var(--c-border)' }}
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold mb-3" style={{ color: 'var(--c-mist-deep)' }}>
                    {v.label}
                  </div>
                  <p className="text-[13px] leading-[1.55]" style={{ color: 'var(--c-ink-70)' }}>
                    {v.desc}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-12 flex items-center justify-between text-[12px] font-mono" style={{ color: 'var(--c-ink-40)' }}>
              <span>Drafts live under /v2/* — current site at / is unchanged.</span>
              <Link href="/" className="hover:underline" style={{ color: 'var(--c-ink-70)' }}>
                ← Back to live site
              </Link>
            </div>
          </div>
        </section>
      </main>
      <ClinicalFooter />
    </div>
  )
}
