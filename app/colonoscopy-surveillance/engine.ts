// ---------------------------------------------------------------------------
// Colonoscopy post-polypectomy surveillance — index (baseline) exam reference.
//
// Every interval this engine emits is a published row or recommendation from
// one of the six guidelines below, carried with that guideline's own wording
// and its table / recommendation number. Where a guideline states no rule for a
// scenario, the engine reports that as a finding and emits no interval.
//
// Rules are data. `compute` matches a lesion set against a jurisdiction's rule
// list and returns the guideline's own row. It derives nothing.
//
// NOT a medical device. Clinician reference. Malignant polyps, IBD and
// hereditary syndromes sit outside every one of these guidelines' stated scope.
// ---------------------------------------------------------------------------

export type Hist = 'TA' | 'TVA' | 'VA' | 'SSL' | 'TSA' | 'HP' | 'CANCER'
export type JurId = 'US' | 'CA_ON' | 'CA_AB' | 'CA_BC' | 'AU' | 'EU'

export interface LesionInput {
  hist: Exclude<Hist, 'CANCER'>
  count: number
  size: number // largest of this lesion type, mm
  hgd: boolean // high-grade dysplasia (adenomas) / cytologic dysplasia (serrated)
  piece: boolean // piecemeal resection
  proximal: boolean // proximal to the sigmoid colon
}

export interface Exam {
  jur: JurId
  lesions: LesionInput[]
  malignant: boolean
  special: boolean // IBD / hereditary syndrome / personal or family history of CRC
  bbps: [number, number, number]
}

export interface Source {
  name: string
  url: string
}

// The routine interval the findings carry, demoted beneath a preparation
// pathway. It travels with the precondition this examination did not meet, so
// it is never read as this examination's answer.
export interface Superseded {
  interval: string
  modality: string | null
  driver: string
  quote: string
  location: string
  source: Source
  notes: string[]
  riskYears: number
  override: boolean
  discretion: boolean
  notSpecified: boolean
  calculatorRule: string | null
  // Carries the calculator-interpretation caveat through demotion, so a demoted
  // interpretation is not shown as a plain published interval. Null otherwise.
  interpretation: string | null
  // The guideline's own wording that its intervals assume an adequate
  // examination. Null where the guideline prints no such wording.
  precondition: { quote: string; location: string } | null
}

export interface Result {
  interval: string
  modality: string | null
  driver: string
  quote: string
  location: string // table / recommendation number the interval is printed in
  source: Source // the document the interval and quote above are printed in
  // Strength and quality label exactly as that document prints it. Null where
  // the document prints none against this statement.
  strength: string | null
  // True when `source` is a document other than the surveillance guideline this
  // jurisdiction's intervals come from.
  separateDocument: boolean
  notes: string[]
  riskYears: number // sort key (lower = shorter interval)
  override: boolean // outside the guideline's stated scope
  discretion: boolean // the guideline explicitly declines to state an interval
  notSpecified: boolean // the guideline states no rule for this scenario
  prepInadequate: boolean
  assumption: boolean
  // Populated when preparation was inadequate and a routine interval was
  // therefore demoted. Null everywhere else.
  supersededInterval: Superseded | null
  // Set when this calculator, not the guideline, chose the interval shown: more
  // than one of the guideline's own rows applied, they carried different
  // intervals, and the guideline states no rule for the combination. Null
  // everywhere else, including where the guideline's own text settles which of
  // its rows governs.
  calculatorRule: string | null
  // Set when the interval shown is the calculator applying a guideline rule to a
  // sequence the guideline does not itself address (e.g. a normal baseline then a
  // later adenoma, taken as a new baseline). Carries the plain-language basis.
  // Null for a direct guideline rule.
  interpretation?: string | null
  // Set when preparation was inadequate and the source's repeat timing depends on
  // an indication this calculator does not collect. Each distinct published timing
  // is listed and none is selected. Null everywhere else.
  prepByIndication?: { indication: string; interval: string }[] | null
}

// ---------------------------------------------------------------------------
// Sources
// ---------------------------------------------------------------------------
export const SRC: Record<JurId, Source> = {
  US: {
    name: 'US Multi-Society Task Force on Colorectal Cancer, 2020 (Gupta et al., Gastrointest Endosc 2020;91:463–485)',
    url: 'https://www.asge.org/docs/default-source/guidelines/recommendations-for-follow-up-after-colonoscopy-and-polypectomy-a-consensus-update-by-the-us-multi-society-task-force-on-colorectal-cancer-2020-march-gie.pdf',
  },
  CA_ON: {
    name: 'ColonCancerCheck / Cancer Care Ontario — Recommendations for Post-Polypectomy Surveillance',
    url: 'https://www.cancercareontario.ca/en/guidelines-advice/cancer-continuum/screening/resources-healthcare-providers/post-polypectomy-surveillance-recommendations-summary',
  },
  CA_AB: {
    name: 'Alberta Colorectal Cancer Screening Program (Sadowski et al., J Can Assoc Gastroenterol 2024;7(4):319–328)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11317626/',
  },
  CA_BC: {
    name: 'BCGuidelines.ca — Colorectal Cancer Part 2: Follow-up of Colorectal Cancer and Precancerous Lesions (Polyps), 2022',
    url: 'https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/bc-guidelines/colorectal-cancer-part2',
  },
  AU: {
    name: 'Cancer Council Australia / NHMRC — Clinical practice guidelines for colorectal cancer: Colonoscopy surveillance',
    url: 'https://www.cancer.org.au/clinical-guidelines/bowel-cancer/surveillance-colonoscopy',
  },
  EU: {
    name: 'ESGE 2020 (Hassan et al., Endoscopy 2020;52(8):687–700)',
    url: 'https://doi.org/10.1055/a-1185-3109',
  },
}

// ---------------------------------------------------------------------------
// Bowel-preparation documents.
//
// Four of these six jurisdictions publish their preparation guidance somewhere
// other than the surveillance guideline their intervals come from. Those
// documents are named here so a result that quotes one can say which document
// it quoted.
// ---------------------------------------------------------------------------
export const PREP_SRC = {
  US_2025: {
    name: 'Jacobson BC, Anderson JC, Burke CA, Dominitz JA, Gross SA, May FP, Patel SG, Shaukat A, Robertson DJ. Optimizing Bowel Preparation Quality for Colonoscopy: Consensus Recommendations by the US Multi-Society Task Force on Colorectal Cancer. Gastroenterology 2025;168(4):798–829. PMID 40047732; DOI 10.1053/j.gastro.2025.02.002. Co-published: Gastrointest Endosc 2025;101(4):702–732 and Am J Gastroenterol 2025;120(4):738–764.',
    url: 'https://www.asge.org/home/resources/publications/guidelines/optimizing-bowel-preparation-quality-for-colonoscopy--consensus-recommendations-by-the-us-multi-society-task-force-on-colorectal-cancer',
  },
  EU_2019: {
    name: 'Hassan C, East J, Radaelli F, Spada C, Benamouzig R, Bisschops R, Bretthauer M, Dekker E, Dinis-Ribeiro M, Ferlitsch M, Fuccio L, Awadie H, Gralnek I, Jover R, Kaminski MF, Pellise M, Triantafyllou K, Vanella G, Mangas-Sanjuan C, Frazzoni L, Van Hooft JE, Dumonceau JM. Bowel preparation for colonoscopy: European Society of Gastrointestinal Endoscopy (ESGE) Guideline - Update 2019. Endoscopy 2019;51(8):775–794. PMID 31295746; DOI 10.1055/a-0959-0505.',
    url: 'https://www.esge.com/assets/downloads/pdfs/guidelines/2019_a_0959_0505.pdf',
  },
  CA_AB_2013: {
    name: 'Alberta Colorectal Cancer Screening Program. ACRCSP Post Polypectomy Surveillance Guidelines, June 2013.',
    url: 'https://screeningforlife.ca/wp-content/uploads/2019/11/ACRCSP-Post-Polypectomy-Surveillance-Guidelines-June-2013.pdf',
  },
  CA_BC_STANDARDS: {
    name: 'BC Cancer Colon Screening Program. Colonoscopy Standards, January 2026 (version 2.8).',
    url: 'https://www.bccancer.bc.ca/screening/Documents/Colonoscopy-Standards.pdf',
  },
} as const satisfies Record<string, Source>

// interval label -> sort key (lower-bound years; lower = shorter interval)
const YRS = {
  m6: 0.5,
  y1: 1,
  y3: 3,
  y35: 3.5,
  y5: 5,
  y510: 5.5,
  y710: 7,
  y10: 10,
} as const

// ---------------------------------------------------------------------------
// Aggregate a lesion set into the features the rule predicates read.
// ---------------------------------------------------------------------------
function isAdenomaHist(h: Hist): boolean {
  return h === 'TA' || h === 'TVA' || h === 'VA'
}
function isVillousHist(h: Hist): boolean {
  return h === 'TVA' || h === 'VA'
}

export interface Agg {
  adenomaCount: number
  adenomaMaxSize: number
  anyVillous: boolean
  anyHgd: boolean
  sslCount: number
  sslMaxSize: number
  anySslDysplasia: boolean
  tsaCount: number
  tsaMaxSize: number
  hpCount: number
  hpMaxSize: number
  anyProximalHp: boolean
  hpProximalMaxSize: number // largest hyperplastic polyp proximal to the sigmoid
  hpDistalMaxSize: number // largest hyperplastic polyp in the rectosigmoid
  serratedCount: number // SSL + TSA + HP
  serratedMaxSize: number
  anyPiecemeal: boolean
  piecemealSize: number
  piecemealAdenomaSize: number
  piecemealSslSize: number
  piecemealPrecancerousSize: number // largest piecemeal adenoma, SSL or TSA (not a benign HP)
  hasAnyLesion: boolean
  totalLesions: number
}

function aggregate(lesions: LesionInput[]): Agg {
  let adenomaCount = 0
  let adenomaMaxSize = 0
  let anyVillous = false
  let anyHgd = false
  let sslCount = 0
  let sslMaxSize = 0
  let anySslDysplasia = false
  let tsaCount = 0
  let tsaMaxSize = 0
  let hpCount = 0
  let hpMaxSize = 0
  let anyProximalHp = false
  let hpProximalMaxSize = 0
  let hpDistalMaxSize = 0
  let anyPiecemeal = false
  let piecemealSize = 0
  let piecemealAdenomaSize = 0
  let piecemealSslSize = 0
  let piecemealPrecancerousSize = 0
  let totalLesions = 0

  for (const l of lesions) {
    const n = Math.max(0, l.count | 0)
    if (n === 0) continue
    totalLesions += n
    if (l.piece) {
      anyPiecemeal = true
      piecemealSize = Math.max(piecemealSize, l.size)
      if (isAdenomaHist(l.hist)) piecemealAdenomaSize = Math.max(piecemealAdenomaSize, l.size)
      if (l.hist === 'SSL') piecemealSslSize = Math.max(piecemealSslSize, l.size)
      if (isAdenomaHist(l.hist) || l.hist === 'SSL' || l.hist === 'TSA') piecemealPrecancerousSize = Math.max(piecemealPrecancerousSize, l.size)
    }
    if (isAdenomaHist(l.hist)) {
      adenomaCount += n
      adenomaMaxSize = Math.max(adenomaMaxSize, l.size)
      if (isVillousHist(l.hist)) anyVillous = true
      if (l.hgd) anyHgd = true
    } else if (l.hist === 'SSL') {
      sslCount += n
      sslMaxSize = Math.max(sslMaxSize, l.size)
      if (l.hgd) anySslDysplasia = true
    } else if (l.hist === 'TSA') {
      tsaCount += n
      tsaMaxSize = Math.max(tsaMaxSize, l.size)
    } else if (l.hist === 'HP') {
      hpCount += n
      hpMaxSize = Math.max(hpMaxSize, l.size)
      if (l.proximal) {
        anyProximalHp = true
        hpProximalMaxSize = Math.max(hpProximalMaxSize, l.size)
      } else {
        hpDistalMaxSize = Math.max(hpDistalMaxSize, l.size)
      }
    }
  }

  return {
    adenomaCount,
    adenomaMaxSize,
    anyVillous,
    anyHgd,
    sslCount,
    sslMaxSize,
    anySslDysplasia,
    tsaCount,
    tsaMaxSize,
    hpCount,
    hpMaxSize,
    anyProximalHp,
    hpProximalMaxSize,
    hpDistalMaxSize,
    serratedCount: sslCount + tsaCount + hpCount,
    serratedMaxSize: Math.max(sslMaxSize, tsaMaxSize, hpMaxSize),
    anyPiecemeal,
    piecemealSize,
    piecemealAdenomaSize,
    piecemealSslSize,
    piecemealPrecancerousSize,
    hasAnyLesion: totalLesions > 0,
    totalLesions,
  }
}

// ---------------------------------------------------------------------------
// Rule shape
//
//   'rule'     an interval the guideline prints for this finding
//   'gap'      the guideline states no rule here; yields only if no 'rule' fires
//   'declined' the guideline explicitly refuses to state an interval; wins
//   'scope'    the guideline places this outside its own scope; wins
// ---------------------------------------------------------------------------
type RuleKind = 'rule' | 'gap' | 'declined' | 'scope'

interface Rule {
  id: string
  kind: RuleKind
  when: (a: Agg) => boolean
  interval: string
  modality?: string | null
  driver: string
  quote: string
  location: string
  riskYears?: number
  notes?: (a: Agg) => string[]
}

interface Advisory {
  when: (a: Agg) => boolean
  note: string
}

interface JurSpec {
  short: string
  // Whether the guideline itself settles which of its rows governs when more
  // than one applies: a combined-count table, a pooled lesion count, or a
  // stated selection principle. Where it does, the interval shown is the
  // guideline's own. Where it does not, the shortest-interval pick below is
  // this calculator's and is labelled on the result.
  selectionPublished: (a: Agg) => boolean
  rules: Rule[]
  advisories: Advisory[]
  prep: PrepSpec
  malignant: { driver: string; quote: string; location: string }
  special: { driver: string; quote: string; location: string }
}

// A repeat pathway a society publishes for an inadequately prepared
// examination, carried with the document it is printed in.
interface PrepPathway {
  // The repeat interval as the society prints it. Null where the society
  // requires a repeat and attaches no timeframe to it.
  interval: string | null
  modality: string | null
  driver: string
  quote: string
  location: string
  // Strength and quality label exactly as the document prints it. Null where
  // the document prints none against this statement.
  strength: string | null
  // The document the pathway is printed in.
  source: Source
  // True when that document is not the surveillance guideline this
  // jurisdiction's intervals come from.
  separate: boolean
  notes: string[]
  // When the published repeat timing depends on an indication the calculator does
  // not collect, the distinct timings are listed here and none is selected. Null
  // where a single timing applies.
  byIndication?: { indication: string; interval: string }[] | null
}

interface PrepSpec {
  // The surveillance guideline's own wording that its intervals assume an
  // adequate examination. Null where it prints none.
  precondition: { quote: string; location: string } | null
  // The published repeat pathway. Null where the society publishes none.
  pathway: PrepPathway | null
  // Context that applies whatever the pathway.
  notes: string[]
}

const gapInterval = (short: string) => `Not specified by ${short}`

// ---------------------------------------------------------------------------
// United States — USMSTF 2020. Tables 4 (adenomas) and 5 (serrated lesions).
// ---------------------------------------------------------------------------
const US_PRECONDITION =
  'All recommendations assume examination complete to cecum with bowel preparation adequate to detect lesions >5 mm in size; recommendations do not apply to individuals with a hereditary CRC syndrome, personal history of inflammatory bowel disease, personal history of hereditary cancer syndrome, serrated polyposis syndrome, malignant polyp, personal history of CRC, or family history of CRC, and must be judiciously applied to such individuals, favoring the shortest indicated interval based on either history or polyp findings.'

const US_DEFERRED_SCOPE =
  'Recommendations for follow-up of serrated polyposis syndrome, management of patients with a malignant polyp, as well as optimal polypectomy technique will be covered in subsequent Task Force recommendations.'

