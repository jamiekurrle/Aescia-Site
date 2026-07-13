// ---------------------------------------------------------------------------
// Colonoscopy post-polypectomy surveillance-interval logic.
//
// Single source of truth for the calculator's clinical logic. Each jurisdiction
// has its own `compute()` because the guidelines are structurally different:
//   - US (USMSTF 2020) — graded intervals per finding; shortest governs.
//   - CA (ColonCancerCheck / Cancer Care Ontario) — classify on the single
//     most-advanced lesion; low-risk adenomas return to FIT, not colonoscopy.
//   - EU (ESGE 2020) — binary: an OR-gate of triggers → 3 years, else return
//     to screening. Villous histology and 3–4 adenomas are deliberately NOT
//     triggers.
//   - AU (NHMRC / Cancer Council Australia) — discrete 10/5/3/1-year count ×
//     feature matrix.
//
// The tool evaluates ONE lesion lineage at a time (the selected histology,
// with its count and size). Mixed pathology must be run per type, taking the
// shortest interval — the UI states this. Malignant polyps, IBD, hereditary
// syndromes, and serrated polyposis are out of scope and short-circuit to a
// referral message rather than returning a reassuring number.
//
// Every branch carries the verbatim guideline wording it implements, so the
// clinician can see which rule fired and its source. That transparency is what
// keeps this a non-device clinical-reference tool. NOT a medical device.
// ---------------------------------------------------------------------------

export type Histology =
  | 'TA' // tubular adenoma
  | 'TVA' // tubulovillous adenoma
  | 'VA' // villous adenoma
  | 'SSL' // sessile serrated lesion
  | 'TSA' // traditional serrated adenoma
  | 'HP' // hyperplastic polyp
  | 'CANCER' // malignant / cancer-containing polyp
  | 'NONE' // no polyps (normal)
  | 'AWAIT' // awaiting histopathology

export interface Findings {
  nPolyps: number // number of polyps of the selected histology
  maxSize: number // largest polyp of the selected histology, mm
  hist: Histology
  hgd: boolean // high-grade dysplasia
  piece: boolean // piecemeal resection of a lesion >= 20 mm
  proximalHp: boolean // hyperplastic polyp >=10 mm and/or proximal to sigmoid
  bbps: [number, number, number] // Boston Bowel Prep, right / transverse / left
}

export interface Source {
  name: string
  url: string
}

export interface Result {
  interval: string // e.g. "3 years", "7–10 years", "6 months", or a message
  modality: string | null // "Colonoscopy" | "FIT (return to screening)" | null
  driver: string // plain-language reason the interval was chosen
  quote: string // verbatim guideline wording behind this branch
  source: Source
  notes: string[] // advisories (genetics, exclusions, prep, de-escalation)
  provisional: boolean // interval assumes adenomatous histology, awaiting path
  prepInadequate: boolean // prep was inadequate (surfaced independently)
  override: boolean // out-of-scope (malignant / IBD / hereditary) — no interval
  riskYears: number // governing interval's lower-bound years (lower = higher risk)
}

type Kind = 'finding' | 'prep'
type Candidate = Omit<Result, 'provisional' | 'prepInadequate' | 'override' | 'riskYears'> & {
  sort: number
  kind: Kind
}

// ---------------------------------------------------------------------------
// Prep adequacy — Boston Bowel Prep Scale: adequate when every segment is >= 2
// AND the total is >= 6 (also the ESGE definition: inadequate if any segment
// scores 0–1).
// ---------------------------------------------------------------------------
export function prepTotal(bbps: [number, number, number]): number {
  return bbps[0] + bbps[1] + bbps[2]
}
export function prepAdequate(bbps: [number, number, number]): boolean {
  return bbps.every((s) => s >= 2) && prepTotal(bbps) >= 6
}

// Interval sort keys = the LOWER bound in years, so the shortest (highest risk)
// interval wins. Ranges are nudged above their exact-year twin (3.5 > 3, 5.5 >
// 5) so a "3 years" candidate deterministically beats "3 to 5 years" on a tie
// rather than relying on array insertion order.
const SORT = {
  sixMonths: 0.5,
  oneYear: 1,
  threeYears: 3,
  threeToFive: 3.5,
  fiveYears: 5,
  fiveToTen: 5.5,
  sevenToTen: 7,
  tenYears: 10,
} as const

const SRC = {
  US: {
    name: 'US Multi-Society Task Force, 2020 (Gupta et al., Gastroenterology 2020;158:1131–1153)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32044092/',
  },
  CA: {
    name: 'ColonCancerCheck / Cancer Care Ontario — Post-Polypectomy Surveillance Recommendations',
    url: 'https://www.cancercareontario.ca/en/guidelines-advice/cancer-continuum/screening/resources-healthcare-providers/post-polypectomy-surveillance-recommendations-summary',
  },
  EU: {
    name: 'ESGE 2020 (Hassan et al., Endoscopy 2020;52(8):687–700)',
    url: 'https://doi.org/10.1055/a-1185-3109',
  },
  AU: {
    name: 'Cancer Council Australia / NHMRC — Surveillance colonoscopy clinical practice guidelines',
    url: 'https://www.cancer.org.au/clinical-guidelines/bowel-cancer/surveillance-colonoscopy',
  },
  CA_AB: {
    name: 'Alberta Colorectal Cancer Screening Program (ACRCSP) 2023 — Post-Polypectomy Surveillance (Sadowski et al., JCAG 2024;7(4):319)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11317626/',
  },
  CA_BC: {
    name: 'BCGuidelines.ca — Colorectal Cancer Part 2: Follow-up of Precancerous Lesions (2022)',
    url: 'https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/bc-guidelines/colorectal-cancer-part2',
  },
} satisfies Record<string, Source>

