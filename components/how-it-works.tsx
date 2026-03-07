const steps = [
  {
    num: '01',
    title: 'Structured patient-reported data',
    desc: 'Aescia collects structured symptom and recovery information directly from patients following discharge through a guided digital interface.',
  },
  {
    num: '02',
    title: 'Signal surfacing to clinical teams',
    desc: 'Relevant signals are surfaced to clinical teams in a clear, prioritised format — reducing noise and focusing attention where it matters.',
  },
  {
    num: '03',
    title: 'Consistent escalation pathways',
    desc: 'The platform supports existing escalation and follow-up workflows, complementing hospital-in-the-home, outpatient, and nurse-led monitoring models.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-10 bg-foreground text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <p className="text-xs tracking-widest uppercase text-accent font-medium mb-4">02 / How it works</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight text-balance max-w-lg">
              Designed to complement, not replace, care.
            </h2>
          </div>
          <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs md:text-right">
            A three-step process that integrates seamlessly into existing clinical workflows.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-0 border border-primary-foreground/10">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`p-8 md:p-10 space-y-6 ${i < steps.length - 1 ? 'border-b md:border-b-0 md:border-r border-primary-foreground/10' : ''}`}
            >
              <span className="block font-serif text-5xl text-primary-foreground/20 leading-none">{step.num}</span>
              <h3 className="text-sm font-medium tracking-wide text-primary-foreground">{step.title}</h3>
              <div className="h-px w-8 bg-accent" aria-hidden />
              <p className="text-sm text-primary-foreground/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