const US: JurSpec = {
  short: 'USMSTF 2020',
  // Tables 4 and 5 are separate, neither cross-references the other, and
  // USMSTF 2020 prints no principle for choosing among its own rows. The one
  // ordering it does publish is the piecemeal site check, p.478: "patients with
  // polyps ≥20 mm resected piecemeal have first surveillance colonoscopy at
  // approximately 6 months". That is stated for the patient rather than for the
  // finding, so it settles the order whatever else was found.
  selectionPublished: (a) => a.piecemealAdenomaSize >= 20 || a.piecemealSslSize >= 20,
  malignant: {
    driver: 'USMSTF 2020 places a malignant polyp outside the scope of these recommendations and defers it to a separate Task Force document',
    quote: US_DEFERRED_SCOPE,
    location: 'Scope statement, p.465',
  },
  special: {
    driver: 'USMSTF 2020 states that these recommendations do not apply to this population',
    quote: US_PRECONDITION,
    location: 'Table 4 footnote a, p.469 (Table 5 footnote a, p.470 is near-identical)',
  },
  prep: {
    precondition: {
      quote:
        'All recommendations assume examination complete to cecum with bowel preparation adequate to detect lesions >5 mm in size',
      location: 'Table 4 footnote a, p.469; Table 5 footnote a, p.470',
    },
    pathway: {
      interval:
        'Within 12 months. As soon as possible, generally within 3 months, where the colonoscopy was performed for an abnormal noncolonoscopic colorectal cancer screening test',
      modality: 'Colonoscopy',
      driver:
        'The US Multi-Society Task Force publishes a repeat interval for an inadequately prepared examination in its bowel preparation consensus, a document separate from the surveillance guideline these intervals come from',
      quote:
        'When the bowel preparation is deemed inadequate to allow assigning standard screening or surveillance intervals, we recommend rescheduling a colonoscopy within 12 mo for screening or surveillance colonoscopies, and as soon as possible (i.e. generally within 3 mo) for those performed for an abnormal noncolonoscopic colorectal cancer screening test',
      location: 'Consensus recommendation on inadequate bowel preparation',
      strength: null,
      source: PREP_SRC.US_2025,
      separate: true,
      byIndication: [
        { indication: 'Screening or surveillance', interval: 'Within 12 months' },
        { indication: 'Abnormal non-colonoscopic colorectal cancer screening test', interval: 'As soon as possible, generally within 3 months' },
      ],
      notes: [
        'Which of the two timings applies turns on why the colonoscopy was done. This tool does not ask for the indication.',
        'The consensus document uses consensus statements and ungraded key clinical concepts rather than a strength and quality label on every item. No strength is printed against this statement in the rendering quoted here.',
        'The wording above is taken from the ASGE guideline page for this consensus. ASGE is a constituent society of the Task Force and a co-publisher of the document; the journal full texts are paywalled. Two secondary renderings carry the same substance in different words: Cleveland Clinic Journal of Medicine 2026;93(3):169 gives "Repeat colonoscopy within 12 months", and the ACG Evidence-Based GI summary gives "When bowel preparation is insufficient for standard screening or surveillance, repeat colonoscopy should be performed within 12 months, or sooner for patients with alarm symptoms or positive non-endoscopic colorectal cancer screening tests." Verify against the journal text before quoting this recommendation in a publication.',
        'This consensus supersedes the Task Force\'s 2014 bowel-cleansing recommendations, which carried the same 1-year repeat and a graded strength: "If the colonoscopy is complete to cecum, and the preparation ultimately is deemed inadequate, then the examination should be repeated, generally with a more aggressive preparation regimen, within 1 year; intervals shorter than 1 year are indicated when advanced neoplasia is detected and there is inadequate preparation (Strong recommendation, low-quality evidence)." Johnson DA, Barkun AN, Cohen LB, et al. Optimizing adequacy of bowel cleansing for colonoscopy: recommendations from the US Multi-Society Task Force on Colorectal Cancer. Gastroenterology 2014;147(4):903–924.',
      ],
    },
    notes: [
      'USMSTF 2020, the surveillance guideline these intervals come from, states no repeat interval for an inadequately prepared examination and does not cross-reference the bowel preparation consensus. It names adequate preparation as a precondition of every Table 4 and Table 5 interval, and once more as a tiebreaker for sessile serrated polyp follow-up. The interval above is published only in the separate consensus document.',
    ],
  },
  rules: [
    // Scope
    {
      id: 'us_hp_over_20',
      kind: 'scope',
      when: (a) => a.hpCount > 20,
      interval: 'Outside the scope of USMSTF 2020',
      modality: null,
      driver:
        'Table 5 covers up to 20 hyperplastic polyps; USMSTF 2020 defers serrated polyposis syndrome to a separate Task Force document',
      quote: US_DEFERRED_SCOPE,
      location: 'Scope statement, p.465; Table 5 covers "≤20 HPs", p.470',
    },

    // Table 4 — conventional adenomas
    {
      id: 'us_normal',
      kind: 'rule',
      when: (a) => !a.hasAnyLesion,
      interval: '10 years',
      driver: 'A normal colonoscopy',
      quote: 'Normal | 10 y | Strong | High',
      location: 'Table 4, p.469',
      riskYears: YRS.y10,
    },
    {
      id: 'us_piecemeal_adenoma',
      kind: 'rule',
      when: (a) => a.piecemealAdenomaSize >= 20,
      interval: '6 months',
      modality: 'Colonoscopy (polypectomy site check)',
      driver: 'Piecemeal resection of an adenoma 20 mm or larger',
      quote: 'Piecemeal resection of adenoma ≥20 mm | 6 mo | Strong | Moderate',
      location: 'Table 4, p.469',
      riskYears: YRS.m6,
      notes: () => [
        'USMSTF 2020 states this threshold two ways. Tables 4 and 5 read "Piecemeal resection of adenoma/SSP ≥20 mm"; the prose recommendation on p.478 reads "For patients with piecemeal resection of adenoma or SSP >20 mm, repeat colonoscopy in 6 months." Reported as found.',
        'Prose, p.478: "Based on the evidence reviewed, the Task Force recommended patients with polyps ≥20 mm resected piecemeal have first surveillance colonoscopy at approximately 6 months, second surveillance 1 year from first surveillance, and third surveillance 3 years from the second surveillance."',
      ],
    },
    {
      id: 'us_adenomas_over_10',
      kind: 'rule',
      when: (a) => a.adenomaCount > 10,
      interval: '1 year',
      driver: 'More than 10 adenomas on a single examination',
      quote: '>10 adenomas on single examination | 1 y | Weak | Very low',
      location: 'Table 4, p.469',
      riskYears: YRS.y1,
    },
    {
      id: 'us_adenoma_10mm',
      kind: 'rule',
      when: (a) => a.adenomaCount > 0 && a.adenomaMaxSize >= 10,
      interval: '3 years',
      driver: 'An adenoma 10 mm or larger',
      quote: 'Adenoma ≥10 mm | 3 y | Strong | High',
      location: 'Table 4, p.469',
      riskYears: YRS.y3,
    },
    {
      id: 'us_adenoma_villous',
      kind: 'rule',
      when: (a) => a.adenomaCount > 0 && a.anyVillous,
      interval: '3 years',
      driver: 'An adenoma with tubulovillous or villous histology',
      quote: 'Adenoma with tubulovillous or villous histology | 3 y | Strong | Moderate',
      location: 'Table 4, p.469',
      riskYears: YRS.y3,
      notes: () => ['Table 4 footnote d: "Assumes high confidence of complete resection."'],
    },
    {
      id: 'us_adenoma_hgd',
      kind: 'rule',
      when: (a) => a.adenomaCount > 0 && a.anyHgd,
      interval: '3 years',
      driver: 'An adenoma with high-grade dysplasia',
      quote: 'Adenoma with high-grade dysplasia | 3 y | Strong | Moderate',
      location: 'Table 4, p.469',
      riskYears: YRS.y3,
      notes: () => ['Table 4 footnote d: "Assumes high confidence of complete resection."'],
    },
    {
      id: 'us_ta_5_10',
      kind: 'rule',
      when: (a) => a.adenomaCount >= 5 && a.adenomaCount <= 10 && a.adenomaMaxSize < 10 && !a.anyVillous && !a.anyHgd,
      interval: '3 years',
      driver: '5 to 10 tubular adenomas under 10 mm',
      quote: '5-10 tubular adenomas <10 mm | 3 y | Strong | Moderate',
      location: 'Table 4, p.469',
      riskYears: YRS.y3,
    },
    {
      id: 'us_ta_3_4',
      kind: 'rule',
      when: (a) => a.adenomaCount >= 3 && a.adenomaCount <= 4 && a.adenomaMaxSize < 10 && !a.anyVillous && !a.anyHgd,
      interval: '3 to 5 years',
      driver: '3 to 4 tubular adenomas under 10 mm',
      quote: '3-4 tubular adenomas <10 mm | 3-5 y | Weak | Very low',
      location: 'Table 4, p.469',
      riskYears: YRS.y35,
    },
    {
      id: 'us_ta_1_2',
      kind: 'rule',
      when: (a) => a.adenomaCount >= 1 && a.adenomaCount <= 2 && a.adenomaMaxSize < 10 && !a.anyVillous && !a.anyHgd,
      interval: '7 to 10 years',
      driver: '1 to 2 tubular adenomas under 10 mm',
      quote: '1-2 tubular adenomas <10 mm | 7-10 y | Strong | Moderate',
      location: 'Table 4, p.469',
      riskYears: YRS.y710,
    },

    // Table 5 — serrated lesions
    {
      id: 'us_piecemeal_ssp',
      kind: 'rule',
      when: (a) => a.piecemealSslSize >= 20,
      interval: '6 months',
      modality: 'Colonoscopy (polypectomy site check)',
      driver: 'Piecemeal resection of a sessile serrated polyp 20 mm or larger',
      quote: 'Piecemeal resection of SSP ≥20 mm | 6 mo | Strong | Moderate',
      location: 'Table 5, p.470',
      riskYears: YRS.m6,
      notes: () => [
        'USMSTF 2020 states this threshold two ways. Tables 4 and 5 read "Piecemeal resection of adenoma/SSP ≥20 mm"; the prose recommendation on p.478 reads "For patients with piecemeal resection of adenoma or SSP >20 mm, repeat colonoscopy in 6 months." Reported as found.',
      ],
    },
    {
      id: 'us_ssp_10mm',
      kind: 'rule',
      when: (a) => a.sslCount > 0 && a.sslMaxSize >= 10,
      interval: '3 years',
      driver: 'A sessile serrated polyp 10 mm or larger',
      quote: 'SSP ≥10 mm | 3 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y3,
    },
    {
      id: 'us_ssp_dysplasia',
      kind: 'rule',
      when: (a) => a.sslCount > 0 && a.anySslDysplasia,
      interval: '3 years',
      driver: 'A sessile serrated polyp with dysplasia',
      quote: 'SSP with dysplasia | 3 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y3,
    },
    {
      id: 'us_tsa',
      kind: 'rule',
      when: (a) => a.tsaCount > 0,
      interval: '3 years',
      driver: 'A traditional serrated adenoma',
      quote: 'TSA | 3 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y3,
    },
    {
      id: 'us_ssp_5_10',
      kind: 'rule',
      when: (a) => a.sslCount >= 5 && a.sslCount <= 10 && a.sslMaxSize < 10 && !a.anySslDysplasia,
      interval: '3 years',
      driver: '5 to 10 sessile serrated polyps under 10 mm',
      quote: '5-10 SSPs <10 mm | 3 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y3,
    },
    {
      id: 'us_ssp_3_4',
      kind: 'rule',
      when: (a) => a.sslCount >= 3 && a.sslCount <= 4 && a.sslMaxSize < 10 && !a.anySslDysplasia,
      interval: '3 to 5 years',
      driver: '3 to 4 sessile serrated polyps under 10 mm',
      quote: '3-4 SSPs <10 mm | 3-5 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y35,
    },
    {
      id: 'us_ssp_1_2',
      kind: 'rule',
      when: (a) => a.sslCount >= 1 && a.sslCount <= 2 && a.sslMaxSize < 10 && !a.anySslDysplasia,
      interval: '5 to 10 years',
      driver: '1 to 2 sessile serrated polyps under 10 mm',
      quote: '1-2 SSPs <10 mm | 5-10 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y510,
    },
    {
      id: 'us_ssp_over_10_count',
      kind: 'gap',
      when: (a) => a.sslCount > 10 && a.sslMaxSize < 10 && !a.anySslDysplasia,
      interval: gapInterval('USMSTF 2020'),
      modality: null,
      driver:
        'Table 5 bands sessile serrated polyps under 10 mm at 1-2, 3-4 and 5-10; it states no interval for more than 10',
      quote: US_DEFERRED_SCOPE,
      location: 'Table 5, p.470; scope statement, p.465',
    },

    // Table 5 — hyperplastic polyps
    {
      id: 'us_hp_10mm',
      kind: 'rule',
      when: (a) => a.hpCount > 0 && a.hpMaxSize >= 10,
      interval: '3 to 5 years',
      driver: 'A hyperplastic polyp 10 mm or larger',
      quote: 'HP ≥10 mm | 3-5 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y35,
      notes: () => [
        'Table 5 footnote c: "A 3-year follow-up interval is favored if concern about consistency in distinction between SSP and HP locally, bowel preparation, or complete excision, whereas a 5-year interval is favored if low concerns for consistency in distinction between SSP and HP locally, adequate bowel preparation, and confident complete excision."',
      ],
    },
    {
      id: 'us_hp_small_rectosigmoid',
      kind: 'rule',
      when: (a) => a.hpCount > 0 && a.hpCount <= 20 && a.hpMaxSize < 10 && !a.anyProximalHp,
      interval: '10 years',
      driver: 'Hyperplastic polyps under 10 mm in the rectum or sigmoid colon',
      quote: '≤20 HPs in rectum or sigmoid colon <10 mm | 10 y | Strong | Moderate',
      location: 'Table 5, p.470',
      riskYears: YRS.y10,
    },
    {
      id: 'us_hp_small_proximal',
      kind: 'rule',
      when: (a) => a.hpCount > 0 && a.hpCount <= 20 && a.hpMaxSize < 10 && a.anyProximalHp,
      interval: '10 years',
      driver: 'Hyperplastic polyps under 10 mm proximal to the sigmoid colon',
      quote: '≤20 HPs proximal to sigmoid colon <10 mm | 10 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y10,
      notes: () => [
        'USMSTF 2020 states the evidence base for this row is empty, p.474: "We found no published studies on the risk for metachronous advanced neoplasia or large serrated polyps among patients with isolated HPs <10 mm proximal to the sigmoid colon without synchronous conventional adenoma."',
      ],
    },
  ],
  advisories: [
    {
      when: (a) => a.adenomaCount > 0 && a.sslCount > 0,
      note:
        'USMSTF 2020 states no combined rule for adenomas and sessile serrated polyps found at the same examination. Tables 4 and 5 are separate and neither cross-references the other. Guideline, p.475–476: "We were unable to identify published articles that specifically examined risk for metachronous neoplasia in patients with 3-10 SSPs, or any combination of 3-10 SSPs and conventional adenomas." And: "Future research may clarify whether patients with a combination of <10-mm SSPs and conventional adenomas have a distinct risk that should merit different management."',
    },
    {
      when: (a) => a.adenomaCount > 10,
      note:
        'Prose, p.473: "For patients with >10 adenomas completely removed at high-quality examination, repeat colonoscopy in 1 year. (Weak recommendation, very low quality of evidence)"',
    },
  ],
}

// ---------------------------------------------------------------------------
// Ontario — ColonCancerCheck. One unnumbered 2-page tool; the recommendations
// table sits on page 1, Background and Glossary on page 2.
// ---------------------------------------------------------------------------
const ON_MOST_ADVANCED =
  'The recommendations are based on the size and histology of the most advanced lesion and assume a high-quality colonoscopy (i.e., adequate bowel preparation to detect polyps 5 mm in size, complete procedure to cecum, careful examination of the colonic mucosa).'

