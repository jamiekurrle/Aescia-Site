'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/careers-detail'
import { type Role, APPLY_EMAIL } from '@/lib/careers'

function useRoleT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

// Shared heading sizes. Section headings are deliberately large; the small mono
// label above each is just a kicker.
const SECTION_H2 =
  'font-display text-[30px] lg:text-[44px] leading-[1.1] tracking-[-0.025em]'

export function RoleContent({ role }: { role: Role }) {
  const t = useRoleT()

  const mailto = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(`${role.title} application`)}`
  const formHref = `/contact?intent=${encodeURIComponent(`careers-${role.slug}`)}`

  const facts: { k: string; v: string }[] = [
    { k: t('roledetail.glance.team'), v: role.team },
    { k: t('roledetail.glance.engagement'), v: role.engagement },
    { k: t('roledetail.glance.location'), v: role.location },
    { k: t('roledetail.glance.reportsTo'), v: role.reportsTo },
    ...(role.compensation ? [{ k: t('roledetail.glance.compensation'), v: role.compensation }] : []),
  ]

  return (
    <main id="main" className="bg-background min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors mb-8"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5m5 5l-5-5 5-5" />
            </svg>
            {t('roledetail.back')}
          </Link>
          <div className="flex items-center gap-3 mb-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('roledetail.openRole')}</span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[40px] sm:text-[54px] lg:text-[68px] leading-[1.05] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {role.title}
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
            {role.summary}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href={mailto}
              className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
            >
              {t('roledetail.hero.apply')}
            </a>
            <a
              href="#what-you-will-build"
              className="inline-flex items-center justify-center border border-foreground/30 text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/5 transition-colors min-h-[44px]"
            >
              {t('roledetail.hero.readDetails')}
            </a>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="py-12 lg:py-16 px-6 lg:px-10 bg-secondary border-b border-border">
        <div className="max-w-5xl mx-auto">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-7">
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/60 mb-2">{f.k}</dt>
                <dd className="text-[15px] leading-[1.45] text-foreground/90">{f.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-9">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/60 mb-3">{t('roledetail.glance.stack')}</p>
            <ul className="flex flex-wrap gap-2">
              {role.stack.map((s) => (
                <li
                  key={s}
                  className="border border-border bg-background px-3 py-1.5 font-mono text-[12px] tracking-wide text-foreground/80"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-[14px] leading-[1.65] text-foreground/70 max-w-3xl">{role.locationNote}</p>
        </div>
      </section>

      {/* The role */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('roledetail.kicker.theRole')}</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <h2 className={`${SECTION_H2} mb-9`} style={{ fontVariationSettings: "'opsz' 120" }}>
            {t('roledetail.heading.theRole')}
          </h2>
          <div className="space-y-6">
            {role.mission.map((p, i) => (
              <p key={i} className="text-[16px] lg:text-[17px] leading-[1.75] text-foreground/85">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* What you will build */}
      <section id="what-you-will-build" className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary scroll-mt-28">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('roledetail.kicker.responsibilities')}</span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h2 className={`${SECTION_H2} mb-10 lg:mb-12`} style={{ fontVariationSettings: "'opsz' 120" }}>
            {t('roledetail.heading.responsibilities')}
          </h2>
          <dl className="divide-y divide-border border-y border-border bg-background">
            {role.responsibilities.map((row) => (
              <div
                key={row.title}
                className="py-7 lg:py-9 px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-2 lg:gap-12"
              >
                <dt
                  className="font-display text-[19px] lg:text-[24px] leading-[1.25] tracking-[-0.018em] text-foreground"
                  style={{ fontVariationSettings: "'opsz' 80" }}
                >
                  {row.title}
                </dt>
                <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">{row.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What we are looking for */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('roledetail.kicker.requirements')}</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <h2 className={`${SECTION_H2} mb-10`} style={{ fontVariationSettings: "'opsz' 120" }}>
            {t('roledetail.heading.requirements')}
          </h2>
          <ul className="space-y-5">
            {role.requirements.map((r, i) => (
              <li key={i} className="border-l-2 border-brass/50 pl-5 text-[16px] leading-[1.7] text-foreground/85">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bonus points */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{t('roledetail.kicker.niceToHave')}</span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h2 className={`${SECTION_H2} mb-10`} style={{ fontVariationSettings: "'opsz' 120" }}>
            {t('roledetail.heading.bonus')}
          </h2>
          <ul className="space-y-4">
            {role.bonus.map((b, i) => (
              <li key={i} className="flex gap-3 text-[16px] leading-[1.7] text-foreground/85">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brass" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('roledetail.kicker.theTeam')}</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <h2 className={`${SECTION_H2} mb-9`} style={{ fontVariationSettings: "'opsz' 120" }}>
            {t('roledetail.heading.howWeWork')}
          </h2>
          <div className="space-y-6">
            {role.howWeWork.map((p, i) => (
              <p key={i} className="text-[16px] lg:text-[17px] leading-[1.75] text-foreground/85">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-8 text-[15px] leading-[1.7] text-foreground/75">
            {t('roledetail.howWeWork.linksPre')}
            <Link href="/platform" className="underline underline-offset-4 decoration-brass decoration-2">
              {t('roledetail.howWeWork.platform')}
            </Link>
            {t('roledetail.howWeWork.linksMid')}
            <Link href="/evidence" className="underline underline-offset-4 decoration-brass decoration-2">
              {t('roledetail.howWeWork.evidence')}
            </Link>
            {t('roledetail.howWeWork.linksPost')}
          </p>
        </div>
      </section>

      {/* Apply */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-foreground text-background">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-7 justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">{t('roledetail.kicker.apply')}</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <h2
            className={`${SECTION_H2} mb-6 text-background text-center`}
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('roledetail.apply.heading').replace('{title}', role.title)}
          </h2>
          <p className="text-[15px] leading-[1.7] text-background/80 max-w-2xl mx-auto mb-8 text-center">
            {role.applyIntro}
          </p>
          <ul className="max-w-md mx-auto space-y-3 mb-10">
            {role.applyChecklist.map((c, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-[1.6] text-background/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brass" aria-hidden="true" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-4">
            <a
              href={mailto}
              className="inline-flex items-center gap-2.5 bg-background text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-background/90 transition-colors min-h-[44px]"
            >
              {t('roledetail.apply.cta')}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </a>
            <p className="text-[13px] text-background/70">
              {t('roledetail.apply.formPre')}
              <Link href={formHref} className="underline underline-offset-4 decoration-brass decoration-2">
                {t('roledetail.apply.contactPage')}
              </Link>
              {t('roledetail.apply.formPost')}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
