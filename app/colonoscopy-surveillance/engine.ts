// ---------------------------------------------------------------------------
// Colonoscopy post-polypectomy surveillance engine — v2 (multi-lesion + modes).
//
// Takes a SET of lesions plus exam context (index vs surveillance, prior risk)
// and returns the guideline-recommended next interval for the selected
// jurisdiction. Rebuilt from the 6-jurisdiction rule spec:
//   - Aggregation: US/EU/ON/AB score per-axis (adenomas vs serrated separately,
//     shortest governs); BC & AU pool a combined precancerous-lesion count.
//   - Modes: INDEX (baseline -> first surveillance) fully coded for all six;
//     SUBSEQUENT coded for US (adenoma axis / Table 7), EU (negative-streak),
//     BC, and AU (Tables D/E/F, with the labelled category-mapping assumption);
//     ON and AB scope-gate their serrated / piecemeal / discretion branches.
//
// NOT a medical device. Clinician reference. Assumes complete resection and a
// high-quality exam; malignant polyps / IBD / hereditary are out of scope.
// ---------------------------------------------------------------------------

export type Hist = 'TA' | 'TVA' | 'VA' | 'SSL' | 'TSA' | 'HP' | 'CANCER'
export type JurId = 'US' | 'CA_ON' | 'CA_AB' | 'CA_BC' | 'AU' | 'EU'
export type ExamMode = 'index' | 'surveillance'
// Prior-exam risk band (surveillance mode). Jurisdiction-adaptive mapping lives
// in each compute; the UI offers these. 'high' is the high-risk ADENOMA track;
// 'complex' is a prior serrated lesion, piecemeal resection, or >10 adenomas —
// which several guidelines (notably Ontario and Alberta) leave to endoscopist
// discretion at subsequent surveillance.
export type PriorRisk = 'normal' | 'low' | 'intermediate' | 'high' | 'complex'

export interface LesionInput {
  hist: Exclude<Hist, 'CANCER'>
  count: number
  size: number // largest of this lesion type, mm
  hgd: boolean
  piece: boolean // piecemeal resection
  proximal: boolean // proximal to sigmoid (HP location; AB uses it)
}

export interface Exam {
  jur: JurId
  mode: ExamMode
  lesions: LesionInput[]
  priorRisk: PriorRisk // used only in surveillance mode
  malignant: boolean
  special: boolean // IBD / hereditary / FHx CRC
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
  source: Source
  notes: string[]
  riskYears: number // sort key (lower = higher risk); for tiers/ordering
  override: boolean // out of scope (cancer / IBD / hereditary)
  discretion: boolean // guideline defers to endoscopist; no fixed number
  prepInadequate: boolean
  assumption: boolean // interval rests on a labelled fallback/assumption
}

// ---------------------------------------------------------------------------
// Sources
// ---------------------------------------------------------------------------
export const SRC: Record<JurId, Source> = {
  US: { name: 'US Multi-Society Task Force, 2020 (Gupta et al., Gastroenterology 2020;158:1131–1153)', url: 'https://pubmed.ncbi.nlm.nih.gov/32044092/' },
  CA_ON: { name: 'ColonCancerCheck / Cancer Care Ontario — Post-Polypectomy Surveillance', url: 'https://www.cancercareontario.ca/en/guidelines-advice/cancer-continuum/screening/resources-healthcare-providers/post-polypectomy-surveillance-recommendations-summary' },
  CA_AB: { name: 'Alberta ACRCSP 2023 (Sadowski et al., JCAG 2024;7(4):319)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11317626/' },
  CA_BC: { name: 'BCGuidelines.ca — Colorectal Cancer Part 2 (2022)', url: 'https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/bc-guidelines/colorectal-cancer-part2' },
  AU: { name: 'Cancer Council Australia / NHMRC — Surveillance colonoscopy guidelines', url: 'https://www.cancer.org.au/clinical-guidelines/bowel-cancer/surveillance-colonoscopy' },
  EU: { name: 'ESGE 2020 (Hassan et al., Endoscopy 2020;52(8):687–700)', url: 'https://doi.org/10.1055/a-1185-3109' },
}

// interval label -> sort key (lower-bound years; lower = higher risk)
const YRS = {
  m6: 0.5,
  m6range: 0.5, // "3 to 6 months" / "6 months"
  y1: 1,
  y3: 3,
  y35: 3.5,
  y5: 5,
  y510: 5.5,
  y710: 7,
  y10: 10,
} as const

// ---------------------------------------------------------------------------
// Aggregate a lesion set into the features each jurisdiction needs.
// ---------------------------------------------------------------------------
function isAdenomaHist(h: Hist): boolean {
  return h === 'TA' || h === 'TVA' || h === 'VA'
}
function isVillousHist(h: Hist): boolean {
  return h === 'TVA' || h === 'VA'
}

interface Agg {
  adenomaCount: number
  adenomaMaxSize: number
  anyVillous: boolean
  anyHgd: boolean
  advancedAdenoma: (jur: JurId) => boolean
  // serrated (SSL/TSA/HP)
  sslCount: number // sessile serrated lesions
  tsaCount: number
  hpCount: number
  serratedMaxSize: number // SSL/TSA/HP largest
  anySerratedDysplasia: boolean // SSL with dysplasia (hgd flag on serrated)
  anyTsa: boolean
  hpMaxSize: number
  anyProximalHp: boolean
  // csp = clinically significant serrated polyp count (SSL + TSA + HP>=10) — AU
  csspCount: number
  // combined precancerous (BC): adenomas + SSL + TSA + HP>=10
  bcPrecancerousCount: number
  // piecemeal
  anyPiecemeal: boolean
  piecemealSize: number // largest piecemeal lesion
  piecemealThresholdMet: (thr: number) => boolean
  // hyperplastic-only small (for HP handling)
  hasAnyLesion: boolean
  totalLesions: number
}

