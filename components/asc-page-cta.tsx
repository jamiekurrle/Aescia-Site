import Link from 'next/link'

// Shared footer call-to-action for every endoscopy-ASC landing page. Keeping it
// in one component means all the new pages end with the same two actions —
// design-partner pilot (primary) and contact (secondary) — rather than drifting
// into one-off CTA structures. Pass `line` to tailor the lead sentence.

export function AscPageCta({ line }: { line?: string }) {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
        <p className="text-[15px] text-foreground/80 flex-1">
          {line ??
            'See whether Aescia fits your ASC. The design-partner pilot runs free or under a money-back rebate until Aescia delivers measurable net benefit against your own baseline.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 self-start sm:self-auto">
          <Link
            href="/design-partner"
            className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
          >
            Design-partner program
          </Link>
          <Link
            href="/contact?intent=clinics"
            className="inline-flex items-center justify-center border border-foreground/30 text-foreground px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/5 transition-colors min-h-[44px]"
          >
            Contact Aescia
          </Link>
        </div>
      </div>
    </section>
  )
}
