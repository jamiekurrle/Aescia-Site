'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { TrustStrip } from '@/components/trust-strip'
import { useI18n } from '@/lib/i18n'

export default function PlatformPage() {
  const { t } = useI18n()

  return (
    <main className="bg-background min-h-screen">
      <SiteNav />

      <section className="pt-40 pb-24 lg:pt-48 lg:pb-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('platformpg.eyebrow')}</span>
            <span className="h-px w-10 bg-brass/50" />
          </div>
          <h1
            className="font-display text-[44px] sm:text-[58px] lg:text-[80px] leading-[1.02] tracking-[-0.03em] mb-12"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30" }}
          >
            {t('platformpg.title')}
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.7] text-foreground/75 max-w-3xl">
            {t('platformpg.body')}
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2
              className="font-display text-[32px] lg:text-[46px] leading-[1.08] tracking-[-0.025em]"
              style={{ fontVariationSettings: "'opsz' 120, 'SOFT' 30" }}
            >
              Four step types. Ten thousand pathways.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="divide-y divide-border border-y border-border">
              {[
                { name: 'Collect', body: 'A structured patient signal. Photo, scale, questionnaire, vitals. Stored against the patient record and timestamped.' },
                { name: 'Follow', body: 'A clinician-authored rule that reads one or more Collect signals and decides whether to flag, escalate, or continue. Every rule is explainable.' },
                { name: 'Remind', body: 'A timed outbound SMS or notification. Includes prep nudges, follow-up questions, and confirmation requests.' },
                { name: 'Educate', body: 'A PDF, video, or web card delivered at the right moment, in the right language, written by the clinical team.' },
              ].map((s) => (
                <div key={s.name} className="grid grid-cols-[140px_1fr] gap-6 py-7">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{s.name}</span>
                  </div>
                  <p className="text-[15px] leading-[1.65] text-foreground/75">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] mb-10"
            style={{ fontVariationSettings: "'opsz' 120, 'SOFT' 30" }}
          >
            Same engine, two products.
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/hospitals"
              className="group bg-foreground text-background p-8 lg:p-10 block hover:bg-foreground/90 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">For Hospitals</span>
              <p
                className="font-display text-[22px] mt-4 leading-[1.25] text-background"
                style={{ fontVariationSettings: "'opsz' 80, 'SOFT' 30" }}
              >
                Post-surgical recovery monitoring for cardiothoracic and other high-acuity discharges.
              </p>
              <span className="inline-flex items-center gap-2 mt-8 text-[13px] text-background/80 group-hover:gap-4 transition-all">
                Explore
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" /></svg>
              </span>
            </Link>
            <Link
              href="/clinics"
              className="group bg-background border border-border p-8 lg:p-10 block hover:bg-background/60 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">For Clinics</span>
              <p
                className="font-display text-[22px] mt-4 leading-[1.25] text-foreground"
                style={{ fontVariationSettings: "'opsz' 80, 'SOFT' 30" }}
              >
                Procedural preparation and workflow for endoscopy and other specialty clinics.
              </p>
              <span className="inline-flex items-center gap-2 mt-8 text-[13px] text-foreground/80 group-hover:gap-4 transition-all">
                Explore
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
