'use client'

import { useState, useEffect, useId } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

type Path = 'hospital' | 'clinic' | ''

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

  useEffect(() => {
    if (urlIntent && intentMap[urlIntent]) {
      setPath(intentMap[urlIntent])
    }
  }, [urlIntent])

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
          {!path && (
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
                  Endoscopy prep, no-show reduction, GLP-1 handling, recall tracking, live in two weeks.
                </p>
                <span className="inline-flex items-center gap-2 mt-8 text-[13px] group-hover:gap-4 transition-all">
                  Continue
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" /></svg>
                </span>
              </button>
            </div>
          )}

          {path && (
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
              <div className="lg:col-span-3">
                <button
                  onClick={() => setPath('')}
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const form = e.currentTarget
                    if (!form.checkValidity()) {
                      form.reportValidity()
                      return
                    }
                    const f = new FormData(form)
                    const body = [
                      `Path: ${path}`,
                      `Name: ${f.get('name')}`,
                      `Role: ${f.get('role')}`,
                      `Organisation: ${f.get('org')}`,
                      `Country: ${f.get('country')}`,
                      `Email: ${f.get('email')}`,
                      `Intent: ${urlIntent || 'none'}`,
                      `Notes: ${f.get('notes')}`,
                    ].join('\n')
                    window.location.href = `mailto:contact@aesciahealth.com?subject=${encodeURIComponent(path === 'hospital' ? 'Hospital enquiry' : 'Clinic enquiry')}&body=${encodeURIComponent(body)}`
                  }}
                  className="space-y-5"
                  noValidate={false}
                >
                  <Field name="name" label="Your name" placeholder="Dr Jane Doe" autoComplete="name" required />
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
                  />
                  <Field
                    name="org"
                    label="Organisation"
                    placeholder={path === 'hospital' ? 'Hospital or health system' : 'Clinic name'}
                    autoComplete="organization"
                    required
                  />
                  <Field name="country" label="Country" placeholder="Country" autoComplete="country-name" required />
                  <Field name="email" label="Work email" placeholder="you@organisation.com" type="email" autoComplete="email" required />
                  <TextareaField name="notes" label="Notes (optional)" placeholder={
                    path === 'hospital'
                      ? 'Which service line. Volume per year. Any specific deadline.'
                      : 'Which specialty. Clinic size. Whether you have a timeline.'
                  } />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 bg-foreground text-background px-7 py-3.5 text-[13px] font-medium tracking-wide hover:bg-foreground/90 transition-colors min-h-[44px]"
                  >
                    Send via email
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" /></svg>
                  </button>
                  <p className="text-[12px] text-foreground/70 leading-relaxed max-w-md">
                    Submitting opens your email client with a pre-filled message to contact@aesciahealth.com.
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
}: {
  name: string
  label: string
  placeholder: string
  type?: string
  autoComplete?: string
  required?: boolean
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
        className="w-full border border-border bg-background px-4 py-3 text-[14px] text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-foreground transition-colors min-h-[44px]"
      />
    </div>
  )
}

function TextareaField({
  name,
  label,
  placeholder,
}: {
  name: string
  label: string
  placeholder: string
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
        className="w-full border border-border bg-background px-4 py-3 text-[14px] text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-foreground transition-colors resize-none"
      />
    </div>
  )
}
