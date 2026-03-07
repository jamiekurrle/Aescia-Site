'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function ValueProps() {
  const { t } = useI18n()

  const props = [
    {
      title: t('value.exec.title'),
      description: t('value.exec.desc'),
      link: '/evidence',
    },
    {
      title: t('value.clinical.title'),
      description: t('value.clinical.desc'),
      link: '/solution',
    },
    {
      title: t('value.patient.title'),
      description: t('value.patient.desc'),
      link: '/solution',
    },
  ]

  return (
    <section className="py-24 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('value.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {props.map((prop) => (
            <div key={prop.title} className="bg-background rounded-xl p-8 border border-border">
              <h3 className="font-semibold text-foreground text-lg mb-4">{prop.title}</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">{prop.description}</p>
              <Link
                href={prop.link}
                className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
