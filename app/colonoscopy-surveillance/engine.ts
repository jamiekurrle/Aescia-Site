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

export interface Result {
  interval: string
  modality: string | null
  driver: string
  quote: string
  location: string // table / recommendation number the interval is printed in
  source: Source
  notes: string[]
  riskYears: number // sort key (lower = shorter interval)
  override: boolean // outside the guideline's stated scope
  discretion: boolean // the guideline explicitly declines to state an interval
  notSpecified: boolean // the guideline states no rule for this scenario
  prepInadequate: boolean
  assumption: boolean
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
  serratedCount: number // SSL + TSA + HP
  serratedMaxSize: number
  anyPiecemeal: boolean
  piecemealSize: number
  piecemealAdenomaSize: number
  piecemealSslSize: number
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
  let anyPiecemeal = false
  let piecemealSize = 0
  let piecemealAdenomaSize = 0
  let piecemealSslSize = 0
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
      if (l.proximal) anyProximalHp = true
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
    serratedCount: sslCount + tsaCount + hpCount,
    serratedMaxSize: Math.max(sslMaxSize, tsaMaxSize, hpMaxSize),
    anyPiecemeal,
    piecemealSize,
    piecemealAdenomaSize,
    piecemealSslSize,
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
  rules: Rule[]
  advisories: Advisory[]
  // The guideline's own precondition wording about an adequate examination.
  prep: { quote: string; location: string; onInadequate: string }
  malignant: { driver: string; quote: string; location: string }
  special: { driver: string; quote: string; location: string }
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
    quote:
      'All recommendations assume examination complete to cecum with bowel preparation adequate to detect lesions >5 mm in size',
    location: 'Table 4 footnote a, p.469; Table 5 footnote a, p.470',
    onInadequate:
      'USMSTF 2020 states no repeat interval for an inadequately prepared examination. Adequate preparation is a precondition of every Table 4 and Table 5 interval, so this examination falls outside the stated scope of those intervals. The repeat timing is a clinical decision.',
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
      interval: '10 y (Strong; High)',
      driver: 'A normal colonoscopy',
      quote: 'Normal | 10 y | Strong | High',
      location: 'Table 4, p.469',
      riskYears: YRS.y10,
    },
    {
      id: 'us_piecemeal_adenoma',
      kind: 'rule',
      when: (a) => a.piecemealAdenomaSize >= 20,
      interval: '6 mo (Strong; Moderate)',
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
      interval: '1 y (Weak; Very low)',
      driver: 'More than 10 adenomas on a single examination',
      quote: '>10 adenomas on single examination | 1 y | Weak | Very low',
      location: 'Table 4, p.469',
      riskYears: YRS.y1,
    },
    {
      id: 'us_adenoma_10mm',
      kind: 'rule',
      when: (a) => a.adenomaCount > 0 && a.adenomaMaxSize >= 10,
      interval: '3 y (Strong; High)',
      driver: 'An adenoma 10 mm or larger',
      quote: 'Adenoma ≥10 mm | 3 y | Strong | High',
      location: 'Table 4, p.469',
      riskYears: YRS.y3,
    },
    {
      id: 'us_adenoma_villous',
      kind: 'rule',
      when: (a) => a.adenomaCount > 0 && a.anyVillous,
      interval: '3 y (Strong; Moderate)',
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
      interval: '3 y (Strong; Moderate)',
      driver: 'An adenoma with high-grade dysplasia',
      quote: 'Adenoma with high-grade dysplasia | 3 y | Strong | Moderate',
      location: 'Table 4, p.469',
      riskYears: YRS.y3,
      notes: () => ['Table 4 footnote d: "Assumes high confidence of complete resection."'],
    },
    {
      id: 'us_ta_5_10',
      kind: 'rule',
      when: (a) => a.adenomaCount >= 5 && a.adenomaCount <= 10 && a.adenomaMaxSize < 10 && !a.anyVillous,
      interval: '3 y (Strong; Moderate)',
      driver: '5 to 10 tubular adenomas under 10 mm',
      quote: '5-10 tubular adenomas <10 mm | 3 y | Strong | Moderate',
      location: 'Table 4, p.469',
      riskYears: YRS.y3,
    },
    {
      id: 'us_ta_3_4',
      kind: 'rule',
      when: (a) => a.adenomaCount >= 3 && a.adenomaCount <= 4 && a.adenomaMaxSize < 10 && !a.anyVillous,
      interval: '3-5 y (Weak; Very low)',
      driver: '3 to 4 tubular adenomas under 10 mm',
      quote: '3-4 tubular adenomas <10 mm | 3-5 y | Weak | Very low',
      location: 'Table 4, p.469',
      riskYears: YRS.y35,
    },
    {
      id: 'us_ta_1_2',
      kind: 'rule',
      when: (a) => a.adenomaCount >= 1 && a.adenomaCount <= 2 && a.adenomaMaxSize < 10 && !a.anyVillous,
      interval: '7-10 y (Strong; Moderate)',
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
      interval: '6 mo (Strong; Moderate)',
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
      interval: '3 y (Weak; Very low)',
      driver: 'A sessile serrated polyp 10 mm or larger',
      quote: 'SSP ≥10 mm | 3 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y3,
    },
    {
      id: 'us_ssp_dysplasia',
      kind: 'rule',
      when: (a) => a.sslCount > 0 && a.anySslDysplasia,
      interval: '3 y (Weak; Very low)',
      driver: 'A sessile serrated polyp with dysplasia',
      quote: 'SSP with dysplasia | 3 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y3,
    },
    {
      id: 'us_tsa',
      kind: 'rule',
      when: (a) => a.tsaCount > 0,
      interval: '3 y (Weak; Very low)',
      driver: 'A traditional serrated adenoma',
      quote: 'TSA | 3 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y3,
    },
    {
      id: 'us_ssp_5_10',
      kind: 'rule',
      when: (a) => a.sslCount >= 5 && a.sslCount <= 10 && a.sslMaxSize < 10 && !a.anySslDysplasia,
      interval: '3 y (Weak; Very low)',
      driver: '5 to 10 sessile serrated polyps under 10 mm',
      quote: '5-10 SSPs <10 mm | 3 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y3,
    },
    {
      id: 'us_ssp_3_4',
      kind: 'rule',
      when: (a) => a.sslCount >= 3 && a.sslCount <= 4 && a.sslMaxSize < 10 && !a.anySslDysplasia,
      interval: '3-5 y (Weak; Very low)',
      driver: '3 to 4 sessile serrated polyps under 10 mm',
      quote: '3-4 SSPs <10 mm | 3-5 y | Weak | Very low',
      location: 'Table 5, p.470',
      riskYears: YRS.y35,
    },
    {
      id: 'us_ssp_1_2',
      kind: 'rule',
      when: (a) => a.sslCount >= 1 && a.sslCount <= 2 && a.sslMaxSize < 10 && !a.anySslDysplasia,
      interval: '5-10 y (Weak; Very low)',
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
      interval: '3-5 y (Weak; Very low)',
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
      interval: '10 y (Strong; Moderate)',
      driver: 'Hyperplastic polyps under 10 mm in the rectum or sigmoid colon',
      quote: '≤20 HPs in rectum or sigmoid colon <10 mm | 10 y | Strong | Moderate',
      location: 'Table 5, p.470',
      riskYears: YRS.y10,
    },
    {
      id: 'us_hp_small_proximal',
      kind: 'rule',
      when: (a) => a.hpCount > 0 && a.hpCount <= 20 && a.hpMaxSize < 10 && a.anyProximalHp,
      interval: '10 y (Weak; Very low)',
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
    quote: ON_MOST_ADVANCED,
    location: 'Background, bullet 3, page 2',
    onInadequate:
      'ColonCancerCheck states no repeat interval for an inadequately prepared examination. A high-quality colonoscopy is a stated assumption of every row in its table, so this examination falls outside the stated scope of those intervals. The repeat timing is a clinical decision.',
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
    quote: AB_HIGH_QUALITY,
    location: 'Recommendations for post-polypectomy surveillance, preamble',
    onInadequate:
      'ACRCSP states no repeat interval for an inadequately prepared examination. Its own words: "Our revised recommendations build upon the assumption that a high-quality index colonoscopy has been performed at baseline." This examination falls outside the stated scope of its intervals. The repeat timing is a clinical decision.',
  },
  rules: [
    {
      id: 'ab_synchronous_declined',
      kind: 'declined',
      when: (a) => a.sslCount > 0 && a.adenomaCount > 0,
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
      when: (a) => a.hpCount > 0 && a.hpMaxSize >= 10 && a.anyProximalHp,
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
      when: (a) => a.hpCount > 0 && a.hpMaxSize >= 10 && !a.anyProximalHp,
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
    quote:
      'The importance of a high-quality baseline colonoscopy cannot be overstated. A complete exam to the cecum, an adequate bowel preparation, and careful inspection of the mucosa with optimal polypectomy technique are associated with a decreased risk of CRC and CRC death.',
    location: 'Management, page 2',
    onInadequate:
      'BCGuidelines 2022 states no repeat interval for an inadequately prepared examination in its post-polypectomy pathway. Adequate preparation is named only as a quality attribute of the baseline colonoscopy its Table 1 intervals assume, so this examination falls outside the stated scope of those intervals. The repeat timing is a clinical decision.',
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
      when: (a) => a.anyPiecemeal,
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
  a.anySslDysplasia

const EU: JurSpec = {
  short: 'ESGE 2020',
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
    quote: 'standard guideline recommendations for surveillance intervals apply only to patients with adequate bowel preparation.',
    location: 'Section "Inadequate bowel preparation", p.4',
    onInadequate:
      'ESGE 2020 issues no recommendation of its own on the repeat interval after inadequate preparation — the "Inadequate bowel preparation" section carries no RECOMMENDATION box. It reports a figure from a different document: "Strong recommendations for a 1-year repeat colonoscopy in the case of inadequate bowel preparation were issued by ESGE [24] recently and by other associations [30], strengthened by new evidence showing how a suboptimal baseline exam independently increases CRC incidence and mortality [4]." This examination falls outside the stated scope of the intervals in this guideline. The repeat timing is a clinical decision.',
  },
  rules: [
    {
      id: 'eu_no_polyp',
      kind: 'gap',
      when: (a) => !a.hasAnyLesion,
      interval: gapInterval('ESGE 2020'),
      modality: null,
      driver:
        'ESGE 2020 scopes its recommendations to patients who had one or more polyps removed; it states no rule for a colonoscopy that found none',
      quote: EU_PRECONDITION,
      location: 'MAIN RECOMMENDATIONS preamble (p.1); RECOMMENDATION box, p.4',
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
      interval: 'No endoscopic surveillance; return to screening',
      modality: null,
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
      when: (a) => a.tsaCount > 0 && !euNeedsSurveillance(a),
      note:
        'ESGE 2020 is internally inconsistent on a traditional serrated adenoma under 10 mm without dysplasia. Its boxed recommendations key on size and dysplasia only, and send it back to screening. Its prose on p.7 names the traditional serrated adenoma as a standalone category requiring surveillance: "Traditional serrated adenoma, serrated polyp ≥10 mm and serrated polyp with dysplasia yield similar metachronous advanced neoplasia or CRC risks compared to conventional adenomas, and thus require surveillance [9–11, 67, 72, 73]. Therefore, ESGE recommends surveillance colonoscopy at 3 years for these categories of polyps." ESGE does not resolve this.',
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
    quote: 'Where the preparation is inadequate, repeat colonoscopy should normally be offered within 12 months.',
    location: 'Practice point, Bowel preparation section, p.171 (restated p.270)',
    onInadequate:
      'Cancer Council Australia is the only one of these six guidelines that states a repeat interval for inadequate preparation, and it states it as a practice point — its weakest recommendation class — hedged with "normally": "Where the preparation is inadequate, repeat colonoscopy should normally be offered within 12 months." (p.171). Supporting text, p.169: "Whichever scale is used, inadequate preparation should be clearly documented and those with inadequate preparation should be offered repeat colonoscopy within 12 months." It states no shorter interval for inadequate preparation in a higher-risk patient, and no rule for preparation that is adequate but suboptimal.',
  },
  rules: [
    {
      id: 'au_normal',
      kind: 'gap',
      when: (a) => !a.hasAnyLesion,
      interval: gapInterval('Cancer Council Australia'),
      modality: null,
      driver:
        'The Cancer Council surveillance tables key on removed lesions; this guideline states no rule for a colonoscopy that found none',
      quote:
        'Surveillance recommendations should be made after the colon has been cleared of all significant neoplasia, once histology is known and in the context of individualised assessment of benefit to the patient.',
      location: 'Table 3 explanatory text, p.102',
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
      when: (a) => a.hpCount > 0 && a.hpMaxSize < 10,
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
    notes: rule.notes ? rule.notes(a) : [],
    riskYears: rule.riskYears ?? 0,
    override: rule.kind === 'scope',
    discretion: rule.kind === 'declined',
    notSpecified: rule.kind === 'gap' || rule.kind === 'declined',
    prepInadequate: false,
    assumption: false,
  }
}

export function prepAdequate(bbps: [number, number, number]): boolean {
  return bbps.every((s) => s >= 2) && bbps[0] + bbps[1] + bbps[2] >= 6
}

// The guideline's own matched rows compete; the shortest interval among them
// governs. Nothing is derived — every candidate is a row the guideline prints
// for a finding at this examination.
function shortest(cands: Result[]): Result {
  return [...cands].sort((x, y) => x.riskYears - y.riskYears)[0]
}

// ---------------------------------------------------------------------------
// Top-level dispatch
// ---------------------------------------------------------------------------
export function compute(exam: Exam): Result {
  const spec = SPECS[exam.jur]
  const src = SRC[exam.jur]
  const a = aggregate(exam.lesions)

  if (exam.malignant) {
    return {
      interval: `Outside the scope of ${spec.short}`,
      modality: null,
      driver: spec.malignant.driver,
      quote: spec.malignant.quote,
      location: spec.malignant.location,
      source: src,
      notes: [],
      riskYears: 0,
      override: true,
      discretion: false,
      notSpecified: false,
      prepInadequate: false,
      assumption: false,
    }
  }
  if (exam.special) {
    return {
      interval: `Outside the scope of ${spec.short}`,
      modality: null,
      driver: spec.special.driver,
      quote: spec.special.quote,
      location: spec.special.location,
      source: src,
      notes: [],
      riskYears: 0,
      override: true,
      discretion: false,
      notSpecified: false,
      prepInadequate: false,
      assumption: false,
    }
  }

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
    res = shortest(emittable.map((r) => toResult(r, a, src)))
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
      notes: [],
      riskYears: 0,
      override: false,
      discretion: false,
      notSpecified: true,
      prepInadequate: false,
      assumption: false,
    }
  }

  for (const adv of spec.advisories) {
    if (adv.when(a)) res.notes = [...res.notes, adv.note]
  }

  // Inadequate preparation does not shorten or replace the interval. Every one
  // of these guidelines states its intervals assume an adequate examination;
  // none of them states what this exam's interval should instead be.
  if (!prepAdequate(exam.bbps)) {
    res.prepInadequate = true
    res.notes = [
      `Bowel preparation was inadequate on the Boston Bowel Preparation Scale. ${spec.short} states its intervals assume an adequate examination — "${spec.prep.quote}" (${spec.prep.location}).`,
      spec.prep.onInadequate,
      ...res.notes,
    ]
  }

  return res
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
