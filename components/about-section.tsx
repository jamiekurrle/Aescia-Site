export function AboutSection() {
  return (
    <section id="problem" className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance">
          The problem: High-risk days go unmonitored
        </h2>

        <div className="space-y-6 text-foreground/70 leading-relaxed">
          <p>
            Most patients are discharged from hospital without structured, proactive follow-up. Yet the days immediately after discharge carry the highest clinical risk—early complications often go unrecognized until they escalate to emergency presentations or readmission.
          </p>

          <p>
            Across patient populations, 5 to 15% of patients are readmitted within 30 days. Retrospective analyses suggest that 30 to 50% of these returns are potentially preventable, often related to delayed recognition of deterioration, medication issues, or gaps in post-discharge support.
          </p>

          <p>
            In the absence of reliable monitoring at home, clinicians must manage risk conservatively. Patients may remain in hospital longer than medically necessary during the highest-risk period, consuming scarce bed capacity and limiting hospital throughput.
          </p>

          <p>
            High-touch follow-up models like hospital-in-the-home are effective but reach only 3 to 7% of discharges. What's missing is a scalable baseline layer of follow-up that routinely checks in with discharged patients and identifies early deterioration before it escalates.
          </p>
        </div>
      </div>
    </section>
  )
}
