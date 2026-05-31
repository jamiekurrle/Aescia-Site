'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRef } from 'react'

const ShaderBg = dynamic(() => import('@/components/shader-bg').then((m) => m.ShaderBg), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#1B2745]" />,
})

const LiquidLogo = dynamic(() => import('@/components/liquid-logo/liquid-logo').then((m) => m.LiquidLogo), {
  ssr: false,
})

const LiquidGlass = dynamic(() => import('liquid-glass-react'), { ssr: false })

const R3FScene = dynamic(() => import('@/components/r3f-scene').then((m) => m.R3FScene), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#1B2745]/30" />,
})

const steps = [
  { name: 'Collect', body: 'Structured patient signal. Photo, scale, questionnaire, vitals, timestamped.' },
  { name: 'Follow', body: 'A clinician-authored rule reads the signal and decides.' },
  { name: 'Remind', body: 'Timed outbound prompt by SMS, email, or in-app.' },
  { name: 'Educate', body: 'A clinician-written PDF, video, or card delivered at the right moment.' },
  { name: 'Export', body: 'A structured, consented, time-stamped record ready for the patient’s chart.' },
]

export default function LiquidShaderDemo() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const featuresRef = useRef<HTMLDivElement | null>(null)

  return (
    <main className="min-h-screen bg-[#0F1A33] text-white antialiased overflow-hidden">
      {/* --- HERO ---------------------------------------------------------- */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full overflow-hidden"
      >
        <ShaderBg type="waterPlane" />
        {/* subtle tint to keep text legible over the moving gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0F1A33]/30 via-transparent to-[#0F1A33]/70" />

        {/* Glass nav */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
          <LiquidGlass
            displacementScale={50}
            blurAmount={0.04}
            saturation={140}
            aberrationIntensity={1.5}
            elasticity={0.18}
            cornerRadius={999}
            padding="10px 22px"
            mouseContainer={heroRef}
            mode="standard"
          >
            <div className="flex items-center gap-6 text-[13px] font-medium tracking-wide text-white">
              <span className="font-mono uppercase tracking-[0.22em] text-[11px] opacity-80">Aescia</span>
              <Link href="#platform" className="opacity-80 hover:opacity-100 transition-opacity">Platform</Link>
              <Link href="#evidence" className="opacity-80 hover:opacity-100 transition-opacity">Evidence</Link>
              <Link href="#contact" className="opacity-80 hover:opacity-100 transition-opacity">Talk to us</Link>
            </div>
          </LiquidGlass>
        </div>

        {/* Hero content */}
        <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
          <div className="mb-10 h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64">
            <LiquidLogo
              src="/icon.svg"
              params={{ patternScale: 2.2, refraction: 0.02, edge: 0.42, liquid: 0.09, speed: 0.4 }}
              className="block h-full w-full object-contain"
            />
          </div>

          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
            A continuous-care platform
          </p>
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Between the discharge and the next appointment, someone should be listening.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-[1.6] text-white/75 md:text-lg">
            One engine, two product surfaces. Post-surgical recovery for hospitals and
            pre-procedure preparation for specialty clinics. Clinician-authored, transparent
            by design, evidence-led.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <LiquidGlass
              displacementScale={70}
              blurAmount={0.05}
              saturation={160}
              aberrationIntensity={2}
              elasticity={0.2}
              cornerRadius={9999}
              padding="14px 28px"
              mouseContainer={heroRef}
              mode="prominent"
            >
              <span className="text-[14px] font-semibold tracking-wide text-white">
                Explore the platform &nbsp;&rarr;
              </span>
            </LiquidGlass>

            <LiquidGlass
              displacementScale={40}
              blurAmount={0.03}
              saturation={120}
              aberrationIntensity={1}
              elasticity={0.15}
              cornerRadius={9999}
              padding="14px 28px"
              mouseContainer={heroRef}
              mode="standard"
            >
              <span className="text-[14px] font-medium tracking-wide text-white/90">
                Talk to our team
              </span>
            </LiquidGlass>
          </div>

          {/* tech badge */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
            ShaderGradient v2 &middot; Liquid Logo &middot; Liquid Glass &middot; React Three Fiber
          </div>
        </div>
      </section>

      {/* --- FIVE-STEP ENGINE -------------------------------------------- */}
      <section
        ref={featuresRef}
        id="platform"
        className="relative w-full overflow-hidden bg-[#0F1A33] py-28 sm:py-36"
      >
        {/* soft gradient backdrop */}
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <ShaderBg type="plane" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[#0F1A33]/70" />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="mb-16 max-w-2xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white/60">
              The engine
            </p>
            <h2 className="text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Collect &middot; Follow &middot; Remind &middot; Educate &middot; Export.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-[1.6] text-white/70">
              Every pathway runs the same five-step engine. Different doorways, one shape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <div key={step.name} className="relative">
                <LiquidGlass
                  displacementScale={45}
                  blurAmount={0.04}
                  saturation={130}
                  aberrationIntensity={1.5}
                  elasticity={0.12}
                  cornerRadius={20}
                  padding="22px"
                  mouseContainer={featuresRef}
                  mode="standard"
                >
                  <div className="flex h-44 w-full flex-col justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="mb-2 text-[18px] font-semibold tracking-tight text-white">
                        {step.name}
                      </h3>
                      <p className="text-[13px] leading-[1.55] text-white/75">{step.body}</p>
                    </div>
                  </div>
                </LiquidGlass>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- R3F SCENE BLOCK --------------------------------------------- */}
      <section className="relative w-full overflow-hidden bg-[#0F1A33] py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white/60">
              Continuous-care, visualised
            </p>
            <h2 className="text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              A single signal, rotating through the week that matters.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.6] text-white/75">
              Rule-based prioritisation, authored by clinicians. No opaque models. Every alert
              traces back to a person and a sentence.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                SAFE-Discharge &middot; RPAH &middot; 550 patients
              </div>
            </div>
          </div>
          <div className="relative h-[420px] w-full">
            <R3FScene className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* --- FOOTER ------------------------------------------------------- */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-[12px] text-white/50">
          <span>A continuous-care platform for the weeks that matter.</span>
          <span className="font-mono uppercase tracking-[0.22em]">
            v2 / liquid-shader
          </span>
        </div>
      </footer>
    </main>
  )
}
