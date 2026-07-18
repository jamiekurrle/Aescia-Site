// Regression tests for subsequent-surveillance intervals. Every expected value
// is from the primary-source derivation, verified cell by cell. Run: npx tsx
// app/colonoscopy-surveillance/subsequent.test.mts
import { computeSurveillance, type LesionInput, type JurId, type Stage } from './engine.ts'

let pass = 0
let fail = 0
const L = (hist: LesionInput['hist'], count: number, size = 8, hgd = false, piece = false): LesionInput => ({ hist, count, size, hgd, piece, proximal: false })

function eq(jur: JurId, stage: Stage, prior: LesionInput[], current: LesionInput[], expected: string, label: string) {
  const r = computeSurveillance({ jur, stage, prior, current, malignant: false, special: false, bbps: [3, 3, 3] })
  if (r.interval === expected) {
    pass++
  } else {
    fail++
    console.error(`FAIL [${jur} ${stage}] ${label}\n   expected: ${expected}\n   got:      ${r.interval}`)
  }
}

const TA_low = [L('TA', 2, 6)] // 1-2 small tubular adenomas
const TA_34 = [L('TA', 3, 6)] // 3-4 small tubular adenomas
const HIGH = [L('TA', 1, 12)] // adenoma >=10 mm -> high-risk everywhere
const NORMAL: LesionInput[] = []

// --- United States, Table 7 (second surveillance) --------------------------
eq('US', 'second', TA_low, NORMAL, '10 years', 'low baseline, normal first surv')
eq('US', 'second', TA_low, [L('TA', 2, 6)], '7 to 10 years', 'low baseline, 1-2 TA')
eq('US', 'second', TA_low, [L('TA', 3, 6)], '3 to 5 years', 'low baseline, 3-4 TA')
eq('US', 'second', TA_low, HIGH, '3 years', 'low baseline, high first surv')
eq('US', 'second', TA_34, NORMAL, '10 years', '3-4 baseline collapses to low, normal')
eq('US', 'second', HIGH, NORMAL, '5 years', 'high baseline, normal first surv (capped at 5)')
eq('US', 'second', HIGH, [L('TA', 2, 6)], '5 years', 'high baseline, 1-2 TA')
eq('US', 'second', HIGH, HIGH, '3 years', 'high baseline, high first surv')
eq('US', 'subsequent', TA_low, NORMAL, 'Not specified by USMSTF 2020', 'US has no third-round rule')

// --- Europe, ESGE Recs 4 and 5 ---------------------------------------------
eq('EU', 'second', HIGH, NORMAL, '5 years', 'clear surveillance after high baseline')
eq('EU', 'second', HIGH, HIGH, '3 years', 'polyps requiring surveillance found')
eq('EU', 'subsequent', NORMAL, NORMAL, 'Return to screening', 'two consecutive clear exams')
eq('EU', 'subsequent', HIGH, HIGH, '3 years', 'high at a later round')

// --- Ontario, ColonCancerCheck subsequent column ---------------------------
eq('CA_ON', 'second', HIGH, NORMAL, '5 years', 'high adenoma baseline, clean surv -> 5y colonoscopy (not FIT)')
eq('CA_ON', 'second', HIGH, HIGH, '3 years', 'high adenoma at both')
eq('CA_ON', 'second', TA_low, NORMAL, 'Not applicable', 'low-risk baseline is on FIT')

// --- Alberta, ACRCSP pathways ----------------------------------------------
eq('CA_AB', 'second', HIGH, NORMAL, '5 years', 'high-risk pathway 3y then 5y')
eq('CA_AB', 'second', TA_34, NORMAL, '5 to 10 years', '3-4 TA then normal 5-year')

// --- British Columbia, Table 1 column 3 ------------------------------------
eq('CA_BC', 'second', HIGH, NORMAL, 'FIT in 10 years', 'clean surveillance exam returns to FIT')
eq('CA_BC', 'second', HIGH, [L('TA', 2, 6)], '5 years, then as per findings', '3-year track, 0-4 low-risk -> 5y')

// --- Australia, Tables 14-16 -----------------------------------------------
eq('AU', 'second', TA_low, NORMAL, 'Return to FOBT screening (National Bowel Cancer Screening Program)', 'low 1st, 0 adenomas 2nd')
eq('AU', 'second', TA_low, [L('TA', 2, 6)], '10 years', 'low 1st, low 2nd')
eq('AU', 'second', HIGH, NORMAL, '5 years', 'high 1st, 0 adenomas 2nd')
eq('AU', 'second', TA_low, [L('TA', 3, 12, true)], '1 year', 'low 1st, 3-4 >=10mm HGD 2nd (highest)')
eq('AU', 'second', TA_low, [L('SSL', 2, 6)], '5 years', 'low 1st, serrated only 2nd (Table 15a)')

console.log(`\n${pass} passed, ${fail} failed`)
if (fail > 0) process.exit(1)
console.log('All subsequent-surveillance intervals match the verified derivation.')
