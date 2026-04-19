'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { useI18n } from '@/lib/i18n'

export default function ClinicsPage() {
  const { t } = useI18n()

  const features = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    title: t(`clinics.features.item${n}.title`),
    desc: t(`clinics.features.item${n}.desc`),
    n: String(n).padStart(2, '0'),
  }))

  return (
    <main className="bg-background min-h-screen">
      <SiteNav />

      {/* Hero */}
      <section className="pt-40 pb-24 lg:pt-48 lg:pb-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('clinics.eyebrow')}</span>
              <span className="h-px w-10 bg-accent/50" />
            </div>
            <h1
              className="font-display text-[40px] sm:text-[54px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-10"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}
            >
              {t('clinics.title')}
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/75 max-w-2xl">
              {t('clinics.subtitle')}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?intent=clinic"
                className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors"
              >
                {t('clinics.cta.primary')}
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center border border-foreground/25 text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/5 transition-colors"
              >
                See pricing posture
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 lg:pt-8">
            <div className="border-l border-accent/40 pl-6 py-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-3">Posture</p>
              <p className="font-display text-[20px] leading-[1.25] mb-4" style={{ fontVariationSettings: "'opsz' 80, 'SOFT' 30" }}>
                Not a medical device. Not a decision tool.
              </p>
              <p className="text-[13px] text-foreground/60 leading-relaxed">
                Aescia for Clinics is a workflow and patient-preparation platform. It does not diagnose, does not treat, does not propose clinical decisions. The clinician stays in control, the software saves the team time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-display text-[34px] lg:text-[48px] leading-[1.08] tracking-[-0.025em] max-w-2xl mb-16"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}
          >
            {t('clinics.features.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {features.map((f) => (
              <div key={f.n} className="bg-background p-7 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[11px] text-brass tracking-widest">{f.n}</span>
                  <span className="h-px w-5 bg-brass/50" />
                </div>
                <h3
                  className="font-display text-[18px] lg:text-[20px] leading-[1.25] tracking-[-0.015em] mb-3"
                  style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 30" }}
                >
                  {f.title}
                </h3>
                <p className="text-[13px] leading-[1.65] text-foreground/70">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vocabulary / positioning */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2
              className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] mb-6"
              style={{ fontVariationSettings: "'opsz' 120, 'SOFT' 30" }}
            >
              {t('clinics.vocab.title')}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/75 mb-10">
              {t('clinics.vocab.body')}
            </p>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 text-[14px]">
              {[
                ["Today's list", 'the live schedule view'],
                ['Room utilisation', 'throughput per room'],
                ['Prep adequacy', 'Boston Bowel Prep aligned'],
                ['Recall compliance', 'surveillance interval tracking'],
                ['Case turnover', 'time between completed procedures'],
                ['Staff flags', 'exceptions your team still owns'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[auto_1fr] gap-4 items-baseline border-b border-border/70 pb-3">
                  <span className="text-foreground font-medium">{k}</span>
                  <span className="text-foreground/55 text-[13px]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2
              className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] mb-6"
              style={{ fontVariationSettings: "'opsz' 120, 'SOFT' 30" }}
            >
              {t('clinics.specialties.title')}
            </h2>
            <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/75">
              {t('clinics.specialties.body')}
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="divide-y divide-border border-y border-border">
              {[
                { name: 'Colonoscopy', detail: 'With Glycoprep, Picoprep, MoviPrep, Plenvu variants' },
                { name: 'Gastroscopy', detail: 'Pre-procedure fasting, meds review, GLP-1 overlay' },
                { name: 'Physiotherapy post-discharge', detail: 'Elective orthopaedic, spinal, and joint pathways' },
                { name: 'Aesthetics and cosmetic', detail: 'Consent, prep, photo capture, follow-up' },
                { name: 'General specialty workflow', detail: 'Composable pathways for 15+ additional specialties' },
              ].map((row) => (
                <div key={row.name} className="py-6 flex items-start justify-between gap-6">
                  <div>
                    <div className="text-[16px] text-foreground font-medium">{row.name}</div>
                    <div className="text-[13px] text-foreground/55 mt-1">{row.detail}</div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent pt-1.5">Live</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing posture */}
      <section id="pricing" className="py-24 lg:py-32 px-6 lg:px-10 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('clinics.pricing.title')}</span>
          <p
            className="font-display text-[26px] lg:text-[36px] leading-[1.3] tracking-[-0.02em] mt-6 text-background"
            style={{ fontVariationSettings: "'opsz' 120, 'SOFT' 30" }}
          >
            {t('clinics.pricing.body')}
          </p>
          <Link
            href="/contact?intent=clinic-pricing"
            className="inline-flex items-center gap-2.5 mt-12 text-[13px] text-background font-medium tracking-wide border-b border-brass pb-1.5 hover:border-background transition-colors"
          >
            Ask about your specialty
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
