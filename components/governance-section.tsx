export function GovernanceSection() {
  const principles = [
    'Patient data stored in-country, encrypted in transit and at rest',
    'All escalation logic is rule-based, transparent, and auditable',
    'Development follows IEC 62304 medical device software lifecycle practices',
    'Complies with ISO 27001 information security principles',
    'Configurable to local clinical protocols and governance requirements',
    'All outputs reviewed by clinicians—no autonomous decisions',
  ]

  return (
    <section className="py-20 md:py-28 px-6 bg-foreground text-primary-foreground">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance">
          Built for regulated environments
        </h2>

        <p className="text-lg text-primary-foreground/80 mb-12 leading-relaxed">
          Aescia is designed to operate in regulated clinical environments with full transparency and governance.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {principles.map((principle) => (
            <div key={principle} className="flex gap-4">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent mt-1" />
              <p className="text-primary-foreground/90">{principle}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="grid sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-primary-foreground/60 text-xs mb-2">Legal Entity</p>
              <p className="font-medium">Aescia Pty Ltd</p>
            </div>
            <div>
              <p className="text-primary-foreground/60 text-xs mb-2">ABN</p>
              <p className="font-medium">96 687 840 517</p>
            </div>
            <div>
              <p className="text-primary-foreground/60 text-xs mb-2">Based</p>
              <p className="font-medium">Sydney, Australia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