const ON: JurSpec = {
  short: 'ColonCancerCheck',
  // ColonCancerCheck publishes its own selection principle, Background bullet
  // 3, page 2: the recommendation follows the most advanced lesion. Choosing
  // among its rows is the guideline's own instruction, quoted below.
  selectionPublished: () => true,
  malignant: {
    driver:
      'ColonCancerCheck states no rule for a polyp containing cancer. Its table has no such row and it names no pathway to route one to',
    quote: ON_MOST_ADVANCED,
    location: 'Background, bullet 3, page 2',
  },
  special: {
    driver: 'ColonCancerCheck addresses family history only, and only after a normal colonoscopy',
    quote:
      'The recall interval following a normal colonoscopy for people with a family history of colorectal cancer in a first-degree relative should be based on family history or surveillance recommendations, whichever interval is shorter.',
    location: 'Background, bullet 1, page 2',
  },
  prep: {
    precondition: {
      quote: ON_MOST_ADVANCED,
      location: 'Background, bullet 3, page 2',
    },
    pathway: null,
    notes: [
      'The repeat timing is a clinical decision. Ontario publishes no interval to place it at.',
      'Ontario publishes a separate bowel preparation document, the Cancer Care Ontario / Colonoscopy Quality Management Partnership Bowel Preparation Selection Best Practice Guidelines. It is scoped to regimen selection: a decision guide and a dosing, diet and hydration table across three scenarios. Its only mention of repeat examinations is descriptive, and states no interval: "Furthermore, inadequate bowel preparation can result in repeat examinations and shorter intervals between screening and surveillance procedures which have a substantial economic burden (Johnson et al, 2014)." That sentence cites the US Task Force document which does carry a 1-year repeat, and borrows only the economics from it.',
      'Ontario\'s colonoscopy quality guideline publishes a quality target rather than an interval: "<10% of patients require a repeat colonoscopy examination due to poor bowel preparation" and "inadequate preparation should occur in no more than 10% of colonoscopies". Colonoscopy quality assurance in Ontario: Systematic review and clinical practice guideline. Can J Gastroenterol Hepatol 2014; PMC4049257.',
    ],
  },
  rules: [
    {
      id: 'on_normal',
      kind: 'rule',
      when: (a) => !a.hasAnyLesion,
      interval: '10 years',
      modality: 'FIT',
      driver: 'A normal colonoscopy',
      quote: 'No polyps / Hyperplastic polyp(s) in rectum or sigmoid | FIT* | 10 years',
      location: 'Table, "Initial colonoscopy" half, row 1, page 1',
      riskYears: YRS.y10,
    },
    {
      id: 'on_hp_rectosigmoid',
      kind: 'rule',
      when: (a) => a.hpCount > 0 && !a.anyProximalHp,
      interval: '10 years',
      modality: 'FIT',
      driver: 'Hyperplastic polyp(s) in the rectum or sigmoid',
      quote: 'No polyps / Hyperplastic polyp(s) in rectum or sigmoid | FIT* | 10 years',
      location: 'Table, "Initial colonoscopy" half, row 1, page 1',
      riskYears: YRS.y10,
      notes: () => [
        'ColonCancerCheck attaches no size threshold to its hyperplastic-polyp row; the row is restricted by location only.',
      ],
    },
    {
      id: 'on_hp_proximal',
      kind: 'gap',
      when: (a) => a.hpCount > 0 && a.anyProximalHp,
      interval: gapInterval('ColonCancerCheck'),
      modality: null,
      driver:
        'ColonCancerCheck’s only hyperplastic-polyp row is restricted to the rectum or sigmoid; it states no interval for a hyperplastic polyp proximal to the sigmoid',
      quote: 'No polyps / Hyperplastic polyp(s) in rectum or sigmoid | FIT* | 10 years',
      location: 'Table, "Initial colonoscopy" half, row 1, page 1',
      notes: () => [
        'Glossary, page 2: "Hyperplastic polyp: hyperplastic polyps are very common and usually occur as diminutive (<5mm) nondysplastic polyps in the rectum and sigmoid colon. These polyps are not associated with an increased risk of colorectal cancer and are therefore not considered to be screen-relevant lesions." This describes the typical polyp; ColonCancerCheck states no rule for the proximal case.',
      ],
    },
    {
      id: 'on_low_risk_adenoma',
      kind: 'rule',
      when: (a) => a.adenomaCount >= 1 && a.adenomaCount <= 2 && a.adenomaMaxSize < 10 && !a.anyVillous && !a.anyHgd,
      interval: '5 years',
      modality: 'FIT',
      driver: 'Low risk adenoma(s)',
      quote: 'Low risk adenoma(s) | FIT* | 5 years',
      location: 'Table, "Initial colonoscopy" half, row 2, page 1',
      riskYears: YRS.y5,
      notes: () => [
        'Glossary, page 2: "Low risk adenomas: 1 to 2 tubular adenoma(s) <10mm in diameter with no high-grade dysplasia."',
      ],
    },
    {
      id: 'on_high_risk_adenoma',
      kind: 'rule',
      when: (a) => a.adenomaCount > 0 && (a.adenomaMaxSize >= 10 || a.adenomaCount >= 3 || a.anyVillous || a.anyHgd),
      interval: '3 years',
      modality: 'Colonoscopy',
      driver: 'High risk adenoma(s)',
      quote: 'High risk adenoma(s) | Colonoscopy | 3 years',
      location: 'Table, "Initial colonoscopy" half, row 3, page 1',
      riskYears: YRS.y3,
      notes: () => [
        'Glossary, page 2: "High risk adenomas (also called advanced adenomas): Tubular adenoma >=10mm, 3 or more adenomas, adenoma(s) with villous histology or adenoma with high-grade dysplasia."',
      ],
    },
    {
      id: 'on_adenomas_over_10',
      kind: 'rule',
      when: (a) => a.adenomaCount > 10,
      interval: '≤1 year',
      modality: 'Clearing colonoscopy',
      driver: 'More than 10 adenomas',
      quote: '>10 adenomas | Clearing colonoscopy | ≤1 year',
      location: 'Table, "Initial colonoscopy" half, row 4, page 1',
      riskYears: YRS.y1,
      notes: () => [
        'Note 3, page 1: "People with >10 adenomas should undergo genetic assessment for familial adenomatous polyposis syndromes. The subsequent surveillance interval will depend on the results of the genetic assessment and whether the colon is cleared of polyps. If there is no familial adenomatous polyposis syndrome and after the colon is cleared, surveillance recommendation is colonoscopy in <3 years."',
      ],
    },
    {
      id: 'on_ssa_small',
      kind: 'rule',
      when: (a) => a.sslCount > 0 && a.sslMaxSize < 10 && !a.anySslDysplasia,
      interval: '5 years',
      modality: 'Colonoscopy',
      driver: 'Sessile serrated adenoma(s) under 10 mm without dysplasia',
      quote: 'Any sessile serrated adenoma(s) <10mm without dysplasia | Colonoscopy | 5 years',
      location: 'Table, "Initial colonoscopy" half, row 5, page 1',
      riskYears: YRS.y5,
      notes: () => ['ColonCancerCheck attaches no count threshold to its serrated rows.'],
    },
    {
      id: 'on_ssa_advanced',
      kind: 'rule',
      when: (a) => (a.sslCount > 0 && a.sslMaxSize >= 10) || a.anySslDysplasia || a.tsaCount > 0,
      interval: '3 years',
      modality: 'Colonoscopy',
      driver:
        'A sessile serrated adenoma 10 mm or larger, a sessile serrated adenoma with dysplasia, or a traditional serrated adenoma',
      quote:
        'Sessile serrated adenoma(s) ≥10 mm / Sessile serrated adenoma(s) with dysplasia / Traditional serrated adenoma | Colonoscopy | 3 years',
      location: 'Table, "Initial colonoscopy" half, row 6, page 1',
      riskYears: YRS.y3,
    },
    {
      id: 'on_piecemeal',
      kind: 'rule',
      when: (a) => a.anyPiecemeal,
      interval: '≤6 months',
      modality: 'Colonoscopy to check polypectomy site',
      driver: 'A large sessile polyp removed piecemeal',
      quote: 'Large sessile polyp removed piecemeal | Colonoscopy to check polypectomy site | ≤6 months',
      location: 'Table, "Initial colonoscopy" half, row 7, page 1',
      riskYears: YRS.m6,
      notes: () => [
        'ColonCancerCheck defines "large" nowhere in this tool — not in the table, the notes, the Background or the Glossary — and attaches no millimetre threshold to this row. Whether the lesion was large is the endoscopist’s judgement.',
      ],
    },
  ],
  advisories: [
    {
      when: (a) => a.adenomaCount > 0 && (a.sslCount > 0 || a.tsaCount > 0),
      note:
        'ColonCancerCheck states no rule for an adenoma and a serrated lesion found at the same examination. Its selection principle, Background bullet 3, page 2: "' +
        ON_MOST_ADVANCED +
        '" That principle ranks by size and histology; it does not state how an adenoma and a serrated lesion rank against each other, and the two families also differ in modality (FIT vs colonoscopy).',
    },
  ],
}

// ---------------------------------------------------------------------------
// Alberta — ACRCSP. Unnumbered prose recommendations; no numbered tables.
// ---------------------------------------------------------------------------
const AB_HIGH_QUALITY =
  'Ensure that a high-quality baseline colonoscopy has been performed. A high-quality colonoscopy is one where: the cecum is reached with photo documentation, bowel preparation allows adequate visualization of all colonic mucosa, with a recommended minimum withdrawal time, with complete removal of all polyps seen, and with documentation that meets endoscopy reporting standards.'

const AB_HP_LARGE =
  'For a colonoscopy finding of hyperplastic polyp(s) ≥10mm: Proximal to sigmoid colon, the panel recommends colonoscopy in 3 years. In rectosigmoid, the panel recommends colonoscopy in 5 years.'

const AB_SSL_SMALL_RULE = 'For a colonoscopy finding of 3–10 sessile serrated lesions <10 mm, the panel recommends colonoscopy in 3 years.'
const AB_SSL_LARGE_RULE =
  'For a colonoscopy finding of one or more sessile serrated lesion(s) >10 mm, or traditional serrated adenoma(s) (any size), or sessile serrated lesion with dysplasia (any size), the panel recommends colonoscopy in 3 years.'

const AB: JurSpec = {
  short: 'ACRCSP',
  // ACRCSP publishes its own selection principle: "The decision regarding
  // surveillance interval should be based on the most advanced finding(s) at
  // the initial colonoscopy." Choosing among its rows is the guideline's own
  // instruction, quoted in the advisory below.
  selectionPublished: () => true,
  malignant: {
    driver: 'ACRCSP states no rule for a polyp containing cancer; the article covers post-polypectomy surveillance only',
    quote: 'Our revised recommendations build upon the assumption that a high-quality index colonoscopy has been performed at baseline.',
    location: 'Recommendations for post-polypectomy surveillance',
  },
  special: {
    driver: 'ACRCSP places family history, heritable factors and inflammatory bowel disease outside the scope of this work',
    quote:
      'These surveillance recommendations also need to consider baseline risk for colorectal cancer (CRC) based on family history or other heritable factors or existing illness (such as inflammatory bowel disease (IBD)) and adjustments may need to be made within the 10-year interval.',
    location: 'Recommendations for post-polypectomy surveillance; scope statement: "Surveillance recommendations also need to consider baseline risk for CRC based on other factors such as family history (outside the scope of this work)."',
  },
  prep: {
    precondition: {
      quote: AB_HIGH_QUALITY,
      location: 'Recommendations for post-polypectomy surveillance, preamble',
    },
    pathway: {
      interval: null,
      modality: 'Repeat colonoscopy, or less preferably CT colonography',
      driver:
        'The Alberta Colorectal Cancer Screening Program requires a repeat colonoscopy after a failed preparation and attaches no timeframe to it',
      quote:
        'Patients with a failed colonoscopy (for example due to inability to reach cecum or poor bowel preparation) should undergo repeat colonoscopy (either by same operator or referred, depending on the reason why the colonoscopy was incomplete) or, less preferably, diagnostic imaging of the colon by CT colonography.',
      location: 'Narrative preamble on ensuring a high-quality baseline examination, not the numbered recommendations',
      strength: null,
      source: PREP_SRC.CA_AB_2013,
      separate: true,
      notes: [
        'This sentence is ungraded narrative guidance. ACRCSP prints no strength or evidence label against it.',
        'ACRCSP assigns intervals to lesion findings only: 5–10 years for low-risk adenomas, 3 years for high-risk, 2–6 months for piecemeal resection, 1 year for serrated polyposis. None of them covers preparation.',
      ],
    },
    notes: [
      'The repeat timing is a clinical decision. ACRCSP requires the repeat and publishes no interval to place it at.',
      'The 2024 update these surveillance intervals come from likewise publishes no interval, and treats preparation as a precondition: "A high-quality colonoscopy is one where: the cecum is reached with photo documentation, bowel preparation allows adequate visualization of all colonic mucosa..."',
    ],
  },
  rules: [
    {
      id: 'ab_synchronous_declined',
      kind: 'declined',
      // ACRCSP declines only for a synchronous SSL and a TUBULAR adenoma. A villous
      // or high-grade-dysplasia adenoma is an advanced lesion that maps to the
      // 3-year advanced rule, so it is excluded here rather than shown a
      // tubular-adenoma "no recommendation".
      when: (a) => a.sslCount > 0 && a.adenomaCount > 0 && !a.anyVillous && !a.anyHgd,
      interval: gapInterval('ACRCSP'),
      modality: null,
      driver: 'Synchronous sessile serrated lesions and tubular adenomas — ACRCSP explicitly declines to make a recommendation',
      quote: 'For a colonoscopy finding of synchronous sessile serrated lesions and tubular adenomas, no recommendation made.',
      location: 'Subsection "Initial colonoscopy finding of: Synchronous sessile serrated lesion and tubular adenoma" > RECOMMENDATION (unnumbered)',
      notes: () => [
        'Rationale: "The panel determined that there was insufficient current evidence to make a recommendation for a colonoscopy finding of synchronous sessile serrated lesion and tubular adenoma." Voting: "Unanimous decision (10/10)."',
      ],
    },
    {
      id: 'ab_normal',
      kind: 'rule',
      when: (a) => !a.hasAnyLesion,
      interval: '10 years',
      modality: 'FIT',
      driver: 'A normal colonoscopy',
      quote: 'For an average risk patient with no polyps or normal findings on colonoscopy, the panel recommends FIT in 10 years.',
      location: 'Subsection "Initial colonoscopy finding of: Normal or no polyps" > RECOMMENDATION (unnumbered)',
      riskYears: YRS.y10,
    },
    {
      id: 'ab_piecemeal',
      kind: 'rule',
      when: (a) => a.anyPiecemeal && a.piecemealSize >= 10,
      interval: '6 months',
      modality: 'Repeat endoscopic assessment',
      driver: 'Piecemeal removal of a large (≥10 mm) non-pedunculated polyp or lesion',
      quote:
        'Following complete endoscopic piecemeal removal of a large (≥10 mm) non-pedunculated polyp or lesion, recommend first repeat endoscopic assessment* in 6 months.',
      location: 'Subsection "Initial colonoscopy finding of: Piecemeal resection of a large (≥10 mm) non-pedunculated polyp or lesion" > RECOMMENDATION (unnumbered)',
      riskYears: YRS.m6,
      notes: (a) => [
        a.piecemealSize >= 20
          ? 'Onward schedule: "If the initial polyp was ≥20 mm, the next surveillance colonoscopy should be in 1 year. If no recurrence is detected at the resection site, the panel recommends subsequent colonoscopy surveillance in 3 years."'
          : 'Onward schedule: "If the initial polyp was ≥10 mm–19 mm, the next surveillance colonoscopy should be in 3 years***. If no recurrence is detected at the resection site, the panel recommends subsequent colonoscopy surveillance in 5 years." Footnote ***: "Consideration for 12-month follow-up if high grade dysplasia, resection required multiple passes or challenging position noted."',
        'Footnote *: "For recto-sigmoid lesions, the choice of limited flexible sigmoidoscopy vs full colonoscopy is left to endoscopist’s discretion."',
        'ACRCSP states no interval for the case where recurrence is detected at the resection site; both branches specify only the no-recurrence path.',
      ],
    },
    {
      id: 'ab_hp_small',
      kind: 'rule',
      when: (a) => a.hpCount > 0 && a.hpMaxSize < 10,
      interval: '10 years',
      modality: 'FIT',
      driver: 'Hyperplastic polyp(s) under 10 mm',
      quote: 'For an average risk patient with finding(s) of hyperplastic polyp(s) <10 mm, the panel recommends FIT in 10 years.',
      location: 'Subsection "Initial colonoscopy finding of: hyperplastic polyp(s) <10 mm" > RECOMMENDATION (unnumbered)',
      riskYears: YRS.y10,
      notes: () => [
        'ACRCSP words this rule without a location qualifier. Its proximal/rectosigmoid split appears only at the ≥10 mm threshold.',
      ],
    },
    {
      id: 'ab_hp_large_proximal',
      kind: 'rule',
      when: (a) => a.hpProximalMaxSize >= 10,
      interval: '3 years',
      modality: 'Colonoscopy',
      driver: 'A hyperplastic polyp 10 mm or larger, proximal to the sigmoid colon',
      quote: AB_HP_LARGE,
      location: 'Subsection "Initial colonoscopy finding of: hyperplastic polyp(s) ≥10 mm." > RECOMMENDATION (unnumbered)',
      riskYears: YRS.y3,
    },
    {
      id: 'ab_hp_large_rectosigmoid',
      kind: 'rule',
      when: (a) => a.hpDistalMaxSize >= 10,
      interval: '5 years',
      modality: 'Colonoscopy',
      driver: 'A hyperplastic polyp 10 mm or larger, in the rectosigmoid',
      quote: AB_HP_LARGE,
      location: 'Subsection "Initial colonoscopy finding of: hyperplastic polyp(s) ≥10 mm." > RECOMMENDATION (unnumbered)',
      riskYears: YRS.y5,
      notes: () => ['Supporting text: "Larger rectosigmoid lesions should be removed and if hyperplastic, colonoscopy in 5 years is recommended."'],
    },
    {
      id: 'ab_ta_1_2',
      kind: 'rule',
      when: (a) => a.adenomaCount >= 1 && a.adenomaCount <= 2 && a.adenomaMaxSize < 10 && !a.anyVillous && !a.anyHgd,
      interval: '5 years',
      modality: 'FIT',
      driver: '1 or 2 tubular adenoma(s) under 10 mm',
      quote: 'For a colonoscopy finding of 1 or 2 tubular adenoma(s) <10 mm, the panel recommends FIT in 5 years.',
      location: 'Subsection "Initial colonoscopy finding of: 1 or 2 tubular adenoma(s) <10 mm." > RECOMMENDATION (unnumbered)',
      riskYears: YRS.y5,
    },
    {
      id: 'ab_ta_3_4',
      kind: 'rule',
      when: (a) => a.adenomaCount >= 3 && a.adenomaCount <= 4 && a.adenomaMaxSize < 10 && !a.anyVillous && !a.anyHgd,
      interval: '5 years',
      modality: 'Colonoscopy',
      driver: '3 or 4 tubular adenomas under 10 mm',
      quote: 'For a colonoscopy finding of 3 or 4 tubular adenomas <10 mm, the panel recommends colonoscopy in 5 years.',
      location: 'Subsection "Initial colonoscopy finding of: 3 or 4 tubular adenomas <10 mm." > RECOMMENDATION (unnumbered)',
      riskYears: YRS.y5,
    },
    {
      id: 'ab_adenoma_advanced',
      kind: 'rule',
      when: (a) =>
        a.adenomaCount > 0 &&
        ((a.adenomaCount >= 5 && a.adenomaCount <= 10 && a.adenomaMaxSize < 10 && !a.anyVillous && !a.anyHgd) ||
          a.adenomaMaxSize >= 10 ||
          a.anyVillous ||
          a.anyHgd),
      interval: '3 years',
      modality: 'Colonoscopy',
      driver: '5 to 10 tubular adenomas under 10 mm, or any adenoma 10 mm or larger, or villous/tubulovillous features, or high-grade dysplasia',
      quote:
        'For a colonoscopy finding of 5–10 tubular adenomas <10 mm, or any adenoma ≥10 mm, or with villous/tubulovillous features or high-grade dysplasia, the panel recommends colonoscopy in 3 years.',
      location: 'Subsection "Initial colonoscopy finding of: 5–10 tubular adenomas <10 mm, or any adenoma ≥10 mm, or with villous/tubulovillous features or high-grade dysplasia." > RECOMMENDATION (unnumbered)',
      riskYears: YRS.y3,
      notes: () => ['Voting: "Decision achieved by consensus (9/10)." — the only non-unanimous polyp recommendation.'],
    },
    {
      id: 'ab_adenomas_over_10',
      kind: 'rule',
      when: (a) => a.adenomaCount > 10,
      interval: '1 year',
      modality: 'Colonoscopy',
      driver: 'More than 10 tubular adenomas on a single colonoscopy',
      quote:
        'For a colonoscopy finding of more than 10 tubular adenomas on a single colonoscopy, the panel recommends colonoscopy in 1 year and consider genetic counseling.',
      location: 'Subsection "Initial colonoscopy finding of: More than 10 tubular adenoma(s)." > RECOMMENDATION (unnumbered)',
      riskYears: YRS.y1,
      notes: () => [
        'Supporting text: "Given that Alberta has limited access to genetic testing, the panel suggested genetic counselling at the endoscopist’s discretion rather than an absolute recommendation."',
        'This rule is per-exam: "more than 10 tubular adenomas on a single colonoscopy". ACRCSP states no cumulative-lifetime count rule of its own.',
      ],
    },
    {
      id: 'ab_ssl_1_2',
      kind: 'rule',
      when: (a) => a.sslCount >= 1 && a.sslCount <= 2 && a.sslMaxSize < 10 && !a.anySslDysplasia,
      interval: '5 years',
      modality: 'Colonoscopy',
      driver: '1 or 2 sessile serrated lesions under 10 mm',
      quote: 'For a colonoscopy finding of 1 or 2 sessile serrated lesions <10 mm, the panel recommends colonoscopy in 5 years.',
      location: 'Subsection "Initial colonoscopy finding of: 1 or 2 sessile serrated lesions <10 mm." > RECOMMENDATION (unnumbered)',
      riskYears: YRS.y5,
    },
    {
      id: 'ab_ssl_3_10',
      kind: 'rule',
      when: (a) => a.sslCount >= 3 && a.sslCount <= 10 && a.sslMaxSize < 10 && !a.anySslDysplasia,
      interval: '3 years',
      modality: 'Colonoscopy',
      driver: '3 to 10 sessile serrated lesions under 10 mm',
      quote: AB_SSL_SMALL_RULE,
      location: 'Subsection "Initial colonoscopy finding of: 3–10 sessile serrated lesions <10 mm." > RECOMMENDATION (unnumbered)',
      riskYears: YRS.y3,
      notes: () => ['ACRCSP on this threshold: "The cut-off for this recommendation at 10 polyps is somewhat arbitrary."'],
    },
    {
      id: 'ab_ssl_advanced',
      kind: 'rule',
      when: (a) => (a.sslCount > 0 && a.sslMaxSize > 10) || a.anySslDysplasia || a.tsaCount > 0,
      interval: '3 years',
      modality: 'Colonoscopy',
      driver:
        'A sessile serrated lesion larger than 10 mm, a traditional serrated adenoma of any size, or a sessile serrated lesion with dysplasia of any size',
      quote: AB_SSL_LARGE_RULE,
      location:
        'Subsection "Initial colonoscopy finding of: One or more sessile serrated lesion(s) >10 mm, or traditional serrated adenomas (any size) or SSL with dysplasia (any size)." > RECOMMENDATION (unnumbered)',
      riskYears: YRS.y3,
    },
    {
      id: 'ab_ssl_exactly_10',
      kind: 'gap',
      when: (a) => a.sslCount > 0 && a.sslMaxSize === 10 && !a.anySslDysplasia,
      interval: gapInterval('ACRCSP'),
      modality: null,
      driver:
        'ACRCSP words its small sessile serrated lesion rules "<10 mm" and its large sessile serrated lesion rule ">10 mm"; a sessile serrated lesion measured at exactly 10 mm is covered by neither as written',
      quote: AB_SSL_LARGE_RULE,
      location:
        'Subsections "1 or 2 sessile serrated lesions <10 mm", "3–10 sessile serrated lesions <10 mm" and "One or more sessile serrated lesion(s) >10 mm..."',
      notes: () => [
        'The adenoma and hyperplastic-polyp rules use "≥10 mm". The sessile serrated rules do not. ACRCSP does not flag or resolve the difference.',
      ],
    },
    {
      id: 'ab_ssl_over_10_count',
      kind: 'gap',
      when: (a) => a.sslCount > 10 && a.sslMaxSize < 10 && !a.anySslDysplasia,
      interval: gapInterval('ACRCSP'),
      modality: null,
      driver:
        'ACRCSP bands sessile serrated lesions under 10 mm at 1-2 and 3-10; it states no interval for more than 10',
      quote: AB_SSL_SMALL_RULE,
      location: 'Subsection "Initial colonoscopy finding of: 3–10 sessile serrated lesions <10 mm." > RECOMMENDATION (unnumbered)',
      notes: () => ['ACRCSP on this threshold: "The cut-off for this recommendation at 10 polyps is somewhat arbitrary."'],
    },
  ],
  advisories: [
    {
      when: (a) => a.totalLesions > 1,
      note:
        'ACRCSP selection principle: "The decision regarding surveillance interval should be based on the most advanced finding(s) at the initial colonoscopy. Colonoscopy findings should be confirmed by final pathology results."',
    },
    {
      when: (a) => a.anyPiecemeal && a.piecemealSize < 10,
      note:
        'ACRCSP defines piecemeal resection with a size floor: "Piecemeal resection is the resection of a ≥10mm non-pedunculated polyp or lesion, where more than one pass of the snare is required either due to size or polyp orientation." It states no rule for piecemeal resection of a lesion under 10 mm. It also concedes: "The panel identified that there is a lack of uniformity in the definition of piecemeal resection."',
    },
  ],
}