function isAdenoma(h: Histology): boolean {
  return h === 'TA' || h === 'TVA' || h === 'VA'
}
function isVillous(h: Histology): boolean {
  return h === 'TVA' || h === 'VA'
}
function effectiveHist(h: Histology): Histology {
  return h === 'AWAIT' ? 'TA' : h
}

// A malignant (cancer-containing) polyp is out of scope: short-circuit to a
// referral result instead of a reassuring interval. Cancer is entered as a
// histology option, so this keys off `hist`.
function overrideResult(f: Findings, src: Source): Result | null {
  if (f.hist !== 'CANCER') return null
  return {
    interval: 'Not a surveillance case',
    modality: null,
    driver: 'A malignant (cancer-containing) polyp is outside routine post-polypectomy surveillance',
    quote:
      'The surveillance-interval tables do not apply to malignant polyps. Management depends on completeness of resection, staging, and a multidisciplinary / oncology decision — not a fixed surveillance interval.',
    source: src,
    notes: ['Refer for multidisciplinary / specialist management.'],
    provisional: false,
    prepInadequate: !prepAdequate(f.bbps),
    override: true,
    riskYears: 0,
  }
}

// Pick the governing candidate: shortest interval wins; merge all notes.
function govern(candidates: Candidate[], f: Findings): Result {
  const winner = [...candidates].sort((a, b) => a.sort - b.sort)[0]
  const notes = Array.from(new Set(candidates.flatMap((c) => c.notes)))
  const provisional = f.hist === 'AWAIT' && f.nPolyps > 0 && winner.kind !== 'prep'
  // Australia and British Columbia band some intervals on the COMBINED count of
  // all precancerous lesions (adenomas + serrated together). The tool evaluates
  // one lineage at a time, so for a colonoscopy-surveillance result with room to
  // shorten, warn that a synchronous second lesion type could pull it into a
  // shorter combined-count band.
  const auOrBc = winner.source === SRC.AU || winner.source === SRC.CA_BC
  if (auOrBc && f.nPolyps > 0 && winner.kind === 'finding' && winner.sort >= 3 && (winner.modality || '').startsWith('Colonoscopy')) {
    const country = winner.source === SRC.AU ? 'Australia' : 'British Columbia'
    notes.push(
      `${country} sets some intervals on the combined number of precancerous lesions (adenomas and serrated lesions together). If more than one lesion type was removed at this exam, the combined count may fall in a shorter-interval band than this single-type result — check the combined-count table.`,
    )
  }
  return {
    interval: winner.interval,
    modality: winner.modality,
    driver: winner.driver,
    quote: winner.quote,
    source: winner.source,
    notes,
    provisional,
    prepInadequate: !prepAdequate(f.bbps),
    override: false,
    riskYears: winner.sort,
  }
}

function prepCandidate(src: Source, interval: string, quote: string): Candidate {
  return {
    interval,
    modality: 'Colonoscopy',
    driver: 'Bowel preparation was inadequate, so lesions may have been missed and the colon is not cleared',
    quote,
    source: src,
    notes: ['Repeat the colonoscopy; the surveillance interval is capped until an adequate exam is achieved.'],
    sort: SORT.oneYear,
    kind: 'prep',
  }
}

