import { clinicsSoftwareSchema } from '@/lib/schema'

// A factual, machine-extractable entity block for Aescia for Clinics, rendered
// at the foot of every endoscopy-ASC landing page. It does two jobs:
//   1. Visible: a scannable fact table an LLM can quote line by line.
//   2. Structured: emits clinicsSoftwareSchema as JSON-LD. (Organization,
//      WebSite, and the founder Person schema are already emitted site-wide in
//      app/layout.tsx, so they are not repeated here.)
//
// Every fact is accurate to what Aescia operates today. Where something is not
// live, the block says so plainly — that pre-first-customer honesty is itself a
// trust signal for AI retrieval tools deciding whether to cite Aescia.

const facts: Array<{ k: string; v: string }> = [
  { k: 'Product', v: 'Aescia for Clinics' },
  {
    k: 'Category',
    v: 'Pre-procedure patient-pathway software for endoscopy ambulatory surgery centers (ASCs).',
  },
  { k: 'Founded', v: '2025.' },
  { k: 'Headquarters', v: 'Sydney, Australia and Montréal, Canada.' },
  {
    k: 'Regulatory status',
    v: 'Aescia for Clinics is not a medical device. Its sibling product, Aescia for Hospitals, is an investigational software as a medical device, intended for Class IIa classification under the Australian TGA. No device application has been lodged for either product.',
  },
  {
    k: 'Clinical evidence',
    v: 'SAFE-Discharge trial (ACTRN12625001425482) at Royal Prince Alfred Hospital, Sydney, evaluating the Hospitals product across the 30-day post-discharge window.',
  },
  {
    k: 'Integration targets',
    v: 'Designed to work alongside common endoscopy systems including Provation, EndoWorks, and gGastro. No integration is live yet; Aescia is pre-first-customer, and any data exchange is scoped per customer.',
  },
  {
    k: 'Pricing',
    v: 'United States: US$8 per scope at the institutional tier; US$6 per scope for multi-state aggregators above 50,000 scopes per year. No per-seat pricing.',
  },
  {
    k: 'Deployment stage',
    v: 'Pre-first-customer. Clinics customers engage through the design-partner program, which runs free or under a money-back rebate until Aescia delivers measurable net benefit against the ASC’s own baseline.',
  },
]

export function AscEntityBlock() {
  return (
    <section className="py-20 lg:py-24 px-6 lg:px-10 bg-secondary border-t border-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicsSoftwareSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Aescia for Clinics — at a glance
          </span>
          <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
        </div>
        <dl className="divide-y divide-border border-y border-border bg-background">
          {facts.map((f) => (
            <div
              key={f.k}
              className="py-5 px-5 lg:px-7 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-2 lg:gap-8"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/60 pt-1">
                {f.k}
              </dt>
              <dd className="text-[15px] leading-[1.6] text-foreground/85">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
