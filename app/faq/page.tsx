import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, faqPageSchema, type FAQItem } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Frequently asked questions about the platform',
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
        a: 'Aescia was founded by James Kurrle, a critical-care physician trained and practising across rural and metropolitan New South Wales (Wagga Wagga and Sydney), and Vasken Dermardiros, a machine-learning PhD from Concordia University. James is the CEO and authors the clinical pathway engine. Vasken is the CTO and owns hosting, AI inference, EMR integration, and pathway authoring infrastructure.',
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
        a: 'Aescia is a portfolio company at District 3, Concordia University\'s innovation hub for bio, health, and high-tech startups (joined September 2025). Aescia is an industry member of the Medical Technology Association of Australia (MTAA) through the MedTech Compass programme. Aescia is selected for the CHEO Research Institute Product-Market-Fit programme (paediatric respiratory track), running from April 2026.',
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
        a: 'Aescia for Clinics is a workflow and patient-preparation platform for specialty clinics. It is not a medical device. The product delivers clinician-authored prep pathways (including bowel preparation, diabetes management, anticoagulation, and GLP-1 peri-procedural overlay), multichannel reminders, recall tracking, and structured exports back to the chart. Pricing is negotiated with each clinic; design partners start free until it proves itself.',
      },
      {
        q: 'What is the difference between Aescia for Hospitals and Aescia for Clinics?',
        a: 'They share one pathway engine but have different regulatory shapes. Aescia for Hospitals is an investigational software-as-a-medical-device intended for Class IIa classification under the TGA, designed for post-acute monitoring with advisory output. Aescia for Clinics is explicitly not a medical device, does not propose clinical decisions, and is designed for procedural-prep workflow in outpatient specialty clinics. The pricing model, intended buyer, and regulatory posture are all different.',
      },
      {
        q: 'What does the platform do underneath both products?',
        a: 'One composable pathway engine with five step types: Collect, Follow, Remind, Educate, Export. The same engine runs surgical recovery pathways for hospitals and procedural-prep pathways for clinics. Pathways are authored by practising clinicians, and the clinical alert rules stay explainable rather than a black box. Aescia does use machine learning for back-end analysis and operational tooling, which is advisory and kept separate from the clinician-authored rules that drive patient-facing alerts.',
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
        a: 'Aescia for Clinics pricing is negotiated with each clinic rather than published, because the right number depends on your volume, your setup, and the outcome we agree to be measured on. Design partners start free and pay nothing until the platform proves itself on your own data, and the agreed price is held below the return modelled for your site. Run the ROI calculator at aesciahealth.com/clinics to see that return, then talk to us for your number. Aescia for Hospitals is currently engaged through evaluation and pilot contracts, not commercial supply.',
      },
      {
        q: 'How does Aescia integrate with hospital and clinic information systems?',
        a: 'Aescia is designed to add one prioritised list for the team, not a new portal, and to be quick to set up. Aescia is pre-first-customer, so it does not yet have live integrations with specific electronic medical record or practice-management systems; any data exchange is scoped with each customer rather than claimed in advance. To start, data can be provided by manual entry or a simple export, with no integration required to begin. Access uses multi-factor authentication and role-based access control, with tenant-isolated data.',
      },
      {
        q: 'What is Aescia\'s data security and privacy posture?',
        a: 'Encryption in transit (TLS 1.3) and at rest (AES-256), data residency by deployment region (a US region on Google Cloud for US deployments), multi-factor authentication enforced on staff accounts, a documented sub-processor list on request, and minimum-necessary collection by design. ISO/IEC 27001 controls are implemented (certification not yet obtained). The /security page documents the data-handling posture, the agreements signed before any patient data is exchanged, sub-processors, breach notification, data ownership, and exit terms in full.',
      },
      {
        q: 'Does Aescia use AI or machine learning?',
        a: 'Yes, but with a clear line. The clinical alert rules, the logic that decides whether to flag, remind, or escalate for a patient, are authored by practising clinicians and stay explainable; there is no black-box AI making or proposing patient care. Aescia does use machine learning for back-end analysis and operational tooling that is not patient-facing, for example a planned risk score that flags which colonoscopies are likely to run long so the list can be planned. That analysis is advisory, never replaces the clinician, and is kept separate from the clinician-authored rules. Output in the Hospitals product is advisory; the clinician remains the decision-maker. The Clinics product does not propose clinical decisions.',
      },
      {
        q: 'How can I evaluate Aescia for my hospital or clinic?',
        a: 'Email contact@aesciahealth.com or use the form at aesciahealth.com/contact. For procurement, request the security pack with intent=security-pack. For Hospitals, current engagement is evaluation and pilot contracts. For Clinics, current customers are taken through the design-partner program documented at aesciahealth.com/design-partner.',
      },
    ],
  },
  {
    eyebrow: 'Endoscopy ASC workflow',
    items: [
      {
        q: 'How do I cut no-shows at an endoscopy ASC?',
        a: 'At an endoscopy ambulatory surgery center, most no-shows are preparation failures rather than forgotten appointments. A patient who has not done the bowel prep, is confused about a GLP-1 or blood-thinner instruction, or is unsure about the prep will cancel late or not arrive. Cutting no-shows means getting more patients correctly prepared and confirmed before the date, not just reminding them to attend. Aescia for Clinics does this with clinician-authored prep pathways, medication overlays, timed reminders, and a prep-night photo confirmation. Inadequate bowel preparation alone affects roughly 20 to 25 percent of colonoscopies at baseline (Beran 2024), so the prep gap is a large part of the problem.',
      },
      {
        q: 'Do GLP-1 patients need to stop their medication before a colonoscopy?',
        a: 'It depends on the clinic\'s protocol, and the guidance has changed. GLP-1 agonists such as semaglutide, tirzepatide, and liraglutide slow gastric emptying, which prompted 2023 American Society of Anesthesiologists guidance suggesting they be held before sedated procedures. In 2024, multi-society guidance moved toward an individualized, risk-stratified approach rather than a blanket hold, noting that the clear-liquid colonoscopy prep may itself reduce residual stomach contents. The decision is the gastroenterologist\'s. Software\'s role is to apply the clinic\'s chosen rule consistently to every GLP-1 patient, not to make the clinical decision.',
      },
      {
        q: 'What software flags GLP-1 patients and adjusts endoscopy prep?',
        a: 'Aescia for Clinics flags every patient on a GLP-1 medication at intake and applies the clinic\'s authored peri-procedural protocol to them automatically, then resurfaces and confirms it before the procedure date. It does not decide the protocol; the gastroenterologist sets it, and Aescia delivers it consistently rather than relying on front-desk memory. Aescia for Clinics is not a medical device.',
      },
      {
        q: 'How should blood thinners be managed before a colonoscopy?',
        a: 'Colonoscopy with polypectomy is a high-bleeding-risk procedure, and the handling differs by drug under society guidance (ASGE 2016; BSG and ESGE 2021): warfarin is typically stopped about 5 days before with an INR check and bridging only for high thrombotic risk; direct oral anticoagulants (apixaban, rivaroxaban, dabigatran, edoxaban) are usually stopped 1 to 2 days before depending on the drug and renal function; aspirin monotherapy is usually continued; and P2Y12 inhibitors such as clopidogrel are individualized with cardiology. The decision is the clinician\'s. Aescia for Clinics flags the specific drug at intake and delivers the clinic\'s authored rule, with the stop and restart dates, then confirms it.',
      },
      {
        q: 'How can software reduce the inadequate bowel prep rate?',
        a: 'Inadequate bowel preparation affects roughly 20 to 25 percent of colonoscopies at baseline (Beran 2024) and is associated with a higher adenoma miss rate (Lebwohl 2011). A single written instruction handed out at booking fails for ordinary reasons: it arrives weeks too early, in dense or non-native language, with misunderstood split-dose timing and no checkpoint until the patient arrives. Software reduces the rate by delivering a structured, timed, coached prep pathway in the patient\'s language, with reminders and a prep-night confirmation. Aescia for Clinics does this, aligned to a Boston Bowel Preparation standard. Better instructions raise prep adequacy but do not eliminate inadequate prep entirely.',
      },
      {
        q: 'Can software fill a cancelled colonoscopy slot, and what is prep-aware backfill?',
        a: 'Generic waitlist auto-fill can offer a cancelled slot to the next patient, but for colonoscopy that often fails, because the replacement needs 1 to 2 days of bowel preparation and cannot attend prepared on short notice. Prep-aware backfill is the alternative: it routes a freed slot only to patients already confirmed prep-ready for that date. Aescia for Clinics tracks prep state across the active waitlist and produces that prep-aware routing signal; the slot is still booked in the clinic\'s own scheduling system. The ceiling is honest: prep-aware backfill can only draw from the pool of patients who are actively prepping, so it is most useful for ASCs with enough near-term volume to keep that pool full.',
      },
    ],
  },
  {
    eyebrow: 'Buyer due diligence',
    items: [
      {
        q: 'You have no clinical customers yet. Why should I be first?',
        a: 'Aescia for Clinics is pre-first-customer; that is stated plainly. The design-partner program is the structured answer. The pilot runs free until Aescia has delivered measurable net benefit on the outcome costing your list the most, measured against your own ASC\'s historical baseline and signed off by your own QA committee. Commercial terms are negotiated per deal; in return, design partners provide reference and logo arrangements. The program is at aesciahealth.com/design-partner.',
      },
      {
        q: 'What happens to my data if Aescia shuts down?',
        a: 'Customer data is exported in a usable structured format (JSON and CSV) within 30 days of termination. Aescia-side copies are destroyed on a documented schedule after export confirmation, with a certificate of destruction issued. There is no PDF dump. Pathways co-authored with your clinician are returned in a re-deployable format. The /security page documents exit terms in writing and the design-partner contract pre-specifies them before the pilot starts.',
      },
      {
        q: 'Are you HIPAA compliant and will you sign a Business Associate Agreement?',
        a: 'Aescia is not a HIPAA-covered entity and does not claim HIPAA certification. Aescia is pre-first-customer and does not have signed Business Associate Agreements in place today. For any US deployment that will handle PHI, a Business Associate Agreement is signed before any patient data is exchanged. PHI for US deployments is hosted in a US region on Google Cloud (Firebase Hosting, Cloud Run, Firebase Authentication), per-tenant. The /security page documents the full posture, including SOC 2 status, sub-processors, breach notification, and data ownership.',
      },
      {
        q: 'Is Aescia for Clinics regulated by the FDA?',
        a: 'No. Aescia for Clinics is explicitly not a medical device. It does not propose clinical decisions, it does not diagnose, it does not treat. The product delivers clinician-authored prep instructions, reminders, GLP-1 handling, and surveillance recall under a "propose, do not decide" design posture. Aescia for Hospitals (the surgical-recovery product) is investigational and intended to be classified Class IIa under the Australian TGA pathway; no FDA, MDSAP, CE/UKCA, or Health Canada applications have been filed for either product. The /governance page documents the regulatory posture in detail.',
      },
      {
        q: 'What does the design-partner guarantee actually cover, and how does the rebate work?',
        a: 'The metric, the baseline, the measurement source, and the rebate timing are pre-specified in writing in the design-partner contract before the pilot starts. Aescia commits to deliver net financial benefit to you that exceeds the contracted rate over the pilot window, measured against your ASC\'s own historical data from your scheduling system, reporting platform, or QI dashboard. If the agreed metric is not met, Aescia refunds the pilot in full. The rebate is paid by Aescia directly, in writing, within 30 days of measurement. Third-party escrow for the rebate is available on request for customers whose procurement requires it; it is not the default because the rebate clause is enforceable on its own terms. The /design-partner page documents the program in full.',
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
      <PageContent />
      <Footer />
    </>
  )
}
