'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function CTASection() {
  const { t } = useI18n()

  return (
    <section className="py-24 px-6 bg-foreground text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
          {t('cta.title')}
        </h2>
        <p className="text-lg text-primary-foreground/80 mb-10 leading-relaxed">
          {t('cta.subtitle')}
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-foreground font-medium px-8 py-4 rounded hover:bg-white/90 transition-colors"
        >
          {t('cta.button')}
        </Link>
      </div>
    </section>
  )
}
