import type { Metadata } from 'next'
import { breadcrumbSchema, updatesItemListSchema, type UpdatesEntry } from '@/lib/schema'
import { UpdatesContent } from './updates-content'

export const metadata: Metadata = {
  title: 'Updates',
  description:
    'A dated log of what Aescia has shipped, what trials and programmes have opened, and what is coming next. No press copy, just facts.',
  alternates: { canonical: '/updates' },
  openGraph: {
    title: 'Updates | Aescia',
    description: 'A dated log of what shipped, what opened, and what is next.',
    url: '/updates',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Updates', url: '/updates' },
])

// English-locale snapshot of entries for the structured-data feed. The on-page
// list is locale-aware via the i18n provider; the JSON-LD ItemList is published
// in English so search engines and LLM crawlers can ingest a single canonical
// version. Order is newest-first to match display.
const updatesItemList = updatesItemListSchema([
  {
    n: 10,
    date: '2026-04-24',
    title: 'Aescia enrols in MTAA MedTech Compass.',
    body: "Aescia has joined the Medical Technology Association of Australia's MedTech Compass program, which supports Australian medtech companies moving from concept to commercial adoption across regulatory, reimbursement, and clinical evidence.",
    url: 'https://medtechcompass.org.au/',
  },
  {
    n: 9,
    date: '2026-04-24',
    title: 'Team, partners, and a progress log on the site.',
    body: 'Published the operating team, added trial-site and research-institute affiliations, unified the contact flow, and started this updates log.',
  },
  {
    n: 8,
    date: '2026-04-24',
    title: 'SAFE-Discharge ethics approval.',
    body: 'The SAFE-Discharge trial at Royal Prince Alfred Hospital has cleared human research ethics review. Site-specific governance and IT assessments follow.',
  },
  {
    n: 7,
    date: '2026-04-15',
    title: 'CHEO Research Institute PMF programme kickoff.',
    body: 'Aescia joined the Product-Market-Fit programme at the CHEO Research Institute in Ottawa, with a paediatric-respiratory post-discharge pathway as the working focus.',
  },
  {
    n: 6,
    date: '2026-04-14',
    title: 'Bowel-preparation evidence base compiled.',
    body: 'Compiled a ten-document evidence base covering international guidelines, digital interventions, operational economics, diabetes and anticoagulant management, GLP-1, and special populations for colonoscopy preparation.',
  },
  {
    n: 5,
    date: '2026-04-13',
    title: 'Aescia for Clinics MVP feature-complete.',
    body: 'End-to-end walkthrough across patient, clinician, and admin flows. Pathway authoring, multichannel reminders, GLP-1 overlay, diabetic and anticoagulant scenarios, recall tracking, and structured export.',
  },
  {
    n: 4,
    date: '2026-04-10',
    title: 'NSW MVP Ventures Round 3 submitted.',
    body: 'Application MVPV25RD3347 lodged with Investment NSW on 10 April 2026. Matched-funding programme for targeted commercialisation work. Decision expected late June 2026.',
  },
  {
    n: 3,
    date: '2026-03-28',
    title: 'TTRA submission.',
    body: 'Targeted Translation Research Accelerator application submitted. Three milestones, clinical evaluation and regulatory work, decision expected around September 2026.',
  },
  {
    n: 2,
    date: '2025-10-20',
    title: 'Concordia News features Aescia in Beat the Odds program.',
    body: "Aescia participated in Concordia University's Beat the Odds hiring event through the District 3 Innovation Hub. Aescia hired its first Beat the Odds intern through the initiative.",
    url: 'https://www.concordia.ca/news/stories/2025/10/20/beat-the-odds-connects-concordia-students-with-district-3-startups.html',
  },
  {
    n: 1,
    date: '2025-09-01',
    title: 'Aescia joins District 3 at Concordia University.',
    body: "Aescia joined District 3, Concordia's innovation hub for bio, health, and high-tech startups.",
    url: 'https://district3.co',
  },
] satisfies UpdatesEntry[])

export default function UpdatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(updatesItemList) }}
      />
      <UpdatesContent />
    </>
  )
}
