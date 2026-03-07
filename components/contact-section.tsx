'use client'

export function ContactSection() {
  return (
    <section id="contact" className="py-28 md:py-36 px-6 md:px-10 bg-foreground text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">
          {/* Left */}
          <div className="md:col-span-5 space-y-6">
            <p className="text-xs tracking-widest uppercase text-accent font-medium">05 / Contact</p>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] leading-tight text-primary-foreground text-balance">
              Let's talk.
            </h2>
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              For evaluation enquiries, governance discussions, or to learn more about Aescia, reach out directly.
            </p>
          </div>

          {/* Right — form */}
          <div className="md:col-span-7">
            <form
              className="space-y-0 border border-primary-foreground/10"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Contact form"
            >
              {[
                { id: 'name', label: 'Full name', type: 'text', placeholder: 'Dr. Jane Smith' },
                { id: 'org', label: 'Organisation', type: 'text', placeholder: 'Royal Melbourne Hospital' },
                { id: 'email', label: 'Email address', type: 'email', placeholder: 'j.smith@hospital.org.au' },
              ].map((field, i) => (
                <div
                  key={field.id}
                  className={`flex flex-col sm:flex-row sm:items-center ${
                    i < 2 ? 'border-b border-primary-foreground/10' : ''
                  }`}
                >
                  <label
                    htmlFor={field.id}
                    className="text-[10px] tracking-widest uppercase text-primary-foreground/40 px-6 py-4 sm:w-36 flex-shrink-0"
                  >
                    {field.label}
                  </label>
                  <div className="flex-1 border-t sm:border-t-0 sm:border-l border-primary-foreground/10">
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      className="w-full bg-transparent px-6 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/25 outline-none focus:bg-primary-foreground/5 transition-colors duration-200"
                    />
                  </div>
                </div>
              ))}

              {/* Message */}
              <div className="flex flex-col sm:flex-row border-t border-primary-foreground/10">
                <label
                  htmlFor="message"
                  className="text-[10px] tracking-widest uppercase text-primary-foreground/40 px-6 py-4 sm:w-36 flex-shrink-0"
                >
                  Message
                </label>
                <div className="flex-1 border-t sm:border-t-0 sm:border-l border-primary-foreground/10">
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your institution and interest in Aescia..."
                    className="w-full bg-transparent px-6 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/25 outline-none resize-none focus:bg-primary-foreground/5 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="border-t border-primary-foreground/10 p-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-7 py-3.5 text-xs tracking-widest uppercase hover:bg-primary-foreground hover:text-foreground transition-colors duration-300"
                >
                  Send enquiry
                  <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