// ---------------------------------------------------------------------------
// British Columbia — BCGuidelines.ca 2022. Table 1 pools adenomas and serrated
// lesions into one "precancerous lesion" count; that is BC's own structure.
// ---------------------------------------------------------------------------
const BC_HIGH_RISK_DEF =
  'The risk of a precancerous lesion becoming malignant is greatest for ‘high risk’ lesions (also known as advanced adenomas), which are defined as having any of the following: a) adenomas with villous features b) adenomas with high grade dysplasia c) adenomas or sessile serrated lesion (SSL) ≥ 10 mm (as measured by the colonoscopist at the time of excision) d) sessile serrated lesions (SSLs) with cytologic dysplasia e) Traditional serrated adenomas (TSAs) f) hyperplastic polyps ≥ 10 mm (as measured by the colonoscopist at the time of excision).'

// BC counts adenomas and serrated lesions together. Hyperplastic polyps under
// 10 mm are the one lesion BC says has "no potential for malignant
// transformation"; hyperplastic polyps ≥ 10 mm are high risk criterion (f).
const bcPrecancerousCount = (a: Agg): number =>
  a.adenomaCount + a.sslCount + a.tsaCount + (a.hpMaxSize >= 10 ? a.hpCount : 0)

const bcHighRisk = (a: Agg): boolean =>
  (a.adenomaCount > 0 && (a.anyVillous || a.anyHgd || a.adenomaMaxSize >= 10)) ||
  (a.sslCount > 0 && (a.sslMaxSize >= 10 || a.anySslDysplasia)) ||
  a.tsaCount > 0 ||
  (a.hpCount > 0 && a.hpMaxSize >= 10)

