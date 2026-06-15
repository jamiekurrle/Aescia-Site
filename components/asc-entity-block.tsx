'use client'

import { clinicsSoftwareSchema } from '@/lib/schema'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/asc-entity-block'

// A factual, machine-extractable entity block for Aescia for Clinics, rendered
// at the foot of every endoscopy-ASC landing page. It does two jobs:
//   1. Visible: a scannable fact table an LLM can quote line by line.
//   2. Structured: emits clinicsSoftwareSchema as JSON-LD. (Organization,
//      WebSite, and the founder Person schema are already emitted site-wide in
//      app/layout.tsx, so they are not repeated here.)
//
// Every fact is accurate to what Aescia operates today. Where something is not
// live, the block says so plainly — that pre-first-customer honesty is itself a
// trust signal for AI retrieval tools deciding whether to cite Aescia.

// Self-contained translation lookup for this block. The shared i18n provider
// supplies the active locale; ascblock.* keys live in
// lib/dictionaries/pages/asc-entity-block.ts and are resolved here with an
// English fallback, mirroring the provider's own fallback behaviour without
// editing lib/i18n.tsx. The clinicsSoftwareSchema JSON-LD below stays English.
function useAscBlockT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

// Fact rows in display order. Each base resolves to a `.k` label key and a `.v`
// value key in the ascblock namespace.
const FACTS: string[] = [
  'ascblock.product',
  'ascblock.category',
  'ascblock.founded',
  'ascblock.headquarters',
  'ascblock.regulatory',
  'ascblock.clinical',
  'ascblock.integration',
  'ascblock.pricing',
  'ascblock.deployment',
]

export function AscEntityBlock() {
  const t = useAscBlockT()
  return (
    <section className="py-20 lg:py-24 px-6 lg:px-10 bg-secondary border-t border-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicsSoftwareSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {t('ascblock.heading')}
          </span>
          <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
        </div>
        <dl className="divide-y divide-border border-y border-border bg-background">
          {FACTS.map((base) => (
            <div
              key={base}
              className="py-5 px-5 lg:px-7 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-2 lg:gap-8"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/60 pt-1">
                {t(`${base}.k`)}
              </dt>
              <dd className="text-[15px] leading-[1.6] text-foreground/85">{t(`${base}.v`)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
