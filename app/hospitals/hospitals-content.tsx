'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { LeadershipSection } from '@/components/leadership-section'
import { useI18n } from '@/lib/i18n'

export default function HospitalsContent() {
  const { t } = useI18n()

  const complications = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    title: t(`hospitals.complications.item${n}.title`),
    desc: t(`hospitals.complications.item${n}.desc`),
    n: String(n).padStart(2, '0'),
  }))

  const path = [1, 2, 3].map((n) => ({
    title: t(`hospitals.path.step${n}.title`),
    desc: t(`hospitals.path.step${n}.desc`),
    n: String(n).padStart(2, '0'),
  }))

  const roster = [1, 2, 3].map((n) => ({
    title: t(`hospitals.roster.item${n}.title`),
    desc: t(`hospitals.roster.item${n}.desc`),
    n: String(n).padStart(2, '0'),
  }))

  return (
    <main id="main" className="bg-background min-h-screen">
      <SiteNav />

      {/* Hero */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-28 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('hospitals.eyebrow')}</span>
              <span className="h-px w-10 bg-accent/50" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[40px] sm:text-[52px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-10"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              {t('hospitals.title')}
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-2xl">
              {t('hospitals.subtitle')}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?intent=hospital"
                className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
              >
                {t('hospitals.cta.primary')}
              </Link>
              <Link
                href="#trial"
                className="inline-flex items-center justify-center border border-foreground/30 text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/5 transition-colors min-h-[44px]"
              >
                {t('hospitals.cta.secondary')}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 lg:pt-8">
            <div className="border-l border-brass/50 pl-6 py-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass mb-3">{t('hospitals.status.label')}</p>
              <p className="font-display text-[20px] leading-[1.25] mb-4" style={{ fontVariationSettings: "'opsz' 80" }}>
                {t('hospitals.status.title')}
              </p>
              <p className="text-[13px] text-foreground/70 leading-relaxed">
                {t('hospitals.status.body')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <LeadershipSection />

      {/* Complications */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 mb-20">
            <div className="lg:col-span-5">
              <h2
                className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                {t('hospitals.complications.title')}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80">
                {t('hospitals.complications.body')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {complications.map((c) => (
              <article key={c.n} className="bg-secondary p-7 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[11px] text-foreground/75 tracking-widest">{c.n}</span>
                  <span className="h-px w-6 bg-brass/60" aria-hidden="true" />
                </div>
                <h3
                  className="font-display text-[18px] lg:text-[20px] leading-[1.2] tracking-[-0.015em] mb-3"
                  style={{ fontVariationSettings: "'opsz' 72" }}
                >
                  {c.title}
                </h3>
                <p className="text-[13.5px] leading-[1.65] text-foreground/75">
                  {c.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Wound photo standalone */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('hospitals.wound.eyebrow')}</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <h2
              className="font-display text-[30px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] mb-6"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              {t('hospitals.wound.title')}
            </h2>
            <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80">
              {t('hospitals.wound.body')}
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <dl className="divide-y divide-border border-y border-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="py-7 grid grid-cols-[160px_1fr] gap-6 items-baseline">
                  <dt className="font-mono text-[13px] text-foreground tracking-tight">
                    {t(`hospitals.wound.stat${i}.value`)}
                  </dt>
                  <dd className="text-[14px] text-foreground/75">
                    {t(`hospitals.wound.stat${i}.label`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Workflow preview */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2
              className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] mb-6"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              {t('hospitals.workflow.title')}
            </h2>
            <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80">
              {t('hospitals.workflow.body')}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-background border border-border overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">
                  {t('hospitals.workflow.preview.header')}
                </span>
                <span className="font-mono text-[11px] text-foreground/60">
                  {t('hospitals.workflow.preview.count')}
                </span>
              </div>
              <ul className="divide-y divide-border">
                {[
                  { level: 5, name: 'Patient, P.', reason: 'Wound image flagged · Day 8', ago: '6m' },
                  { level: 4, name: 'Patient, K.', reason: 'New palpitations · AF window', ago: '22m' },
                  { level: 3, name: 'Patient, M.', reason: 'Weight gain > 1.5 kg over 48h', ago: '1h' },
                  { level: 2, name: 'Patient, L.', reason: 'Mild breathlessness on stairs', ago: '2h' },
                  { level: 1, name: 'Patient, S.', reason: 'Within expected recovery range', ago: '3h' },
                ].map((row, i) => (
                  <li key={i} className="grid grid-cols-[44px_1fr_auto] items-center gap-4 px-5 py-4">
                    <div
                      className={`font-mono text-[12px] text-center py-1 font-medium ${
                        row.level >= 4
                          ? 'bg-destructive/15 text-destructive'
                          : row.level === 3
                          ? 'bg-brass/25 text-foreground'
                          : 'bg-secondary text-foreground/75'
                      }`}
                      aria-hidden="true"
                    >
                      L{row.level}
                    </div>
                    <div>
                      <div className="text-[14px] text-foreground">
                        <span className="sr-only">Urgency level {row.level}. </span>
                        {row.name}
                      </div>
                      <div className="text-[12px] text-foreground/70 mt-0.5">{row.reason}</div>
                    </div>
                    <div className="font-mono text-[11px] text-foreground/60">{row.ago}</div>
                  </li>
                ))}
              </ul>
              <div className="px-5 py-3 border-t border-border bg-secondary flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70">
                  {t('hospitals.workflow.preview.note1')}
                </span>
                <span className="text-[11px] text-foreground/60">
                  {t('hospitals.workflow.preview.note2')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roster fit */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 mb-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('hospitals.roster.eyebrow')}</span>
              </div>
              <h2
                className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] mb-6"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                {t('hospitals.roster.title')}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80">
                {t('hospitals.roster.body')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {roster.map((r) => (
              <article key={r.n} className="bg-background p-8 lg:p-9">
                <span className="font-mono text-[11px] text-brass tracking-widest mb-6 block">{r.n}</span>
                <h3
                  className="font-display text-[20px] lg:text-[22px] leading-[1.2] tracking-[-0.015em] mb-3"
                  style={{ fontVariationSettings: "'opsz' 72" }}
                >
                  {r.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-foreground/75">{r.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Signal to noise */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('hospitals.noise.eyebrow')}</span>
          </div>
          <h2
            className="font-display text-[32px] lg:text-[48px] leading-[1.08] tracking-[-0.025em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('hospitals.noise.title')}
          </h2>
          <p className="text-[16px] lg:text-[18px] leading-[1.7] text-foreground/80 max-w-3xl mx-auto mb-12">
            {t('hospitals.noise.body')}
          </p>
          <dl className="inline-grid sm:grid-cols-2 gap-px bg-border mx-auto">
            <div className="bg-secondary px-8 py-6">
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70 mb-2">
                {t('hospitals.noise.target.label')}
              </dt>
              <dd className="font-display text-[20px] text-foreground" style={{ fontVariationSettings: "'opsz' 80" }}>
                {t('hospitals.noise.target.value')}
              </dd>
            </div>
            <div className="bg-secondary px-8 py-6">
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70 mb-2">
                {t('hospitals.noise.endpoint.label')}
              </dt>
              <dd className="font-display text-[20px] text-foreground" style={{ fontVariationSettings: "'opsz' 80" }}>
                {t('hospitals.noise.endpoint.value')}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Trial */}
      <section id="trial" className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('hospitals.trial.eyebrow')}</span>
            </div>
            <h2
              className="font-display text-[34px] lg:text-[46px] leading-[1.08] tracking-[-0.025em] mb-8"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              {t('hospitals.trial.title')}
            </h2>
            <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80 mb-8">
              {t('hospitals.trial.body')}
            </p>
            <p className="text-[13px] leading-[1.7] text-foreground/65 italic border-l-2 border-brass/60 pl-4 mb-10">
              {t('hospitals.trial.not_recruiting')}
            </p>
            <Link
              href="/contact?intent=trial-protocol"
              className="inline-flex items-center gap-2.5 text-[13px] text-foreground font-medium tracking-wide border-b border-brass pb-1.5 hover:border-foreground transition-colors"
            >
              {t('hospitals.trial.cta')}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <dl className="divide-y divide-border border-y border-border">
              <div className="grid grid-cols-[150px_1fr] gap-6 py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/65">Registration</dt>
                <dd className="font-mono text-[14px] text-foreground">{t('hospitals.trial.id')}</dd>
              </div>
              <div className="grid grid-cols-[150px_1fr] gap-6 py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/65">Site</dt>
                <dd className="text-[15px] text-foreground">{t('hospitals.trial.site')}</dd>
              </div>
              <div className="grid grid-cols-[150px_1fr] gap-6 py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/65">Unit</dt>
                <dd className="text-[15px] text-foreground">{t('hospitals.trial.unit')}</dd>
              </div>
              <div className="grid grid-cols-[150px_1fr] gap-6 py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/65">Patients</dt>
                <dd className="font-display text-[20px] text-foreground" style={{ fontVariationSettings: "'opsz' 72" }}>550 (50 interim + 500 main), single centre</dd>
              </div>
              <div className="grid grid-cols-[150px_1fr] gap-6 py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/65">Sponsor</dt>
                <dd className="text-[15px] text-foreground">RPAH, Cardiothoracic Surgery Department</dd>
              </div>
              <div className="grid grid-cols-[150px_1fr] gap-6 py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/65">Principal Investigator</dt>
                <dd className="text-[15px] text-foreground">Dr Kei Woldendorp, The Baird Institute</dd>
              </div>
              <div className="grid grid-cols-[150px_1fr] gap-6 py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/65">Status</dt>
                <dd className="text-[15px] text-foreground">Ethics and governance in final stages.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Procurement path */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-display text-[32px] lg:text-[48px] leading-[1.08] tracking-[-0.025em] max-w-2xl mb-16"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('hospitals.path.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-background/15">
            {path.map((p) => (
              <article key={p.n} className="bg-foreground p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-mono text-[11px] text-brass tracking-widest">{p.n}</span>
                  <span className="h-px w-8 bg-brass/60" aria-hidden="true" />
                </div>
                <h3
                  className="font-display text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] mb-5 text-background"
                  style={{ fontVariationSettings: "'opsz' 80" }}
                >
                  {p.title}
                </h3>
                <p className="text-[14px] leading-[1.7] text-background/80">
                  {p.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Integration posture */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="font-display text-[32px] lg:text-[46px] leading-[1.08] tracking-[-0.025em] mb-8"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('hospitals.integration.title')}
          </h2>
          <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80 max-w-2xl mx-auto mb-10">
            {t('hospitals.integration.body')}
          </p>
          <div className="inline-flex flex-wrap justify-center gap-2">
            {['SAML 2.0', 'OIDC', 'HL7 v2 ADT', 'FHIR R4', 'ISO 27001', 'IEC 62304'].map((item) => (
              <span key={item} className="font-mono text-[11px] tracking-wide border border-border px-3 py-1.5 text-foreground/80">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