function aggregate(lesions: LesionInput[]): Agg {
  let adenomaCount = 0, adenomaMaxSize = 0, anyVillous = false, anyHgd = false
  let sslCount = 0, tsaCount = 0, hpCount = 0, serratedMaxSize = 0
  let anySerratedDysplasia = false, anyTsa = false, hpMaxSize = 0, anyProximalHp = false
  let anyPiecemeal = false, piecemealSize = 0
  let total = 0

  for (const l of lesions) {
    const n = Math.max(0, l.count | 0)
    if (n === 0) continue
    total += n
    if (l.piece) { anyPiecemeal = true; piecemealSize = Math.max(piecemealSize, l.size) }
    if (isAdenomaHist(l.hist)) {
      adenomaCount += n
      adenomaMaxSize = Math.max(adenomaMaxSize, l.size)
      if (isVillousHist(l.hist)) anyVillous = true
      if (l.hgd) anyHgd = true
    } else if (l.hist === 'SSL') {
      sslCount += n
      serratedMaxSize = Math.max(serratedMaxSize, l.size)
      if (l.hgd) anySerratedDysplasia = true
    } else if (l.hist === 'TSA') {
      tsaCount += n
      anyTsa = true
      serratedMaxSize = Math.max(serratedMaxSize, l.size)
    } else if (l.hist === 'HP') {
      hpCount += n
      hpMaxSize = Math.max(hpMaxSize, l.size)
      serratedMaxSize = Math.max(serratedMaxSize, l.size)
      if (l.proximal) anyProximalHp = true
    }
  }

  const csspCount = sslCount + tsaCount + (hpMaxSize >= 10 ? hpCount : 0)
  const bcPrecancerousCount = adenomaCount + sslCount + tsaCount + (hpMaxSize >= 10 ? hpCount : 0)

  return {
    adenomaCount, adenomaMaxSize, anyVillous, anyHgd,
    advancedAdenoma: (jur: JurId) => {
      if (adenomaCount === 0) return false
      const big = adenomaMaxSize >= 10
      if (jur === 'EU') return big || anyHgd // villous NOT a trigger in ESGE
      if (jur === 'CA_ON') return big || anyVillous || anyHgd || adenomaCount >= 3
      return big || anyVillous || anyHgd // US, AB, BC, AU
    },
    sslCount, tsaCount, hpCount, serratedMaxSize, anySerratedDysplasia, anyTsa, hpMaxSize, anyProximalHp,
    csspCount, bcPrecancerousCount,
    anyPiecemeal, piecemealSize,
    piecemealThresholdMet: (thr: number) => anyPiecemeal && piecemealSize >= thr,
    hasAnyLesion: total > 0,
    totalLesions: total,
  }
}

// Advanced serrated polyp (per jurisdiction predicate)
function advancedSerrated(a: Agg, jur: JurId): boolean {
  const sslAdv = a.serratedMaxSize >= 10 && (a.sslCount > 0) // approximate: any serrated >=10
  const anyBig = a.serratedMaxSize >= 10
  const anySerratedPresent = a.sslCount + a.tsaCount + a.hpCount > 0
  if (!anySerratedPresent) return false
  // SSL>=10, SSL dysplasia, TSA (all jurisdictions); US/BC/AU also HP>=10
  if (a.anyTsa) return true
  if (a.anySerratedDysplasia) return true
  if (a.sslCount > 0 && a.serratedMaxSize >= 10) return true
  if ((jur === 'US' || jur === 'CA_BC' || jur === 'AU') && a.hpMaxSize >= 10) return true
  return sslAdv || (anyBig && (a.sslCount > 0)) // fallthrough safety
}

// ---------------------------------------------------------------------------
// Result builder
// ---------------------------------------------------------------------------
function R(p: Partial<Result> & { interval: string; riskYears: number; source: Source }): Result {
  return {
    interval: p.interval,
    modality: p.modality ?? 'Colonoscopy',
    driver: p.driver ?? '',
    quote: p.quote ?? '',
    source: p.source,
    notes: p.notes ?? [],
    riskYears: p.riskYears,
    override: p.override ?? false,
    discretion: p.discretion ?? false,
    prepInadequate: p.prepInadequate ?? false,
    assumption: p.assumption ?? false,
  }
}

export function prepAdequate(bbps: [number, number, number]): boolean {
  return bbps.every((s) => s >= 2) && bbps[0] + bbps[1] + bbps[2] >= 6
}

// choose the shortest-risk of a list of candidate results
function shortest(cands: Result[]): Result {
  return [...cands].sort((x, y) => x.riskYears - y.riskYears)[0]
}

