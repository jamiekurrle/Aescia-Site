export function HowItWorks() {
  const steps = [
    {
      title: 'Daily check-ins',
      desc: 'Patients complete brief daily questionnaires tailored to their procedure, diagnosis, and risk factors.',
    },
    {
      title: 'Automatic classification',
      desc: 'Responses are automatically classified into five urgency levels using rule-based, transparent, clinician-approved thresholds.',
    },
    {
      title: 'Prioritized worklist',
      desc: 'Rather than continuous alerts, clinicians see a single prioritized worklist ordered by urgency. Small clinical teams can oversee follow-up for most discharges.',
    },
  ]

  return (
    <section id="solution" className="py-20 md:py-28 px-6 bg-secondary">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          How Aescia works
        </h2>
        <p className="text-foreground/70 mb-12">
          A scalable baseline layer of follow-up that identifies deterioration before escalation.
        </p>

        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div key={idx} className="pb-8 border-b border-border last:border-b-0 last:pb-0">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-foreground/70">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
