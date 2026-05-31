import Link from 'next/link'

const variants = [
  {
    href: '/v2/effects/gradient',
    eyebrow: '01 / ShaderGradient v2',
    title: 'Living atmospheric gradient',
    body: 'The static radial gradient in the hero is replaced with a slow, low-contrast Ink/Mist gradient that gently breathes. Everything else on the page is untouched.',
  },
  {
    href: '/v2/effects/logo',
    eyebrow: '02 / Liquid Logo',
    title: 'AE mark rendered in liquid metal',
    body: 'The cohort trajectory diagram is replaced with a still, large-format liquid AE. Refraction is tuned right down so it reads as a confident brand mark, not a glitch.',
  },
  {
    href: '/v2/effects/glass',
    eyebrow: '03 / Liquid Glass',
    title: 'Floating glass navigation',
    body: 'iOS-style liquid glass on a floating pill nav and on the primary CTA. Aberration is dialled to a quarter of stock so it feels like surgical instrument chrome, not toy plastic.',
  },
  {
    href: '/v2/effects/r3f',
    eyebrow: '04 / React Three Fiber',
    title: 'A live care-orbit',
    body: 'The hero diagram is replaced with a slowly rotating wireframe care-orbit — a single highlighted patient revolving through a 30-day window, rendered in three.js.',
  },
]

export const metadata = {
  title: 'Effects sandbox',
  description: 'Four homepage variants demonstrating ShaderGradient v2, Liquid Logo, Liquid Glass and React Three Fiber integrations.',
}

export default function EffectsIndex() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass mb-6">
          Effects sandbox
        </p>
        <h1
          className="font-display text-[40px] sm:text-[54px] lg:text-[64px] leading-[1.05] tracking-[-0.03em] mb-8"
          style={{ fontVariationSettings: "'opsz' 144" }}
        >
          Four ways to make the homepage feel alive.
        </h1>
        <p className="text-[17px] leading-[1.6] text-foreground/75 max-w-2xl mb-16">
          Each variant clones the live aesciahealth.com layout and content, then introduces
          a single effect in one place. Open them side-by-side to compare.
        </p>

        <div className="grid sm:grid-cols-2 gap-px bg-border">
          {variants.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className="group bg-background hover:bg-secondary transition-colors p-10 lg:p-12 block"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass mb-5">
                {v.eyebrow}
              </p>
              <h2
                className="font-display text-[28px] lg:text-[32px] leading-[1.15] tracking-[-0.025em] mb-4"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                {v.title}
              </h2>
              <p className="text-[14px] leading-[1.6] text-foreground/70 mb-8 max-w-md">{v.body}</p>
              <span className="inline-flex items-center gap-2.5 text-[13px] font-medium tracking-wide text-foreground group-hover:gap-4 transition-all">
                View variant
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
          Production homepage &middot; <Link href="/" className="underline decoration-foreground/30 underline-offset-4 hover:text-foreground">/</Link>
        </p>
      </div>
    </main>
  )
}
