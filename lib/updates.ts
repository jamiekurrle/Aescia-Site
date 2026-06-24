import type { UpdatesEntry } from '@/lib/schema'

// Single source of truth for the company updates log. Consumed by:
//   - /updates (rendered list + ItemList JSON-LD), and
//   - /feed.json (JSON Feed 1.1, for agents and aggregators).
// Newest-first. The on-page list is locale-aware via the i18n provider; this
// English snapshot is the canonical machine-readable version.
export const updatesEntries: UpdatesEntry[] = [
  {
    n: 11,
    date: '2026-06-21',
    title: 'SAFE-Discharge begins recruiting at Royal Prince Alfred Hospital.',
    body: "Aescia's SAFE-Discharge trial began enrolment at the Royal Prince Alfred Hospital cardiothoracic surgical unit on 21 June 2026 and is now recruiting. It is a prospective single-centre evaluation of Aescia for Hospitals in adults recovering from cardiothoracic surgery, registered with the Australian New Zealand Clinical Trials Registry.",
    url: 'https://anzctr.org.au/Trial/Registration/TrialReview.aspx?ACTRN=12625001425482',
  },
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
]
