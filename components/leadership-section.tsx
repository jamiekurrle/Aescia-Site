'use client'

import { useI18n } from '@/lib/i18n'

export function LeadershipSection() {
  const { t } = useI18n()

  const people = [
    {
      initials: 'PB',
      name: t('hospitals.leadership.bannon.name'),
      title: t('hospitals.leadership.bannon.title'),
      aff: t('hospitals.leadership.bannon.aff'),
      role: t('hospitals.leadership.bannon.role'),
      accent: 'border-brass',
    },
    {
      initials: 'KW',
      name: t('hospitals.leadership.woldendorp.name'),
      title: t('hospitals.leadership.woldendorp.title'),
      aff: t('hospitals.leadership.woldendorp.aff'),
      role: t('hospitals.leadership.woldendorp.role'),
      accent: 'border-accent',
    },
    {
      initials: 'MH',
      name: t('hospitals.leadership.horrigan.name'),
      title: t('hospitals.leadership.horrigan.title'),
      aff: t('hospitals.leadership.horrigan.aff'),
      role: t('hospitals.leadership.horrigan.role'),
      accent: 'border-foreground/25',
    },
  ]

  return (
    <section className="bg-background py-24 lg:py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
                {t('hospitals.leadership.eyebrow')}
              </span>
              <span className="h-px w-10 bg-brass/50" aria-hidden="true" />
            </div>
            <h2
              className="font-display text-[32px] lg:text-[46px] leading-[1.08] tracking-[-0.025em]"
              style={{ fontVariationSettings: "'opsz' 120, 'SOFT' 30" }}
            >
              {t('hospitals.leadership.title')}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80">
              {t('hospitals.leadership.body')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {people.map((p) => (
            <article key={p.name} className={`bg-background p-8 lg:p-9 border-t-2 ${p.accent}`}>
              <div className="flex items-center gap-4 mb-6">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 border border-foreground/20 flex items-center justify-center font-mono text-[13px] tracking-widest text-foreground/70"
                >
                  {p.initials}
                </div>
              </div>
              <h3
                className="font-display text-[22px] lg:text-[24px] leading-[1.2] tracking-[-0.018em] mb-2"
                style={{ fontVariationSettings: "'opsz' 80, 'SOFT' 30" }}
              >
                {p.name}
              </h3>
              <p className="text-[13px] text-foreground/70 mb-3 italic">{p.title}</p>
              <p className="text-[13px] leading-[1.6] text-foreground/70 mb-5">{p.aff}</p>
              <p className="text-[13px] leading-[1.6] text-foreground border-t border-border pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass block mb-1.5">Role</span>
                {p.role}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
