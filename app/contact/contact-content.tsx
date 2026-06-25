'use client'

import { useState, useEffect, useId, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

type Status = 'idle' | 'sending' | 'success' | 'error'

const intentLabels: Record<string, string> = {
  hospital: 'Hospital evaluation',
  'trial-protocol': 'Trial protocol summary',
  'security-pack': 'Security and compliance pack',
  clinic: 'Clinic demo',
  'clinic-pricing': 'Clinic pricing and posture',
  advisory: 'Clinical advisory',
  press: 'Press or analyst',
  other: 'Something else',
}

const reasonOptions: { value: string; label: string }[] = [
  { value: '', label: 'Select a reason (optional)' },
  { value: 'hospital', label: 'Hospital evaluation' },
  { value: 'trial-protocol', label: 'Trial protocol summary' },
  { value: 'security-pack', label: 'Security and compliance pack' },
  { value: 'clinic', label: 'Clinic demo' },
  { value: 'clinic-pricing', label: 'Clinic pricing and posture' },
  { value: 'advisory', label: 'Clinical advisory' },
  { value: 'press', label: 'Press or analyst' },
  { value: 'other', label: 'Something else' },
]

export default function ContactContent() {
  const params = useSearchParams()
  const urlIntent = params?.get('intent')
  const [reason, setReason] = useState<string>('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    if (urlIntent && intentLabels[urlIntent]) {
      setReason(urlIntent)
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
      reason,
      intent: urlIntent ?? '',
      path:
        reason === 'hospital' || reason === 'trial-protocol' || reason === 'security-pack'
          ? 'hospital'
          : reason === 'clinic' || reason === 'clinic-pricing'
          ? 'clinic'
          : '',
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
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">Contact</span>
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[44px] sm:text-[58px] lg:text-[76px] leading-[1.04] tracking-[-0.03em] mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Write to the team.
          </h1>
          <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
            One form for hospitals, clinics, clinical advisory, and press. Tell us who you are and what you are looking for. We reply within two business days.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          {status === 'success' && (
            <div className="max-w-2xl border-t-2 border-brass pt-10">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-brass">Thanks</span>
              <h2
                className="font-display text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.025em] mt-5 mb-6"
                style={{ fontVariationSettings: "'opsz' 120" }}
              >
                Your note is on its way to the team.
              </h2>
              <p className="text-[16px] lg:text-[17px] leading-[1.7] text-foreground/80 mb-8">
                We reply within two business days. If you need us sooner, write directly to{' '}
                <a href="mailto:contact@aesciahealth.com" className="underline underline-offset-4 decoration-brass decoration-2">
                  contact@aesciahealth.com
                </a>
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

          {status !== 'success' && (
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
              <div className="lg:col-span-3">
                <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
                  {/* Honeypot */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
                    <label htmlFor="hp">Leave this field empty</label>
                    <input id="hp" name="hp" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <SelectField
                    name="reason"
                    label="I am reaching out about"
                    value={reason}
                    onChange={setReason}
                    options={reasonOptions}
                    disabled={status === 'sending'}
                  />

                  <Field name="name" label="Your name" placeholder="Dr Jane Doe" autoComplete="name" required disabled={status === 'sending'} />
                  <Field
                    name="role"
                    label="Role"
                    placeholder="e.g. CMIO, clinic owner, endoscopist, practice manager, surgeon"
                    autoComplete="organization-title"
                    required
                    disabled={status === 'sending'}
                  />
                  <Field
                    name="org"
                    label="Organisation"
                    placeholder="Hospital, clinic, health system, or institution"
                    autoComplete="organization"
                    required
                    disabled={status === 'sending'}
                  />
                  <Field name="country" label="Country" placeholder="Country" autoComplete="country-name" required disabled={status === 'sending'} />
                  <Field name="email" label="Work email" placeholder="you@organisation.com" type="email" autoComplete="email" required disabled={status === 'sending'} />
                  <TextareaField
                    name="notes"
                    label="Notes (optional)"
                    placeholder="A few lines on your context: specialty or service line, list volume per year, timeline."
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
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
                        </svg>
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
                    <dt className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/65 mb-3">Email</dt>
                    <dd>
                      <a href="mailto:contact@aesciahealth.com" className="text-foreground underline underline-offset-4 decoration-brass decoration-2">
                        contact@aesciahealth.com
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/65 mb-3">Offices</dt>
                    <dd className="text-foreground/80 leading-relaxed">
                      Sydney, Australia
                      <br />
                      Montréal, Canada
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/65 mb-3">What to expect</dt>
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
            <p className="font-mono text-[13px] uppercase tracking-[0.22em] text-foreground/65 mb-2">Not sure yet?</p>
            <p className="text-[15px] text-foreground/80 max-w-2xl">
              Read the{' '}
              <Link href="/platform" className="underline underline-offset-4 decoration-brass decoration-2">
                platform page
              </Link>
              , skim the{' '}
              <Link href="/evidence" className="underline underline-offset-4 decoration-brass decoration-2">
                evidence page
              </Link>
              , follow the{' '}
              <Link href="/updates" className="underline underline-offset-4 decoration-brass decoration-2">
                updates log
              </Link>
              , or go straight to{' '}
              <Link href="/hospitals" className="underline underline-offset-4 decoration-brass decoration-2">
                hospitals
              </Link>{' '}
              or{' '}
              <Link href="/clinics" className="underline underline-offset-4 decoration-brass decoration-2">
                clinics
              </Link>
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
      <label htmlFor={id} className="font-mono text-[13px] uppercase tracking-[0.18em] text-foreground/70 block mb-2">
        {label}
        {required ? ' *' : ''}
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
      <label htmlFor={id} className="font-mono text-[13px] uppercase tracking-[0.18em] text-foreground/70 block mb-2">
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

function SelectField({
  name,
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  name: string
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  disabled?: boolean
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[13px] uppercase tracking-[0.18em] text-foreground/70 block mb-2">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full border border-border bg-background px-4 py-3 text-[14px] text-foreground focus:outline-none focus:border-foreground transition-colors min-h-[44px] disabled:opacity-60"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
