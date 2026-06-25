'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function AudienceSplit() {
  const { t } = useI18n()

  const cards = [
    {
      eyebrow: t('split.hospital.eyebrow'),
      regtag: t('split.hospital.regtag'),
      title: t('split.hospital.title'),
      desc: t('split.hospital.desc'),
      cta: t('split.hospital.cta'),
      href: '/hospitals',
      accent: 'bg-foreground text-background',
      eyebrowClass: 'text-brass',
      regClass: 'text-background/60 border-background/20',
      descClass: 'text-background/80',
      border: 'border-transparent',
      arrowColor: 'text-background',
    },
    {
      eyebrow: t('split.clinic.eyebrow'),
      regtag: t('split.clinic.regtag'),
      title: t('split.clinic.title'),
      desc: t('split.clinic.desc'),
      cta: t('split.clinic.cta'),
      href: '/clinics',
      accent: 'bg-secondary text-foreground',
      eyebrowClass: 'text-accent',
      regClass: 'text-foreground/60 border-foreground/20',
      descClass: 'text-foreground/80',
      border: 'border-border',
      arrowColor: 'text-foreground',
    },
  ]

  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 border-t border-border">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group relative ${card.accent} ${card.border} border-b md:border-r md:last:border-r-0 px-8 lg:px-12 py-16 lg:py-20 block transition-colors`}
            >
              <div className="flex items-center justify-between mb-10 gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-[13px] uppercase tracking-[0.22em] ${card.eyebrowClass}`}>{card.eyebrow}</span>
                  <span className={`h-px w-8 ${card.eyebrowClass} opacity-60 bg-current`} aria-hidden="true" />
                </div>
                <span
                  className={`font-mono text-[13px] uppercase tracking-[0.15em] ${card.regClass} border px-2 py-1`}
                >
                  {card.regtag}
                </span>
              </div>

              <h3
                className="font-display text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.025em] mb-6 max-w-md"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                {card.title}
              </h3>

              <p className={`text-[15px] lg:text-[16px] leading-[1.6] max-w-md mb-10 ${card.descClass}`}>
                {card.desc}
              </p>

              <span className={`inline-flex items-center gap-2.5 text-[13px] font-medium tracking-wide ${card.arrowColor} group-hover:gap-4 transition-all`}>
                {card.cta}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
