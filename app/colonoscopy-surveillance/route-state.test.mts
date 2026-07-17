// Route-state regression test. The pathname is the sole authority for the
// guideline: a queryless route must render the guideline named in its own title
// and canonical URL, and no stored, geo, or prior selection may override it.
// Guards the bug where /colonoscopy-surveillance (US canonical) rendered Ontario.
// Run: npm test
import { routeToJur } from './slugs'
import { JURISDICTIONS, compute, type Exam, type JurId } from './engine'

interface RouteCase {
  path: string
  jur: JurId
  guidelineIncludes: string
  lowRiskAdenomaInterval: string // 1 tubular adenoma, 8 mm, low-grade
  lowRiskAdenomaModality: string // '' when the guideline states no modality
}

// The displayed guideline and the low-risk-adenoma result the reviewer verified
// per route (interval, then modality). If a route ever resolves to the wrong
// guideline, both break.
const ROUTES: RouteCase[] = [
  { path: '/colonoscopy-surveillance', jur: 'US', guidelineIncludes: 'USMSTF', lowRiskAdenomaInterval: '7', lowRiskAdenomaModality: 'Colonoscopy' },
  { path: '/colonoscopy-surveillance/canada-ontario', jur: 'CA_ON', guidelineIncludes: 'ColonCancerCheck', lowRiskAdenomaInterval: '5 years', lowRiskAdenomaModality: 'FIT' },
  { path: '/colonoscopy-surveillance/canada-alberta', jur: 'CA_AB', guidelineIncludes: 'ACRCSP', lowRiskAdenomaInterval: '5 years', lowRiskAdenomaModality: 'FIT' },
  { path: '/colonoscopy-surveillance/canada-british-columbia', jur: 'CA_BC', guidelineIncludes: 'BCGuidelines', lowRiskAdenomaInterval: '10 years', lowRiskAdenomaModality: 'Colonoscopy' },
  { path: '/colonoscopy-surveillance/australia', jur: 'AU', guidelineIncludes: 'NHMRC', lowRiskAdenomaInterval: '10 years', lowRiskAdenomaModality: 'Colonoscopy' },
  { path: '/colonoscopy-surveillance/europe', jur: 'EU', guidelineIncludes: 'ESGE', lowRiskAdenomaInterval: 'screening', lowRiskAdenomaModality: '' },
]

let pass = 0
const fails: string[] = []
const ok = (cond: boolean, msg: string) => { if (cond) pass++; else fails.push(msg) }

const lowRiskExam = (jur: JurId): Exam => ({
  jur,
  lesions: [{ hist: 'TA', count: 1, size: 8, hgd: false, piece: false, proximal: false }],
  malignant: false,
  special: false,
  bbps: [3, 3, 3],
})

for (const c of ROUTES) {
  // 1. The route resolves to its jurisdiction, with and without a trailing slash.
  ok(routeToJur(c.path) === c.jur, `${c.path} resolves to ${routeToJur(c.path)}, expected ${c.jur}`)
  ok(routeToJur(c.path + '/') === c.jur, `${c.path}/ (trailing slash) resolves to ${routeToJur(c.path + '/')}, expected ${c.jur}`)

  // 2. The displayed guideline matches the route title.
  const guideline = JURISDICTIONS.find((j) => j.id === c.jur)?.guideline ?? ''
  ok(guideline.includes(c.guidelineIncludes), `${c.path}: guideline "${guideline}" should include "${c.guidelineIncludes}"`)

  // 3. The result the route computes matches the route, not some other guideline.
  const r = compute(lowRiskExam(c.jur))
  ok(r.interval.toLowerCase().includes(c.lowRiskAdenomaInterval.toLowerCase()),
    `${c.path}: 1x8mm adenoma -> "${r.interval}", expected to include "${c.lowRiskAdenomaInterval}"`)
  if (c.lowRiskAdenomaModality)
    ok((r.modality ?? '').toLowerCase().includes(c.lowRiskAdenomaModality.toLowerCase()),
      `${c.path}: 1x8mm adenoma modality -> "${r.modality}", expected to include "${c.lowRiskAdenomaModality}"`)
  ok(!!r.source.name && !!r.source.url, `${c.path}: result carries a source`)
}

// 4. The base path is the United States even though other guidelines exist, and
//    an unknown slug falls back to the base guideline rather than throwing.
ok(routeToJur('/colonoscopy-surveillance') === 'US', 'base path must be US')
ok(routeToJur('/colonoscopy-surveillance/not-a-real-slug') === 'US', 'unknown slug must fall back to US')

console.log(`\n${'='.repeat(56)}\nRoute-state regression: ${pass} passed, ${fails.length} failed\n${'='.repeat(56)}`)
if (fails.length) { console.log('\n' + fails.map((f) => '  x ' + f).join('\n') + '\n'); process.exit(1) }
console.log('Every queryless route renders the guideline it names.\n')
