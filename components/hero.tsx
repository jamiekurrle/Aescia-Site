export function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <span className="text-sm font-medium text-accent">Post-Discharge Monitoring</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance mb-8 leading-tight">
          Identify deterioration early, before it becomes a crisis.
        </h1>

        <p className="text-lg text-foreground/70 text-balance mb-10 leading-relaxed">
          Aescia enables structured follow-up in the high-risk period after discharge. Daily check-ins identify early warning signs, so clinicians can intervene before readmission becomes necessary.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="bg-accent text-accent-foreground font-medium px-6 py-3 rounded hover:opacity-90 text-center sm:text-left"
          >
            Get in touch
          </a>
          <a
            href="#problem"
            className="text-accent font-medium px-6 py-3 border border-accent rounded hover:bg-accent/5 text-center sm:text-left"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  )
}