const BC: JurSpec = {
  short: 'BCGuidelines 2022',
  // Table 1 counts adenomas and serrated lesions together as one precancerous
  // lesion tally, so a mixed examination reaches a row BC prints rather than a
  // choice between rows.
  selectionPublished: () => true,
  malignant: {
    driver:
      'BCGuidelines 2022 splits into "Following removal of precancerous lesions" and "Follow-up after CRC with curative resection"; it states no category for an endoscopically resected malignant polyp',
    quote:
      'The importance of a high-quality baseline colonoscopy cannot be overstated. A complete exam to the cecum, an adequate bowel preparation, and careful inspection of the mucosa with optimal polypectomy technique are associated with a decreased risk of CRC and CRC death.',
    location: 'Management, page 2',
  },
  special: {
    driver: 'BCGuidelines 2022 excludes this population from its scope',
    quote: 'It does not apply to individuals with colonic hereditary predisposition syndromes or inflammatory bowel disease.',
    location: 'Scope, page 1',
  },
  prep: {
    precondition: {
      quote:
        'The importance of a high-quality baseline colonoscopy cannot be overstated. A complete exam to the cecum, an adequate bowel preparation, and careful inspection of the mucosa with optimal polypectomy technique are associated with a decreased risk of CRC and CRC death.',
      location: 'Management, page 2',
    },
    pathway: {
      interval: null,
      modality: 'Repeat colonoscopy',
      driver:
        'The BC Cancer Colon Screening Program requires re-booking as soon as possible after a failed preparation and attaches no timeframe to it',
      quote:
        'If a colonoscopy is incomplete due to a poor bowel preparation, then the colonoscopist should specify the bowel preparation for the next colonoscopy and re-book the participant in a Colon Screening Program slot. After a failed preparation, an individualized bowel preparation will be required. On the Colonoscopy Reporting Form, the colonoscopist will tick the box for "Repeat Colonoscopy". Local processes should be used for re-booking the patient as soon as possible. The colonoscopist is responsible for ensuring the patient is re-booked.',
      location: 'Section 2.2, Bowel Preparation',
      strength: null,
      source: PREP_SRC.CA_BC_STANDARDS,
      separate: true,
      notes: [
        'This is a programmatic operational standard. BC Cancer prints no strength or evidence label against it.',
        'BC Cancer states a number for the comparable failure to reach the cecum: "further investigations need to be arranged within 60 days". It states no equivalent number for a poor preparation.',
        'BC Cancer\'s quality target defines the category, and again carries no interval: "Poor = inadequate to detect all polyps > 5mm", with "If inadequate, further investigations need to be arranged, for instance a repeat colonoscopy with a more intensive bowel preparation".',
        'The revision history of this standard records version 2.4, February 2025, updating Section 2.2 for "Timing for re-booking patients with a poor bowel prep". The wording it arrived at is qualitative.',
      ],
    },
    notes: [
      'The repeat timing is a clinical decision. BC Cancer requires the re-booking and publishes no interval to place it at.',
      'BCGuidelines 2022, the source of these surveillance intervals, names adequate preparation only as a quality attribute of the baseline colonoscopy its Table 1 intervals assume. It publishes no repeat interval.',
    ],
  },
  rules: [
    {
      id: 'bc_normal',
      kind: 'rule',
      when: (a) => !a.hasAnyLesion,
      interval: 'No surveillance required. Resume screening',
      modality: null,
      driver: 'A normal colonoscopy',
      quote:
        'Individuals with no polyps or only hyperplastic polyps < 10 mm* | No surveillance required. Resume screening as per: BCGuidelines.ca: Screening for the Purposes of Colorectal Cancer Prevention and Detection in Asymptomatic Adults',
      location: 'Table 1: Surveillance Recommendations, row 1, page 3',
      riskYears: YRS.y10,
    },
    {
      id: 'bc_hp_small_only',
      kind: 'rule',
      when: (a) => a.hpCount > 0 && a.hpMaxSize < 10 && a.adenomaCount === 0 && a.sslCount === 0 && a.tsaCount === 0,
      interval: 'No surveillance required. Resume screening',
      modality: null,
      driver: 'Only hyperplastic polyps under 10 mm',
      quote:
        'Individuals with no polyps or only hyperplastic polyps < 10 mm* | No surveillance required. Resume screening as per: BCGuidelines.ca: Screening for the Purposes of Colorectal Cancer Prevention and Detection in Asymptomatic Adults',
      location: 'Table 1: Surveillance Recommendations, row 1, page 3',
      riskYears: YRS.y10,
      notes: () => [
        'Basis, page 2: "Hyperplastic polyps (HPs) < 10mm have no potential for malignant transformation and following removal require no special surveillance."',
        'This Table 1 row carries an asterisk whose footnote text does not appear anywhere in the 8-page document. Whatever qualifier it points at is not recoverable from the guideline.',
      ],
    },
    {
      id: 'bc_piecemeal',
      kind: 'rule',
      // The rule is for a precancerous lesion removed piecemeal. A benign
      // hyperplastic polyp removed piecemeal is not precancerous and must not
      // trigger the 6-month site check.
      when: (a) => a.piecemealPrecancerousSize > 0,
      interval: '6 months',
      modality: 'Colonoscopy to assess the site of lesion removal',
      driver: 'A large precancerous lesion removed piecemeal',
      quote:
        'Individuals with large precancerous lesions removed in a piecemeal fashion (rather than in a single piece) are at risk of residual precancerous tissue. Repeat colonoscopy to assess the site of lesion removal is recommended at 6 months. Further surveillance colonoscopy intervals will be based on several factors and will be at the discretion of the physician performing the colonoscopy.',
      location: 'Paragraph immediately below Table 1, page 3',
      riskYears: YRS.m6,
      notes: () => [
        'BCGuidelines 2022 attaches no millimetre value to "large" anywhere in the document. Whether the lesion was large is the endoscopist’s judgement.',
        'Intervals after the 6-month site check are left to the physician performing the colonoscopy; the "several factors" are not enumerated.',
      ],
    },
    {
      id: 'bc_high_risk',
      kind: 'rule',
      when: (a) => bcHighRisk(a),
      interval: 'Follow-up colonoscopy in 3 years',
      modality: 'Colonoscopy',
      driver: '1 or more high risk lesion(s)',
      quote: 'Individuals with 1 or more high risk lesion(s) | Follow-up colonoscopy in 3 years',
      location: 'Table 1: Surveillance Recommendations, row 4, page 3',
      riskYears: YRS.y3,
      notes: () => [`Epidemiology, page 2: "${BC_HIGH_RISK_DEF}"`],
    },
    {
      id: 'bc_5_plus_low_risk',
      kind: 'rule',
      when: (a) => !bcHighRisk(a) && bcPrecancerousCount(a) >= 5,
      interval: 'Follow-up colonoscopy in 3 years',
      modality: 'Colonoscopy',
      driver: '5 or more low risk precancerous lesions',
      quote:
        'Individuals with 5 or more low risk precancerous lesions (< 10 mm, tubular adenomas with only low-grade dysplasia or SSLs without dysplasia) | Follow-up colonoscopy in 3 years',
      location: 'Table 1: Surveillance Recommendations, row 3, page 3',
      riskYears: YRS.y3,
      notes: () => [
        'Basis, page 2: "Individuals having multiple precancerous lesions are also at higher risk of CRC. This was previously defined as 3 or more precancerous lesions; however, more recent evidence suggests that the risk of CRC appears to increase once 5 or more precancerous lesions are detected."',
      ],
    },
    {
      id: 'bc_1_4_low_risk',
      kind: 'rule',
      when: (a) => !bcHighRisk(a) && bcPrecancerousCount(a) >= 1 && bcPrecancerousCount(a) <= 4,
      interval: 'Follow-up colonoscopy in 10 years',
      modality: 'Colonoscopy',
      driver: '1 to 4 low risk precancerous lesions',
      quote:
        'Individuals with 1 to 4 low risk precancerous lesions (< 10 mm, tubular adenomas with only low-grade dysplasia or SSLs without dysplasia) | Follow-up colonoscopy in 10 years',
      location: 'Table 1: Surveillance Recommendations, row 2, page 3',
      riskYears: YRS.y10,
    },
  ],
  advisories: [
    {
      when: (a) => a.hpCount > 0 && a.hpMaxSize < 10 && (a.adenomaCount > 0 || a.sslCount > 0 || a.tsaCount > 0),
      note:
        'BCGuidelines 2022 states no rule for whether hyperplastic polyps under 10 mm count toward the "1 to 4" or "5 or more" low-risk tally in a mixed examination; its Table 1 row for hyperplastic polyps covers only the pure case ("only hyperplastic polyps < 10 mm"). This tool does not count them, on the basis of the guideline\'s own statement that they "have no potential for malignant transformation".',
    },
    {
      when: (a) => a.totalLesions >= 10,
      note:
        'Management, page 2: "If the number of precancerous lesions removed during an individual\'s lifetime is 10 or more, then referral to the Hereditary Cancer Program for evaluation of a potential genetic predisposition to CRC is recommended." This count is cumulative over a lifetime, not per-examination.',
    },
    {
      when: (a) => a.anyPiecemeal && bcHighRisk(a),
      note:
        'BCGuidelines 2022 states no rule for how the 6-month piecemeal site check and the 3-year high-risk interval relate — whether the 3-year clock runs from this colonoscopy or from the 6-month check is not stated.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Europe — ESGE 2020. Recommendations key on the current examination only.
// ESGE abandoned risk categories: "we abandoned the terms 'high risk' and 'low
// risk' when referring to patients or polyps, replacing them with 'need' or
// 'no need' of surveillance."
// ---------------------------------------------------------------------------
const EU_PRECONDITION =
  'The following recommendations for post-polypectomy colonoscopic surveillance apply to all patients who had one or more polyps that were completely removed during a high quality baseline colonoscopy. Strong recommendation, moderate quality evidence.'

const EU_REC2 =
  'ESGE recommends surveillance colonoscopy after 3 years for patients with complete removal of at least 1 adenoma ≥10 mm or with high grade dysplasia, or ≥5 adenomas, or any serrated polyp ≥10 mm or with dysplasia. Strong recommendation, moderate quality evidence.'

// Recommendation 2's own trigger, read literally. ESGE does not subtype
// serrated polyps, so a hyperplastic polyp ≥10 mm is a serrated polyp ≥10 mm.
const euNeedsSurveillance = (a: Agg): boolean =>
  (a.adenomaCount > 0 && a.adenomaMaxSize >= 10) ||
  (a.adenomaCount > 0 && a.anyHgd) ||
  a.adenomaCount >= 5 ||
  (a.serratedCount > 0 && a.serratedMaxSize >= 10) ||
  a.anySslDysplasia ||
  a.tsaCount > 0

const EU: JurSpec = {
  short: 'ESGE 2020',
  // Recommendations 1 and 2 are mutually exclusive, and each already spans
  // adenomas and serrated polyps, so no two of them apply at once. The only
  // other row is Recommendation 3, which publishes its own order: a 3–6-month
  // early repeat, then "A first surveillance colonoscopy 12 months after the
  // repeat colonoscopy is recommended to detect late recurrence."
  selectionPublished: () => true,
  malignant: {
    driver: 'ESGE 2020 does not address surveillance after resection of an invasive carcinoma or malignant polyp',
    quote:
      'surveillance after endoscopic or surgical resection of invasive carcinoma/malignant polyp [20] and of patients with hereditary syndromes or with polyposis syndromes [21, 22], and these topics are not addressed in the present Guideline.',
    location: 'Introduction / scope',
  },
  special: {
    driver: 'ESGE 2020 does not address hereditary or polyposis syndromes',
    quote:
      'surveillance after endoscopic or surgical resection of invasive carcinoma/malignant polyp [20] and of patients with hereditary syndromes or with polyposis syndromes [21, 22], and these topics are not addressed in the present Guideline.',
    location: 'Introduction / scope. Also: "Of course, patients with high risk conditions, such as those with serrated polyposis syndrome or hereditary syndromes should receive an individualized surveillance schedule."',
  },
  prep: {
    precondition: {
      quote: 'standard guideline recommendations for surveillance intervals apply only to patients with adequate bowel preparation.',
      location: 'Section "Inadequate bowel preparation", p.4',
    },
    pathway: {
      interval: 'Within 1 year',
      modality: 'Colonoscopy',
      driver:
        'ESGE publishes a repeat interval for inadequate bowel preparation in its bowel preparation guideline, a document separate from the surveillance guideline these intervals come from',
      quote:
        'ESGE recommends early repetition of colonoscopy within 1 year in the case of inadequate bowel preparation, unless clinically contraindicated. Strong recommendation, moderate level of evidence.',
      location: 'Recommendation on inadequate bowel preparation',
      strength: 'Strong recommendation, moderate level of evidence',
      source: PREP_SRC.EU_2019,
      separate: true,
      notes: [
        'The sub-recommendation immediately following: "Same-day or next-day colonoscopy after additional preparation - with either laxative or enema - may be suggested. The next regimen of bowel preparation should be individualized according to the possible reasons for failure. Weak recommendation, very low level of evidence."',
      ],
    },
    notes: [
      'ESGE 2020, the surveillance guideline these intervals come from, issues no recommendation of its own here. Its "Inadequate bowel preparation" section carries no RECOMMENDATION box and defers to the 2019 bowel preparation guideline in running prose: "Strong recommendations for a 1-year repeat colonoscopy in the case of inadequate bowel preparation were issued by ESGE [24] recently and by other associations [30], strengthened by new evidence showing how a suboptimal baseline exam independently increases CRC incidence and mortality [4]." Entry [24] in that guideline\'s own reference list is the 2019 bowel preparation guideline quoted above.',
      'ESGE 2020 on adherence to the 1-year repeat: "this recommendation is not followed in 90 % of cases".',
    ],
  },
  rules: [
    {
      id: 'eu_no_polyp',
      kind: 'rule',
      when: (a) => !a.hasAnyLesion,
      interval: 'Return to screening',
      modality: 'Screening programme',
      driver:
        'A colonoscopy that found no lesions is outside ESGE post-polypectomy surveillance; the patient returns to their population screening programme',
      // ESGE's post-polypectomy recommendations are scoped to patients who had a
      // polyp removed, so there is no polyp-surveillance quote that describes a
      // no-lesion exam. The driver states the basis; no quote is attached.
      quote: '',
      location: '',
      riskYears: YRS.y10,
      notes: () => [
        'This is the population-screening default, not an ESGE post-polypectomy interval: ESGE\'s recommendations apply to "all patients who had one or more polyps that were completely removed", so a no-lesion colonoscopy falls outside them.',
      ],
    },
    {
      id: 'eu_piecemeal_20',
      kind: 'rule',
      when: (a) => a.anyPiecemeal && a.piecemealSize >= 20,
      interval: '3–6-month early repeat colonoscopy',
      modality: 'Colonoscopy',
      driver: 'Piecemeal endoscopic resection of a polyp 20 mm or larger',
      quote:
        'ESGE recommends a 3 – 6-month early repeat colonoscopy following piecemeal endoscopic resection of polyps ≥20 mm. Strong recommendation, moderate quality evidence. A first surveillance colonoscopy 12 months after the repeat colonoscopy is recommended to detect late recurrence. Strong recommendation, high quality evidence.',
      location: 'Recommendation 3; MAIN RECOMMENDATIONS (p.1) and RECOMMENDATION box, p.8',
      riskYears: YRS.m6,
      notes: () => [
        'ESGE recommends evaluating the resection site by imaging rather than routine biopsy: "ESGE recommends evaluation of the post-piecemeal polypectomy site using advanced imaging techniques to detect neoplastic recurrence. Strong recommendation, moderate quality evidence. ESGE suggests that routine biopsy of the post-polypectomy scar can be abandoned provided that a standardized imaging protocol with virtual chromoendoscopy is used by a sufficiently trained endoscopist. Weak recommendation, moderate quality evidence."',
      ],
    },
    {
      id: 'eu_rec2',
      kind: 'rule',
      when: (a) => a.hasAnyLesion && euNeedsSurveillance(a),
      interval: '3 years',
      modality: 'Colonoscopy',
      driver:
        'At least 1 adenoma ≥10 mm or with high grade dysplasia, or ≥5 adenomas, or any serrated polyp ≥10 mm or with dysplasia',
      quote: EU_REC2,
      location: 'Recommendation 2; MAIN RECOMMENDATIONS (p.1) and RECOMMENDATION box, p.6',
      riskYears: YRS.y3,
    },
    {
      id: 'eu_rec1',
      kind: 'rule',
      when: (a) => a.hasAnyLesion && !euNeedsSurveillance(a),
      interval: '10 years (usual screening)',
      modality: 'Return to organised screening; colonoscopy at 10 years where no screening programme exists',
      driver: '1 to 4 adenomas under 10 mm with low grade dysplasia, or any serrated polyp under 10 mm without dysplasia',
      quote:
        'ESGE recommends that patients with complete removal of 1 – 4 < 10 mm adenomas with low grade dysplasia, irrespective of villous components, or any serrated polyp < 10 mm without dysplasia, do not require endoscopic surveillance and should be returned to screening. Strong recommendation, moderate quality evidence. If organized screening is not available, repetition of colonoscopy 10 years after the index examination is recommended. Strong recommendation, moderate quality evidence.',
      location: 'Recommendation 1; MAIN RECOMMENDATIONS (p.1) and RECOMMENDATION box, p.5',
      riskYears: YRS.y10,
      notes: () => [
        'ESGE discounts villous histology by name in this recommendation: "1 – 4 < 10 mm adenomas with low grade dysplasia, irrespective of villous components". Villous histology is not a surveillance trigger anywhere in the 2020 rules.',
      ],
    },
  ],
  advisories: [
    {
      when: (a) => a.tsaCount > 0,
      note:
        'A traditional serrated adenoma is a dysplastic serrated lesion, so it meets Recommendation 2 ("any serrated polyp ... with dysplasia") at any size. ESGE names it directly, p.7: "Traditional serrated adenoma, serrated polyp ≥10 mm and serrated polyp with dysplasia yield similar metachronous advanced neoplasia or CRC risks compared to conventional adenomas, and thus require surveillance [9–11, 67, 72, 73]. Therefore, ESGE recommends surveillance colonoscopy at 3 years for these categories of polyps."',
    },
    {
      when: (a) => a.tsaCount > 0 || a.sslCount > 0 || a.hpCount > 0,
      note:
        'ESGE 2020 directs against using the serrated subtype, p.7: "Therefore, to prevent undertreatment due to misclassification of serrated polyps, we recommend not to consider the serrated polyp subtype when choosing colonoscopy surveillance intervals." This is running text; it is not printed in a boxed recommendation and carries no GRADE rating.',
    },
    {
      when: (a) => a.adenomaCount > 0 && a.serratedCount > 0,
      note:
        'ESGE 2020 declines to combine adenoma and serrated counts toward its multiplicity criterion: "Any added value of combining adenomas with serrated polyp count to fulfill multiplicity criteria is therefore not supported by convincing evidence and requires further investigation." Its ≥5 criterion counts adenomas only.',
    },
    {
      when: (a) => a.serratedCount >= 5 && a.adenomaCount < 5 && !euNeedsSurveillance(a),
      note:
        'ESGE 2020 attaches no count cap to serrated polyps. Recommendation 1 returns "any serrated polyp < 10 mm without dysplasia" to screening whatever the number, and Recommendation 2\'s multiplicity criterion is adenoma-only ("≥5 adenomas"). ESGE states no rule for serrated multiplicity below serrated polyposis syndrome criteria.',
    },
    {
      when: (a) => a.anyPiecemeal && a.piecemealSize < 20,
      note:
        'ESGE 2020 states no early-repeat rule below 20 mm: "There are no data focused on recurrence/residual adenomatous tissue after piecemeal resection of 10 – 20 mm nonpedunculated polyps." It defers to judgement: "Thus, apart from the larger than 20 mm adenomas, it seems reasonable to recommend an early repeat colonoscopy only in those few cases where the number or complexity of multiple endoscopic resections have affected, according to endoscopist judgment, the quality of the index colonoscopy."',
    },
    {
      when: (a) => a.adenomaCount >= 10,
      note:
        'RECOMMENDATION box, p.7: "ESGE recommends that patients with 10 or more adenomas should be referred for genetic counselling. Strong recommendation, moderate quality evidence." ESGE attaches no surveillance interval to this count.',
    },
    {
      when: (a) => a.hasAnyLesion,
      note:
        'RECOMMENDATION box, p.5: "ESGE recommends provision of a written recommendation for the timing of post-polypectomy surveillance colonoscopy, considering all endoscopic, histological, and patient-related factors. Strong recommendation, low quality evidence."',
    },
  ],
}

// ---------------------------------------------------------------------------
// Australia — Cancer Council Australia / NHMRC. Index intervals come from the
// consensus-based recommendations, which agree cell-for-cell with Tables 3 and
// 9. Intervals are quoted from the consensus-based recommendation that states
// them; where a Table 3 cell has no prose equivalent, the table caption is the
// quote and the cell is named in the location.
// ---------------------------------------------------------------------------
const AU_SAD1_10Y =
  'First surveillance interval of 10 years is appropriate for most individuals following complete removal of low-risk conventional adenomas only (1–2 small [<10mm] tubular adenomas without high-grade dysplasia).'
const AU_SAD2_5Y =
  'A surveillance interval of 5 years is recommended for patients with either of the following: 1–2 tubular adenomas with HGD or tubulovillous or villous adenomas (with or without HGD), all of which are <10mm; 3–4 tubular adenomas without HGD, all of which are <10mm'
const AU_SAD2_3Y =
  'A surveillance interval of 3 years is recommended for patients with any of the following: 1–2 tubular adenomas with HGD or tubulovillous or villous adenomas (with or without HGD), where the size of one or both is ≥10mm; 3–4 tubular adenomas, where the size of one or more is ≥10mm; 3–4 tubulovillous and/or villous adenomas and/or HGD, all <10mm'
const AU_SAD5 =
  'For those with 5–9 adenomas, recommended surveillance intervals are: 3 years if all tubular adenomas <10mm without high grade dysplasia (HGD); 1 year if any adenoma ≥10mm or with HGD and/or villosity. For those with ≥10 adenomas, the recommended surveillance interval is 1 year, regardless of size or histology.'
const AU_T3_CAPTION =
  'Table 3. Summary of recommendations for first surveillance intervals following removal of conventional adenomas only'

const AU_SAD4_5Y = 'Clinically significant serrated polyps only 5 years for: 1–2 sessile serrated adenomas all <10mm without dysplasia.'
const AU_SAD4_3Y =
  '3 years for: 3–4 sessile serrated adenomas, all <10mm without dysplasia; 1–2 sessile serrated adenomas ≥10mm or with dysplasia, or hyperplastic polyp ≥10mm; 1–2 traditional serrated adenomas, any size.'
const AU_SAD4_1Y =
  '1 year for: ≥5 sessile serrated adenomas <10mm without dysplasia; 3–4 sessile serrated adenomas, one or more ≥10mm or with dysplasia; 3–4 traditional serrated adenomas, any size.'
const AU_SAD4_COMBINED =
  'Clinically significant serrated polyps and synchronous conventional adenomas 5 years for: 2 in total, sessile serrated adenoma <10mm without dysplasia. 3 years for: 3–9 in total, all sessile serrated adenomas <10mm without dysplasia; 2–4 in total, any serrated polyp ≥10mm and/or dysplasia; 2–4 in total, any traditional serrated adenoma.'
const AU_SAD4_COMBINED_1Y =
  '1 year for: ≥10 in total, all sessile serrated adenomas <10mm without dysplasia; ≥5 in total, any serrated polyp ≥10mm and/or dysplasia; ≥5 in total, any traditional serrated adenoma.'
const AU_SAD4_COMBINED_HIGH =
  'Synchronous high-risk conventional adenoma (tubulovillous or villous adenoma, with or without HGD and with or without size ≥10mm) 3 years for: 2 in total, sessile serrated adenoma <10mm, without dysplasia; 2 in total, serrated polyp ≥10mm and/or dysplasia; 2 in total, any traditional serrated adenoma. 1 year for: ≥3 total adenomas, sessile serrated adenoma any size with or without dysplasia; ≥3 total adenomas, one or more traditional serrated adenoma.'
const AU_CSSP_DEF =
  'Surveillance is recommended for ‘clinically significant’ serrated polyps: sessile serrated adenomas; traditional serrated adenomas; hyperplastic polyps ≥10mm.'

// Clinically significant serrated polyps: SSA + TSA + HP ≥10mm.
const auCsspCount = (a: Agg): number => a.sslCount + a.tsaCount + (a.hpMaxSize >= 10 ? a.hpCount : 0)
// Table 9 column header: "advanced serrated polyp (≥10mm, dysplasia or TSA)".
const auAdvSerrated = (a: Agg): boolean =>
  (a.sslCount > 0 && a.sslMaxSize >= 10) || (a.hpCount > 0 && a.hpMaxSize >= 10) || a.anySslDysplasia || a.tsaCount > 0

const auBand4 = (n: number): number => (n <= 2 ? 0 : n <= 4 ? 1 : n <= 9 ? 2 : 3)
const auAdenomaCol = (a: Agg): number => (a.adenomaMaxSize >= 10 ? 2 : 0) + (a.anyHgd || a.anyVillous ? 1 : 0)
const auRiskYears = (v: string): number => (v === '10 years' ? YRS.y10 : v === '5 years' ? YRS.y5 : v === '3 years' ? YRS.y3 : YRS.y1)

// Table 3 — rows 1–2 / 3–4 / 5–9 / ≥10; columns as named in AU_T3_COLS.
const AU_T3_GRID: string[][] = [
  ['10 years', '5 years', '3 years', '3 years'],
  ['5 years', '3 years', '3 years', '1 year'],
  ['3 years', '1 year', '1 year', '1 year'],
  ['1 year', '1 year', '1 year', '1 year'],
]
const AU_T3_QUOTES: string[][] = [
  [AU_SAD1_10Y, AU_SAD2_5Y, AU_T3_CAPTION, AU_SAD2_3Y],
  [AU_SAD2_5Y, AU_SAD2_3Y, AU_SAD2_3Y, AU_T3_CAPTION],
  [AU_SAD5, AU_SAD5, AU_SAD5, AU_SAD5],
  [AU_SAD5, AU_SAD5, AU_SAD5, AU_SAD5],
]
const AU_T3_ROWS = ['1–2', '3–4', '5–9', '≥10']
const AU_T3_COLS = [
  '<10mm, no HGD/villosity',
  '<10mm, HGD/villosity',
  '≥10mm, no HGD/villosity',
  '≥10mm, HGD/villosity',
]

// Table 9A — rows 1–2 / 3–4 / ≥5; columns advanced serrated polyp No / Yes.
const AU_T9A_GRID: string[][] = [
  ['5 years', '3 years'],
  ['3 years', '1 year'],
  ['1 year', '1 year'],
]
const AU_T9A_QUOTES: string[][] = [
  [AU_SAD4_5Y, AU_SAD4_3Y],
  [AU_SAD4_3Y, AU_SAD4_1Y],
  [AU_SAD4_1Y, AU_SAD4_1Y],
]
const AU_T9A_ROWS = ['1–2', '3–4', '≥5']
const AU_T9A_COLS = ['advanced serrated polyp: No', 'advanced serrated polyp: Yes']

// Table 9B — rows by combined total; columns low-risk adenoma [no|yes advanced
// serrated] then high-risk adenoma [no|yes advanced serrated].
const AU_T9B_GRID: string[][] = [
  ['5 years', '3 years', '3 years', '3 years'],
  ['3 years', '3 years', '1 year', '1 year'],
  ['3 years', '1 year', '1 year', '1 year'],
  ['1 year', '1 year', '1 year', '1 year'],
]
const AU_T9B_ROWS = ['2', '3–4', '5–9', '≥10']
const AU_T9B_COLS = [
  'Low-risk conventional adenoma, advanced serrated polyp: No',
  'Low-risk conventional adenoma, advanced serrated polyp: Yes',
  'High-risk conventional adenoma, advanced serrated polyp: No',
  'High-risk conventional adenoma, advanced serrated polyp: Yes',
]

function auTable3Rules(): Rule[] {
  const rules: Rule[] = []
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const v = AU_T3_GRID[row][col]
      rules.push({
        id: `au_t3_${row}_${col}`,
        kind: 'rule',
        when: (a) => a.adenomaCount > 0 && auCsspCount(a) === 0 && auBand4(a.adenomaCount) === row && auAdenomaCol(a) === col,
        interval: v,
        modality: 'Colonoscopy',
        driver: `${AU_T3_ROWS[row]} conventional adenomas only (${AU_T3_COLS[col]})`,
        quote: AU_T3_QUOTES[row][col],
        location: `Table 3, p.102 — row "${AU_T3_ROWS[row]}", column "${AU_T3_COLS[col]}"`,
        riskYears: auRiskYears(v),
      })
    }
  }
  return rules
}

function auTable9aRules(): Rule[] {
  const rules: Rule[] = []
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 2; col++) {
      const v = AU_T9A_GRID[row][col]
      rules.push({
        id: `au_t9a_${row}_${col}`,
        kind: 'rule',
        when: (a) => {
          const n = auCsspCount(a)
          if (n === 0 || a.adenomaCount > 0) return false
          const band = n <= 2 ? 0 : n <= 4 ? 1 : 2
          return band === row && (auAdvSerrated(a) ? 1 : 0) === col
        },
        interval: v,
        modality: 'Colonoscopy',
        driver: `${AU_T9A_ROWS[row]} clinically significant serrated polyps (${AU_T9A_COLS[col]})`,
        quote: AU_T9A_QUOTES[row][col],
        location: `Table 9, panel A, p.286 — row "${AU_T9A_ROWS[row]}", column "${AU_T9A_COLS[col]}"`,
        riskYears: auRiskYears(v),
        notes: () => [`Practice point, p.284: "${AU_CSSP_DEF}"`],
      })
    }
  }
  return rules
}