// ---------------------------------------------------------------------------
// INDEX-mode compute per jurisdiction (multi-lesion)
// ---------------------------------------------------------------------------
function indexUS(a: Agg, src: Source): Result {
  const c: Result[] = []
  // adenoma axis
  if (a.adenomaCount > 0) {
    if (a.anyPiecemeal && a.piecemealSize >= 20) c.push(R({ interval: '6 months', modality: 'Colonoscopy (site check)', driver: 'Piecemeal resection of an adenoma 20 mm or larger', quote: '"Piecemeal resection of adenoma ≥20 mm … 6 mo."', source: src, riskYears: YRS.m6 }))
    if (a.adenomaCount > 10) c.push(R({ interval: '1 year', driver: 'More than 10 adenomas', quote: '">10 adenomas on single examination … 1 y."', source: src, riskYears: YRS.y1, notes: ['>10 adenomas may warrant genetic evaluation.'] }))
    else if (a.adenomaMaxSize >= 10 || a.anyVillous || a.anyHgd) c.push(R({ interval: '3 years', driver: 'An advanced adenoma (≥10 mm, villous, or high-grade dysplasia)', quote: '"Adenoma ≥10 mm / tubulovillous or villous / high-grade dysplasia … 3 y."', source: src, riskYears: YRS.y3 }))
    else if (a.adenomaCount >= 5) c.push(R({ interval: '3 years', driver: '5 to 10 adenomas', quote: '"5–10 tubular adenomas <10 mm … 3 y."', source: src, riskYears: YRS.y3 }))
    else if (a.adenomaCount >= 3) c.push(R({ interval: '3 to 5 years', driver: '3 to 4 adenomas under 10 mm', quote: '"3–4 tubular adenomas <10 mm … 3–5 y."', source: src, riskYears: YRS.y35 }))
    else c.push(R({ interval: '7 to 10 years', driver: '1 to 2 small tubular adenomas', quote: '"1–2 tubular adenomas <10 mm … 7–10 y."', source: src, riskYears: YRS.y710 }))
  }
  // serrated axis
  if (a.sslCount > 0) {
    if (a.anyPiecemeal && a.piecemealSize >= 20) c.push(R({ interval: '6 months', modality: 'Colonoscopy (site check)', driver: 'Piecemeal resection of a sessile serrated lesion 20 mm or larger', quote: '"Piecemeal resection of SSP ≥20 mm … 6 mo."', source: src, riskYears: YRS.m6 }))
    if (a.serratedMaxSize >= 10 || a.anySerratedDysplasia) c.push(R({ interval: '3 years', driver: 'A sessile serrated lesion ≥10 mm or with dysplasia', quote: '"SSP ≥10 mm / with dysplasia … 3 y."', source: src, riskYears: YRS.y3 }))
    else if (a.sslCount >= 5) c.push(R({ interval: '3 years', driver: '5 to 10 sessile serrated lesions', quote: '"5–10 SSPs <10 mm … 3 y."', source: src, riskYears: YRS.y3, notes: a.sslCount > 10 ? ['Numerous serrated lesions may meet serrated-polyposis criteria.'] : [] }))
    else if (a.sslCount >= 3) c.push(R({ interval: '3 to 5 years', driver: '3 to 4 sessile serrated lesions', quote: '"3–4 SSPs <10 mm … 3–5 y."', source: src, riskYears: YRS.y35 }))
    else c.push(R({ interval: '5 to 10 years', driver: '1 to 2 small sessile serrated lesions', quote: '"1–2 SSPs <10 mm … 5–10 y."', source: src, riskYears: YRS.y510 }))
  }
  if (a.tsaCount > 0) c.push(R({ interval: '3 years', driver: 'A traditional serrated adenoma', quote: '"TSA … 3 y."', source: src, riskYears: YRS.y3 }))
  if (a.hpCount > 0) {
    if (a.hpMaxSize >= 10) c.push(R({ interval: '3 to 5 years', driver: 'A hyperplastic polyp 10 mm or larger', quote: '"HP ≥10 mm … 3–5 y."', source: src, riskYears: YRS.y35 }))
    else if (a.hpCount > 20) c.push(R({ interval: '1 to 3 years', driver: 'More than 20 hyperplastic polyps — serrated-polyposis territory', quote: '≥20 serrated polyps meets WHO serrated-polyposis criteria.', source: src, riskYears: YRS.y1, notes: ['Refer for serrated-polyposis / genetic assessment.'] }))
    else c.push(R({ interval: '10 years', driver: 'Only small hyperplastic polyps', quote: '"≤20 HPs <10 mm … 10 y."', source: src, riskYears: YRS.y10 }))
  }
  if (!c.length) c.push(R({ interval: '10 years', driver: 'A normal colonoscopy', quote: '"Normal … 10 y."', source: src, riskYears: YRS.y10 }))
  return shortest(c)
}

