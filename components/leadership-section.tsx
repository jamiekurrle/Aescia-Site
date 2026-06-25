'use client'

import { useI18n } from '@/lib/i18n'

export function LeadershipSection() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-24 lg:py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">
                {t('hospitals.leadership.eyebrow')}
              </span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <h2
              className="font-display text-[32px] lg:text-[46px] leading-[1.08] tracking-[-0.025em]"
              style={{ fontVariationSettings: "'opsz' 120" }}
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

        <article className="bg-background border-t-2 border-accent p-8 lg:p-10 max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div
              aria-hidden="true"
              className="w-12 h-12 border border-foreground/25 flex items-center justify-center font-mono text-[13px] tracking-widest text-foreground/80"
            >
              KW
            </div>
          </div>
          <h3
            className="font-display text-[24px] lg:text-[28px] leading-[1.2] tracking-[-0.018em] mb-2"
            style={{ fontVariationSettings: "'opsz' 80" }}
          >
            {t('hospitals.leadership.woldendorp.name')}
          </h3>
          <p className="text-[13px] text-foreground/75 mb-3 italic">
            {t('hospitals.leadership.woldendorp.title')}
          </p>
          <p className="text-[14px] leading-[1.65] text-foreground/75 mb-5">
            {t('hospitals.leadership.woldendorp.aff')}
          </p>
          <p className="text-[14px] leading-[1.65] text-foreground border-t border-border pt-4">
            <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-brass block mb-1.5">Role</span>
            {t('hospitals.leadership.woldendorp.role')}
          </p>
        </article>
      </div>
    </section>
  )
}
