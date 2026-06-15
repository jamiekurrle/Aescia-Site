'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/asc-page-cta'

// Shared footer call-to-action for every endoscopy-ASC landing page. Keeping it
// in one component means all the new pages end with the same two actions —
// design-partner pilot (primary) and contact (secondary) — rather than drifting
// into one-off CTA structures. Pass `line` to override the lead sentence.

// Self-contained translation lookup for the shared CTA. The shared i18n provider
// supplies the active locale; asccta.* keys live in
// lib/dictionaries/pages/asc-page-cta.ts and are resolved here with an English
// fallback, mirroring the provider's own fallback behaviour without editing
// lib/i18n.tsx.
function useAscCtaT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

export function AscPageCta({ line }: { line?: string }) {
  const t = useAscCtaT()
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
        <p className="text-[15px] text-foreground/80 flex-1">
          {line ?? t('asccta.defaultLine')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 self-start sm:self-auto">
          <Link
            href="/design-partner"
            className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
          >
            {t('asccta.designPartner')}
          </Link>
          <Link
            href="/contact?intent=clinics"
            className="inline-flex items-center justify-center border border-foreground/30 text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/5 transition-colors min-h-[44px]"
          >
            {t('asccta.contact')}
          </Link>
        </div>
      </div>
    </section>
  )
}
