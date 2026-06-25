'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { useI18n } from '@/lib/i18n'

type Person = {
  initials: string
  nameKey: string
  roleKey: string
  bioKey: string
}

const founders: Person[] = [
  { initials: 'JK', nameKey: 'team.james.name', roleKey: 'team.james.role', bioKey: 'team.james.bio' },
  { initials: 'VD', nameKey: 'team.vasken.name', roleKey: 'team.vasken.role', bioKey: 'team.vasken.bio' },
]

const operating: Person[] = [
  { initials: 'JC', nameKey: 'team.josh.name', roleKey: 'team.josh.role', bioKey: 'team.josh.bio' },
  { initials: 'SK', nameKey: 'team.shannon.name', roleKey: 'team.shannon.role', bioKey: 'team.shannon.bio' },
]

export function TeamContent() {
  const { t } = useI18n()

  return (
    <>
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('team.eyebrow')}</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[76px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              {t('team.title')}
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              {t('team.subtitle')}
            </p>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">{t('team.founders.eyebrow')}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {founders.map((p) => (
                <article key={p.nameKey} className="bg-background p-8 lg:p-10">
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 border border-foreground/25 flex items-center justify-center font-mono text-[13px] tracking-widest text-foreground/80 mb-6"
                  >
                    {p.initials}
                  </div>
                  <h3
                    className="font-display text-[24px] lg:text-[28px] leading-[1.2] tracking-[-0.018em] mb-2"
                    style={{ fontVariationSettings: "'opsz' 80" }}
                  >
                    {t(p.nameKey)}
                  </h3>
                  <p className="text-[13px] text-foreground/75 mb-5 italic">{t(p.roleKey)}</p>
                  <p className="text-[14px] leading-[1.65] text-foreground/80 max-w-md">{t(p.bioKey)}</p>
                  {p.nameKey === 'team.james.name' && (
                    <Link
                      href="/team/james-kurrle"
                      className="mt-5 inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.22em] text-accent hover:text-foreground transition-colors"
                    >
                      Read full bio
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                      </svg>
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 mb-14">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('team.operating.eyebrow')}</span>
                </div>
                <h2
                  className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em]"
                  style={{ fontVariationSettings: "'opsz' 120" }}
                >
                  {t('team.operating.title')}
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {operating.map((p) => (
                <article key={p.nameKey} className="bg-secondary p-7 lg:p-9">
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 border border-foreground/25 flex items-center justify-center font-mono text-[13px] tracking-widest text-foreground/80 mb-6"
                  >
                    {p.initials}
                  </div>
                  <h3
                    className="font-display text-[20px] lg:text-[22px] leading-[1.2] tracking-[-0.015em] mb-2"
                    style={{ fontVariationSettings: "'opsz' 72" }}
                  >
                    {t(p.nameKey)}
                  </h3>
                  <p className="text-[12.5px] text-foreground/75 mb-5 italic">{t(p.roleKey)}</p>
                  <p className="text-[13.5px] leading-[1.65] text-foreground/80">{t(p.bioKey)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 mb-12">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">{t('team.clinical.eyebrow')}</span>
                </div>
                <h2
                  className="font-display text-[30px] lg:text-[40px] leading-[1.08] tracking-[-0.025em]"
                  style={{ fontVariationSettings: "'opsz' 120" }}
                >
                  {t('team.clinical.title')}
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/80">
                  {t('team.clinical.body')}
                </p>
              </div>
            </div>

            <article className="bg-background border-t-2 border-accent p-8 lg:p-10 max-w-2xl">
              <div
                aria-hidden="true"
                className="w-12 h-12 border border-foreground/25 flex items-center justify-center font-mono text-[13px] tracking-widest text-foreground/80 mb-6"
              >
                KW
              </div>
              <h3
                className="font-display text-[24px] lg:text-[28px] leading-[1.2] tracking-[-0.018em] mb-2"
                style={{ fontVariationSettings: "'opsz' 80" }}
              >
                {t('team.kei.name')}
              </h3>
              <p className="text-[13px] text-foreground/75 mb-4 italic">{t('team.kei.role')}</p>
              <p className="text-[14px] leading-[1.65] text-foreground/80">{t('team.kei.bio')}</p>
            </article>
          </div>
        </section>

        <section className="py-20 lg:py-24 px-6 lg:px-10 bg-secondary border-t border-border">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('team.advisory.eyebrow')}</span>
              </div>
              <h2
                className="font-display text-[28px] lg:text-[38px] leading-[1.1] tracking-[-0.025em]"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                {t('team.advisory.title')}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/80 mb-5">
                {t('team.advisory.body')}
              </p>
              <p className="text-[14px] leading-[1.7] text-foreground/70">
                {t('team.advisory.body2')}
              </p>
            </div>
          </div>
        </section>

        {/* Company maturity — the question early-stage buyers actually ask:
            will Aescia exist in 24 months, who calls the customer back when
            something breaks, how is the company funded. Stated plainly. */}
        <section className="py-24 lg:py-32 px-6 lg:px-10 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 mb-14">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">Company maturity</span>
                </div>
                <h2
                  className="font-display text-[30px] lg:text-[44px] leading-[1.08] tracking-[-0.025em]"
                  style={{ fontVariationSettings: "'opsz' 120" }}
                >
                  Funding, support, and the question of two years from now.
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/80">
                  Early-stage buyers underwrite company risk. The honest answers are below: how Aescia is funded, who is on the other end of the line when something is wrong, and what the runway and round timing actually look like.
                </p>
              </div>
            </div>

            <dl className="divide-y divide-border border-y border-border">
              <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-12 py-8">
                <dt className="font-display text-[18px] lg:text-[22px] leading-[1.25] tracking-[-0.018em]" style={{ fontVariationSettings: "'opsz' 80" }}>
                  Funding posture
                </dt>
                <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
                  Funded to date through founder capital and a non-dilutive grant pipeline, operating at a deliberately low burn rate. Grants in flight or accepted include the NSW Medical Devices Fund R14 (Australia, in preparation), MVP Ventures R3 (Australia, submitted), the Industrial Research Assistance Program (Canada, accepted on a reimbursement basis), the R&amp;D Tax Incentive (Australia, FY-cycle), and SR&amp;ED (Québec, active). A SAFE round is targeted to open Q4 2026 via Australian angels under ESIC eligibility, with a priced Series Seed in early 2027 into the Ontario holding entity. Conversations with prospective angel investors are open; introductions welcome at <a href="mailto:contact@aesciahealth.com?subject=Investor%20introduction" className="underline decoration-brass/40 underline-offset-4 hover:decoration-foreground">contact@aesciahealth.com</a>.
                </dd>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-12 py-8">
                <dt className="font-display text-[18px] lg:text-[22px] leading-[1.25] tracking-[-0.018em]" style={{ fontVariationSettings: "'opsz' 80" }}>
                  External programmes
                </dt>
                <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
                  Aescia is a portfolio company at District 3, Concordia University&apos;s innovation hub for bio, health, and high-tech startups (joined September 2025). Aescia is enrolled in the Medical Technology Association of Australia&apos;s MedTech Compass programme, and is selected for the CHEO Research Institute Product-Market-Fit programme (paediatric respiratory track), which runs from April 2026. These are external diligence and customer-development signals, not capital — they sit alongside the funding posture above rather than substituting for it.
                </dd>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-12 py-8">
                <dt className="font-display text-[18px] lg:text-[22px] leading-[1.25] tracking-[-0.018em]" style={{ fontVariationSettings: "'opsz' 80" }}>
                  Support model
                </dt>
                <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
                  During the design-partner phase, the named implementation contact is James Kurrle, founder and CEO. Not a queue, not a tier-one ticket triage. The operational coverage is spread across Sydney (AEST), Barcelona (CET), and US East and West Coast timezones, which in practice gives a US ASC effectively 24-hour responsiveness during the pilot window. A named operational counterpart is committed in writing at contract execution. This model evolves as Aescia hires; the named contact in the contract stays consistent for the duration of the design-partner term.
                </dd>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-12 py-8">
                <dt className="font-display text-[18px] lg:text-[22px] leading-[1.25] tracking-[-0.018em]" style={{ fontVariationSettings: "'opsz' 80" }}>
                  Team depth
                </dt>
                <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
                  Small by design. James is full-time on Aescia, owning the clinical pathway engine and company strategy. Vasken is part-time alongside another role, owning hosting, AI inference, EMR integration, and the authoring infrastructure for both the V1 trial stack and the V2 endoscopy production stack. Beyond the founders, Sara Nejatian is engaged as the UX contractor on the patient-facing flow, Josh Casey contributes fractionally on compliance and cybersecurity, and named clinical collaborators (Kei Woldendorp at Royal Prince Alfred, Paul Bannon at the Baird Institute) extend the engineering work for trial purposes without sitting on the cap table. Shannon Kurrle holds the statutory Resident Director role required by the Australian Corporations Act for the AU OpCo. The hiring roadmap is matched to the SAFE round rather than predicated on it; the V2 frontend contractor is the first planned hire.
                </dd>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-12 py-8">
                <dt className="font-display text-[18px] lg:text-[22px] leading-[1.25] tracking-[-0.018em]" style={{ fontVariationSettings: "'opsz' 80" }}>
                  Will Aescia exist in 24 months
                </dt>
                <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">
                  Runway is multi-year at the current burn. The team is small and the spend is matched to it; both founders are committed to the company and to the SAFE-Discharge trial and the design-partner programme as the next milestones. Independent of the company question, the design-partner contract structure includes data portability terms and a destruction-of-records schedule on exit, so a customer recovers their data in a usable format inside 30 days regardless of what happens to Aescia. The /security page documents the exit terms in writing.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-[15px] text-foreground/80 flex-1">{t('team.cta.label')}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
            >
              {t('team.cta.button')}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
