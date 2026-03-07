const items = [
  {
    title: 'Time-limited evaluations',
    desc: 'Aescia engages with public health services through scoped, time-limited clinical evaluations with predefined endpoints and transparent reporting.',
  },
  {
    title: 'Ethics & governance-first',
    desc: 'Site-specific governance and privacy approvals are obtained before any deployment. Ethics review is conducted where required under Australian frameworks.',
  },
  {
    title: 'SaMD regulatory posture',
    desc: 'Aescia is positioned as Software as a Medical Device (SaMD). Use is limited to approved evaluation contexts pending regulatory pathway completion.',
  },
  {
    title: 'Transparent outcomes',
    desc: 'Evaluation endpoints and results are reported openly. We do not seek routine clinical deployment without appropriate evidence and approvals.',
  },
]

export function EvidenceSection() {
  return (
    <section id="evidence" className="py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          {/* Left */}
          <div className="md:col-span-4 space-y-6">
            <p className="text-xs tracking-widest uppercase text-accent font-medium">03 / Evidence</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight text-foreground text-balance">
              Evidence-driven from the ground up.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We believe clinical technology must be earned through evidence, not asserted through marketing. Every engagement is structured to generate real-world outcomes data.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-foreground border-b border-foreground pb-0.5 hover:text-accent hover:border-accent transition-colors duration-200"
            >
              Request evaluation info
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Right — grid */}
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-0 border border-border">
            {items.map((item, i) => {
              const borderRight = i % 2 === 0 ? 'sm:border-r' : ''
              const borderBottom = i < 2 ? 'border-b' : ''
              return (
                <div
                  key={item.title}
                  className={`p-7 space-y-4 border-border ${borderRight} ${borderBottom}`}
                >
                  <h3 className="text-xs tracking-widest uppercase text-foreground font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
