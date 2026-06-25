'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/governance'

function useGovT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function PageContent() {
  const t = useGovT()
  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">{t('gov.hero.eyebrow')}</span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[44px] sm:text-[58px] lg:text-[76px] leading-[1.04] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {t('gov.hero.title')}
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
            {t('gov.hero.body')}
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="border-t-2 border-foreground pt-8">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/70 mb-4 block">Aescia for Hospitals</span>
            <h2
              className="font-display text-[24px] lg:text-[30px] leading-[1.2] tracking-[-0.02em] mb-6"
              style={{ fontVariationSettings: "'opsz' 80" }}
            >
              {t('gov.hospitals.title')}
            </h2>
            <dl className="divide-y divide-border border-y border-border text-[14px]">
              {([
                ['gov.hospitals.classification.label', 'gov.hospitals.classification.value', t('gov.hospitals.classification.value')],
                ['gov.hospitals.roadmap.label', 'gov.hospitals.roadmap.value', t('gov.hospitals.roadmap.value')],
                ['gov.hospitals.lifecycle.label', 'gov.hospitals.lifecycle.value', t('gov.hospitals.lifecycle.value')],
                ['gov.hospitals.quality.label', 'gov.hospitals.quality.value', t('gov.hospitals.quality.value')],
                ['gov.hospitals.infosec.label', 'gov.hospitals.infosec.value', t('gov.hospitals.infosec.value')],
                [
                  'gov.hospitals.clinical.label',
                  'gov.hospitals.clinical.value',
                  <>
                    {t('gov.hospitals.clinical.pre')}
                    <a
                      href="https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482"
                      target="_blank"
                      rel="noopener"
                      className="underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground transition-colors"
                      aria-label={t('gov.hospitals.clinical.link.aria')}
                    >
                      ACTRN12625001425482
                    </a>
                    {t('gov.hospitals.clinical.post')}
                  </>,
                ],
                ['gov.hospitals.engagement.label', 'gov.hospitals.engagement.value', t('gov.hospitals.engagement.value')],
                ['gov.hospitals.output.label', 'gov.hospitals.output.value', t('gov.hospitals.output.value')],
              ] as Array<[string, string, React.ReactNode]>).map(([kKey, vKey, v]) => (
                <div key={vKey} className="grid grid-cols-[130px_1fr] gap-4 py-5">
                  <dt className="font-mono text-[13px] uppercase tracking-[0.18em] text-foreground/70">{t(kKey)}</dt>
                  <dd className="text-foreground/85">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-t-2 border-accent pt-8">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent mb-4 block">Aescia for Clinics</span>
            <h2
              className="font-display text-[24px] lg:text-[30px] leading-[1.2] tracking-[-0.02em] mb-6"
              style={{ fontVariationSettings: "'opsz' 80" }}
            >
              {t('gov.clinics.title')}
            </h2>
            <dl className="divide-y divide-border border-y border-border text-[14px]">
              {[
                ['gov.clinics.classification.label', 'gov.clinics.classification.value'],
                ['gov.clinics.boundary.label', 'gov.clinics.boundary.value'],
                ['gov.clinics.posture.label', 'gov.clinics.posture.value'],
                ['gov.clinics.rule.label', 'gov.clinics.rule.value'],
                ['gov.clinics.escalation.label', 'gov.clinics.escalation.value'],
                ['gov.clinics.audit.label', 'gov.clinics.audit.value'],
                ['gov.clinics.engagement.label', 'gov.clinics.engagement.value'],
              ].map(([kKey, vKey]) => (
                <div key={vKey} className="grid grid-cols-[130px_1fr] gap-4 py-5">
                  <dt className="font-mono text-[13px] uppercase tracking-[0.18em] text-foreground/70">{t(kKey)}</dt>
                  <dd className="text-foreground/85">{t(vKey)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <p className="max-w-7xl mx-auto text-[13px] text-foreground/70 italic mt-10 border-l-2 border-brass/60 pl-4">
          {t('gov.cards.note')}
        </p>
      </section>

      {/* Security and data */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">{t('gov.security.eyebrow')}</span>
          <h2
            className="font-display text-[32px] lg:text-[46px] leading-[1.08] tracking-[-0.025em] mt-6 mb-12 max-w-3xl"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('gov.security.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              {
                titleKey: 'gov.security.identity.title',
                itemKeys: ['gov.security.identity.item1', 'gov.security.identity.item2', 'gov.security.identity.item3'],
              },
              {
                titleKey: 'gov.security.data.title',
                itemKeys: ['gov.security.data.item1', 'gov.security.data.item2', 'gov.security.data.item3', 'gov.security.data.item4'],
              },
              {
                titleKey: 'gov.security.software.title',
                itemKeys: ['gov.security.software.item1', 'gov.security.software.item2', 'gov.security.software.item3'],
              },
              {
                titleKey: 'gov.security.integration.title',
                itemKeys: ['gov.security.integration.item1', 'gov.security.integration.item2', 'gov.security.integration.item3'],
              },
              {
                titleKey: 'gov.security.oversight.title',
                itemKeys: ['gov.security.oversight.item1', 'gov.security.oversight.item2', 'gov.security.oversight.item3'],
              },
              {
                titleKey: 'gov.security.regulatory.title',
                itemKeys: ['gov.security.regulatory.item1', 'gov.security.regulatory.item2', 'gov.security.regulatory.item3'],
              },
            ].map((block) => (
              <div key={block.titleKey} className="bg-secondary p-7 lg:p-8">
                <h3
                  className="font-display text-[20px] mb-5"
                  style={{ fontVariationSettings: "'opsz' 72" }}
                >
                  {t(block.titleKey)}
                </h3>
                <ul className="space-y-2.5 text-[13.5px] leading-[1.6] text-foreground/80">
                  {block.itemKeys.map((itemKey) => (
                    <li key={itemKey} className="pl-4 relative">
                      <span className="absolute left-0 top-2.5 w-1.5 h-px bg-brass" aria-hidden="true" />
                      {t(itemKey)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">{t('gov.corporate.eyebrow')}</span>
          <h2
            className="font-display text-[30px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mt-6 mb-12"
            style={{ fontVariationSettings: "'opsz' 120" }}
          >
            {t('gov.corporate.title')}
          </h2>
          <dl className="divide-y divide-border border-y border-border">
            {[
              ['gov.corporate.holding.label', 'gov.corporate.holding.value'],
              ['gov.corporate.rd.label', 'gov.corporate.rd.value'],
              ['gov.corporate.applicant.label', 'gov.corporate.applicant.value'],
              ['gov.corporate.director.label', 'gov.corporate.director.value'],
              ['gov.corporate.office.label', 'gov.corporate.office.value'],
              ['gov.corporate.operations.label', 'gov.corporate.operations.value'],
            ].map(([kKey, vKey]) => (
              <div key={vKey} className="grid grid-cols-[180px_1fr] gap-6 py-6">
                <dt className="font-mono text-[13px] uppercase tracking-[0.18em] text-foreground/70">{t(kKey)}</dt>
                <dd className="text-[15px] text-foreground">{t(vKey)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
          <p className="text-[15px] text-foreground/80 flex-1">{t('gov.footer.body')}</p>
          <Link
            href="/security"
            className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
          >
            {t('gov.footer.cta')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
