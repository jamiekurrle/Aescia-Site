import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, faqPageSchema, type FAQItem } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Frequently asked questions',
  description:
    'Plain answers about Aescia: what each product is, regulatory posture, the SAFE-Discharge trial, integrations, pricing, and how to engage.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Aescia',
    description: 'Plain answers about Aescia for Hospitals, Aescia for Clinics, regulatory posture, and the SAFE-Discharge trial.',
    url: '/faq',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'FAQ', url: '/faq' },
])

// Each entry is one Q&A pair. Answers stay declarative and grounded in
// existing public copy on /governance, /evidence, /platform, and /team.
// Aim for short sentences so retrieval-augmented LLMs can quote a single
// answer cleanly.
const sections: { eyebrow: string; items: FAQItem[] }[] = [
  {
    eyebrow: 'Company',
    items: [
      {
        q: 'What is Aescia?',
        a: 'Aescia is a continuous-care platform for the weeks between a high-acuity discharge and the next clinical appointment. It is a privately held healthtech company with operations in Sydney, Australia and Montréal, Canada. Aescia builds two products on one pathway engine: Aescia for Hospitals, an investigational software-as-a-medical-device for structured post-discharge monitoring, and Aescia for Clinics, a workflow and patient-preparation platform for specialty clinics.',
      },
      {
        q: 'Who founded Aescia?',
        a: 'Aescia was founded by James Kurrle, a critical-care physician trained and practising across Montréal and Sydney, and Vasken Dermardiros, a machine-learning PhD from Concordia University. James is the CEO and authors the clinical pathway engine. Vasken is the CTO and owns hosting, AI inference, EMR integration, and pathway authoring infrastructure.',
      },
      {
        q: 'When was Aescia founded?',
        a: 'Aescia was founded in 2025.',
      },
      {
        q: 'Where does Aescia operate?',
        a: 'Aescia operates from Sydney, Australia and Montréal, Canada. The Australian regulatory applicant is Aescia Pty Ltd (ABN 96 687 840 517). The Canadian R&D entity is 9550-0708 Québec inc. (NEQ 1181312316), which anchors Canadian data residency. The holding entity is Aescia Health Inc. (Ontario, Canada).',
      },
      {
        q: 'Is Aescia in any accelerator or industry programmes?',
        a: 'Aescia is a portfolio company at District 3, Concordia University\'s innovation hub for bio, health, and high-tech startups (joined September 2025). Aescia is also an industry member of the Medical Technology Association of Australia (MTAA).',
      },
    ],
  },
  {
    eyebrow: 'Products',
    items: [
      {
        q: 'What is Aescia for Hospitals?',
        a: 'Aescia for Hospitals is an investigational software-as-a-medical-device for structured post-discharge monitoring. It is intended to be classified Class IIa under TGA Rule 3.4. The product runs daily clinician-authored check-ins across the 30-day post-discharge window and produces one prioritised list for the unit, rather than a new inbox for the nurse. The first indication is cardiothoracic surgical recovery; clinical evaluation is running through the SAFE-Discharge trial at Royal Prince Alfred Hospital.',
      },
      {
        q: 'What is Aescia for Clinics?',
        a: 'Aescia for Clinics is a workflow and patient-preparation platform for specialty clinics. It is not a medical device. The product delivers clinician-authored prep pathways (including bowel preparation, diabetes management, anticoagulation, and GLP-1 peri-procedural overlay), multichannel reminders, recall tracking, and structured exports back to the chart. Pricing is flat monthly per specialty; there is no seat-based pricing.',
      },
      {
        q: 'What is the difference between Aescia for Hospitals and Aescia for Clinics?',
        a: 'They share one pathway engine but have different regulatory shapes. Aescia for Hospitals is an investigational software-as-a-medical-device intended for Class IIa classification under the TGA, designed for post-acute monitoring with advisory output. Aescia for Clinics is explicitly not a medical device, does not propose clinical decisions, and is designed for procedural-prep workflow in outpatient specialty clinics. The pricing model, intended buyer, and regulatory posture are all different.',
      },
      {
        q: 'What does the platform do underneath both products?',
        a: 'One composable pathway engine with five step types: Collect, Follow, Remind, Educate, Export. The same engine runs surgical recovery pathways for hospitals and procedural-prep pathways for clinics. Pathways are authored by practising clinicians; there are no AI models outside the clinician-authored rule sets.',
      },
    ],
  },
  {
    eyebrow: 'Regulatory',
    items: [
      {
        q: 'Is Aescia a medical device?',
        a: 'Aescia for Hospitals is an investigational software-as-a-medical-device intended for Class IIa classification under TGA Rule 3.4. A regulatory submission has not yet been lodged. Aescia for Clinics is explicitly not a medical device and is not represented as one.',
      },
      {
        q: 'Has Aescia been approved by the TGA, FDA, Health Canada, or any other regulator?',
        a: 'No. No TGA, MDSAP, FDA, CE/UKCA, or Health Canada applications have been filed for either product. Aescia for Hospitals is investigational and pre-submission. Aescia for Clinics is non-device and does not require device approval.',
      },
      {
        q: 'What is the SAFE-Discharge trial?',
        a: 'SAFE-Discharge is a prospective single-centre evaluation of Aescia for Hospitals at the Royal Prince Alfred Hospital cardiothoracic surgical unit in Sydney. Sample size is 550 patients (a 50-patient pre-specified interim cohort followed by a 500-patient main cohort). Principal investigator is Dr Kei Woldendorp of The Baird Institute. The trial is registered with the Australian New Zealand Clinical Trials Registry as ACTRN12625001425482. Ethics approval has been granted; site-specific governance is in progress.',
      },
      {
        q: 'What does the SAFE-Discharge trial measure?',
        a: 'The trial measures structured post-discharge monitoring across the 30-day post-discharge window in adult patients post cardiothoracic surgery (CABG, valve, thoracic procedures). The pre-specified secondary endpoint is alert burden: fewer than one nurse-actionable flag per patient per week over the 30-day window. Aescia will report what the trial shows, whatever it shows.',
      },
      {
        q: 'What quality-system frameworks does Aescia work to?',
        a: 'IEC 62304:2006+A1:2015 software lifecycle processes are implemented and documented. ISO 13485:2016 quality management implementation is underway, with certification targeted for 2026. ISO/IEC 27001:2022 information security controls are implemented; certification has not yet been obtained. No third-party conformity assessment has been undertaken.',
      },
    ],
  },
  {
    eyebrow: 'Buying and integration',
    items: [
      {
        q: 'How is Aescia priced?',
        a: 'Aescia for Clinics is priced flat monthly per specialty at the clinic level. There is no per-seat pricing. Specific dollar amounts are shared on the first call rather than gated behind forms. Aescia for Hospitals is currently engaged through evaluation and pilot contracts, not commercial supply, so there is no published price list for the Hospitals product.',
      },
      {
        q: 'How is Aescia different from a patient-engagement platform like Klara, Luma Health, or Artera?',
        a: 'Patient-engagement platforms optimise broad messaging, appointment reminders, and intake across an entire practice. Aescia for Clinics is narrower and deeper: clinician-authored prep pathways for specific procedures, with branched logic for diabetes, anticoagulation, and GLP-1 peri-procedural management; recall tracking; and structured exports back to the chart. Most clinics run Aescia alongside an existing patient-engagement tool, not instead of it.',
      },
      {
        q: 'How is Aescia different from remote patient monitoring (RPM) tools like Cadence, Biofourmis, or CareSimple?',
        a: 'RPM tools watch chronic-disease vitals continuously over months to years and typically require connected devices. Aescia for Hospitals is a 30-day post-acute window product, focused on structured clinician-authored check-ins for surgical recovery. It does not stream continuous vitals and does not require the patient to wear or own a connected device.',
      },
      {
        q: 'How is Aescia different from an AI scribe like Heidi, Abridge, or Suki?',
        a: 'Different problem entirely. AI scribes write the clinical note during the appointment. Aescia handles the weeks before and after the appointment — procedural prep on the front side, post-discharge monitoring on the back side. The two are complementary; clinics often use both.',
      },
      {
        q: 'How is Aescia different from EMR-native modules like Epic MyChart Care Companion or Cerner discharge tools?',
        a: 'EMR-native modules are the safer integration path inside large integrated delivery networks. Aescia is the right answer when the prep or post-discharge problem is specialty-specific (cardiothoracic recovery, endoscopy procedural prep) and the EMR module is generic, or when the clinic is not on Epic or Cerner at all. Aescia integrates with both via HL7 v2 ADT and FHIR R4.',
      },
      {
        q: 'How is Aescia different from autonomous discharge-call services like Hippocratic AI, IRIS, or Cipher Health?',
        a: 'Autonomous discharge-call services place outbound calls and can autonomously triage some patient responses. Aescia for Hospitals produces a structured, prioritised list for the clinical team rather than acting autonomously on the patient — the clinician remains the decision-maker. The output posture is advisory, not autonomous.',
      },
      {
        q: 'When should I not engage Aescia?',
        a: 'If you need a Class I-only patient-portal app, a generic patient-engagement marketing tool, an EMR replacement, or an AI scribe, Aescia is not the right product. We do not propose clinical decisions in the Clinics product. We do not yet hold any conformity-assessment certifications (ISO 27001, ISO 13485, MDSAP) or regulatory approvals (TGA, FDA, Health Canada, MHRA, NMPA) — those are work in progress. If your procurement process requires those today, we are not yet a fit.',
      },
      {
        q: 'How long does an evaluation typically take?',
        a: 'For Aescia for Clinics, a typical evaluation runs one to two weeks of pathway authoring with the clinic\'s own clinicians, then go-live with reminders and recall tracking first, prep pathways second. For Aescia for Hospitals, evaluation is structured around the SAFE-Discharge trial framework and takes longer; current engagements are evaluation and pilot contracts only, not commercial supply.',
      },
      {
        q: 'How does Aescia integrate with hospital and clinic information systems?',
        a: 'Aescia accepts HL7 v2 ADT and FHIR R4 inbound feeds and supports optional flowsheet and note write-back. The product is designed to add a signal layer for the team, not a new portal for the patient. SSO is supported via SAML 2.0 and OIDC, with role-based access control and tenant-isolated data.',
      },
      {
        q: 'What is Aescia\'s data security and privacy posture?',
        a: 'Encryption in transit (TLS 1.3) and at rest (AES-256), data residency by deployment region, documented sub-processor list available on request, and minimum-necessary collection by design. ISO/IEC 27001 controls are implemented. A full security pack is available to prospective buyers under mutual NDA.',
      },
      {
        q: 'Does Aescia use AI or machine learning?',
        a: 'Pathway content is authored by practising clinicians. Aescia does not deploy AI models that operate outside clinician-authored rule sets. Output in the Hospitals product is advisory; the clinician remains the decision-maker. The Clinics product does not propose clinical decisions at all.',
      },
      {
        q: 'How can I evaluate Aescia for my hospital or clinic?',
        a: 'Email contact@aesciahealth.com or use the form at aesciahealth.com/contact. For procurement, request the security pack with intent=security-pack. For Hospitals, current engagement is evaluation and pilot contracts. For Clinics, the product is shipping with the first paying specialty clinic and is taking subsequent customers per the pricing model above.',
      },
    ],
  },
]

