'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { useI18n } from '@/lib/i18n'

export default function ClinicsContent() {
  const { t } = useI18n()

  const features = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
    title: t(`clinics.features.item${n}.title`),
    desc: t(`clinics.features.item${n}.desc`),
    n: String(n).padStart(2, '0'),
  }))

  const regions = [
    { label: t('clinics.regions.us.label'), value: t('clinics.regions.us.value'), code: 'US' },
    { label: t('clinics.regions.ca.label'), value: t('clinics.regions.ca.value'), code: 'CA' },
    { label: t('clinics.regions.au.label'), value: t('clinics.regions.au.value'), code: 'AU/NZ' },
    { label: t('clinics.regions.uk.label'), value: t('clinics.regions.uk.value'), code: 'UK/EU' },
  ]

  return (
    <main id="main" className="bg-background min-h-screen">
      <SiteNav />

      {/* Hero */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('clinics.eyebrow')}</span>
              <span className="h-px w-10 bg-accent/50" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[40px] sm:text-[54px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-10"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              {t('clinics.title')}
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-2xl">
              {t('clinics.subtitle')}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?intent=clinic"
                className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
              >
                {t('clinics.cta.primary')}
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center border border-foreground/30 text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/5 transition-colors min-h-[44px]"
              >
                {t('clinics.cta.secondary')}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 lg:pt-8">
            <div className="border-l border-accent/60 pl-6 py-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-3">{t('clinics.posture.label')}</p>
              <p className="font-display text-[20px] leading-[1.25] mb-4" style={{ fontVariationSettings: "'opsz' 80" }}>
                {t('clinics.posture.title')}
              </p>
              <p className="text-[13px] text-foreground/70 leading-relaxed">
                {t('clinics.posture.body')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-display text-[34px] lg:text-[48px] leading-[1.08] tracking-[-0.025em] max-w-2xl mb-16"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('clinics.features.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {features.map((f) => (
              <article key={f.n} className="bg-background p-7 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[11px] text-brass tracking-widest">{f.n}</span>
                  <span className="h-px w-5 bg-brass/60" aria-hidden="true" />
                </div>
                <h3
                  className="font-display text-[19px] lg:text-[21px] leading-[1.25] tracking-[-0.015em] mb-3"
                  style={{ fontVariationSettings: "'opsz' 72" }}
                >
                  {f.title}
                </h3>
                <p className="text-[13.5px] leading-[1.65] text-foreground/75">
                  {f.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vocabulary */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2
              className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] mb-6"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              {t('clinics.vocab.title')}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80 mb-10">
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
                <div key={k} className="grid grid-cols-[auto_1fr] gap-4 items-baseline border-b border-border pb-3">
                  <span className="text-foreground font-medium">{k}</span>
                  <span className="text-foreground/65 text-[13px]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regional brands */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 mb-16">
            <div className="lg:col-span-5">
              <h2
                className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                {t('clinics.regions.title')}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80">
                {t('clinics.regions.body')}
              </p>
            </div>
          </div>
          <dl className="divide-y divide-border border-y border-border">
            {regions.map((r) => (
              <div key={r.code} className="grid grid-cols-[90px_1fr_2fr] gap-6 py-6 items-baseline">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass pt-1">{r.code}</span>
                <dt className="text-[14px] text-foreground font-medium">{r.label}</dt>
                <dd className="text-[14px] text-foreground/75 font-mono tracking-tight">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2
              className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] mb-6"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              {t('clinics.specialties.title')}
            </h2>
            <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80">
              {t('clinics.specialties.body')}
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="divide-y divide-border border-y border-border">
              {[
                { name: 'Colonoscopy', detail: 'With regional prep variants and clinician-authored overlays', tag: 'First focus' },
                { name: 'Gastroscopy', detail: 'Pre-procedure fasting, meds review, GLP-1 overlay', tag: 'First focus' },
                { name: 'Physiotherapy post-discharge', detail: 'Elective orthopaedic, spinal, and joint pathways', tag: 'On roadmap' },
                { name: 'Aesthetics and cosmetic', detail: 'Consent, prep, photo capture, follow-up', tag: 'On roadmap' },
                { name: 'Your specialty', detail: 'If a clinical champion is in place, we build the pathway with you', tag: 'Open' },
              ].map((row) => (
                <div key={row.name} className="py-6 flex items-start justify-between gap-6">
                  <div>
                    <div className="text-[16px] text-foreground font-medium">{row.name}</div>
                    <div className="text-[13px] text-foreground/70 mt-1">{row.detail}</div>
                  </div>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.2em] pt-1.5 shrink-0 ${row.tag === 'First focus' ? 'text-accent' : row.tag === 'Open' ? 'text-brass' : 'text-foreground/55'}`}>{row.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Champion criteria */}
        <div className="max-w-7xl mx-auto px-0 lg:px-0 mt-24 lg:mt-32">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">A fit for your practice?</span>
              </div>
              <h3
                className="font-display text-[28px] lg:text-[38px] leading-[1.1] tracking-[-0.025em] mb-6"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                What makes a specialty a good candidate.
              </h3>
              <p className="text-[15px] lg:text-[16px] leading-[1.65] text-foreground/75">
                We do not prescribe which specialties belong on the platform. We ask whether the friction is real, whether there is a clinician willing to co-author the pathway, and whether the patient journey has the kind of between-visit gap the engine can bridge.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="divide-y divide-border border-y border-border">
                {[
                  {
                    title: 'A wait list under pressure',
                    body: 'Long wait times, over-booked lists, or patients waiting weeks for a procedure where prep quality or no-shows are the rate-limiting step.',
                  },
                  {
                    title: 'No-shows and cancellations eating throughput',
                    body: 'Empty chairs, same-day cancellations, or inadequate preparation forcing repeat appointments. Any of these costs your team hours and the patient a delay.',
                  },
                  {
                    title: 'Patient education and adherence between visits',
                    body: 'Specialties where the weeks before or after an appointment carry risk: chronic disease, procedural prep, post-treatment monitoring, rehabilitation, lifestyle-dependent outcomes.',
                  },
                  {
                    title: 'Direct clinician oversight, or hands-off',
                    body: 'Some clinicians want every flag to route through them. Others want the pathway to handle the routine and surface only exceptions. The engine supports either, and the choice is set per pathway.',
                  },
                  {
                    title: 'A clinician willing to author',
                    body: 'Someone whose name goes on the rule set. The pathway is only as good as the clinician who authored it, and we do not ship one without a named author.',
                  },
                ].map((row, i) => (
                  <li key={row.title} className="py-6 grid grid-cols-[40px_1fr] gap-4 items-start">
                    <span className="font-mono text-[11px] text-brass tracking-widest pt-1">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <div className="text-[15px] text-foreground font-medium mb-1.5">{row.title}</div>
                      <div className="text-[13.5px] text-foreground/75 leading-[1.6]">{row.body}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <a
                  href="/contact?intent=clinic"
                  className="inline-flex items-center gap-2.5 text-[13px] text-foreground font-medium tracking-wide border-b border-brass pb-1.5 hover:border-foreground transition-colors"
                >
                  Talk to us about your specialty
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof / ROI */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('clinics.proof.eyebrow')}</span>
                <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
              </div>
              <h2
                className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em]"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                {t('clinics.proof.title')}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80">
                {t('clinics.proof.body')}
              </p>
            </div>
          </div>

          <dl className="grid md:grid-cols-2 gap-px bg-border border-y border-border">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-background p-8 lg:p-10">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/65 mb-4">
                  {t(`clinics.proof.stat${n}.label`)}
                </dt>
                <dd
                  className="font-display text-[24px] lg:text-[30px] leading-[1.2] tracking-[-0.018em] text-foreground mb-3"
                  style={{ fontVariationSettings: "'opsz' 96" }}
                >
                  {t(`clinics.proof.stat${n}.value`)}
                </dd>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass">
                  {t(`clinics.proof.stat${n}.source`)}
                </p>
              </div>
            ))}
          </dl>

          <p className="text-[13px] leading-[1.65] text-foreground/65 italic border-l-2 border-brass/60 pl-4 mt-10 max-w-3xl">
            {t('clinics.proof.footnote')}
          </p>
        </div>
      </section>

      {/* Pricing posture */}
      <section id="pricing" className="py-24 lg:py-32 px-6 lg:px-10 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('clinics.pricing.title')}</span>
          <p
            className="font-display text-[26px] lg:text-[36px] leading-[1.3] tracking-[-0.02em] mt-6 text-background"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('clinics.pricing.body')}
          </p>
          <Link
            href="/contact?intent=clinic-pricing"
            className="inline-flex items-center gap-2.5 mt-12 text-[13px] text-background font-medium tracking-wide border-b border-brass pb-1.5 hover:border-background transition-colors"
          >
            Ask about your specialty
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
