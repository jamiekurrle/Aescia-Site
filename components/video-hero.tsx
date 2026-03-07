'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function VideoHero() {
  const { t } = useI18n()

  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-16">
        <div className="mb-8">
          <Image
            src="/aescia-logo.png"
            alt="Aescia"
            width={160}
            height={48}
            className="mx-auto invert brightness-0 invert"
          />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
          {t('hero.title')}
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/solution"
            className="bg-white text-foreground font-medium px-8 py-4 rounded hover:bg-white/90 transition-colors"
          >
            {t('hero.cta.primary')}
          </Link>
          <Link
            href="/contact"
            className="bg-transparent border-2 border-white text-white font-medium px-8 py-4 rounded hover:bg-white/10 transition-colors"
          >
            {t('hero.cta.secondary')}
          </Link>
        </div>
      </div>
    </section>
  )
}