function auTable9bRules(): Rule[] {
  const rules: Rule[] = []
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const v = AU_T9B_GRID[row][col]
      const quote = col >= 2 ? AU_SAD4_COMBINED_HIGH : v === '1 year' ? AU_SAD4_COMBINED_1Y : AU_SAD4_COMBINED
      rules.push({
        id: `au_t9b_${row}_${col}`,
        kind: 'rule',
        when: (a) => {
          const n = auCsspCount(a)
          if (n === 0 || a.adenomaCount === 0) return false
          const highRisk = a.adenomaMaxSize >= 10 || a.anyHgd || a.anyVillous
          const c = (highRisk ? 2 : 0) + (auAdvSerrated(a) ? 1 : 0)
          return auBand4(a.adenomaCount + n) === row && c === col
        },
        interval: v,
        modality: 'Colonoscopy',
        driver: `${AU_T9B_ROWS[row]} in total — clinically significant serrated polyps and synchronous conventional adenomas (${AU_T9B_COLS[col]})`,
        quote,
        location: `Table 9, panel B, p.286 — row "${AU_T9B_ROWS[row]} in total", column "${AU_T9B_COLS[col]}"`,
        riskYears: auRiskYears(v),
        notes: () => [
          'Table 9B counts clinically significant serrated polyps and conventional adenomas together, by combined total.',
          'Table 9B footnotes: "Low-risk conventional adenoma: small (<10 mm) tubular adenoma without high-grade dysplasia." "High-risk conventional adenoma: size ≥10 mm, high-grade dysplasia (HGD) or villosity."',
        ],
      })
    }
  }
  return rules
}

const AU: JurSpec = {
  short: 'Cancer Council Australia',
  // Table 9B prints a row for clinically significant serrated polyps and
  // conventional adenomas found together, by combined total, so a mixed
  // examination reaches a row Cancer Council Australia prints rather than a
  // choice between rows.
  selectionPublished: () => true,
  malignant: {
    driver:
      'The Cancer Council surveillance tables assume complete excision of a non-invasive lesion; malignant polyps are handled in a separate section of the guideline',
    quote: 'Complete excision of lesions is required before surveillance intervals can be recommended',
    location: 'Table 3 footnote d, p.102',
  },
  special: {
    driver: 'Cancer Council Australia routes diagnosed or likely familial syndromes to separate recommendations',
    quote: 'Separate screening and surveillance recommendations apply to patients with diagnosed or likely familial syndromes',
    location: 'Practice point, Summary of recommendations, p.281',
  },
  prep: {
    precondition: null,
    pathway: {
      interval: 'Within 12 months',
      modality: 'Colonoscopy',
      driver:
        'Cancer Council Australia publishes a repeat interval for inadequate preparation as a practice point inside this surveillance guideline',
      quote: 'Where the preparation is inadequate, repeat colonoscopy should normally be offered within 12 months.',
      location:
        'Practice point, chapter "Advances in colonoscopy, CT colonography and other methods", sub-heading "Bowel preparation"',
      strength: 'Practice point (NHMRC ungraded consensus, not an evidence-based graded recommendation)',
      source: SRC.AU,
      separate: false,
      notes: [
        'A practice point is the weakest NHMRC class: consensus opinion not derived from a systematic evidence review, carrying no grade. It does not have the force of the USMSTF and ESGE strong recommendations for the same scenario.',
        'The recommendation is hedged with "normally". Cancer Council Australia states no shorter interval for inadequate preparation in a higher-risk patient, and no rule for preparation that is adequate but suboptimal.',
        'Adjacent practice points in the same block: "Preparation quality should be documented on the colonoscopy report using a validated preparation scale." and "Successful bowel preparation should be achieved in >=90% of all colonoscopies."',
      ],
    },
    notes: [
      'Australia publishes no standalone bowel preparation guideline. This practice point sits inside the surveillance guideline, in a chapter separate from the surveillance interval tables.',
    ],
  },
  rules: [
    {
      id: 'au_normal',
      kind: 'rule',
      when: (a) => !a.hasAnyLesion,
      interval: 'Return to FOBT screening (National Bowel Cancer Screening Program)',
      modality: 'FOBT',
      driver:
        'A colonoscopy that found no lesions is not a surveillance starting point; an average-risk patient returns to the National Bowel Cancer Screening Program',
      quote:
        'Surveillance recommendations should be made after the colon has been cleared of all significant neoplasia, once histology is known and in the context of individualised assessment of benefit to the patient.',
      location: 'Table 3 explanatory text, p.102',
      riskYears: YRS.y10,
    },
    {
      id: 'au_piecemeal',
      kind: 'rule',
      when: (a) => a.anyPiecemeal,
      interval: 'Approximately 6 months',
      modality: 'Colonoscopy',
      driver: 'Piecemeal excision of a large sessile or laterally spreading lesion',
      quote:
        'First surveillance interval should be approximately 6 months in individuals who have undergone piecemeal excision of large sessile and laterally spreading lesions.',
      location: 'Consensus-based recommendation (SAD3), Summary of recommendations, p.287',
      riskYears: YRS.m6,
      notes: () => [
        'Practice point, p.288: "In patients who have undergone piecemeal excision of large sessile and laterally spreading lesions (in whom the first surveillance colonoscopy at 6 months is clear), the next surveillance colonoscopy should be considered around 12–18 months, especially in those who had large lesions (>40mm) or high-grade dysplasia at index EMR."',
        'This recommendation carries no millimetre threshold. It is triggered by the piecemeal excision of a lesion the endoscopist judges large, not by a stated size cut-off.',
      ],
    },
    {
      id: 'au_hp_small',
      kind: 'rule',
      // Only when hyperplastic polyps are the sole finding. A synchronous adenoma
      // or serrated lesion governs the interval; the practice point that isolated
      // small hyperplastic polyps need no surveillance does not license ignoring it.
      when: (a) => a.hpCount > 0 && a.hpMaxSize < 10 && a.adenomaCount === 0 && a.sslCount === 0 && a.tsaCount === 0,
      interval: 'No surveillance required',
      modality: null,
      driver: 'Small true hyperplastic polyp(s)',
      quote: 'Small, particularly distal, true hyperplastic polyps do not require surveillance.',
      location: 'Practice point, Summary of recommendations, p.285',
      riskYears: YRS.y10,
      notes: () => [
        'Practice point, p.198 and p.276: "Hyperplastic polyps should be clearly distinguished from sessile serrated adenomas and traditional serrated adenomas. Although hyperplastic polyps are classified amongst serrated polyps, they do not have malignant potential when they are diminutive, confined to the rectosigmoid colon and not associated with proximal serrated polyps."',
        'Cancer Council Australia defines its size bands as "6–9mm (small) and 1–5mm (diminutive)" (p.94).',
      ],
    },
    ...auTable3Rules(),
    ...auTable9aRules(),
    ...auTable9bRules(),
  ],
  advisories: [
    {
      when: (a) => a.adenomaCount >= 1 && a.adenomaCount <= 2 && a.adenomaMaxSize < 6 && !a.anyVillous && !a.anyHgd && auCsspCount(a) === 0,
      note:
        'Practice point, p.278: "Patients with 1–2 diminutive (<6mm) low-risk adenomas have a very low risk of metachronous neoplasia and should be returned to the NBCSP after 4 years unless there are significant extenuating factors."',
    },
    {
      when: (a) => a.adenomaCount >= 1 && a.adenomaCount <= 2 && a.adenomaMaxSize < 10 && !a.anyVillous && !a.anyHgd && auCsspCount(a) === 0,
      note:
        'Practice point, p.277: "A shorter surveillance interval of 5 years could be considered for men who fit the criteria for the metabolic syndrome, because they may have increased risk of metachronous advanced neoplasia following removal of low-risk adenomas."',
    },
    {
      when: (a) => a.adenomaMaxSize >= 20,
      note:
        'Table 3 footnote e, p.102: "Adenomas ≥20mm are more likely to be excised piecemeal and should be considered under the large and laterally spreading adenomas section"',
    },
    {
      when: (a) => a.totalLesions >= 10,
      note:
        'Practice point, p.281: "An underlying familial predisposition to colorectal cancer should be considered in all individuals with ≥10 polyps removed. Referral to a familial cancer clinic should be considered, along with appropriate psychological support."',
    },
    {
      when: (a) => a.anyPiecemeal && a.sslCount > 0,
      note:
        'Cancer Council Australia states no rule for which recommendation governs a large sessile serrated adenoma removed piecemeal. Its piecemeal recommendation reads "large sessile and laterally spreading lesions" without specifying histology, while the section title reads "large sessile or laterally spreading adenomas".',
    },
    {
      when: (a) => a.totalLesions > 0,
      note:
        'Practice point, repeated throughout the Summary of recommendations: "Polyp/adenoma size as per the endoscopist documentation should be used for determining surveillance intervals. All endoscopists should ensure size measurements are accurate using a reference standard (eg an open biopsy forceps or snare)."',
    },
  ],
}

const SPECS: Record<JurId, JurSpec> = { US, CA_ON: ON, CA_AB: AB, CA_BC: BC, AU, EU }

// ---------------------------------------------------------------------------
// Result builder and matcher
// ---------------------------------------------------------------------------
function toResult(rule: Rule, a: Agg, src: Source): Result {
  return {
    interval: rule.interval,
    modality: rule.modality === undefined ? 'Colonoscopy' : rule.modality,
    driver: rule.driver,
    quote: rule.quote,
    location: rule.location,
    source: src,
    strength: null,
    separateDocument: false,
    notes: rule.notes ? rule.notes(a) : [],
    riskYears: rule.riskYears ?? 0,
    override: rule.kind === 'scope',
    discretion: rule.kind === 'declined',
    notSpecified: rule.kind === 'gap' || rule.kind === 'declined',
    prepInadequate: false,
    assumption: false,
    calculatorRule: null,
    supersededInterval: null,
  }
}

export function prepAdequate(bbps: [number, number, number]): boolean {
  return bbps.every((s) => s >= 2) && bbps[0] + bbps[1] + bbps[2] >= 6
}

// The guideline's own matched rows compete; the shortest interval among them
// governs. Nothing is derived — every candidate is a row the guideline prints
// for a finding at this examination. Which of those rows to show is this
// calculator's choice, so where the choice settles the answer and the guideline
// states no rule for the combination, `decidedHere` labels it on the result.
// When two matched rows carry the same interval but different modalities, the
// more intensive surveillance governs: a lesion that mandates colonoscopy is not
// downgraded to a stool test just because another row happened to tie on years.
const modalityRank = (m: string | null): number =>
  m === null ? 3 : /colonoscop/i.test(m) ? 0 : /sigmoidoscop|endoscop|repeat|site/i.test(m) ? 1 : /fit|fobt|stool|screen/i.test(m) ? 2 : 1
function shortest(cands: Result[]): Result {
  return [...cands].sort((x, y) => x.riskYears - y.riskYears || modalityRank(x.modality) - modalityRank(y.modality))[0]
}

// True when the matched rows carry more than one interval between them, so
// taking the shortest is what settled the answer. Where every row carries the
// same interval, the interval shown is the guideline's whichever row is read.
function decidedHere(cands: Result[]): boolean {
  return cands.some((c) => c.riskYears !== cands[0].riskYears)
}

const calculatorSelection = (_short: string) =>
  'The guideline has no rule for this combination, so the shortest of the applicable intervals is shown. Clinical judgement is required.'

// ---------------------------------------------------------------------------
// Inadequate preparation
//
// Every interval in this engine is published on the precondition of an adequate
// examination. An inadequately prepared examination did not meet it, so the
// routine interval is not this examination's answer and is not shown as one.
// What replaces it is whatever the society published for this case, and nothing
// more: an interval where one exists, a repeat without a timeframe where the
// society requires the repeat and states no timing, and the guideline's own
// precondition where the society published neither.
// ---------------------------------------------------------------------------
const PREP_LEDE = 'Bowel preparation was inadequate on the Boston Bowel Preparation Scale.'

function demote(routine: Result, spec: JurSpec): Superseded {
  return {
    interval: routine.interval,
    modality: routine.modality,
    driver: routine.driver,
    quote: routine.quote,
    location: routine.location,
    source: routine.source,
    notes: routine.notes,
    riskYears: routine.riskYears,
    override: routine.override,
    discretion: routine.discretion,
    notSpecified: routine.notSpecified,
    calculatorRule: routine.calculatorRule,
    interpretation: routine.interpretation ?? null,
    precondition: spec.prep.precondition,
  }
}

function prepResult(spec: JurSpec, src: Source, routine: Result): Result {
  const p = spec.prep
  const superseded = demote(routine, spec)

  if (p.pathway) {
    const pw = p.pathway
    const byIndication = pw.byIndication ?? null
    const published = pw.interval !== null || byIndication !== null
    return {
      interval: byIndication ? 'Repeat timing depends on indication' : published ? (pw.interval as string) : gapInterval(spec.short),
      modality: pw.modality,
      driver: pw.driver,
      quote: pw.quote,
      location: pw.location,
      source: pw.source,
      strength: pw.strength,
      separateDocument: pw.separate,
      notes: [PREP_LEDE, ...pw.notes, ...p.notes],
      riskYears: published ? YRS.y1 : 0,
      override: false,
      discretion: false,
      notSpecified: !published,
      prepInadequate: true,
      assumption: false,
      calculatorRule: null,
      supersededInterval: superseded,
      prepByIndication: byIndication,
    }
  }

  return {
    interval: gapInterval(spec.short),
    modality: null,
    driver: `${spec.short} assumes an adequate examination and publishes no replacement interval for one that was inadequately prepared`,
    quote: p.precondition ? p.precondition.quote : '',
    location: p.precondition ? p.precondition.location : '',
    source: src,
    strength: null,
    separateDocument: false,
    notes: [PREP_LEDE, ...p.notes],
    riskYears: 0,
    override: false,
    discretion: false,
    notSpecified: true,
    prepInadequate: true,
    assumption: false,
    calculatorRule: null,
    supersededInterval: superseded,
  }
}

// The preparation pathway replaces a routine interval, not a scope statement. A
// malignant polyp or an excluded population is outside the guideline either way,
// and that stands whatever the preparation, so it keeps the primary and the
// preparation guidance rides with it.
function prepNotes(spec: JurSpec): string[] {
  const p = spec.prep
  const out = [PREP_LEDE]
  if (p.pathway) {
    const pw = p.pathway
    out.push(
      `${pw.driver}. ${pw.source.name} ${pw.location}: "${pw.quote}"${pw.strength ? ` ${pw.strength}.` : ''}`
    )
    out.push(...pw.notes)
  } else if (p.precondition) {
    out.push(
      `${spec.short} assumes an adequate examination and publishes no replacement interval. Its wording: "${p.precondition.quote}" (${p.precondition.location}).`
    )
  }
  return [...out, ...p.notes]
}

