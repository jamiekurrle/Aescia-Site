'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function WorkflowDiagram() {
  const { t } = useI18n()

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('workflow.title')}
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto">
            {t('workflow.subtitle')}
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="grid md:grid-cols-7 gap-4 md:gap-0 items-stretch">
          {/* Patient Side */}
          <div className="bg-secondary rounded-xl p-6 text-center flex flex-col justify-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('workflow.patient.title')}</h3>
            <p className="text-sm text-foreground/60">{t('workflow.patient.desc')}</p>
          </div>

          {/* Arrow 1 + Daily Check-in Label */}
          <div className="hidden md:flex flex-col items-center justify-center px-2">
            <div className="bg-accent/10 rounded-lg px-4 py-3 mb-2">
              <span className="text-sm font-semibold text-accent">{t('workflow.checkin')}</span>
            </div>
            <svg className="w-12 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <p className="text-xs text-foreground/50 mt-1 text-center max-w-[120px]">{t('workflow.checkin.desc')}</p>
          </div>
          <div className="md:hidden flex flex-col items-center py-4">
            <div className="bg-accent/10 rounded-lg px-4 py-2 mb-2">
              <span className="text-sm font-semibold text-accent">{t('workflow.checkin')}</span>
            </div>
            <svg className="w-6 h-6 text-accent rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Aescia Platform */}
          <div className="bg-accent text-accent-foreground rounded-xl p-6 text-center flex flex-col justify-center md:col-span-3">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2">{t('workflow.platform.title')}</h3>
            <p className="text-sm opacity-80 mb-4">{t('workflow.platform.desc')}</p>
            <div className="flex justify-center gap-2">
              {['Low', 'Med', 'High'].map((level, i) => (
                <span
                  key={level}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                    i === 0 ? 'bg-green-500/30' : i === 1 ? 'bg-yellow-500/30' : 'bg-red-500/30'
                  }`}
                >
                  {level}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow 2 + Prioritized Alerts Label */}
          <div className="hidden md:flex flex-col items-center justify-center px-2">
            <div className="bg-accent/10 rounded-lg px-4 py-3 mb-2">
              <span className="text-sm font-semibold text-accent">{t('workflow.alerts')}</span>
            </div>
            <svg className="w-12 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <p className="text-xs text-foreground/50 mt-1 text-center max-w-[120px]">{t('workflow.alerts.desc')}</p>
          </div>
          <div className="md:hidden flex flex-col items-center py-4">
            <div className="bg-accent/10 rounded-lg px-4 py-2 mb-2">
              <span className="text-sm font-semibold text-accent">{t('workflow.alerts')}</span>
            </div>
            <svg className="w-6 h-6 text-accent rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Clinical Team */}
          <div className="bg-secondary rounded-xl p-6 text-center flex flex-col justify-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('workflow.clinical.title')}</h3>
            <p className="text-sm text-foreground/60">{t('workflow.clinical.desc')}</p>
          </div>
        </div>

        {/* Single benefit */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-secondary rounded-full px-6 py-3">
            <span className="text-2xl font-bold text-accent">1</span>
            <span className="text-foreground/70">{t('workflow.benefit.worklist')}</span>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/solution"
            className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
          >
            {t('workflow.link')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