// ===========================================================================
// UNITED STATES — USMSTF 2020 (graded; shortest governs)
// ===========================================================================
function computeUS(f: Findings): Result {
  const o = overrideResult(f, SRC.US)
  if (o) return o
  const c: Candidate[] = []
  const n = f.nPolyps
  const size = f.maxSize
  const h = effectiveHist(f.hist)
  const src = SRC.US

  if (n > 0) {
    if (f.piece && size >= 20) {
      c.push({
        interval: '6 months',
        modality: 'Colonoscopy',
        driver: 'Piecemeal removal of a lesion 20 mm or larger',
        quote:
          '"Piecemeal resection of adenoma ≥20 mm … 6 mo" (and for serrated lesions, "Piecemeal resection of SSP ≥20 mm … 6 mo").',
        source: src,
        notes: ['Then a first surveillance at 1 year, and at 3 years thereafter, per USMSTF.'],
        sort: SORT.sixMonths,
        kind: 'finding',
      })
    }
    if (isAdenoma(h)) {
      if (n > 10) {
        c.push({
          interval: '1 year',
          modality: 'Colonoscopy',
          driver: 'More than 10 adenomas on a single examination',
          quote: '">10 adenomas on single examination … 1 y."',
          source: src,
          notes: ['More than 10 adenomas (or >10 cumulative over a lifetime) may warrant referral for genetic evaluation.'],
          sort: SORT.oneYear,
          kind: 'finding',
        })
      }
      if (size >= 10) {
        c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'An adenoma 10 mm or larger', quote: '"Adenoma ≥10 mm … 3 y" (strong recommendation, high-quality evidence).', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
      }
      if (isVillous(h)) {
        c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'An adenoma with tubulovillous or villous histology', quote: '"Adenoma with tubulovillous or villous histology … 3 y."', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
      }
      if (f.hgd) {
        c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'An adenoma with high-grade dysplasia', quote: '"Adenoma with high-grade dysplasia … 3 y."', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
      }
      if (n >= 5 && n <= 10) {
        c.push({ interval: '3 years', modality: 'Colonoscopy', driver: '5 to 10 adenomas', quote: '"5–10 tubular adenomas <10 mm … 3 y."', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
      }
      if (n >= 3 && n <= 4) {
        c.push({ interval: '3 to 5 years', modality: 'Colonoscopy', driver: '3 to 4 adenomas under 10 mm', quote: '"3–4 tubular adenomas <10 mm … 3–5 y."', source: src, notes: [], sort: SORT.threeToFive, kind: 'finding' })
      }
      if (n >= 1 && n <= 2) {
        c.push({ interval: '7 to 10 years', modality: 'Colonoscopy', driver: '1 to 2 small tubular adenomas', quote: '"1–2 tubular adenomas <10 mm … 7–10 y."', source: src, notes: [], sort: SORT.sevenToTen, kind: 'finding' })
      }
    } else if (h === 'SSL') {
      if (size >= 10 || f.hgd) {
        c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'A sessile serrated lesion 10 mm or larger, or with dysplasia', quote: '"SSP ≥10 mm … 3 y" / "SSP with dysplasia … 3 y."', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
      }
      if (n > 10) {
        c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'More than 10 sessile serrated lesions', quote: '"5–10 SSPs <10 mm … 3 y" (extended to >10).', source: src, notes: ['Numerous serrated lesions may meet serrated-polyposis-syndrome criteria and warrant specialised management.'], sort: SORT.threeYears, kind: 'finding' })
      }
      if (n >= 5 && n <= 10) {
        c.push({ interval: '3 years', modality: 'Colonoscopy', driver: '5 to 10 sessile serrated lesions', quote: '"5–10 SSPs <10 mm … 3 y."', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
      }
      if (n >= 3 && n <= 4) {
        c.push({ interval: '3 to 5 years', modality: 'Colonoscopy', driver: '3 to 4 sessile serrated lesions under 10 mm', quote: '"3–4 SSPs <10 mm … 3–5 y."', source: src, notes: [], sort: SORT.threeToFive, kind: 'finding' })
      }
      if (n >= 1 && n <= 2) {
        c.push({ interval: '5 to 10 years', modality: 'Colonoscopy', driver: '1 to 2 small sessile serrated lesions', quote: '"1–2 SSPs <10 mm … 5–10 y."', source: src, notes: [], sort: SORT.fiveToTen, kind: 'finding' })
      }
    } else if (h === 'TSA') {
      c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'A traditional serrated adenoma', quote: '"TSA … 3 y."', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
    } else if (h === 'HP') {
      if (n > 20) {
        c.push({ interval: '1 to 3 years', modality: 'Colonoscopy', driver: 'More than 20 hyperplastic polyps — meets serrated-polyposis-syndrome criteria', quote: '≥20 serrated polyps distributed throughout the colon meets WHO serrated-polyposis-syndrome criteria; manage on a shorter-interval pathway, not the 10-year rule.', source: src, notes: ['Refer for serrated-polyposis / genetic assessment.'], sort: SORT.oneYear, kind: 'finding' })
      }
      if (size >= 10) {
        c.push({ interval: '3 to 5 years', modality: 'Colonoscopy', driver: 'A hyperplastic polyp 10 mm or larger', quote: '"HP ≥10 mm … 3–5 y" (favour 3 y if SSP-vs-HP distinction, prep, or excision is in doubt).', source: src, notes: [], sort: SORT.threeToFive, kind: 'finding' })
      }
      if (n <= 20 && size < 10) {
        c.push({ interval: '10 years', modality: 'Colonoscopy', driver: 'Only small hyperplastic polyps', quote: '"≤20 HPs in rectum or sigmoid colon <10 mm … 10 y" / "≤20 HPs proximal to sigmoid colon <10 mm … 10 y."', source: src, notes: [], sort: SORT.tenYears, kind: 'finding' })
      }
    }
  }

  if (!prepAdequate(f.bbps)) {
    c.push(prepCandidate(src, 'within 1 year', '"If the preparation is inadequate, colonoscopy should be rescheduled within 12 months" (USMSTF bowel-preparation guidance). Interval rules assume adequate prep.'))
  }
  if (!c.length) {
    c.push({ interval: '10 years', modality: 'Colonoscopy', driver: 'A normal colonoscopy', quote: '"Normal … 10 y" (strong recommendation, high-quality evidence).', source: src, notes: [], sort: SORT.tenYears, kind: 'finding' })
  }
  return govern(c, f)
}

// ===========================================================================
// CANADA — ColonCancerCheck / Cancer Care Ontario (most-advanced lesion;
// low-risk adenomas return to FIT). Intervals shown are for the INDEX
// colonoscopy; after a surveillance colonoscopy the low-risk loop is 5 years
// of colonoscopy rather than a return to FIT (surfaced as a note).
// ===========================================================================
function computeCA(f: Findings): Result {
  const o = overrideResult(f, SRC.CA)
  if (o) return o
  const c: Candidate[] = []
  const n = f.nPolyps
  const size = f.maxSize
  const h = effectiveHist(f.hist)
  const src = SRC.CA
  const highRiskAdenoma = isAdenoma(h) && (size >= 10 || isVillous(h) || f.hgd || n >= 3)

  if (n > 0) {
    if (f.piece && size >= 20) {
      c.push({ interval: '≤6 months', modality: 'Colonoscopy to check the polypectomy site', driver: 'A large sessile polyp removed piecemeal', quote: '"Large sessile polyp removed piecemeal — Colonoscopy to check polypectomy site — ≤6 months."', source: src, notes: [], sort: SORT.sixMonths, kind: 'finding' })
    }
    if (isAdenoma(h) && n > 10) {
      c.push({ interval: '≤1 year', modality: 'Clearing colonoscopy', driver: 'More than 10 adenomas', quote: '">10 adenomas — Clearing colonoscopy — ≤1 year."', source: src, notes: ['ColonCancerCheck directs patients with >10 adenomas to genetic assessment for familial adenomatous polyposis.'], sort: SORT.oneYear, kind: 'finding' })
    }
    if (highRiskAdenoma && n <= 10) {
      c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'High-risk adenoma (≥10 mm, villous, high-grade dysplasia, or 3 or more adenomas)', quote: '"High risk adenoma(s) — Colonoscopy — 3 years." Defined as "Tubular adenoma ≥10mm, 3 or more adenomas, adenoma(s) with villous histology or adenoma with high-grade dysplasia."', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
    }
    if (h === 'SSL' && (size >= 10 || f.hgd)) {
      c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'A sessile serrated lesion 10 mm or larger, or with dysplasia', quote: '"Sessile serrated adenoma(s) ≥10 mm / with dysplasia — Colonoscopy — 3 years."', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
    }
    if (h === 'TSA') {
      c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'A traditional serrated adenoma', quote: '"Traditional serrated adenoma — Colonoscopy — 3 years."', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
    }
    if (h === 'SSL' && size < 10 && !f.hgd) {
      c.push({ interval: '5 years', modality: 'Colonoscopy', driver: 'Sessile serrated lesion(s) under 10 mm without dysplasia', quote: 'ColonCancerCheck lists "Any sessile serrated adenoma(s) <10mm without dysplasia — Colonoscopy — 5 years," while noting there is limited evidence for a precise serrated interval and no banding by count.', source: src, notes: ['ColonCancerCheck does not band serrated lesions by count; treat the interval as guidance and consider serrated-polyposis criteria at high counts.'], sort: SORT.fiveYears, kind: 'finding' })
    }
    if (isAdenoma(h) && !highRiskAdenoma && n >= 1 && n <= 2) {
      c.push({ interval: 'FIT in 5 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: '1 to 2 low-risk tubular adenomas under 10 mm', quote: '"Low risk adenoma(s) — FIT — 5 years." ColonCancerCheck returns low-risk adenomas to stool screening after the INDEX colonoscopy.', source: src, notes: ['This FIT pathway applies after the index colonoscopy; after a surveillance colonoscopy the equivalent low-risk result loops at colonoscopy in 5 years, not FIT.'], sort: SORT.fiveYears, kind: 'finding' })
    }
    if (h === 'HP') {
      if (f.proximalHp || size >= 10) {
        c.push({ interval: '3 to 5 years', modality: 'Colonoscopy', driver: 'A large or proximal hyperplastic polyp', quote: 'ColonCancerCheck has no dedicated large-hyperplastic band; a ≥10 mm or proximal hyperplastic polyp is managed as a serrated lesion. Interval shown per the aligned USMSTF 2020 value.', source: src, notes: ['This branch is not tabulated by ColonCancerCheck; verify against local practice.'], sort: SORT.threeToFive, kind: 'finding' })
      } else {
        c.push({ interval: 'FIT in 10 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'Small distal hyperplastic polyp(s)', quote: '"Hyperplastic polyp(s) in rectum or sigmoid — FIT — 10 years."', source: src, notes: [], sort: SORT.tenYears, kind: 'finding' })
      }
    }
  }

  if (!prepAdequate(f.bbps)) {
    c.push(prepCandidate(src, 'repeat (≤1 year)', '"The recommendations … assume a high-quality colonoscopy (i.e., adequate bowel preparation to detect polyps 5 mm in size …)." ColonCancerCheck gives no interval on inadequate prep; the examination should be repeated.'))
  }
  if (!c.length) {
    c.push({ interval: 'FIT in 10 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'A normal colonoscopy', quote: '"No polyps — FIT — 10 years."', source: src, notes: [], sort: SORT.tenYears, kind: 'finding' })
  }
  return govern(c, f)
}

// ===========================================================================
// CANADA — ALBERTA (ACRCSP 2023). FIT-based; low-risk returns to FIT.
// Diverges from Ontario: 3–4 adenomas → 5 y; serrated banded by count;
// large HP split proximal (3 y) vs rectosigmoid (5 y).
// ===========================================================================
function computeCA_AB(f: Findings): Result {
  const o = overrideResult(f, SRC.CA_AB)
  if (o) return o
  const c: Candidate[] = []
  const n = f.nPolyps
  const size = f.maxSize
  const h = effectiveHist(f.hist)
  const src = SRC.CA_AB

  if (n > 0) {
    if (f.piece && size >= 20) {
      c.push({ interval: '6 months', modality: 'Colonoscopy (site check)', driver: 'Piecemeal resection of a large lesion 20 mm or larger', quote: '"first repeat endoscopic assessment in 6 months. If the initial polyp was ≥20 mm, the next surveillance colonoscopy should be in 1 year."', source: src, notes: ['Then a colonoscopy at 1 year, and at 3 years thereafter if the site stays clear.'], sort: SORT.sixMonths, kind: 'finding' })
    }
    if (isAdenoma(h)) {
      if (n > 10) c.push({ interval: '1 year', modality: 'Colonoscopy', driver: 'More than 10 adenomas', quote: '"colonoscopy in 1 year and consider genetic counseling."', source: src, notes: ['Consider referral for genetic counselling.'], sort: SORT.oneYear, kind: 'finding' })
      if (size >= 10 || isVillous(h) || f.hgd) c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'An adenoma 10 mm or larger, villous, or with high-grade dysplasia', quote: '"colonoscopy in 3 years" (adenoma ≥10 mm, villous, or high-grade dysplasia).', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
      if (n >= 5 && n <= 10) c.push({ interval: '3 years', modality: 'Colonoscopy', driver: '5 to 10 adenomas', quote: '"colonoscopy in 3 years" (5–10 tubular adenomas <10 mm).', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
      if (n >= 3 && n <= 4) c.push({ interval: '5 years', modality: 'Colonoscopy', driver: '3 to 4 adenomas under 10 mm', quote: '"colonoscopy in 5 years" (3–4 tubular adenomas <10 mm; longer than ColonCancerCheck’s 3 years).', source: src, notes: [], sort: SORT.fiveYears, kind: 'finding' })
      if (n >= 1 && n <= 2) c.push({ interval: 'FIT in 5 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: '1 to 2 low-risk tubular adenomas under 10 mm', quote: '"FIT in 5 years" (1–2 tubular adenomas <10 mm).', source: src, notes: [], sort: SORT.fiveYears, kind: 'finding' })
    } else if (h === 'SSL') {
      if (size >= 10 || f.hgd) c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'A sessile serrated lesion 10 mm or larger, or with dysplasia', quote: '"colonoscopy in 3 years" (SSL ≥10 mm or with dysplasia).', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
      else if (n >= 3) c.push({ interval: '3 years', modality: 'Colonoscopy', driver: '3 or more sessile serrated lesions under 10 mm', quote: '"3–10 sessile serrated lesions <10 mm: colonoscopy in 3 years."', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
      else c.push({ interval: '5 years', modality: 'Colonoscopy', driver: '1 to 2 sessile serrated lesions under 10 mm', quote: '"1–2 sessile serrated lesions <10 mm: colonoscopy in 5 years."', source: src, notes: [], sort: SORT.fiveYears, kind: 'finding' })
    } else if (h === 'TSA') {
      c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'A traditional serrated adenoma', quote: '"colonoscopy in 3 years" (traditional serrated adenoma).', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
    } else if (h === 'HP') {
      if (size >= 10 && f.proximalHp) c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'A proximal hyperplastic polyp 10 mm or larger', quote: '"≥10 mm proximal: colonoscopy in 3 years."', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
      else if (size >= 10) c.push({ interval: '5 years', modality: 'Colonoscopy', driver: 'A rectosigmoid hyperplastic polyp 10 mm or larger', quote: '"≥10 mm rectosigmoid: colonoscopy in 5 years."', source: src, notes: [], sort: SORT.fiveYears, kind: 'finding' })
      else c.push({ interval: 'FIT in 10 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'Hyperplastic polyp(s) under 10 mm', quote: '"hyperplastic polyp(s) <10 mm … FIT in 10 years."', source: src, notes: [], sort: SORT.tenYears, kind: 'finding' })
    }
  }

  if (!prepAdequate(f.bbps)) {
    c.push({ interval: 'within 1 year', modality: 'Colonoscopy', driver: 'Bowel preparation was inadequate', quote: 'Alberta does not specify an interval for inadequate preparation; an inadequate exam should be repeated (commonly within 1 year) per general screening-quality standards.', source: src, notes: ['Not an ACRCSP-specified interval — general screening-quality standard.'], sort: SORT.oneYear, kind: 'prep' })
  }
  if (!c.length) {
    c.push({ interval: 'FIT in 10 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'A normal colonoscopy', quote: '"no polyps or normal findings … FIT in 10 years."', source: src, notes: [], sort: SORT.tenYears, kind: 'finding' })
  }
  return govern(c, f)
}

// ===========================================================================
// CANADA — BRITISH COLUMBIA (BCGuidelines.ca 2022). Adopts the British/ESGE
// model: 1–4 low-risk → 10-year colonoscopy; multiplicity trigger ≥5; any
// high-risk lesion → 3 y then 5 y; normal / HP <10 mm → 2-yearly FIT.
// ===========================================================================
function computeCA_BC(f: Findings): Result {
  const o = overrideResult(f, SRC.CA_BC)
  if (o) return o
  const c: Candidate[] = []
  const n = f.nPolyps
  const size = f.maxSize
  const h = effectiveHist(f.hist)
  const src = SRC.CA_BC
  const highRisk =
    (isAdenoma(h) && (size >= 10 || isVillous(h) || f.hgd)) ||
    (h === 'SSL' && (size >= 10 || f.hgd)) ||
    h === 'TSA' ||
    (h === 'HP' && size >= 10)

  if (n > 0) {
    if (f.piece && size >= 20) {
      c.push({ interval: '6 months', modality: 'Colonoscopy (site check)', driver: 'Piecemeal resection of a large lesion', quote: '"Repeat colonoscopy to assess the site of lesion removal is recommended at 6 months." (BC applies this to any piecemeal large-lesion resection; the ≥20 mm threshold is convention.)', source: src, notes: ['Further intervals at the physician’s discretion.'], sort: SORT.sixMonths, kind: 'finding' })
    }
    if (highRisk) {
      c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'A high-risk lesion (≥10 mm, villous, high-grade dysplasia, serrated with dysplasia, TSA, or hyperplastic ≥10 mm)', quote: '"1 or more high risk lesion(s) … Follow-up colonoscopy in 3 years," then 5 years if the next exam is clear.', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
    } else if (h === 'HP') {
      c.push({ interval: 'FIT every 2 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'Hyperplastic polyp(s) under 10 mm', quote: '"Hyperplastic polyps (HPs) <10 mm … require no special surveillance." Resume FIT screening.', source: src, notes: [], sort: SORT.tenYears, kind: 'finding' })
    } else {
      if (n >= 5) c.push({ interval: '3 years', modality: 'Colonoscopy', driver: '5 or more low-risk precancerous lesions', quote: '"the risk of CRC appears to increase once 5 or more precancerous lesions are detected … Follow-up colonoscopy in 3 years."', source: src, notes: n > 10 ? ['10 or more lesions over a lifetime: refer to the Hereditary Cancer Program.'] : [], sort: SORT.threeYears, kind: 'finding' })
      else c.push({ interval: '10 years', modality: 'Colonoscopy', driver: '1 to 4 low-risk precancerous lesions under 10 mm', quote: '"1 to 4 low risk precancerous lesions … Follow-up colonoscopy in 10 years."', source: src, notes: [], sort: SORT.tenYears, kind: 'finding' })
    }
  }

  if (!prepAdequate(f.bbps)) {
    c.push({ interval: 'within 1 year', modality: 'Colonoscopy', driver: 'Bowel preparation was inadequate', quote: 'BC does not specify an interval for inadequate preparation; an inadequate exam should be repeated (commonly within 1 year) per endoscopist judgement.', source: src, notes: ['Not a BCGuidelines-specified interval — general standard.'], sort: SORT.oneYear, kind: 'prep' })
  }
  if (!c.length) {
    c.push({ interval: 'FIT every 2 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'A normal colonoscopy', quote: '"No surveillance required. Resume screening." (BC average-risk FIT program, 2-yearly).', source: src, notes: [], sort: SORT.tenYears, kind: 'finding' })
  }
  return govern(c, f)
}

// ===========================================================================
// EUROPE — ESGE 2020 (binary OR-gate → 3 years, else return to screening).
// Villous histology and 3–4 adenomas are deliberately NOT triggers. A
// hyperplastic polyp is a serrated polyp, so an HP ≥10 mm IS a trigger.
// ===========================================================================
function computeEU(f: Findings): Result {
  const o = overrideResult(f, SRC.EU)
  if (o) return o
  const c: Candidate[] = []
  const n = f.nPolyps
  const size = f.maxSize
  const h = effectiveHist(f.hist)
  const src = SRC.EU

  if (n > 0 && f.piece && size >= 20) {
    c.push({ interval: '3 to 6 months', modality: 'Colonoscopy (site check)', driver: 'Piecemeal endoscopic resection of a polyp 20 mm or larger', quote: '"ESGE recommends a 3–6-month early repeat colonoscopy following piecemeal endoscopic resection of polyps ≥20 mm … A first surveillance colonoscopy 12 months after the repeat colonoscopy is recommended."', source: src, notes: ['Then a first surveillance colonoscopy 12 months after the repeat, to detect late recurrence.'], sort: SORT.sixMonths, kind: 'finding' })
  }

  if (n > 0) {
    const adenomaTrigger = isAdenoma(h) && (size >= 10 || f.hgd || n >= 5)
    const serratedTrigger = (h === 'SSL' && (size >= 10 || f.hgd)) || h === 'TSA' || (h === 'HP' && size >= 10)

    if (adenomaTrigger || serratedTrigger) {
      c.push({ interval: '3 years', modality: 'Colonoscopy', driver: 'Meets an ESGE surveillance trigger (adenoma ≥10 mm, high-grade dysplasia, ≥5 adenomas, or a serrated polyp ≥10 mm / with dysplasia / a traditional serrated adenoma)', quote: '"ESGE recommends surveillance colonoscopy after 3 years for patients with complete removal of at least 1 adenoma ≥10 mm or with high grade dysplasia, or ≥5 adenomas, or any serrated polyp ≥10 mm or with dysplasia."', source: src, notes: [], sort: SORT.threeYears, kind: 'finding' })
    } else {
      c.push({ interval: 'FIT every 2 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: '1–4 adenomas under 10 mm with low-grade dysplasia (villous components included), or any serrated polyp under 10 mm without dysplasia', quote: '"ESGE recommends that patients with complete removal of 1–4 <10 mm adenomas with low grade dysplasia, irrespective of villous components, or any serrated polyp <10 mm without dysplasia, do not require endoscopic surveillance and should be returned to screening." If organised screening is unavailable, repeat colonoscopy at 10 years.', source: src, notes: ['ESGE deliberately does not treat villous histology or 3–4 adenomas as surveillance triggers — the main divergence from USMSTF.'], sort: SORT.tenYears, kind: 'finding' })
    }
  }

  if (!prepAdequate(f.bbps)) {
    c.push(prepCandidate(src, 'within 1 year', '"Standard guideline recommendations for surveillance intervals apply only to patients with adequate bowel preparation." ESGE recommends a 1-year repeat colonoscopy for inadequate preparation.'))
  }
  if (!c.length) {
    c.push({ interval: 'FIT every 2 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'A normal colonoscopy', quote: 'A normal baseline colonoscopy returns the patient to the organised screening programme (10-year colonoscopy fallback where screening is unavailable).', source: src, notes: [], sort: SORT.tenYears, kind: 'finding' })
  }
  return govern(c, f)
}

// ===========================================================================
// AUSTRALIA — Cancer Council Australia / NHMRC 2018 (discrete 10/5/3/1-year
// intervals on a count × feature matrix).
// ===========================================================================
const AU_LOWRISK_Q =
  '"First surveillance interval of 10 years is appropriate for most individuals following complete removal of low-risk conventional adenomas only (1–2 small [<10mm] tubular adenomas without high-grade dysplasia)."'
const AU_HIGHRISK_Q =
  '"First surveillance intervals should be within 5 years following removal of high-risk conventional adenomas only, i.e. those with one or more of the following features: size ≥10mm; high-grade dysplasia; villosity; 3–4 adenomas."'
const AU_FIVEPLUS_Q =
  '"First surveillance intervals following complete removal of ≥5 conventional adenomas only, should be no longer than 3 years."'
const AU_SERRATED_Q =
  '"First surveillance intervals should be no greater than 5 years and should be based on features of synchronous conventional adenomas (if present) following complete removal of sessile and traditional serrated adenomas."'

function computeAU(f: Findings): Result {
  const o = overrideResult(f, SRC.AU)
  if (o) return o
  const c: Candidate[] = []
  const n = f.nPolyps
  const size = f.maxSize
  const h = effectiveHist(f.hist)
  const src = SRC.AU
  const hasSize = size >= 10
  const hasFeature = f.hgd || isVillous(h)

  if (n > 0 && f.piece && size >= 20) {
    c.push({ interval: 'approx. 6 months', modality: 'Colonoscopy (site check)', driver: 'Piecemeal excision of a large sessile or laterally spreading lesion (20 mm or larger)', quote: '"First surveillance interval should be approximately 6 months in individuals who have undergone piecemeal excision of large sessile and laterally spreading lesions."', source: src, notes: ['If the 6-month site check is clear, next colonoscopy at approximately 12–18 months.'], sort: SORT.sixMonths, kind: 'finding' })
  }

  if (n > 0) {
    if (isAdenoma(h)) {
      const col = !hasSize && !hasFeature ? 0 : !hasSize && hasFeature ? 1 : hasSize && !hasFeature ? 2 : 3
      const rows: Record<string, [string, number][]> = {
        b12: [['10 years', SORT.tenYears], ['5 years', SORT.fiveYears], ['3 years', SORT.threeYears], ['3 years', SORT.threeYears]],
        b34: [['5 years', SORT.fiveYears], ['3 years', SORT.threeYears], ['3 years', SORT.threeYears], ['1 year', SORT.oneYear]],
        b59: [['3 years', SORT.threeYears], ['1 year', SORT.oneYear], ['1 year', SORT.oneYear], ['1 year', SORT.oneYear]],
        b10: [['1 year', SORT.oneYear], ['1 year', SORT.oneYear], ['1 year', SORT.oneYear], ['1 year', SORT.oneYear]],
      }
      const band = n <= 2 ? 'b12' : n <= 4 ? 'b34' : n <= 9 ? 'b59' : 'b10'
      const [interval, sort] = rows[band][col]
      const countLabel = n <= 2 ? '1 to 2 adenomas' : n <= 4 ? '3 to 4 adenomas' : n <= 9 ? '5 to 9 adenomas' : '10 or more adenomas'
      const featureLabel = col === 0 ? ' under 10 mm without villous or high-grade features' : col === 1 ? ' under 10 mm with villous histology or high-grade dysplasia' : col === 2 ? ', with a lesion 10 mm or larger' : ', 10 mm or larger with villous or high-grade features'
      const quote = n >= 5 ? AU_FIVEPLUS_Q : band === 'b12' && col === 0 ? AU_LOWRISK_Q : AU_HIGHRISK_Q
      const notes: string[] = []
      if (band === 'b12' && col === 0) notes.push('Return to the National Bowel Cancer Screening Program (iFOBT) after 4 years is an appropriate alternative and should be discussed with the patient.')
      if (n >= 10) notes.push('10 or more adenomas may warrant assessment for a polyposis syndrome.')
      c.push({ interval, modality: 'Colonoscopy', driver: countLabel + featureLabel, quote, source: src, notes, sort, kind: 'finding' })
    } else if (h === 'SSL' || h === 'TSA') {
      const advanced = size >= 10 || f.hgd || h === 'TSA'
      let interval: string
      let sort: number
      if (n <= 2) {
        interval = advanced ? '3 years' : '5 years'
        sort = advanced ? SORT.threeYears : SORT.fiveYears
      } else if (n <= 4) {
        interval = advanced ? '1 year' : '3 years'
        sort = advanced ? SORT.oneYear : SORT.threeYears
      } else {
        interval = '1 year'
        sort = SORT.oneYear
      }
      c.push({ interval, modality: 'Colonoscopy', driver: advanced ? 'Advanced serrated polyp (10 mm or larger, with dysplasia, or a traditional serrated adenoma)' : 'Sessile serrated lesion(s) under 10 mm without dysplasia', quote: AU_SERRATED_Q, source: src, notes: n >= 5 ? ['5 or more serrated lesions may meet serrated-polyposis criteria.'] : [], sort, kind: 'finding' })
    } else if (h === 'HP') {
      if (f.proximalHp || size >= 10) {
        c.push({ interval: n <= 2 ? '3 years' : '1 year', modality: 'Colonoscopy', driver: 'A hyperplastic polyp 10 mm or larger, or proximal to the sigmoid (a clinically significant serrated polyp)', quote: 'A hyperplastic polyp ≥10 mm is a "clinically significant serrated polyp" and an "advanced serrated polyp"; ' + AU_SERRATED_Q, source: src, notes: [], sort: n <= 2 ? SORT.threeYears : SORT.oneYear, kind: 'finding' })
      } else {
        c.push({ interval: 'iFOBT every 2 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'Small distal hyperplastic polyp(s)', quote: '"Small, particularly distal, true hyperplastic polyps do not require surveillance."', source: src, notes: [], sort: SORT.tenYears, kind: 'finding' })
      }
    }
  }

  if (!prepAdequate(f.bbps)) {
    c.push(prepCandidate(src, 'within 12 months', '"Where the preparation is inadequate, repeat colonoscopy should normally be offered within 12 months." Intervals presuppose a colon cleared of all significant neoplasia.'))
  }
  if (!c.length) {
    c.push({ interval: 'iFOBT every 2 years', modality: 'Usual screening (no scheduled colonoscopy)', driver: 'A normal colonoscopy', quote: 'A normal examination returns the patient to iFOBT screening under the National Bowel Cancer Screening Program.', source: src, notes: [], sort: SORT.tenYears, kind: 'finding' })
  }
  return govern(c, f)
}

export interface Jurisdiction {
  id: 'US' | 'CA_ON' | 'CA_AB' | 'CA_BC' | 'EU' | 'AU'
  country: 'US' | 'CA' | 'AU' | 'EU'
  label: string // country-level label
  province?: string // for Canada
  short: string
  guideline: string
  source: Source
  compute: (f: Findings) => Result
}

export const JURISDICTIONS: Jurisdiction[] = [
  { id: 'US', country: 'US', label: 'United States', short: 'US', guideline: 'USMSTF 2020', source: SRC.US, compute: computeUS },
  { id: 'CA_ON', country: 'CA', label: 'Canada', province: 'Ontario', short: 'ON', guideline: 'ColonCancerCheck', source: SRC.CA, compute: computeCA },
  { id: 'CA_AB', country: 'CA', label: 'Canada', province: 'Alberta', short: 'AB', guideline: 'ACRCSP 2023', source: SRC.CA_AB, compute: computeCA_AB },
  { id: 'CA_BC', country: 'CA', label: 'Canada', province: 'British Columbia', short: 'BC', guideline: 'BCGuidelines 2022', source: SRC.CA_BC, compute: computeCA_BC },
  { id: 'AU', country: 'AU', label: 'Australia', short: 'AU', guideline: 'NHMRC / Cancer Council', source: SRC.AU, compute: computeAU },
  { id: 'EU', country: 'EU', label: 'Europe', short: 'EU', guideline: 'ESGE 2020', source: SRC.EU, compute: computeEU },
]