// ---------------------------------------------------------------------------
// Top-level dispatch
// ---------------------------------------------------------------------------
export function compute(exam: Exam): Result {
  const spec = SPECS[exam.jur]
  const src = SRC[exam.jur]
  const a = aggregate(exam.lesions)
  const prepBad = !prepAdequate(exam.bbps)

  const outOfScope = (which: { driver: string; quote: string; location: string }): Result => ({
    interval: `Outside the scope of ${spec.short}`,
    modality: null,
    driver: which.driver,
    quote: which.quote,
    location: which.location,
    source: src,
    strength: null,
    separateDocument: false,
    notes: prepBad ? prepNotes(spec) : [],
    riskYears: 0,
    override: true,
    discretion: false,
    notSpecified: false,
    prepInadequate: prepBad,
    assumption: false,
    calculatorRule: null,
    supersededInterval: null,
  })

  if (exam.malignant) return outOfScope(spec.malignant)
  if (exam.special) return outOfScope(spec.special)

  const matched = spec.rules.filter((r) => r.when(a))
  const scoped = matched.find((r) => r.kind === 'scope')
  const declined = matched.find((r) => r.kind === 'declined')
  const emittable = matched.filter((r) => r.kind === 'rule')
  const gaps = matched.filter((r) => r.kind === 'gap')

  let res: Result
  if (scoped) {
    res = toResult(scoped, a, src)
  } else if (declined) {
    res = toResult(declined, a, src)
  } else if (emittable.length > 0) {
    const cands = emittable.map((r) => toResult(r, a, src))
    res = shortest(cands)
    if (decidedHere(cands) && !spec.selectionPublished(a)) {
      res.calculatorRule = calculatorSelection(spec.short)
    }
    // A gap alongside a published answer is reported, not resolved.
    for (const g of gaps) {
      res.notes = [...res.notes, `${g.driver}. ${g.location}.`]
    }
  } else if (gaps.length > 0) {
    res = toResult(gaps[0], a, src)
  } else {
    res = {
      interval: gapInterval(spec.short),
      modality: null,
      driver: `${spec.short} states no rule for this combination of findings`,
      quote: '',
      location: '',
      source: src,
      strength: null,
      separateDocument: false,
      notes: [],
      riskYears: 0,
      override: false,
      discretion: false,
      notSpecified: true,
      prepInadequate: false,
      assumption: false,
      calculatorRule: null,
      supersededInterval: null,
    }
  }

  for (const adv of spec.advisories) {
    if (adv.when(a)) res.notes = [...res.notes, adv.note]
  }

  // The preparation pathway replaces a routine interval, not a scope statement, a
  // gap, or a discretion result: those stand whatever the preparation, with the
  // preparation guidance attached as a note. Only a concrete interval is demoted.
  if (prepBad) {
    const demotable = !res.override && !res.notSpecified && !res.discretion && res.riskYears > 0
    if (demotable) return prepResult(spec, src, res)
    res.notes = [...res.notes, ...prepNotes(spec)]
  }
  return res
}

// ===========================================================================
// Subsequent surveillance — the interval AFTER a surveillance colonoscopy.
// Each guideline publishes its own, distinct rule set for later rounds; none is
// a re-run of the baseline table. Every interval and quote below is verified
// against the primary source. Where a guideline stops, the result is a
// not-specified gap, never an invented number.
// ===========================================================================

export type Stage = 'first' | 'second' | 'subsequent'

export interface SurvExam {
  jur: JurId
  stage: Stage
  current: LesionInput[] // the most recent colonoscopy
  prior: LesionInput[] | null // the previous colonoscopy (stage 'second' / 'subsequent')
  malignant: boolean
  special: boolean
  bbps: [number, number, number] // preparation at the most recent colonoscopy
}

type SubFn = (prior: Agg, cur: Agg, stage: Stage, src: Source, rawCur: LesionInput[]) => Result

function riskYearsOf(interval: string): number {
  const m = interval.match(/(\d+)/)
  return m ? Number(m[1]) : 20
}

function subResult(src: Source, p: Partial<Result> & { interval: string; driver: string }): Result {
  return {
    interval: p.interval,
    modality: p.modality ?? null,
    driver: p.driver,
    quote: p.quote ?? '',
    location: p.location ?? '',
    source: p.source ?? src,
    strength: p.strength ?? null,
    separateDocument: p.separateDocument ?? false,
    notes: p.notes ?? [],
    riskYears: p.riskYears ?? riskYearsOf(p.interval),
    override: p.override ?? false,
    discretion: p.discretion ?? false,
    notSpecified: p.notSpecified ?? false,
    prepInadequate: false,
    assumption: false,
    calculatorRule: null,
    supersededInterval: null,
  }
}

function subGap(short: string, src: Source, why: string): Result {
  return subResult(src, { interval: `Not specified by ${short}`, driver: why, notSpecified: true, riskYears: 0 })
}

// A first colonoscopy with no polyps requiring surveillance is not a surveillance
// baseline: the patient is on routine screening and the next colonoscopy stands as
// a fresh baseline. Apply the baseline rules to the current exam so the tool gives
// the screening interval rather than falling silent.
function screeningReset(jur: JurId, rawCur: LesionInput[]): Result {
  const r = compute({ jur, lesions: rawCur, malignant: false, special: false, bbps: [3, 3, 3] })
  return {
    ...r,
    notes: [
      'The earlier colonoscopy carried no finding that places the patient on colonoscopy surveillance under this guideline, so the interval is taken from the most recent examination as a fresh baseline.',
      ...r.notes,
    ],
  }
}

// --- United States — Table 7 (second surveillance, adenomas only) ----------
type UsBand = 'normal' | 'ta_1_2' | 'ta_3_4' | 'high' | 'other'
const usHigh = (a: Agg): boolean =>
  (a.adenomaCount > 0 && (a.adenomaMaxSize >= 10 || a.anyVillous || a.anyHgd)) ||
  (a.adenomaCount >= 5 && a.adenomaCount <= 10)
const usSerratedSurv = (a: Agg): boolean => a.sslCount > 0 || a.tsaCount > 0 || a.hpMaxSize >= 10
function usBand(a: Agg): UsBand {
  if (usSerratedSurv(a)) return 'other' // Table 7 is conventional-adenoma only
  if (a.adenomaCount > 10) return 'other'
  if (usHigh(a)) return 'high'
  if (a.adenomaCount === 0) return 'normal' // no adenoma/SSP/CRC; a hyperplastic polyp <10 mm counts normal
  if (a.adenomaCount <= 2) return 'ta_1_2'
  return 'ta_3_4'
}
const US_BAND_LABEL: Record<UsBand, string> = {
  normal: 'a normal colonoscopy',
  ta_1_2: '1 to 2 tubular adenomas under 10 mm',
  ta_3_4: '3 to 4 tubular adenomas under 10 mm',
  high: 'a high-risk adenoma finding',
  other: 'findings outside the adenoma grid',
}
const usSubsequent: SubFn = (prior, cur, stage, src, rawCur) => {
  if (stage === 'subsequent')
    return subGap('USMSTF 2020', src, 'USMSTF 2020 Table 7 sets only the second surveillance interval, from the baseline and first surveillance findings. It states no rule for the third or later interval')
  const pb = usBand(prior)
  if (pb === 'normal') {
    const r = compute({ jur: 'US', lesions: rawCur, malignant: false, special: false, bbps: [3, 3, 3] })
    // Two normal exams is routine screening, which the guideline does specify (10
    // years), so no interpretation caveat is needed. A current finding the baseline
    // table itself does not cover (its result is not-specified) is left as that
    // gap rather than dressed as an interpreted interval. Otherwise USMSTF 2020
    // Table 7 has no normal-baseline row, so the interval is taken from the most
    // recent exam as a new baseline and flagged as a calculator interpretation.
    if (usBand(cur) === 'normal' || r.notSpecified) return r
    return {
      ...r,
      interpretation:
        'The first colonoscopy found no polyps requiring surveillance, so the interval is taken from the most recent examination as a new baseline. USMSTF 2020 does not publish a rule for a normal baseline followed by later findings.',
    }
  }
  if (pb === 'other')
    return subGap('USMSTF 2020', src, 'USMSTF 2020 Table 7 covers conventional-adenoma baselines only. It states no second surveillance rule when the first colonoscopy found serrated lesions or more than 10 adenomas')
  const baseHigh = pb === 'high'
  const cb = usBand(cur)
  if (cb === 'other')
    return subGap('USMSTF 2020', src, 'USMSTF 2020 Table 7 covers conventional adenomas only. It states no rule when the first surveillance found serrated lesions or more than 10 adenomas')
  const grid: Record<'low' | 'high', Record<'normal' | 'ta_1_2' | 'ta_3_4' | 'high', string>> = {
    low: { normal: '10 years', ta_1_2: '7 to 10 years', ta_3_4: '3 to 5 years', high: '3 years' },
    high: { normal: '5 years', ta_1_2: '5 years', ta_3_4: '3 to 5 years', high: '3 years' },
  }
  const interval = grid[baseHigh ? 'high' : 'low'][cb]
  const piecemeal = cur.piecemealAdenomaSize >= 20 || cur.piecemealSslSize >= 20
  return subResult(src, {
    interval,
    modality: 'Colonoscopy',
    driver: `Baseline ${baseHigh ? 'high-risk adenoma' : 'low-risk tubular adenomas'}, then ${US_BAND_LABEL[cb]} at the first surveillance colonoscopy`,
    quote:
      'For patients with history of baseline adenoma removal and 1 subsequent colonoscopy, recommendations for subsequent surveillance should take into account findings at baseline and first surveillance (Table 7).',
    location: 'Recommendation, p.476; interval from Table 7, p.477',
    strength: 'Weak recommendation, low quality of evidence',
    notes: piecemeal
      ? ['A polyp ≥20 mm removed piecemeal has its own USMSTF schedule (site check about 6 months, next at 1 year, then 3 years, p.478), which takes precedence over this interval.']
      : [],
  })
}

// --- Europe — ESGE 2020 Recommendations 4 and 5 ----------------------------
const euSubsequent: SubFn = (prior, cur, _stage, src) => {
  if (euNeedsSurveillance(cur))
    return subResult(src, {
      interval: '3 years',
      modality: 'Colonoscopy',
      driver: 'Polyps requiring surveillance were found at this surveillance colonoscopy',
      quote:
        'ESGE suggests that if polyps requiring surveillance are detected at first or subsequent surveillance examinations, surveillance colonoscopy may be performed at 3 years',
      location: 'Recommendation 5, 2020 statement',
      strength: 'Weak recommendation, low quality evidence',
    })
  if (euNeedsSurveillance(prior))
    return subResult(src, {
      interval: '5 years',
      modality: 'Colonoscopy',
      driver: 'A clear surveillance colonoscopy following a previous exam with polyps requiring surveillance',
      quote:
        'If no polyps requiring surveillance are detected at the first surveillance colonoscopy, ESGE suggests to perform a second surveillance colonoscopy after 5 years.',
      location: 'Recommendation 4, 2020 statement',
      strength: 'Weak recommendation, low quality evidence',
    })
  return subResult(src, {
    interval: 'Return to screening',
    modality: 'Screening programme',
    driver: 'No polyps requiring surveillance at this colonoscopy or the previous one',
    quote: 'After that, if no polyps requiring surveillance are detected, patients can be returned to screening.',
    location: 'Recommendation 4, 2020 statement',
    strength: 'Weak recommendation, low quality evidence',
    riskYears: 10,
  })
}

// --- Ontario — ColonCancerCheck "Subsequent colonoscopy" table half --------
type OnBand = 'fit' | 'high_adenoma' | 'many_adenomas' | 'serrated' | 'other'
const onHighAdenoma = (a: Agg): boolean =>
  a.adenomaCount > 0 && (a.adenomaMaxSize >= 10 || a.adenomaCount >= 3 || a.anyVillous || a.anyHgd)
function onBand(a: Agg): OnBand {
  if (a.adenomaCount > 10) return 'many_adenomas'
  if (onHighAdenoma(a)) return 'high_adenoma'
  if (a.sslCount > 0 || a.tsaCount > 0) return 'serrated'
  return 'fit' // no polyps, hyperplastic in rectosigmoid, or low-risk adenoma — all on FIT
}
const onSubsequent: SubFn = (prior, cur, stage, src, rawCur) => {
  if (stage === 'subsequent')
    return subGap('ColonCancerCheck', src, 'ColonCancerCheck publishes a single subsequent-colonoscopy step keyed to the baseline finding. It states no rule for the third or later interval')
  // ColonCancerCheck states no rule for a hyperplastic polyp proximal to the
  // sigmoid, so a baseline whose only finding is one cannot be placed on the FIT
  // track; it is a gap, exactly as the baseline path reports it.
  if (prior.anyProximalHp && prior.adenomaCount === 0 && prior.sslCount === 0 && prior.tsaCount === 0)
    return subGap('ColonCancerCheck', src, 'ColonCancerCheck states no rule for a hyperplastic polyp proximal to the sigmoid colon, so it cannot classify a baseline whose only finding is one')
  const pb = onBand(prior)
  if (pb === 'fit')
    // A no-polyp, rectosigmoid-hyperplastic, or low-risk-adenoma baseline puts the
    // patient on FIT, not colonoscopy surveillance, so any later colonoscopy stands
    // as a fresh baseline: restage it on the current findings rather than asserting
    // a return to FIT regardless of what this exam found. A current high-risk
    // adenoma therefore gets its 3-year colonoscopy, not a 10-year FIT.
    return screeningReset('CA_ON', rawCur)
  if (pb === 'high_adenoma') {
    if (onHighAdenoma(cur))
      return subResult(src, {
        interval: '3 years',
        modality: 'Colonoscopy',
        driver: 'A high-risk adenoma at both the baseline and this surveillance colonoscopy',
        quote: 'High risk adenoma(s) | Colonoscopy | 3 years',
        location: 'Recommendation table, "Subsequent colonoscopy" half, page 1',
      })
    if (cur.sslCount > 0 || cur.tsaCount > 0 || cur.anyProximalHp)
      return subGap('ColonCancerCheck', src, 'ColonCancerCheck sub-stratifies a high-risk-adenoma baseline for a subsequent finding of no polyps, rectosigmoid hyperplastic polyps, a low-risk adenoma, or a repeat high-risk adenoma only. It states no rule when the subsequent exam finds serrated lesions')
    return subResult(src, {
      interval: '5 years',
      modality: 'Colonoscopy',
      driver: 'A high-risk adenoma at baseline, then no polyps, hyperplastic polyps, or a low-risk adenoma at this surveillance colonoscopy',
      quote: 'No polyps, hyperplastic polyp(s) in rectum or sigmoid, or low risk adenoma | Colonoscopy | 5 years',
      location: 'Recommendation table, "Subsequent colonoscopy" half, page 1',
      notes: ['ColonCancerCheck keeps this patient on 5-year colonoscopy; it does not return them to FIT.'],
    })
  }
  if (pb === 'many_adenomas')
    return subResult(src, {
      interval: 'Under 3 years',
      modality: 'Colonoscopy',
      driver: 'More than 10 adenomas at baseline',
      quote: 'Colonoscopy in <3 years',
      location: 'Recommendation table, "Subsequent colonoscopy" half, footnote 3, page 1',
      riskYears: YRS.y3,
      notes: ['People with more than 10 adenomas should undergo genetic assessment for familial adenomatous polyposis syndromes.'],
    })
  return subResult(src, {
    interval: 'At endoscopist discretion',
    driver: 'Serrated lesions at baseline',
    discretion: true,
    quote: 'At endoscopist discretion',
    location: 'Recommendation table, "Subsequent colonoscopy" half, footnote 4, page 1',
    notes: ['ColonCancerCheck states there is insufficient evidence to make specific subsequent-interval recommendations for serrated lesions.'],
  })
}

// --- Alberta — ACRCSP (Sadowski et al. 2024) published pathways ------------
const abHighRisk = (a: Agg): boolean =>
  (a.adenomaCount > 0 && (a.adenomaMaxSize >= 10 || a.anyVillous || a.anyHgd)) ||
  a.adenomaCount >= 5 ||
  (a.sslCount > 0 && (a.sslMaxSize >= 10 || a.anySslDysplasia)) ||
  a.tsaCount > 0
const abNoSurvNeeded = (a: Agg): boolean =>
  !abHighRisk(a) && a.adenomaCount <= 2 && a.sslCount === 0 && a.tsaCount === 0
const abIs34TA = (a: Agg): boolean =>
  a.adenomaCount >= 3 && a.adenomaCount <= 4 && a.adenomaMaxSize < 10 && !a.anyHgd && !a.anyVillous && a.sslCount === 0 && a.tsaCount === 0
const abSubsequent: SubFn = (prior, cur, stage, src, rawCur) => {
  // A hyperplastic polyp >=10 mm is a surveillance-track finding at baseline (3 or
  // 5 year colonoscopy), but ACRCSP publishes no subsequent-round rule for a
  // hyperplastic-polyp baseline, so a prior whose only finding is one is a gap
  // rather than a return to screening that asserts the exam found nothing.
  if (prior.hpMaxSize >= 10 && prior.adenomaCount === 0 && prior.sslCount === 0 && prior.tsaCount === 0 && !prior.anyPiecemeal)
    return subGap('ACRCSP', src, 'ACRCSP publishes no subsequent-round rule for a baseline whose only finding is a hyperplastic polyp 10 mm or larger')
  // More than 10 adenomas is a distinct ACRCSP category (colonoscopy in 1 year and
  // consider genetic counselling), not the 3-to-5-year high-risk pathway, and it
  // publishes no subsequent-round rule, so it is a gap rather than "5 years".
  if (prior.adenomaCount > 10)
    return subGap('ACRCSP', src, 'ACRCSP handles more than 10 adenomas as a 1-year, consider-genetic-counselling category and publishes no subsequent-round rule for it')
  if (stage === 'second' && abIs34TA(prior) && abNoSurvNeeded(cur) && cur.adenomaMaxSize < 10 && !cur.anyHgd)
    return subResult(src, {
      interval: '5 to 10 years',
      modality: 'Colonoscopy',
      driver: '3 to 4 tubular adenomas at baseline, then a normal 5-year colonoscopy or only 1 to 2 small tubular adenomas without high-grade dysplasia',
      quote:
        'If the follow-up 5-year colonoscopy is normal or shows only 1 or 2 small TA with no high-grade dysplasia (HGD), then the interval for the subsequent examination should be 5–10 years.',
      location: 'Recommendation, "3 or 4 tubular adenomas <10 mm", Sadowski et al. 2024',
    })
  if (stage === 'second' && abHighRisk(prior)) {
    if (abNoSurvNeeded(cur))
      return subResult(src, {
        interval: '5 years',
        modality: 'Colonoscopy',
        driver: 'High-risk lesions at baseline, then a clear surveillance colonoscopy',
        quote: 'High risk lesions require surveillance colonoscopy at 3 years and then subsequent colonoscopy in 5 years.',
        location: 'Recommendation, "Subsequent colonoscopy surveillance after high-risk lesions", Sadowski et al. 2024',
      })
    return subGap('ACRCSP', src, 'ACRCSP sets the high-risk pathway as 3 years then 5 years for clear scopes. It states no interval when a surveillance colonoscopy again finds high-risk lesions')
  }
  if (stage === 'subsequent' && abNoSurvNeeded(prior) && abNoSurvNeeded(cur))
    return subResult(src, {
      interval: 'Consider return to average-risk FIT screening',
      modality: 'FIT',
      driver: 'Two clear surveillance colonoscopies with no polyps requiring surveillance',
      quote: 'If no polyps requiring surveillance are detected at both scopes, the panel recommends considering a return to average risk FIT screening.',
      location: 'Recommendation, "Subsequent colonoscopy surveillance after high-risk lesions", Sadowski et al. 2024',
      discretion: true,
      riskYears: 10,
      notes: ['ACRCSP publishes this return-to-FIT step for a patient on the high-risk surveillance pathway (high-risk lesions at baseline); it applies only if that was the pathway.'],
    })
  if (stage === 'second' && abNoSurvNeeded(prior))
    return screeningReset('CA_AB', rawCur)
  return subGap('ACRCSP', src, 'ACRCSP publishes subsequent-round intervals for high-risk lesions, 3 to 4 tubular adenomas, and piecemeal resection only. It states no subsequent rule for this combination of prior and current findings')
}