function indexEU(a: Agg, src: Source): Result {
  const c: Result[] = []
  if (a.anyPiecemeal && a.piecemealSize >= 20) c.push(R({ interval: '3 to 6 months', modality: 'Colonoscopy (site check)', driver: 'Piecemeal resection of a polyp 20 mm or larger', quote: '"ESGE recommends a 3–6-month early repeat colonoscopy following piecemeal resection of polyps ≥20 mm."', source: src, riskYears: YRS.m6, notes: ['Then a first surveillance colonoscopy 12 months after the repeat.'] }))
  // OR-gate: adenoma >=10 / HGD / >=5 adenomas / serrated >=10 or dysplasia
  const trigger = (a.adenomaMaxSize >= 10) || a.anyHgd || a.adenomaCount >= 5 || (a.serratedMaxSize >= 10 && (a.sslCount + a.tsaCount + a.hpCount > 0)) || a.anySerratedDysplasia || a.anyTsa
  if (a.hasAnyLesion) {
    if (trigger) c.push(R({ interval: '3 years', driver: 'Meets an ESGE 3-year trigger (adenoma ≥10 mm, HGD, ≥5 adenomas, or a serrated polyp ≥10 mm / with dysplasia / TSA)', quote: '"ESGE recommends surveillance colonoscopy after 3 years for … at least 1 adenoma ≥10 mm or with high grade dysplasia, or ≥5 adenomas, or any serrated polyp ≥10 mm or with dysplasia."', source: src, riskYears: YRS.y3 }))
    else c.push(R({ interval: 'FIT every 2 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: '1–4 adenomas <10 mm (villous included) or serrated <10 mm without dysplasia', quote: '"… do not require endoscopic surveillance and should be returned to screening." (10-year colonoscopy where no organised programme.)', source: src, riskYears: YRS.y10, notes: ['ESGE returns 1–4 small adenomas (and villous <10 mm) to screening — the main divergence from USMSTF.'] }))
  }
  if (a.adenomaCount >= 10) c[c.length - 1] && c[c.length - 1].notes.push('≥10 adenomas: refer for genetic counselling.')
  if (!c.length) c.push(R({ interval: 'FIT every 2 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'A normal colonoscopy', quote: 'Return to the organised screening programme.', source: src, riskYears: YRS.y10 }))
  return shortest(c)
}

function indexON(a: Agg, src: Source): Result {
  const c: Result[] = []
  if (a.anyPiecemeal && a.piecemealSize >= 10) c.push(R({ interval: '≤6 months', modality: 'Colonoscopy (site check)', driver: 'A large sessile polyp removed piecemeal', quote: '"Large sessile polyp removed piecemeal — Colonoscopy to check polypectomy site — ≤6 months."', source: src, riskYears: YRS.m6, assumption: a.piecemealSize < 20, notes: a.piecemealSize < 20 ? ['ColonCancerCheck states "large … piecemeal" without a numeric cut-off; the ≥10 mm threshold is an implementation assumption.'] : [] }))
  if (a.adenomaCount > 0) {
    if (a.adenomaCount > 10) c.push(R({ interval: '≤1 year', modality: 'Clearing colonoscopy', driver: 'More than 10 adenomas', quote: '">10 adenomas — Clearing colonoscopy — ≤1 year."', source: src, riskYears: YRS.y1, notes: ['Genetic assessment for FAP.'] }))
    else if (a.adenomaMaxSize >= 10 || a.anyVillous || a.anyHgd || a.adenomaCount >= 3) c.push(R({ interval: '3 years', driver: 'High-risk adenoma (≥10 mm, villous, HGD, or 3+ adenomas)', quote: '"High risk adenoma(s) — Colonoscopy — 3 years."', source: src, riskYears: YRS.y3 }))
    else c.push(R({ interval: 'FIT in 5 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: '1 to 2 low-risk tubular adenomas', quote: '"Low risk adenoma(s) — FIT — 5 years."', source: src, riskYears: YRS.y5 }))
  }
  if (a.sslCount > 0 || a.tsaCount > 0) {
    if (a.serratedMaxSize >= 10 || a.anySerratedDysplasia || a.anyTsa) c.push(R({ interval: '3 years', driver: 'A sessile serrated lesion ≥10 mm / with dysplasia, or a traditional serrated adenoma', quote: '"SSA ≥10 mm / with dysplasia / TSA — Colonoscopy — 3 years."', source: src, riskYears: YRS.y3 }))
    else c.push(R({ interval: '5 years', driver: 'Sessile serrated lesion(s) under 10 mm without dysplasia', quote: '"Any sessile serrated adenoma(s) <10mm without dysplasia — Colonoscopy — 5 years."', source: src, riskYears: YRS.y5, notes: ['ColonCancerCheck does not band serrated lesions by count.'] }))
  }
  if (a.hpCount > 0 && a.sslCount === 0 && a.tsaCount === 0 && a.adenomaCount === 0) {
    if (a.hpMaxSize >= 10) c.push(R({ interval: '3 to 5 years', driver: 'A hyperplastic polyp 10 mm or larger', quote: 'Managed as a serrated lesion (USMSTF-aligned; not tabulated by ColonCancerCheck).', source: src, riskYears: YRS.y35, assumption: true }))
    else if (a.anyProximalHp) c.push(R({ interval: 'FIT in 10 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'A small proximal (non-rectosigmoid) hyperplastic polyp', quote: 'ColonCancerCheck tabulates hyperplastic polyps in the rectum or sigmoid; a small proximal hyperplastic polyp is not separately specified — 10-year FIT is shown as a labelled fallback.', source: src, riskYears: YRS.y10, assumption: true, notes: ['Not separately specified by ColonCancerCheck; confirm against local guidance.'] }))
    else c.push(R({ interval: 'FIT in 10 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'Small rectosigmoid hyperplastic polyp(s)', quote: '"Hyperplastic polyp(s) in rectum or sigmoid — FIT — 10 years."', source: src, riskYears: YRS.y10 }))
  } else if (a.hpCount > 0 && a.hpMaxSize >= 10) {
    c.push(R({ interval: '3 to 5 years', driver: 'A hyperplastic polyp 10 mm or larger', quote: 'Managed as a serrated lesion (USMSTF-aligned).', source: src, riskYears: YRS.y35, assumption: true }))
  }
  if (!c.length) c.push(R({ interval: 'FIT in 10 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'A normal colonoscopy', quote: '"No polyps — FIT — 10 years."', source: src, riskYears: YRS.y10 }))
  return shortest(c)
}

function indexAB(a: Agg, src: Source): Result {
  const c: Result[] = []
  if (a.anyPiecemeal && a.piecemealSize >= 10) {
    const big = a.piecemealSize >= 20
    c.push(R({ interval: '6 months', modality: 'Colonoscopy (site check)', driver: `Piecemeal resection of a large non-pedunculated lesion (${big ? '≥20 mm' : '10–19 mm'})`, quote: `"first repeat endoscopic assessment in 6 months.${big ? ' If ≥20 mm, next surveillance at 1 year.' : ' For 10–19 mm, next surveillance at 3 years.'}"`, source: src, riskYears: YRS.m6, notes: [big ? 'Then 1 year, then 3 years if clear.' : 'Then 3 years, then 5 years if clear.'] }))
  }
  if (a.adenomaCount > 0) {
    if (a.adenomaCount > 10) c.push(R({ interval: '1 year', driver: 'More than 10 adenomas', quote: '"colonoscopy in 1 year and consider genetic counseling."', source: src, riskYears: YRS.y1, notes: ['Consider genetic counselling.'] }))
    else if (a.adenomaMaxSize >= 10 || a.anyVillous || a.anyHgd) c.push(R({ interval: '3 years', driver: 'An adenoma ≥10 mm, villous, or with high-grade dysplasia', quote: '"colonoscopy in 3 years."', source: src, riskYears: YRS.y3 }))
    else if (a.adenomaCount >= 5) c.push(R({ interval: '3 years', driver: '5 to 10 adenomas', quote: '"colonoscopy in 3 years."', source: src, riskYears: YRS.y3 }))
    else if (a.adenomaCount >= 3) c.push(R({ interval: '5 years', driver: '3 to 4 adenomas under 10 mm', quote: '"colonoscopy in 5 years."', source: src, riskYears: YRS.y5 }))
    else c.push(R({ interval: 'FIT in 5 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: '1 to 2 low-risk tubular adenomas', quote: '"FIT in 5 years."', source: src, riskYears: YRS.y5 }))
  }
  if (a.sslCount > 0 || a.tsaCount > 0) {
    if (a.serratedMaxSize >= 10 || a.anySerratedDysplasia || a.anyTsa) c.push(R({ interval: '3 years', driver: 'SSL ≥10 mm / with dysplasia, or a TSA', quote: '"colonoscopy in 3 years."', source: src, riskYears: YRS.y3 }))
    else if (a.sslCount >= 3) c.push(R({ interval: '3 years', driver: '3 to 10 sessile serrated lesions', quote: '"3–10 SSL <10 mm: colonoscopy in 3 years."', source: src, riskYears: YRS.y3 }))
    else c.push(R({ interval: '5 years', driver: '1 to 2 sessile serrated lesions under 10 mm', quote: '"1–2 SSL <10 mm: colonoscopy in 5 years."', source: src, riskYears: YRS.y5 }))
  }
  if (a.hpCount > 0 && a.hpMaxSize >= 10) {
    if (a.anyProximalHp) c.push(R({ interval: '3 years', driver: 'A proximal hyperplastic polyp 10 mm or larger', quote: '"≥10 mm proximal: colonoscopy in 3 years."', source: src, riskYears: YRS.y3 }))
    else c.push(R({ interval: '5 years', driver: 'A rectosigmoid hyperplastic polyp 10 mm or larger', quote: '"≥10 mm rectosigmoid: colonoscopy in 5 years."', source: src, riskYears: YRS.y5 }))
  } else if (a.hpCount > 0 && a.sslCount === 0 && a.tsaCount === 0 && a.adenomaCount === 0) {
    c.push(R({ interval: 'FIT in 10 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'Hyperplastic polyp(s) under 10 mm', quote: '"hyperplastic polyp(s) <10 mm … FIT in 10 years."', source: src, riskYears: YRS.y10 }))
  }
  if (!c.length) c.push(R({ interval: 'FIT in 10 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'A normal colonoscopy', quote: '"no polyps … FIT in 10 years."', source: src, riskYears: YRS.y10 }))
  const res = shortest(c)
  // AB gap: synchronous SSL + adenoma has no published rule
  if (a.adenomaCount > 0 && (a.sslCount + a.tsaCount + (a.hpMaxSize >= 10 ? a.hpCount : 0)) > 0) {
    res.notes = [...res.notes, 'Alberta has no published rule for synchronous adenomas + serrated lesions; the shorter per-type interval is shown (labelled assumption).']
    res.assumption = true
  }
  return res
}

function indexBC(a: Agg, src: Source): Result {
  const c: Result[] = []
  if (a.anyPiecemeal && a.piecemealSize >= 20) c.push(R({ interval: '6 months', modality: 'Colonoscopy (site check)', driver: 'A large precancerous lesion removed piecemeal', quote: '"Repeat colonoscopy to assess the site … at 6 months."', source: src, riskYears: YRS.m6, notes: ['Further intervals at physician discretion.'] }))
  const anyHighRisk = a.advancedAdenoma('CA_BC') || advancedSerrated(a, 'CA_BC') || (a.hpMaxSize >= 10 && a.hpCount > 0)
  const count = a.bcPrecancerousCount
  if (count > 0) {
    if (anyHighRisk) c.push(R({ interval: '3 years', driver: 'A high-risk lesion (≥10 mm, villous, HGD, serrated ≥10 mm / dysplasia / TSA, or HP ≥10 mm)', quote: '"1 or more high risk lesion(s) … Follow-up colonoscopy in 3 years," then 5 years.', source: src, riskYears: YRS.y3, notes: count >= 10 ? ['≥10 precancerous lesions lifetime: refer to the Hereditary Cancer Program.'] : [] }))
    else if (count >= 5) c.push(R({ interval: '3 years', driver: '5 or more low-risk precancerous lesions (adenomas + serrated combined)', quote: '"… once 5 or more precancerous lesions are detected … colonoscopy in 3 years."', source: src, riskYears: YRS.y3, notes: count >= 10 ? ['≥10 precancerous lesions lifetime: refer to the Hereditary Cancer Program.'] : [] }))
    else c.push(R({ interval: '10 years', driver: '1 to 4 low-risk precancerous lesions under 10 mm', quote: '"1 to 4 low risk precancerous lesions … Follow-up colonoscopy in 10 years."', source: src, riskYears: YRS.y10 }))
  }
  // HP<10 only, or normal -> screening
  if (!c.length) c.push(R({ interval: 'FIT every 2 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: a.hpCount > 0 ? 'Hyperplastic polyp(s) under 10 mm only' : 'A normal colonoscopy', quote: a.hpCount > 0 ? '"Hyperplastic polyps <10 mm … require no special surveillance."' : '"No surveillance required. Resume screening."', source: src, riskYears: YRS.y10 }))
  return shortest(c)
}

// AU Table A (adenoma), B (serrated), C (combined)
function auAdenomaCol(a: Agg): 0 | 1 | 2 | 3 {
  const big = a.adenomaMaxSize >= 10
  const feat = a.anyVillous || a.anyHgd
  return (!big && !feat ? 0 : !big && feat ? 1 : big && !feat ? 2 : 3) as 0 | 1 | 2 | 3
}
function bandIdx(n: number, edges: number[]): number {
  // edges e.g. [2,4,9] -> band 0:1-2, 1:3-4, 2:5-9, 3:>=10
  for (let i = 0; i < edges.length; i++) if (n <= edges[i]) return i
  return edges.length
}
function indexAU(a: Agg, src: Source): Result {
  if (a.anyPiecemeal && a.piecemealSize >= 20) return R({ interval: 'approx. 6 months', modality: 'Colonoscopy (site check)', driver: 'Piecemeal excision of a large sessile or laterally spreading lesion (≥20 mm)', quote: '"First surveillance interval should be approximately 6 months … piecemeal excision of large sessile and laterally spreading lesions."', source: src, riskYears: YRS.m6, notes: ['If the 6-month check is clear, next colonoscopy at ~12–18 months.'] })
  const adCount = a.adenomaCount
  const cssp = a.csspCount // SSL + TSA + HP>=10
  const asp = advancedSerrated(a, 'AU')
  const YEARS = (v: string): number => (v === '10 y' ? YRS.y10 : v === '5 y' ? YRS.y5 : v === '3 y' ? YRS.y3 : YRS.y1)
  const label = (v: string) => (v === '1 y' ? '1 year' : v === '3 y' ? '3 years' : v === '5 y' ? '5 years' : '10 years')

  if (adCount > 0 && cssp > 0) {
    // Table C — combined
    const total = adCount + cssp
    const col = (a.advancedAdenoma('AU') ? (asp ? 3 : 2) : (asp ? 1 : 0)) as 0 | 1 | 2 | 3
    const rows: Record<number, string[]> = {
      0: ['5 y', '3 y', '3 y', '3 y'], // total 2
      1: ['3 y', '3 y', '1 y', '1 y'], // 3-4
      2: ['3 y', '1 y', '1 y', '1 y'], // 5-9
      3: ['1 y', '1 y', '1 y', '1 y'], // >=10
    }
    const band = total <= 2 ? 0 : total <= 4 ? 1 : total <= 9 ? 2 : 3
    const v = rows[band][col]
    return R({ interval: label(v), driver: `${total} synchronous adenomas + serrated lesions`, quote: 'Cancer Council Table 9b (synchronous conventional adenomas + clinically significant serrated polyps), combined count.', source: src, riskYears: YEARS(v) })
  }
  if (adCount > 0) {
    const col = auAdenomaCol(a)
    const rows: Record<number, string[]> = {
      0: ['10 y', '5 y', '3 y', '3 y'],
      1: ['5 y', '3 y', '3 y', '1 y'],
      2: ['3 y', '1 y', '1 y', '1 y'],
      3: ['1 y', '1 y', '1 y', '1 y'],
    }
    const band = adCount <= 2 ? 0 : adCount <= 4 ? 1 : adCount <= 9 ? 2 : 3
    const v = rows[band][col]
    const notes: string[] = []
    if (band === 0 && col === 0) notes.push('Return to the NBCSP (iFOBT) after 4 years is an appropriate alternative.')
    return R({ interval: label(v), driver: `${adCount <= 2 ? '1 to 2' : adCount <= 4 ? '3 to 4' : adCount <= 9 ? '5 to 9' : '10+'} adenomas${col === 0 ? ' under 10 mm' : col === 1 ? ' <10 mm with villous/HGD' : col === 2 ? ', a lesion ≥10 mm' : ' ≥10 mm with villous/HGD'}`, quote: 'Cancer Council Table 3 (conventional adenomas).', source: src, riskYears: YEARS(v), notes })
  }
  if (cssp > 0) {
    const rows = ['5 y', '3 y', '1 y'] // 1-2 no-adv, but adv shifts
    const advRows: Record<number, string> = { 0: asp ? '3 y' : '5 y', 1: asp ? '1 y' : '3 y', 2: '1 y' }
    const band = cssp <= 2 ? 0 : cssp <= 4 ? 1 : 2
    const v = advRows[band]
    return R({ interval: label(v), driver: `${cssp <= 2 ? '1 to 2' : cssp <= 4 ? '3 to 4' : '5+'} clinically significant serrated polyps${asp ? ' (advanced)' : ''}`, quote: 'Cancer Council Table 9a (clinically significant serrated polyps).', source: src, riskYears: YEARS(v) })
  }
  if (a.hpCount > 0) return R({ interval: 'return to screening (iFOBT)', modality: 'iFOBT (NBCSP)', driver: 'Small hyperplastic polyp(s) under 10 mm', quote: '"Small, particularly distal, true hyperplastic polyps do not require surveillance."', source: src, riskYears: YRS.y10 })
  return R({ interval: 'return to screening (iFOBT)', modality: 'iFOBT (NBCSP)', driver: 'A normal colonoscopy', quote: 'Return to iFOBT screening under the NBCSP.', source: src, riskYears: YRS.y10 })
}

const INDEX: Record<JurId, (a: Agg, src: Source) => Result> = {
  US: indexUS, EU: indexEU, CA_ON: indexON, CA_AB: indexAB, CA_BC: indexBC, AU: indexAU,
}

// ---------------------------------------------------------------------------
// SUBSEQUENT-mode compute (coded: US/EU/BC/AU; scope-gated: ON/AB serrated)
// currentIndexResult = the index-mode result of the CURRENT findings (used for
// its risk band); prior = the previous exam's risk band.
// ---------------------------------------------------------------------------
function subsequent(jur: JurId, a: Agg, prior: PriorRisk, src: Source, currentIdx: Result): Result {
  // helper: does current exam contain an advanced/high-risk finding?
  const currentAdvanced = a.advancedAdenoma(jur) || a.adenomaCount >= 5 || advancedSerrated(a, jur)
  const currentNormal = !a.hasAnyLesion || (a.hpCount > 0 && a.adenomaCount === 0 && a.sslCount === 0 && a.tsaCount === 0 && a.hpMaxSize < 10)

  if (jur === 'US') {
    // Table 7, adenoma axis. serrated -> re-apply index (labelled).
    if (a.sslCount + a.tsaCount + (a.hpMaxSize >= 10 ? a.hpCount : 0) > 0 && a.adenomaCount === 0) {
      const r = { ...currentIdx }
      r.notes = [...r.notes, 'USMSTF Table 7 covers adenomas only; for a serrated finding the single-exam serrated interval is shown (labelled assumption).']
      r.assumption = true
      return r
    }
    const advCur = a.adenomaMaxSize >= 10 || a.anyVillous || a.anyHgd || (a.adenomaCount >= 5 && a.adenomaCount <= 10)
    const cur = a.adenomaCount === 0 ? 'normal' : advCur ? 'adv' : a.adenomaCount >= 3 ? '34' : '12'
    // 'complex' prior (serrated / piecemeal / >10 adenomas) is outside Table 7's
    // adenoma-only scope; score on the high-risk track and label the assumption.
    const base: PriorRisk = prior === 'complex' ? 'high' : prior // 'low'(1-2) 'intermediate'(3-4) 'high'(advanced) 'normal'
    let v: [string, number]
    if (base === 'high') {
      v = cur === 'adv' ? ['3 years', YRS.y3] : cur === '34' ? ['3 to 5 years', YRS.y35] : ['5 years', YRS.y5] // normal or 1-2 -> 5y
    } else if (base === 'intermediate') {
      v = cur === 'adv' ? ['3 years', YRS.y3] : cur === '34' ? ['3 to 5 years', YRS.y35] : cur === '12' ? ['7 to 10 years', YRS.y710] : ['10 years', YRS.y10]
    } else {
      // low or normal baseline
      v = cur === 'adv' ? ['3 years', YRS.y3] : cur === '34' ? ['3 to 5 years', YRS.y35] : cur === '12' ? ['7 to 10 years', YRS.y710] : ['10 years', YRS.y10]
    }
    const usRes = R({ interval: v[0], driver: `Second surveillance — prior ${prior === 'high' ? 'high-risk' : prior === 'complex' ? 'serrated / piecemeal / >10-adenoma' : prior} baseline, current ${cur === 'normal' ? 'normal' : cur === 'adv' ? 'advanced' : cur === '34' ? '3–4 adenomas' : '1–2 adenomas'}`, quote: 'USMSTF Table 7 (second surveillance by baseline × first-surveillance finding).', source: src, riskYears: v[1] })
    if (prior === 'complex') {
      usRes.assumption = true
      usRes.notes = [...usRes.notes, 'USMSTF Table 7 covers prior adenomas; a prior serrated lesion, piecemeal resection, or >10 adenomas is scored on the high-risk track as a labelled assumption — confirm against the guideline.']
    }
    return usRes
  }

  if (jur === 'EU') {
    // depends only on current findings + streak (we treat surveillance as: if current has a Rec-2 trigger -> 3y; else 5y; a second consecutive negative -> screening — approximated via prior='normal' meaning previous was negative)
    if (currentAdvanced || a.adenomaCount >= 5) return R({ interval: '3 years', driver: 'A polyp requiring surveillance at this exam', quote: '"… if polyps requiring surveillance are detected … surveillance colonoscopy may be performed at 3 years."', source: src, riskYears: YRS.y3 })
    // negative surveillance
    if (prior === 'normal') return R({ interval: 'FIT every 2 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'A second consecutive negative surveillance', quote: '"After [a second negative], patients can be returned to screening."', source: src, riskYears: YRS.y10 })
    return R({ interval: '5 years', driver: 'A negative first surveillance', quote: '"If no polyps requiring surveillance are detected at the first surveillance colonoscopy, ESGE suggests a second surveillance after 5 years."', source: src, riskYears: YRS.y5 })
  }

  if (jur === 'CA_BC') {
    // high-risk track -> if current 0-4 low-risk -> 5y; if current high or >=5 -> 3y; single negative -> FIT
    if (currentNormal) return R({ interval: 'FIT in 10 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'No precancerous lesion at surveillance', quote: '"No precancerous lesion … FIT in 10 years."', source: src, riskYears: YRS.y10 })
    if (currentAdvanced || a.bcPrecancerousCount >= 5) return R({ interval: '3 years', driver: 'High-risk or ≥5 precancerous lesions at surveillance', quote: '"… re-enter the 3-year loop."', source: src, riskYears: YRS.y3 })
    return R({ interval: '5 years', driver: '0–4 low-risk lesions at surveillance (prior 3-year track)', quote: '"If 0 to 4 low risk lesions … follow-up colonoscopy at 5 years."', source: src, riskYears: YRS.y5 })
  }

  if (jur === 'AU') {
    // Tables D/E/F, keyed by prior risk (LOW/INT/HIGH/HIGHEST) x current adenoma count/features. Use assumption mapping.
    // Map prior: normal/low -> LOW, intermediate -> INTERMEDIATE, high -> HIGH (HIGHEST folded into HIGH).
    const risk = prior === 'high' || prior === 'complex' ? 'HIGH' : prior === 'intermediate' ? 'INTERMEDIATE' : 'LOW'
    const col = auAdenomaCol(a)
    // Table D by first-exam risk band and current adenoma count band
    const tableD: Record<string, Record<number, string[]>> = {
      LOW: { 0: ['iFOBT', 'iFOBT', 'iFOBT', 'iFOBT'], 1: ['10 y', '5 y', '3 y', '3 y'], 2: ['5 y', '3 y', '3 y', '1 y'], 3: ['3 y', '1 y', '1 y', '1 y'], 4: ['1 y', '1 y', '1 y', '1 y'] },
      INTERMEDIATE: { 0: ['10 y', '10 y', '10 y', '10 y'], 1: ['5 y', '5 y', '3 y', '3 y'], 2: ['5 y', '3 y', '3 y', '1 y'], 3: ['3 y', '1 y', '1 y', '1 y'], 4: ['1 y', '1 y', '1 y', '1 y'] },
      HIGH: { 0: ['5 y', '5 y', '5 y', '5 y'], 1: ['5 y', '3 y', '3 y', '3 y'], 2: ['3 y', '3 y', '3 y', '1 y'], 3: ['3 y', '1 y', '1 y', '1 y'], 4: ['1 y', '1 y', '1 y', '1 y'] },
    }
    const band = a.adenomaCount === 0 ? 0 : a.adenomaCount <= 2 ? 1 : a.adenomaCount <= 4 ? 2 : a.adenomaCount <= 9 ? 3 : 4
    const cell = tableD[risk][band]
    const v = band === 0 ? cell[0] : cell[col]
    if (v === 'iFOBT') return R({ interval: 'return to screening (iFOBT)', modality: 'iFOBT (NBCSP)', driver: 'Low-risk prior + no adenoma at surveillance', quote: 'Cancer Council Table D (subsequent surveillance).', source: src, riskYears: YRS.y10, assumption: true, notes: ['Prior-exam risk category inferred from its interval (labelled assumption; confirm against the full guideline).'] })
    const yr = v === '10 y' ? YRS.y10 : v === '5 y' ? YRS.y5 : v === '3 y' ? YRS.y3 : YRS.y1
    const lbl = v === '10 y' ? '10 years' : v === '5 y' ? '5 years' : v === '3 y' ? '3 years' : '1 year'
    return R({ interval: lbl, driver: `Second surveillance — prior ${risk.toLowerCase()} risk, current ${a.adenomaCount === 0 ? 'no adenoma' : a.adenomaCount + ' adenoma(s)'}`, quote: 'Cancer Council Table D (subsequent surveillance).', source: src, riskYears: yr, assumption: true, notes: ['Prior-exam risk category inferred from its interval (labelled assumption; confirm against the full guideline).'] })
  }

  // ON and AB: coded for high-risk-adenoma track; scope-gate serrated/piecemeal/discretion
  if (jur === 'CA_ON') {
    // Prior serrated / piecemeal / >10 adenomas: ColonCancerCheck gives no
    // subsequent interval (insufficient evidence) -> endoscopist discretion.
    if (prior === 'complex') {
      return R({ interval: 'Endoscopist discretion', modality: null, driver: 'A prior serrated lesion, piecemeal resection, or >10 adenomas', quote: '"… insufficient evidence to make specific recommendations on subsequent surveillance intervals." (ColonCancerCheck)', source: src, riskYears: YRS.y3, discretion: true, notes: ['ColonCancerCheck sets subsequent intervals only for the adenoma high-risk track; serrated, piecemeal, and >10-adenoma follow-up is left to the endoscopist.'] })
    }
    if (a.sslCount + a.tsaCount + (a.hpMaxSize >= 10 ? a.hpCount : 0) > 0 || a.anyPiecemeal || a.adenomaCount > 10) {
      return R({ interval: 'Endoscopist discretion', modality: null, driver: 'Serrated, >10-adenoma, or piecemeal at subsequent surveillance', quote: '"… insufficient evidence to make specific recommendations on subsequent surveillance intervals." (ColonCancerCheck)', source: src, riskYears: YRS.y3, discretion: true })
    }
    // high-risk prior track: current clean/low -> 5y; current high -> 3y
    if (a.advancedAdenoma('CA_ON')) return R({ interval: '3 years', driver: 'High-risk adenoma at surveillance', quote: '"High risk adenoma(s) — Colonoscopy — 3 years."', source: src, riskYears: YRS.y3 })
    return R({ interval: '5 years', driver: 'No / low-risk finding at surveillance (prior high-risk track)', quote: '"No polyps, HP, or low risk adenoma — Colonoscopy — 5 years." (does not return to FIT)', source: src, riskYears: YRS.y5 })
  }

  if (jur === 'CA_AB') {
    // Prior serrated / piecemeal / >10 adenomas: ACRCSP codes the subsequent
    // ladder only for the adenoma track -> endoscopist discretion.
    if (prior === 'complex') {
      return R({ interval: 'Endoscopist discretion', modality: null, driver: 'A prior serrated lesion, piecemeal resection, or >10 adenomas', quote: 'ACRCSP 2023 specifies subsequent intervals for the adenoma high-risk ladder; serrated, piecemeal, and >10-adenoma follow-up is not tabulated.', source: src, riskYears: YRS.y3, discretion: true })
    }
    if (a.sslCount + a.tsaCount + (a.hpMaxSize >= 10 ? a.hpCount : 0) > 0 && a.adenomaCount > 0) {
      const r = { ...currentIdx }
      r.notes = [...r.notes, 'Alberta has no synchronous adenoma+serrated subsequent rule; shorter per-type interval shown (labelled assumption).']
      r.assumption = true
      return r
    }
    // clean surveillance on high-risk track -> 5y, then FIT; non-clean -> re-score
    if (currentNormal && prior === 'high') return R({ interval: '5 years', driver: 'Clean surveillance on the high-risk track (next clean exam returns to FIT)', quote: 'ACRCSP high-risk ladder: 3 y → 5 y → FIT.', source: src, riskYears: YRS.y5 })
    const r = { ...currentIdx }
    r.notes = [...r.notes, 'Alberta specifies the clean-branch ladder only; other subsequent findings are re-scored from the index tables (labelled assumption).']
    r.assumption = prior !== 'normal'
    return r
  }

  return currentIdx
}

// ---------------------------------------------------------------------------
// Top-level dispatch
// ---------------------------------------------------------------------------
export function compute(exam: Exam): Result {
  const src = SRC[exam.jur]
  if (exam.malignant) return R({ interval: 'Not a surveillance case', modality: null, driver: 'A malignant (cancer-containing) polyp is outside routine surveillance', quote: 'Surveillance tables do not apply to malignant polyps — management depends on resection completeness, staging, and an MDT decision.', source: src, riskYears: 0, override: true, notes: ['Refer for multidisciplinary / specialist management.'] })
  if (exam.special) return R({ interval: 'Not covered by this tool', modality: null, driver: 'IBD, a hereditary syndrome, serrated polyposis, or personal/family CRC history follows a separate pathway', quote: 'These post-polypectomy guidelines do not apply to IBD, hereditary syndromes, serrated polyposis, malignant polyps, or personal/family history of CRC.', source: src, riskYears: 0, override: true, notes: ['Use the condition-specific pathway and refer as needed.'] })

  const a = aggregate(exam.lesions)
  const idx = INDEX[exam.jur](a, src)

  let res: Result
  if (exam.mode === 'surveillance') res = subsequent(exam.jur, a, exam.priorRisk, src, idx)
  else res = idx

  // AU/BC combined-count reminder no longer needed (multi-lesion handles it), but keep prep + provisional handling here.
  const prepBad = !prepAdequate(exam.bbps)
  if (prepBad && !res.override && !res.discretion) {
    // inadequate prep caps at repeat within ~1 year (unless already shorter)
    if (res.riskYears > 1) {
      res = R({ interval: 'within 1 year', driver: 'Bowel preparation was inadequate — lesions may have been missed and the colon is not cleared', quote: 'Surveillance intervals assume an adequate exam; repeat within ~1 year for inadequate prep.', source: src, riskYears: 1, prepInadequate: true, notes: ['Repeat the colonoscopy; the interval is capped until an adequate exam is achieved.'] })
    } else {
      res.prepInadequate = true
    }
  } else if (prepBad) {
    res.prepInadequate = true
  }
  return res
}

export interface Jurisdiction { id: JurId; country: 'US' | 'CA' | 'AU' | 'EU'; label: string; province?: string; guideline: string; source: Source }
export const JURISDICTIONS: Jurisdiction[] = [
  { id: 'US', country: 'US', label: 'United States', guideline: 'USMSTF 2020', source: SRC.US },
  { id: 'CA_ON', country: 'CA', label: 'Canada', province: 'Ontario', guideline: 'ColonCancerCheck', source: SRC.CA_ON },
  { id: 'CA_AB', country: 'CA', label: 'Canada', province: 'Alberta', guideline: 'ACRCSP 2023', source: SRC.CA_AB },
  { id: 'CA_BC', country: 'CA', label: 'Canada', province: 'British Columbia', guideline: 'BCGuidelines 2022', source: SRC.CA_BC },
  { id: 'AU', country: 'AU', label: 'Australia', guideline: 'NHMRC / Cancer Council', source: SRC.AU },
  { id: 'EU', country: 'EU', label: 'Europe', guideline: 'ESGE 2020', source: SRC.EU },
]
