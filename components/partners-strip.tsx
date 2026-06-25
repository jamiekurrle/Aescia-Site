'use client'

import { useI18n } from '@/lib/i18n'

// Optional outbound URLs per partner. Only items with confirmed external
// profiles are clickable; the others render as plain text. This preserves
// the "publish affiliations we have earned, not logo walls" stance.
const partnerLinks: Record<number, string | undefined> = {
  1: 'https://www.slhd.nsw.gov.au/rpa/',
  2: 'https://www.bairdinstitute.org.au',
  3: 'https://www.slhd.nsw.gov.au/rpa/ias/',
  4: 'https://www.cheoresearch.ca',
  5: 'https://district3.co',
  6: 'https://medtechcompass.org.au/',
}

export function PartnersStrip() {
  const { t } = useI18n()

  const partners = [1, 2, 3, 4, 5, 6].map((n) => ({
    name: t(`partners.item${n}.name`),
    role: t(`partners.item${n}.role`),
    n: String(n).padStart(2, '0'),
    href: partnerLinks[n],
  }))

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">
                {t('partners.eyebrow')}
              </span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <h2
              className="font-display text-[32px] lg:text-[44px] leading-[1.08] tracking-[-0.025em]"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              {t('partners.title')}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80 mb-8">
              {t('partners.body')}
            </p>
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 items-baseline border-l-2 border-accent pl-5">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">
                {t('partners.trial.label')}
              </span>
              <a
                href="https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482"
                target="_blank"
                rel="noopener"
                className="font-mono text-[14px] text-foreground underline decoration-accent/40 underline-offset-4 hover:decoration-foreground transition-colors"
                aria-label="View SAFE-Discharge trial registration on ANZCTR (opens in a new window)"
              >
                {t('partners.trial.value')}
              </a>
            </div>
          </div>
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-px bg-border border-y border-border">
          {partners.map((p) => {
            const inner = (
              <>
                <span className="font-mono text-[10px] tracking-widest text-brass mb-4">{p.n}</span>
                <p
                  className="font-display text-[16px] lg:text-[17px] leading-[1.25] tracking-[-0.01em] mb-3 text-foreground"
                  style={{ fontVariationSettings: "'opsz' 72" }}
                >
                  {p.name}
                </p>
                <p className="text-[12.5px] leading-[1.55] text-foreground/70 mt-auto">{p.role}</p>
              </>
            )
            return (
              <li key={p.n} className="bg-background flex">
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener"
                    className="flex flex-col p-6 lg:p-7 min-h-[160px] w-full hover:bg-secondary/50 transition-colors group"
                  >
                    {inner}
                    <span className="sr-only">(opens in a new window)</span>
                  </a>
                ) : (
                  <div className="flex flex-col p-6 lg:p-7 min-h-[160px] w-full">{inner}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
