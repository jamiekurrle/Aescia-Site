'use client'

import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className="bg-background min-h-screen">
        {/* Header */}
        <section className="pt-32 pb-16 px-6 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <Link href="/" className="text-sm text-accent mb-8 inline-block hover:underline">
              ← Back to home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Get in touch
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              For evaluation enquiries, governance discussions, or to learn more about Aescia.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12">
              {/* Form */}
              <div className="md:col-span-3">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Dr. Jane Smith"
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                      Role
                    </label>
                    <select
                      id="role"
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select your role</option>
                      <option value="executive">Hospital Executive</option>
                      <option value="clinical-lead">Clinical Lead / Champion</option>
                      <option value="surgeon">Surgeon</option>
                      <option value="physician">Physician</option>
                      <option value="nurse">Nurse / Nurse Unit Manager</option>
                      <option value="it">IT / Digital Health</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="org" className="block text-sm font-medium text-foreground mb-2">
                      Organisation
                    </label>
                    <input
                      id="org"
                      type="text"
                      placeholder="Hospital or Health Service"
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@hospital.org"
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-2">
                      What are you interested in?
                    </label>
                    <select
                      id="interest"
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select an option</option>
                      <option value="demo">Product demonstration</option>
                      <option value="evaluation">Clinical evaluation discussion</option>
                      <option value="governance">Governance & compliance information</option>
                      <option value="technical">Technical integration questions</option>
                      <option value="general">General enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your interest in Aescia..."
                      className="w-full px-4 py-3 border border-border rounded bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground font-medium px-6 py-4 rounded hover:opacity-90"
                  >
                    Send enquiry
                  </button>
                </form>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Email</h3>
                  <a href="mailto:contact@aesciahealth.com" className="text-accent hover:underline">
                    contact@aesciahealth.com
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">Offices</h3>
                  <p className="text-foreground/70">Sydney, Australia</p>
                  <p className="text-foreground/70">Quebec, Canada</p>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">What to expect</h3>
                  <ul className="space-y-2 text-foreground/70 text-sm">
                    <li>Response within 1-2 business days</li>
                    <li>Initial call to understand your context</li>
                    <li>Tailored information pack if relevant</li>
                    <li>No pressure, no sales tactics</li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">Company</h3>
                  <div className="text-sm text-foreground/70 space-y-1">
                    <p>Aescia Pty Ltd</p>
                    <p>ABN 96 687 840 517</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