const allItems: FAQItem[] = sections.flatMap((s) => s.items)

export default function FAQPage() {
  const faqJsonLd = faqPageSchema(allItems)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-10 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">FAQ</span>
              <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            </div>
            <h1
              className="font-display text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.03em] mb-8"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              Plain answers, kept current.
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.65] text-foreground/80 max-w-3xl">
              These are the questions buyers, investors, and clinicians ask first. Answers track what is on the rest of the site; if anything here drifts, it is a bug — write to us.
            </p>
          </div>
        </section>

        {sections.map((section, sIdx) => (
          <section key={section.eyebrow} className={`py-20 lg:py-24 px-6 lg:px-10 ${sIdx % 2 === 1 ? 'bg-secondary' : ''}`}>
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{section.eyebrow}</span>
                <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
              </div>
              <dl className="divide-y divide-border border-y border-border">
                {section.items.map((it) => (
                  <div key={it.q} className="py-8 lg:py-10 grid lg:grid-cols-[280px_1fr] gap-4 lg:gap-12">
                    <dt
                      className="font-display text-[20px] lg:text-[24px] leading-[1.25] tracking-[-0.018em] text-foreground"
                      style={{ fontVariationSettings: "'opsz' 80" }}
                    >
                      {it.q}
                    </dt>
                    <dd className="text-[15px] lg:text-[16px] leading-[1.7] text-foreground/85 max-w-3xl">{it.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ))}

        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-[15px] text-foreground/80 flex-1">Have a different question? We answer real email.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 text-[14px] font-medium tracking-wide hover:bg-foreground/90 transition-colors self-start sm:self-auto min-h-[44px]"
            >
              Contact Aescia
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
