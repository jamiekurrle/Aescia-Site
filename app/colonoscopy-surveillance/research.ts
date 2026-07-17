// Context reading for the surveillance guide page: where post-polypectomy
// surveillance is heading. Background for readers only. None of it feeds the
// calculator's decision logic, which reproduces the guideline the user selects.
// Every entry carries its own citation links.

export type ResearchItem = {
  title: string
  body: string
  strength: 'strong' | 'signal'
  sources: { label: string; url: string }[]
}

export type ResearchGroup = {
  heading: string
  items: ResearchItem[]
}

export const RESEARCH: ResearchGroup[] = [
  {
    heading: 'Guideline direction',
    items: [
      { title: 'The 2020 guidelines lengthened low-risk intervals — and real-world adherence lags', body: 'USMSTF 2020 and ESGE 2020 both pushed low-risk findings toward 7–10 years or back to screening, yet uptake lags: in one large US health system, roughly a quarter of screening colonoscopies were flagged as probable or possible overuse, and guideline-concordant interval-setting remains inconsistent in practice.', strength: 'strong', sources: [{ label: 'ESGE 2020', url: 'https://doi.org/10.1055/a-1185-3109' }, { label: 'Overuse data', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10294020/' }] },
      { title: 'Serrated-lesion surveillance is being defined by new metachronous-risk data', body: 'A 2024 systematic review and meta-analysis (14 studies, ~494,000 patients) quantified cancer and advanced-lesion risk after serrated-polyp resection, firming up which serrated findings warrant shorter intervals and which can be de-escalated.', strength: 'strong', sources: [{ label: 'GIE 2024', url: 'https://doi.org/10.1016/j.gie.2024.05.021' }] },
    ],
  },
  {
    heading: 'De-escalation evidence',
    items: [
      { title: 'The EPoS randomized trials test interval length head-on', body: 'The European Polyp Surveillance trials randomize low-risk patients to surveillance at 5 and 10 years versus 10 years only, and high-risk patients to 3/5/10 versus 5/10 years — the first large RCTs on interval length.', strength: 'strong', sources: [{ label: 'EPoS design', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5412707/' }] },
      { title: 'Modelling and national cohorts support returning low-risk adenomas to stool screening', body: 'Microsimulation and OncoSim analyses of sending 1–2 low-risk-adenoma patients back to FIT found little cancer penalty with large colonoscopy savings — the pathway Australia (iFOBT) and Canada (FIT) already encode for low-risk findings.', strength: 'signal', sources: [{ label: 'Return-to-FIT model', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11083724/' }] },
    ],
  },
  {
    heading: 'AI and optical diagnosis',
    items: [
      { title: 'AI optical diagnosis for "resect-and-discard" did not add net benefit (2024)', body: 'Pooling 11 studies, computer-aided diagnosis matched unassisted expert optical diagnosis on the proportion of diminutive polyps that could skip pathology, tempering the idea that AI can soon assign intervals in real time without histology.', strength: 'strong', sources: [{ label: 'Lancet Gastro Hep 2024', url: 'https://doi.org/10.1016/S2468-1253(24)00222-X' }] },
      { title: 'AI detection finds more small polyps — which can paradoxically shorten intervals', body: 'Because computer-aided detection raises adenoma detection without a matching rise in advanced lesions, microsimulation projects more patients crossed into surveillance.', strength: 'signal', sources: [{ label: 'BMJ Medicine 2025', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11955961/' }] },
    ],
  },
  {
    heading: 'Non-invasive tests',
    items: [
      { title: 'The Shield blood test won FDA screening approval (2024)', body: 'In the ECLIPSE trial, Guardant’s cell-free-DNA test showed 83% sensitivity for colorectal cancer at 90% specificity, and it is FDA-approved as a primary screening option for average-risk adults 45+. Approved for screening, not surveillance, and its sensitivity for advanced precancerous lesions is low (~13%).', strength: 'strong', sources: [{ label: 'ECLIPSE, NEJM 2024', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2304714' }, { label: 'FDA approval', url: 'https://www.fda.gov/medical-devices/recently-approved-devices/shield-p230009' }] },
    ],
  },
]
