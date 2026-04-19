'use client'

import { useState, useEffect, useId, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

type Path = 'hospital' | 'clinic' | ''
type Status = 'idle' | 'sending' | 'success' | 'error'

const intentMap: Record<string, Path> = {
  hospital: 'hospital',
  'trial-protocol': 'hospital',
  'security-pack': 'hospital',
  clinic: 'clinic',
  'clinic-pricing': 'clinic',
}

export default function ContactContent() {
  const params = useSearchParams()
  const urlIntent = params?.get('intent')
  const [path, setPath] = useState<Path>('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    if (urlIntent && intentMap[urlIntent]) {
      setPath(intentMap[urlIntent])
    }
  }, [urlIntent])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    setStatus('sending')
    setErrorMsg('')

    const f = new FormData(form)
    const payload = {
      name: String(f.get('name') ?? ''),
      email: String(f.get('email') ?? ''),
      role: String(f.get('role') ?? ''),
      org: String(f.get('org') ?? ''),
      country: String(f.get('country') ?? ''),
      notes: String(f.get('notes') ?? ''),
      hp: String(f.get('hp') ?? ''),
      path,
      intent: urlIntent ?? '',
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}))
      if (!res.ok || !data?.ok) {
        setStatus('error')
        setErrorMsg(data?.error || 'Something went wrong. Please try again or email contact@aesciahealth.com.')
        return
      }
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again or email contact@aesciahealth.com.')
    }
  }

  return (
    <main id="main" className="bg-background min-h-screen">
      <SiteNav />
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Contact</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[44px] sm:text-[58px] lg:text-[76px] leading-[1.04] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Tell us which door you came through.
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
            A hospital evaluation and a clinic demo are different conversations. Pick the one that matches your team, and we will route it to the right person.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          {/* Success state takes over the form area */}
          {status === 'success' && (
            <div className="max-w-2xl border-t-2 border-brass pt-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">Thanks</span>
              <h2
                className="font-display text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.025em] mt-5 mb-6"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                Your note is on its way to the team.
              </h2>
              <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80 mb-8">
                We reply within two business days. If you need us sooner, write directly to{' '}
                <a href="mailto:contact@aesciahealth.com" className="underline underline-offset-4 decoration-brass decoration-2">contact@aesciahealth.com</a>
                .
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 text-[13px] text-foreground font-medium tracking-wide border-b border-brass pb-1.5 hover:border-foreground transition-colors"
              >
                Back to the homepage
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          )}

          {/* Path picker */}
          {status !== 'success' && !path && (
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setPath('hospital')}
                className="group bg-foreground text-background p-10 lg:p-12 text-left hover:bg-foreground/92 transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">01</span>
                <h2
                  className="font-display text-[28px] lg:text-[34px] leading-[1.2] tracking-[-0.02em] mt-6 mb-4"
                  style={{ fontVariationSettings: "'opsz' 120" }}
                >
                  I work at a hospital or health system.
                </h2>
                <p className="text-[14px] text-background/80 leading-[1.6]">
                  Trial protocol requests, evaluation scoping, security pack under NDA, EMR integration.
                </p>
                <span className="inline-flex items-center gap-2 mt-8 text-[13px] group-hover:gap-4 transition-all">
                  Continue
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" /></svg>
                </span>
              </button>

              <button
                onClick={() => setPath('clinic')}
                className="group bg-background border border-border p-10 lg:p-12 text-left hover:bg-secondary transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">02</span>
                <h2
                  className="font-display text-[28px] lg:text-[34px] leading-[1.2] tracking-[-0.02em] mt-6 mb-4"
                  style={{ fontVariationSettings: "'opsz' 120" }}
                >
                  I run or work in a specialty clinic.
                </h2>
                <p className="text-[14px] text-foreground/80 leading-[1.6]">
                  Endoscopy first: prep, no-show reduction, GLP-1 handling, recall tracking. Other specialty clinics welcome where a clinical champion is involved.
                </p>
                <span className="inline-flex items-center gap-2 mt-8 text-[13px] group-hover:gap-4 transition-all">
                  Continue
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" /></svg>
                </span>
              </button>
            </div>
          )}

          {/* Form */}
          {status !== 'success' && path && (
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
              <div className="lg:col-span-3">
                <button
                  onClick={() => {
                    setPath('')
                    setStatus('idle')
                    setErrorMsg('')
                  }}
                  className="text-[12px] font-mono uppercase tracking-widest text-foreground/70 hover:text-foreground mb-8 inline-flex items-center gap-2"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5m5 5l-5-5 5-5" /></svg>
                  Change path
                </button>
                <h3
                  className="font-display text-[24px] lg:text-[30px] leading-[1.2] tracking-[-0.02em] mb-8"
                  style={{ fontVariationSettings: "'opsz' 80" }}
                >
                  {path === 'hospital' ? 'Tell us about your health system.' : 'Tell us about your clinic.'}
                </h3>
                <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
                  {/* Honeypot: must stay empty. Bots fill it; humans do not see it. */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
                    <label htmlFor="hp">Leave this field empty</label>
                    <input id="hp" name="hp" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <Field name="name" label="Your name" placeholder="Dr Jane Doe" autoComplete="name" required disabled={status === 'sending'} />
                  <Field
                    name="role"
                    label="Role"
                    placeholder={
                      path === 'hospital'
                        ? 'CMIO, Director Perioperative, Nurse Unit Manager, Surgeon'
                        : 'Clinic owner, practice manager, endoscopist, admin lead'
                    }
                    autoComplete="organization-title"
                    required
                    disabled={status === 'sending'}
                  />
                  <Field
                    name="org"
                    label="Organisation"
                    placeholder={path === 'hospital' ? 'Hospital or health system' : 'Clinic name'}
                    autoComplete="organization"
                    required
                    disabled={status === 'sending'}
                  />
                  <Field name="country" label="Country" placeholder="Country" autoComplete="country-name" required disabled={status === 'sending'} />
                  <Field name="email" label="Work email" placeholder="you@organisation.com" type="email" autoComplete="email" required disabled={status === 'sending'} />
                  <TextareaField
                    name="notes"
                    label="Notes (optional)"
                    placeholder={
                      path === 'hospital'
                        ? 'Which service line. Volume per year. Any specific deadline.'
                        : 'Which specialty. Clinic size. Whether you have a timeline.'
                    }
                    disabled={status === 'sending'}
                  />

                  {status === 'error' && (
                    <div
                      role="alert"
                      aria-live="polite"
                      className="border-l-2 border-destructive bg-destructive/5 px-4 py-3 text-[14px] text-foreground"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-3 bg-foreground text-background px-7 py-3.5 text-[13px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        Sending
                        <span className="inline-block w-3 h-3 border border-background/70 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" /></svg>
                      </>
                    )}
                  </button>
                  <p className="text-[12px] text-foreground/70 leading-relaxed max-w-md">
                    Your enquiry is sent directly to our team over encrypted transport. We reply within two business days.
                  </p>
                </form>
              </div>

              <aside className="lg:col-span-2 lg:pl-8 lg:border-l border-border">
                <dl className="space-y-8 text-[14px]">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/65 mb-3">Email</dt>
                    <dd><a href="mailto:contact@aesciahealth.com" className="text-foreground underline underline-offset-4 decoration-brass decoration-2">contact@aesciahealth.com</a></dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/65 mb-3">Offices</dt>
                    <dd className="text-foreground/80 leading-relaxed">Sydney, Australia<br />Montréal, Canada</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/65 mb-3">What to expect</dt>
                    <dd className="text-foreground/80 leading-relaxed space-y-1.5">
                      <p>Reply within two business days.</p>
                      <p>Initial call with a clinician on our team.</p>
                      <p>A tailored pack if we are a fit, a referral if we are not.</p>
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          )}
        </div>
      </section>

      {status !== 'success' && (
        <section className="border-t border-border py-16 px-6 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/65 mb-2">Not sure yet?</p>
            <p className="text-[15px] text-foreground/80 max-w-2xl">
              Read the{' '}
              <Link href="/platform" className="underline underline-offset-4 decoration-brass decoration-2">platform page</Link>
              , skim the{' '}
              <Link href="/evidence" className="underline underline-offset-4 decoration-brass decoration-2">evidence page</Link>
              , or go straight to{' '}
              <Link href="/hospitals" className="underline underline-offset-4 decoration-brass decoration-2">hospitals</Link>
              {' '}or{' '}
              <Link href="/clinics" className="underline underline-offset-4 decoration-brass decoration-2">clinics</Link>
              . Nothing is gated.
            </p>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

function Field({
  name,
  label,
  placeholder,
  type = 'text',
  autoComplete,
  required,
  disabled,
}: {
  name: string
  label: string
  placeholder: string
  type?: string
  autoComplete?: string
  required?: boolean
  disabled?: boolean
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70 block mb-2">
        {label}{required ? ' *' : ''}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        disabled={disabled}
        className="w-full border border-border bg-background px-4 py-3 text-[14px] text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-foreground transition-colors min-h-[44px] disabled:opacity-60"
      />
    </div>
  )
}

function TextareaField({
  name,
  label,
  placeholder,
  disabled,
}: {
  name: string
  label: string
  placeholder: string
  disabled?: boolean
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70 block mb-2">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={4}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full border border-border bg-background px-4 py-3 text-[14px] text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-foreground transition-colors resize-none disabled:opacity-60"
      />
    </div>
  )
}