// --- British Columbia — BCGuidelines 2022, Table 1 column 3 + Figure 1 -----
const bcSubsequent: SubFn = (prior, cur, _stage, src, rawCur) => {
  const priorHighTrack = bcHighRisk(prior) || bcPrecancerousCount(prior) >= 5
  if (priorHighTrack) {
    // On the 3-year track, an exam with 0 to 4 low-risk lesions (a clean exam
    // included) de-escalates to 5 years; a repeat high-risk or 5+ low-risk finding
    // stays on the finding-based interval, taken from the baseline rule so its
    // wording is that finding's own row rather than a mismatched quote.
    if (!bcHighRisk(cur) && bcPrecancerousCount(cur) <= 4)
      return subResult(src, {
        interval: '5 years, then as per findings',
        modality: 'Colonoscopy',
        driver: 'A 3-year-track patient (5 or more low-risk lesions, or a high-risk lesion, at baseline) whose surveillance colonoscopy shows 0 to 4 low-risk lesions',
        quote: 'If 0 to 4 low risk lesions identified, then follow-up colonoscopy at 5 years and then as per colonoscopy findings',
        location: 'Table 1, subsequent-surveillance column, page 3',
      })
    const re = compute({ jur: 'CA_BC', lesions: rawCur, malignant: false, special: false, bbps: [3, 3, 3] })
    re.notes = [
      ...re.notes,
      'On the 3-year track the interval is applied as per findings at each surveillance colonoscopy (Table 1, subsequent column, page 3), de-escalating to 5 years once an exam shows only 0 to 4 low-risk lesions.',
    ]
    return re
  }
  if (bcPrecancerousCount(cur) === 0)
    return subResult(src, {
      interval: 'FIT in 10 years',
      modality: 'FIT',
      driver: 'No precancerous lesion at this surveillance colonoscopy, on the low-risk track',
      quote: 'No pre-cancerous lesion → FIT in 10 years',
      location: 'Figure 1: Algorithm for surveillance colonoscopy, page 3',
      riskYears: 10,
    })
  // Low-risk track: BC applies the finding-based interval at each surveillance exam.
  const reapplied = compute({ jur: 'CA_BC', lesions: rawCur, malignant: false, special: false, bbps: [3, 3, 3] })
  reapplied.notes = [
    ...reapplied.notes,
    'BCGuidelines applies the finding-based interval at each surveillance colonoscopy ("As per findings at each surveillance colonoscopy", Table 1, subsequent column, page 3).',
  ]
  return reapplied
}

// --- Australia — NHMRC Tables 13-16 (third colonoscopy) --------------------
// The next interval is a joint function of the two most recent exams. Each exam
// is classified into the guideline's own risk tiers; a 4x5 grid (Table 14) then
// gives the interval, with small serrated tables (15a/15b/16) for serrated
// findings. Every cell verified against the source PDF, cell by cell.
type AuInt = 'FOBT' | '10Y' | '5Y' | '3Y' | '1Y'
type AuCat = 'none' | 'low' | 'int' | 'high' | 'highest'
const AU_LABEL: Record<AuInt, string> = { FOBT: 'Return to FOBT screening (National Bowel Cancer Screening Program)', '10Y': '10 years', '5Y': '5 years', '3Y': '3 years', '1Y': '1 year' }
const AU_RISK: Record<AuInt, number> = { FOBT: 10, '10Y': 10, '5Y': 5, '3Y': 3, '1Y': 1 }
const AU_CAT_LABEL: Record<AuCat, string> = { none: 'no adenomas', low: 'low-risk adenomas', int: 'intermediate-risk adenomas', high: 'high-risk adenomas', highest: 'highest-risk adenomas' }
// Table 14: row = first-colonoscopy adenoma tier, column = this-colonoscopy tier.
const AU_T14: Record<Exclude<AuCat, 'none'>, Record<AuCat, AuInt>> = {
  low: { none: 'FOBT', low: '10Y', int: '5Y', high: '3Y', highest: '1Y' },
  int: { none: '10Y', low: '5Y', int: '5Y', high: '3Y', highest: '1Y' },
  high: { none: '5Y', low: '5Y', int: '3Y', high: '3Y', highest: '1Y' },
  highest: { none: '5Y', low: '5Y', int: '3Y', high: '1Y', highest: '1Y' },
}
// Table 16 highest-risk sub-table (serrated at first colonoscopy) differs from
// Table 14 only in its first two columns; the int/high rows match Table 14.
const AU_T16_HIGHEST: Record<AuCat, AuInt> = { none: '3Y', low: '3Y', int: '3Y', high: '1Y', highest: '1Y' }
// Table 15b: serrated with synchronous adenomas, by combined count and by
// adenoma tier (low/high) and advanced serrated (no/yes).
const AU_T15B: Record<'2' | '3-4' | '5-9' | '10+', Record<'low' | 'high', Record<'no' | 'yes', AuInt>>> = {
  '2': { low: { no: '5Y', yes: '3Y' }, high: { no: '3Y', yes: '3Y' } },
  '3-4': { low: { no: '3Y', yes: '3Y' }, high: { no: '1Y', yes: '1Y' } },
  '5-9': { low: { no: '1Y', yes: '1Y' }, high: { no: '1Y', yes: '1Y' } },
  '10+': { low: { no: '1Y', yes: '1Y' }, high: { no: '1Y', yes: '1Y' } },
}
function auAdenomaCat(a: Agg): AuCat {
  const n = a.adenomaCount
  if (n === 0) return 'none'
  const big = a.adenomaMaxSize >= 10
  const adv = a.anyHgd || a.anyVillous
  if (n >= 10) return 'highest'
  if (n >= 5) return big || adv ? 'highest' : 'high'
  if (n >= 3) return big && adv ? 'highest' : big || adv ? 'high' : 'int'
  return big ? 'high' : adv ? 'int' : 'low' // 1 to 2 adenomas
}
const auCsSerratedCount = (a: Agg): number => a.sslCount + a.tsaCount + (a.hpMaxSize >= 10 ? a.hpCount : 0)
const auHasCsSerrated = (a: Agg): boolean => auCsSerratedCount(a) > 0
const auAdvancedSerrated = (a: Agg): boolean => a.tsaCount > 0 || a.anySslDysplasia || a.sslMaxSize >= 10 || a.hpMaxSize >= 10
function au1stSerratedCat(a: Agg): 'int' | 'high' | 'highest' {
  const n = auCsSerratedCount(a)
  const adv = auAdvancedSerrated(a)
  if (n >= 5) return 'highest'
  if (n >= 3) return adv ? 'highest' : 'high'
  return adv ? 'high' : 'int'
}
const AU_QUOTE =
  'For individuals who have undergone two or more colonoscopies, the surveillance interval for the next (3rd) colonoscopy should be based on the reports and histology from the two most recent procedures (1st and 2nd colonoscopies) as per Tables 14–16 (see Table 13 as a quick reference guide).'
function auResult(src: Source, code: AuInt, driver: string, location: string, stage: Stage): Result {
  return subResult(src, {
    interval: AU_LABEL[code],
    modality: code === 'FOBT' ? 'FOBT' : 'Colonoscopy',
    driver,
    quote: AU_QUOTE,
    location,
    strength: 'Practice point (NHMRC consensus); the underlying first-surveillance intervals are Grade C/D evidence-based',
    riskYears: AU_RISK[code],
    notes:
      stage === 'subsequent'
        ? ['Tables 14–16 are headed "3rd colonoscopy". The guideline directs using the two most recent exams, which this applies to a later round as well.']
        : [],
  })
}
const auSubsequent: SubFn = (prior, cur, stage, src, rawCur) => {
  const curSerr = auHasCsSerrated(cur)
  const curAdenoma = cur.adenomaCount > 0
  const cur2 = auAdenomaCat(cur)
  const priorSerr = auHasCsSerrated(prior)
  const prior1 = auAdenomaCat(prior)

  if (!curSerr && !curAdenoma && !priorSerr && prior1 === 'none')
    return screeningReset('AU', rawCur)

  // The next interval is the worse (shortest) of what the current exam warrants
  // and what the prior exam's tier warrants; neither exam's risk is discarded, so
  // a serrated finding at this exam can never drop a high-risk prior, and adding a
  // lesion can never lengthen the interval.
  const options: { code: AuInt; driver: string; location: string }[] = []
  if (curSerr && !curAdenoma) {
    const n = auCsSerratedCount(cur)
    const adv = auAdvancedSerrated(cur)
    options.push({ code: n >= 5 ? '1Y' : n >= 3 ? (adv ? '1Y' : '3Y') : adv ? '3Y' : '5Y', driver: 'Clinically significant serrated polyps only at this colonoscopy', location: 'Table 15a, p19' })
  } else if (curSerr && curAdenoma) {
    const combined = auCsSerratedCount(cur) + cur.adenomaCount
    const band = combined <= 2 ? '2' : combined <= 4 ? '3-4' : combined <= 9 ? '5-9' : '10+'
    const atype = cur.adenomaMaxSize >= 10 || cur.anyHgd || cur.anyVillous ? 'high' : 'low'
    const adv = auAdvancedSerrated(cur) ? 'yes' : 'no'
    options.push({ code: AU_T15B[band][atype][adv], driver: 'Serrated polyps with synchronous adenomas at this colonoscopy', location: 'Table 15b, p19' })
  }
  if (priorSerr) {
    const cat = au1stSerratedCat(prior)
    const row = cat === 'highest' ? AU_T16_HIGHEST : AU_T14[cat]
    options.push({ code: row[cur2], driver: `Clinically significant serrated polyps at the first colonoscopy (${cat}-risk), ${AU_CAT_LABEL[cur2]} at this colonoscopy`, location: 'Table 16, p20' })
  }
  if (prior1 !== 'none')
    options.push({ code: AU_T14[prior1][cur2], driver: `${AU_CAT_LABEL[prior1]} at the first colonoscopy, ${AU_CAT_LABEL[cur2]} at this colonoscopy`, location: 'Table 14, p18' })

  // Current adenomas only against a clear prior: take the current exam as a fresh
  // baseline.
  if (options.length === 0)
    return screeningReset('AU', rawCur)
  const worst = options.sort((a, b) => AU_RISK[a.code] - AU_RISK[b.code])[0]
  return auResult(src, worst.code, worst.driver, worst.location, stage)
}

const SUBSEQUENT: Record<JurId, SubFn> = {
  US: usSubsequent,
  CA_ON: onSubsequent,
  CA_AB: abSubsequent,
  CA_BC: bcSubsequent,
  AU: auSubsequent,
  EU: euSubsequent,
}

export function computeSurveillance(x: SurvExam): Result {
  if (x.stage === 'first' || !x.prior)
    return compute({ jur: x.jur, lesions: x.current, malignant: x.malignant, special: x.special, bbps: x.bbps })

  const spec = SPECS[x.jur]
  const src = SRC[x.jur]
  const prepBad = !prepAdequate(x.bbps)

  if (x.malignant || x.special) {
    const which = x.malignant ? spec.malignant : spec.special
    return {
      interval: `Outside the scope of ${spec.short}`,
      modality: null,
      driver: which.driver,
      quote: which.quote,
      location: which.location,
      source: src,
      strength: null,
      separateDocument: false,
      notes: prepBad ? prepNotes(spec) : [],
      riskYears: 0,
      override: true,
      discretion: false,
      notSpecified: false,
      prepInadequate: prepBad,
      assumption: false,
      calculatorRule: null,
      supersededInterval: null,
    }
  }

  const prior = aggregate(x.prior)
  const cur = aggregate(x.current)
  let res = SUBSEQUENT[x.jur](prior, cur, x.stage, src, x.current)

  // A piecemeal resection's early site check is resection-keyed and mandatory, so
  // it governs at any round even where a branch returned a not-specified gap or a
  // longer interval. Detect it by whether the piecemeal flag changes this exam's
  // own baseline answer, and if so use that (the site check) as the result.
  if (cur.anyPiecemeal) {
    const withPiece = compute({ jur: x.jur, lesions: x.current, malignant: false, special: false, bbps: [3, 3, 3] })
    const noPiece = compute({ jur: x.jur, lesions: x.current.map((l) => ({ ...l, piece: false })), malignant: false, special: false, bbps: [3, 3, 3] })
    if (!withPiece.notSpecified && !withPiece.override && withPiece.riskYears > 0 && withPiece.interval !== noPiece.interval) {
      res = withPiece
    }
  }

  // The current exam's own findings, scored as a fresh baseline, are the floor.
  // Where the round logic gave a concrete interval, the shorter current-baseline
  // governs silently (it is itself a guideline rule, so a prior history never
  // lengthens the interval past what this exam alone warrants). Where the round
  // logic had no rule for the combination, the current-baseline interval is still
  // given rather than a bare "not specified", under a caveat that the guideline
  // does not publish a rule for this exact sequence.
  // A round result gives no timeframe when it is a not-specified gap or a bare
  // "endoscopist discretion" with no modality (as distinct from a discretion that
  // does name a pathway, e.g. return to FIT). In both cases the current exam's own
  // baseline interval is given rather than nothing.
  const roundGaveNoTimeframe = res.notSpecified || (res.discretion && res.modality === null)
  if (!res.override) {
    const currentBaseline = compute({ jur: x.jur, lesions: x.current, malignant: false, special: false, bbps: [3, 3, 3] })
    const usable = !currentBaseline.notSpecified && !currentBaseline.override && !currentBaseline.discretion && currentBaseline.riskYears > 0
    if (usable && roundGaveNoTimeframe) {
      res = {
        ...currentBaseline,
        interpretation: `${spec.short} publishes no interval for this combination of prior and current findings, so the interval is taken from the most recent examination as a new baseline.`,
      }
    } else if (usable && !res.discretion && !res.notSpecified && res.riskYears > 0 && currentBaseline.riskYears < res.riskYears) {
      res = currentBaseline
    }
  }

  // A polyp removed piecemeal at the earlier colonoscopy is followed on its own
  // endoscopist-directed schedule, which a round interval does not encode; flag it
  // where this exam is not itself the piecemeal one.
  if (prior.anyPiecemeal && !cur.anyPiecemeal && !res.override) {
    res.notes = [...res.notes, 'A polyp was removed piecemeal at the earlier colonoscopy. Its resection site is followed on an endoscopist-directed schedule that this interval does not encode.']
  }

  for (const adv of spec.advisories) {
    if (adv.when(cur)) res.notes = [...res.notes, adv.note]
  }
  // A result reused from compute() (a screening reset, a monotonicity floor, or an
  // interpretation) has already had these advisories applied, so drop duplicates.
  res.notes = [...new Set(res.notes)]

  // An inadequately prepared exam is non-diagnostic whatever its findings, so a
  // concrete interval is demoted to the society's preparation pathway exactly as
  // the baseline path does. This includes return-to-screening outcomes (FIT /
  // FOBT / no surveillance) and a discretion that names such a pathway (e.g. a
  // considered return to FIT): a clear-looking but under-prepared exam cannot
  // justify sending the patient back to screening. Only genuine gaps, scope
  // statements, and a bare discretion with no timeframe are left undemoted.
  const demotable = !res.notSpecified && !res.override && res.riskYears > 0 && !(res.discretion && res.modality === null)
  return prepBad && demotable ? prepResult(spec, src, res) : res
}

export interface Jurisdiction {
  id: JurId
  country: 'US' | 'CA' | 'AU' | 'EU'
  label: string
  province?: string
  guideline: string
  source: Source
}
export const JURISDICTIONS: Jurisdiction[] = [
  { id: 'US', country: 'US', label: 'United States', guideline: 'USMSTF 2020', source: SRC.US },
  { id: 'CA_ON', country: 'CA', label: 'Canada', province: 'Ontario', guideline: 'ColonCancerCheck', source: SRC.CA_ON },
  { id: 'CA_AB', country: 'CA', label: 'Canada', province: 'Alberta', guideline: 'ACRCSP', source: SRC.CA_AB },
  { id: 'CA_BC', country: 'CA', label: 'Canada', province: 'British Columbia', guideline: 'BCGuidelines 2022', source: SRC.CA_BC },
  { id: 'AU', country: 'AU', label: 'Australia', guideline: 'NHMRC / Cancer Council', source: SRC.AU },
  { id: 'EU', country: 'EU', label: 'Europe', guideline: 'ESGE 2020', source: SRC.EU },
]
