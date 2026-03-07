export function AboutSection() {
  return (
    <section id="about" className="py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          {/* Left — section label + number */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <p className="text-xs tracking-widest uppercase text-accent font-medium">01 / About</p>
            <p className="font-serif text-7xl text-foreground opacity-10 leading-none select-none" aria-hidden>
              A
            </p>
          </div>

          {/* Right — content */}
          <div className="md:col-span-9 space-y-8">
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight text-foreground text-balance">
              An Australian digital health company built on clinical rigour.
            </h2>
            <div className="h-px bg-border w-full" aria-hidden />
            <div className="grid sm:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>
                Aescia is an Australian digital health company focused on supporting post-discharge monitoring and escalation workflows through clinician-in-the-loop software.
              </p>
              <p>
                Our initial focus is on high-risk surgical and medical cohorts where deterioration often occurs after discharge and where timely clinical review can improve outcomes and resource use.
              </p>
            </div>

            {/* Principles */}
            <div className="grid sm:grid-cols-3 gap-0 border border-border mt-4">
              {[
                { label: 'Clinician-led', desc: 'Led by clinicians and technologists with acute care experience.' },
                { label: 'Advisory only', desc: 'All outputs reviewed by clinicians — no autonomous decisions.' },
                { label: 'Governed', desc: 'Operates under defined clinical evaluation and governance frameworks.' },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`p-6 space-y-3 ${i < 2 ? 'border-b sm:border-b-0 sm:border-r border-border' : ''}`}
                >
                  <p className="text-xs tracking-widest uppercase text-foreground font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
