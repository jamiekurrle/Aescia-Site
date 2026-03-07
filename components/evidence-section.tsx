export function EvidenceSection() {
  const outcomes = [
    {
      metric: '30–50%',
      label: 'of readmissions are potentially preventable',
    },
    {
      metric: '5–15%',
      label: 'readmission rate within 30 days',
    },
    {
      metric: '70%',
      label: 'reutilization of freed bed-days',
    },
  ]

  return (
    <section id="impact" className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance">
          Clinical evidence & health impact
        </h2>

        <div className="space-y-8 mb-12">
          <p className="text-foreground/70 leading-relaxed">
            Early identification of emerging problems allows deterioration to be managed sooner, often through outpatient review, community-based care, or targeted telephone advice—before emergency presentation or readmission is required.
          </p>

          <p className="text-foreground/70 leading-relaxed">
            Reliable post-discharge visibility supports timely discharge once patients are medically ready, reducing unnecessary length of stay and freeing inpatient bed capacity. In cardiothoracic surgery alone, conservative estimates suggest Aescia could prevent 25–30 readmissions annually at a typical large hospital, recovering 100–150 bed-days worth $8.1M+ in combined operational value.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {outcomes.map((item) => (
            <div key={item.metric} className="p-6 bg-secondary rounded border border-border">
              <div className="text-3xl font-bold text-accent mb-3">{item.metric}</div>
              <p className="text-sm text-foreground/70">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
