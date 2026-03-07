const pillars = [
  { label: 'Clinical governance', icon: '⊕' },
  { label: 'Risk management', icon: '⊘' },
  { label: 'Data security & privacy', icon: '⊙' },
  { label: 'Evaluation reporting', icon: '⊛' },
]

export function GovernanceSection() {
  return (
    <section id="governance" className="py-28 md:py-36 px-6 md:px-10 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-16">
          {/* Left */}
          <div className="md:max-w-sm space-y-6 flex-shrink-0">
            <p className="text-xs tracking-widest uppercase text-accent font-medium">04 / Governance</p>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] leading-tight text-foreground text-balance">
              Transparency is not optional.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Aescia maintains documented approaches across all dimensions of clinical and operational governance. We do not promote deployment without appropriate approvals.
            </p>
          </div>

          {/* Right — pillars */}
          <div className="flex-1 space-y-0 border border-border">
            {pillars.map((p, i) => (
              <div
                key={p.label}
                className={`flex items-center justify-between px-7 py-5 group hover:bg-background transition-colors duration-200 ${
                  i < pillars.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <span className="text-sm text-foreground font-medium tracking-wide">{p.label}</span>
                <span
                  className="text-2xl text-muted-foreground group-hover:text-accent transition-colors duration-200"
                  aria-hidden
                >
                  {p.icon}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Company details */}
        <div className="mt-20 pt-12 border-t border-border flex flex-col sm:flex-row gap-8 sm:gap-16 text-sm text-muted-foreground">
          <div>
            <p className="text-xs tracking-widest uppercase text-foreground mb-2">Legal name</p>
            <p>Aescia Pty Ltd</p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-foreground mb-2">ABN</p>
            <p>96 687 840 517</p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-foreground mb-2">Jurisdiction</p>
            <p>Australian proprietary company</p>
          </div>
        </div>
      </div>
    </section>
  )
}
