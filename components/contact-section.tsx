'use client'

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          Get in touch
        </h2>
        <p className="text-foreground/70 mb-12">
          For evaluation enquiries, governance discussions, or to learn more about Aescia, reach out directly.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-6"
        >
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
              placeholder="you@hospital.org.au"
              className="w-full px-4 py-3 border border-border rounded bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
            />
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
            className="bg-accent text-accent-foreground font-medium px-6 py-3 rounded hover:opacity-90"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  )
}
