// Regression tests for subsequent-surveillance intervals. Every expected value
// is from the primary-source derivation, verified cell by cell. Run: npx tsx
// app/colonoscopy-surveillance/subsequent.test.mts
import { computeSurveillance, compute, type LesionInput, type JurId, type Stage } from './engine.ts'

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
eq('US', 'subsequent', TA_low, NORMAL, '10 years', 'US: no 3rd-round rule -> normal current exam gives 10y as a fresh baseline (under a not-specified caveat)')

// --- Europe, ESGE Recs 4 and 5 ---------------------------------------------
eq('EU', 'second', HIGH, NORMAL, '5 years', 'clear surveillance after high baseline')
eq('EU', 'second', HIGH, HIGH, '3 years', 'polyps requiring surveillance found')
eq('EU', 'subsequent', NORMAL, NORMAL, 'Return to screening', 'two consecutive clear exams')
eq('EU', 'subsequent', HIGH, HIGH, '3 years', 'high at a later round')

// --- Ontario, ColonCancerCheck subsequent column ---------------------------
eq('CA_ON', 'second', HIGH, NORMAL, '5 years', 'high adenoma baseline, clean surv -> 5y colonoscopy (not FIT)')
eq('CA_ON', 'second', HIGH, HIGH, '3 years', 'high adenoma at both')
eq('CA_ON', 'second', TA_low, NORMAL, '10 years', 'low-risk baseline is on FIT; a normal later exam restages as a fresh baseline (FIT in 10y)')

// --- Alberta, ACRCSP pathways ----------------------------------------------
eq('CA_AB', 'second', HIGH, NORMAL, '5 years', 'high-risk pathway 3y then 5y')
eq('CA_AB', 'second', TA_34, NORMAL, '5 to 10 years', '3-4 TA then normal 5-year')

// --- British Columbia, Table 1 column 3 ------------------------------------
eq('CA_BC', 'second', HIGH, NORMAL, '5 years, then as per findings', 'high-track clean exam de-escalates to 5y (Table 1 subsequent column), not FIT-in-10')
eq('CA_BC', 'second', HIGH, [L('TA', 2, 6)], '5 years, then as per findings', '3-year track, 0-4 low-risk -> 5y')

// --- Australia, Tables 14-16 -----------------------------------------------
eq('AU', 'second', TA_low, NORMAL, 'Return to FOBT screening (National Bowel Cancer Screening Program)', 'low 1st, 0 adenomas 2nd')
eq('AU', 'second', TA_low, [L('TA', 2, 6)], '10 years', 'low 1st, low 2nd')
eq('AU', 'second', HIGH, NORMAL, '5 years', 'high 1st, 0 adenomas 2nd')
eq('AU', 'second', TA_low, [L('TA', 3, 12, true)], '1 year', 'low 1st, 3-4 >=10mm HGD 2nd (highest)')
eq('AU', 'second', TA_low, [L('SSL', 2, 6)], '5 years', 'low 1st, serrated only 2nd (Table 15a)')

// --- A first colonoscopy that found nothing returns to routine screening ----
// (a normal 1st is not a surveillance baseline; the 2nd stands as a fresh one)
eq('US', 'second', NORMAL, NORMAL, '10 years', 'US: normal 1st -> 10-year screening')
eq('US', 'second', NORMAL, HIGH, '3 years', 'US: normal 1st, high-risk 2nd -> fresh baseline')
eq('CA_ON', 'second', NORMAL, NORMAL, '10 years', 'ON: normal 1st, normal 2nd -> FIT in 10 years (baseline no-polyp row)')
eq('CA_AB', 'second', NORMAL, NORMAL, '10 years', 'AB: normal 1st -> FIT in 10 years')
eq('AU', 'second', NORMAL, NORMAL, 'Return to FOBT screening (National Bowel Cancer Screening Program)', 'AU: normal 1st -> NBCSP')
eq('EU', 'second', NORMAL, NORMAL, 'Return to screening', 'EU: normal 1st -> screening')

// --- Presentation flags (guideline-reference discipline) -------------------
function ok(cond: boolean, label: string) {
  if (cond) pass++
  else {
    fail++
    console.error(`FAIL ${label}`)
  }
}

// A normal first colonoscopy then an adenoma is the calculator taking the most
// recent exam as a new baseline, not a USMSTF Table 7 rule. Interval kept, but
// flagged as an interpretation.
{
  const r = computeSurveillance({ jur: 'US', stage: 'second', prior: NORMAL, current: [L('TA', 1, 8)], malignant: false, special: false, bbps: [3, 3, 3] })
  ok(!!r.interpretation && r.interval === '7 to 10 years' && !r.notSpecified, 'US normal-1st + adenoma is a labelled interpretation, interval kept')
}

// Inadequate preparation (US): the repeat timing depends on an indication the
// calculator does not collect, so both published timings are carried and none is
// selected, while the ordinary interval is suppressed to the demoted block.
{
  const r = compute({ jur: 'US', lesions: [L('TA', 1, 8)], malignant: false, special: false, bbps: [3, 1, 3] })
  ok(r.prepInadequate && r.prepByIndication?.length === 2 && r.supersededInterval?.interval === '7 to 10 years', 'US inadequate prep carries two indication timings and suppresses the ordinary interval')
}

// --- Audit fixes: guideline-fidelity defects found by the adversarial review --
const b: [number, number, number] = [3, 3, 3]
const bad: [number, number, number] = [3, 1, 3]
const LL = (hist: LesionInput['hist'], size: number, count = 1, hgd = false, piece = false, proximal = false): LesionInput => ({ hist, count, size, hgd, piece, proximal })

// #1 Ontario: a current high-risk adenoma is not buried under a 10-year FIT return.
eq('CA_ON', 'second', [], [LL('TA', 6, 3)], '3 years', 'ON: normal 1st, 3 adenomas 2nd -> 3y colonoscopy, not FIT')
eq('CA_ON', 'second', [LL('TA', 6)], [LL('TA', 14)], '3 years', 'ON: low-risk 1st, high-risk 2nd -> 3y')
// #2 Alberta: a large piecemeal resection at a surveillance round follows the piecemeal schedule.
eq('CA_AB', 'second', [], [LL('TA', 25, 1, false, true)], '6 months', 'AB: 25mm piecemeal at 2nd round -> 6-month site check, not 5y')
// #4 Europe: piecemeal >=20mm at a surveillance round triggers the early repeat.
eq('EU', 'second', [], [LL('TA', 25, 1, false, true)], '3–6-month early repeat colonoscopy', 'EU: 25mm piecemeal at 2nd round -> Rec 3 early repeat, not 3y')

// #3/#5/#10 Inadequate prep is not dropped on a return-to-screening subsequent outcome.
;[['AU', 'Within 12 months'], ['EU', 'Within 1 year']].forEach(([jur, expected]) => {
  const r = computeSurveillance({ jur: jur as JurId, stage: 'second', prior: [LL('TA', 6)], current: [], malignant: false, special: false, bbps: bad })
  ok(r.interval === expected && r.prepInadequate === true, `${jur}: bad prep + clean 2nd exam demotes to prep pathway, not a screening return`)
})
{
  const r = computeSurveillance({ jur: 'CA_BC', stage: 'second', prior: [LL('TA', 6)], current: [], malignant: false, special: false, bbps: bad })
  ok(r.prepInadequate === true, 'BC: bad prep + clean 2nd exam is flagged inadequate, not FIT-in-10y')
}

// #6/#15 US: an adenoma with high-grade dysplasia is a published 3-year row, not a calculator combination.
{
  const r = compute({ jur: 'US', lesions: [LL('TA', 6, 1, true)], malignant: false, special: false, bbps: b })
  ok(r.interval === '3 years' && !r.calculatorRule, 'US: 1 TA <10mm with HGD -> 3y, no spurious calculator-combination flag')
}
// #8 Alberta: a villous adenoma with an SSL is not shown the tubular-adenoma declined rule.
{
  const r = compute({ jur: 'CA_AB', lesions: [LL('SSL', 6), LL('VA', 6)], malignant: false, special: false, bbps: b })
  ok(r.interval === '3 years' && !r.notSpecified, 'AB: villous adenoma + SSL -> 3y advanced rule, not tubular "no recommendation"')
}
// #9 Alberta: hyperplastic size and location are bound to the same lesion.
{
  const r = compute({ jur: 'CA_AB', lesions: [LL('HP', 8, 1, false, false, true), LL('HP', 12, 1, false, false, false)], malignant: false, special: false, bbps: b })
  ok(r.interval === '5 years', 'AB: small proximal HP + large rectosigmoid HP -> 5y (rectosigmoid), not 3y')
}
// #11 Australia: a small hyperplastic polyp does not mask a synchronous adenoma.
{
  const r = compute({ jur: 'AU', lesions: [LL('HP', 5), LL('TA', 9)], malignant: false, special: false, bbps: b })
  ok(r.interval === '10 years', 'AU: small HP + low-risk adenoma -> the adenoma governs (10y), not "No surveillance required"')
}
// #16 British Columbia: a benign hyperplastic polyp removed piecemeal is not a 6-month site check.
{
  const r = compute({ jur: 'CA_BC', lesions: [LL('HP', 6, 1, false, true)], malignant: false, special: false, bbps: b })
  ok(r.interval !== '6 months', 'BC: sub-10mm HP removed piecemeal -> not the precancerous 6-month site check')
}
// #12 US: the interpretation caveat survives demotion under inadequate prep.
{
  const r = computeSurveillance({ jur: 'US', stage: 'second', prior: [], current: [LL('TA', 12)], malignant: false, special: false, bbps: bad })
  ok(!!r.supersededInterval && !!r.supersededInterval.interpretation, 'US: demoted normal-baseline interval keeps its calculator-interpretation caveat')
}
// #13 US: two normal exams read as routine screening, not an amber interpretation.
{
  const r = computeSurveillance({ jur: 'US', stage: 'second', prior: [], current: [], malignant: false, special: false, bbps: b })
  ok(r.interval === '10 years' && !r.interpretation, 'US: normal 1st + normal 2nd -> plain 10y screening, no interpretation flag')
}

// --- Second audit round: sibling defects and the monotonicity/modality fixes --
// Monotonicity: a surveillance interval never exceeds the current findings' own baseline.
eq('CA_ON', 'second', [LL('TA', 12)], [LL('TA', 25, 1, false, true)], '≤6 months', 'ON: piecemeal at 2nd -> site check (monotonicity)')
eq('CA_ON', 'second', [LL('TA', 12)], [LL('TA', 11, 11)], '≤1 year', 'ON: >10 adenomas at 2nd -> clearing colonoscopy, not 3y')
eq('CA_AB', 'second', [LL('TA', 12)], [LL('HP', 12, 1, false, false, true)], '3 years', 'AB: >=10mm proximal HP at 2nd is not a clear exam')
eq('AU', 'subsequent', [LL('TA', 6)], [LL('TA', 25, 1, false, true)], 'Approximately 6 months', 'AU: piecemeal at a later round -> site check')
// #4 BC high-track clean exam; #5 AU serrated must not lengthen.
eq('AU', 'second', [LL('TA', 12), LL('SSL', 6)], [], '5 years', 'AU: adding a small SSL to a high adenoma prior does not lengthen 5y')
// #7 modality tie-break: a serrated lesion keeps colonoscopy over a tied FIT interval.
{
  const r = compute({ jur: 'CA_ON', lesions: [LL('TA', 5), LL('SSL', 5)], malignant: false, special: false, bbps: b })
  ok(r.interval === '5 years' && /colonoscop/i.test(r.modality || ''), 'ON: low-risk adenoma + SSL -> 5y colonoscopy, not FIT')
}
// #10 Ontario: a rectosigmoid HP >=10mm at a subsequent exam is not "Not specified".
eq('CA_ON', 'second', [LL('TA', 12)], [LL('HP', 12)], '5 years', 'ON: rectosigmoid >=10mm HP at 2nd -> 5y row, not Not specified')
// #11 US: a current finding the baseline does not cover stays not-specified, not an interpretation.
{
  const r = computeSurveillance({ jur: 'US', stage: 'second', prior: [], current: [LL('SSL', 6, 11)], malignant: false, special: false, bbps: b })
  ok(r.notSpecified === true && !r.interpretation, 'US: normal prior + a not-specified current finding stays a gap, no interpretation')
}

// --- Third audit round: piecemeal-over-gap, baseline prep/scope, gap riskYears -
// #1 A piecemeal site check governs even where the round branch returned a gap.
eq('CA_AB', 'second', [LL('TA', 12)], [LL('TA', 25, 1, false, true)], '6 months', 'AB: high prior + high-risk piecemeal current -> site check, not Not specified')
// #2 Baseline: a scope statement is not demoted by inadequate prep.
{
  const r = compute({ jur: 'US', lesions: [LL('HP', 5, 25)], malignant: false, special: false, bbps: bad })
  ok(r.override === true && /outside the scope/i.test(r.interval), 'US: >20 HP + bad prep stays Outside the scope (scope not demoted)')
}
// #11 A not-specified subsequent gap carries riskYears 0, not the parsed guideline year.
{
  // A gap survives only when the current finding is itself unspecified (nothing to floor to).
  const r = computeSurveillance({ jur: 'CA_ON', stage: 'subsequent', prior: [LL('TA', 12)], current: [LL('HP', 12, 1, false, false, true)], malignant: false, special: false, bbps: b })
  ok(r.notSpecified === true && r.riskYears === 0, 'A surviving not-specified gap carries riskYears 0, not the parsed guideline year')
}

// --- Tail round: attribution and classification cleanups ---------------------
// Ontario: a proximal-HP-only prior is the gap the baseline reports, not a FIT reset.
eq('CA_ON', 'second', [LL('HP', 6, 1, false, false, true)], [], '10 years', 'ON: proximal HP prior (a gap) -> clean current gives 10y as a fresh baseline under a not-specified caveat')
// Ontario: >10-adenoma subsequent is a definite <3 years, not "at endoscopist discretion".
{
  const r = computeSurveillance({ jur: 'CA_ON', stage: 'second', prior: [LL('TA', 8, 11)], current: [], malignant: false, special: false, bbps: b })
  ok(r.interval === 'Under 3 years' && !r.discretion, 'ON: >10 adenomas subsequent is definite <3y, no discretion qualifier')
}
// Alberta: an HP >=10mm prior is a gap (no ACRCSP subsequent rule), not a screening reset.
eq('CA_AB', 'second', [LL('HP', 12, 1, false, false, true)], [], '10 years', 'AB: >=10mm HP prior (a gap) -> clean current gives 10y as a fresh baseline under a not-specified caveat')

// --- Fourth audit round: bare-discretion floor + Alberta >10-adenoma category --
// A consequential current finding is not masked by a serrated baseline's bare discretion.
eq('CA_ON', 'second', [LL('SSL', 5)], [LL('TA', 5, 11)], '≤1 year', 'ON: serrated prior + >10 adenomas current -> ≤1y clearing, not bare discretion')
// Alberta >10 adenomas is its own 1-year category, not the 3y->5y high-risk pathway.
{
  const r = computeSurveillance({ jur: 'CA_AB', stage: 'second', prior: [LL('TA', 6, 11)], current: [], malignant: false, special: false, bbps: b })
  ok(r.interval !== '5 years', 'AB: >10-adenoma prior is not folded into the high-risk 3y->5y pathway')
}
// A discretion that names a pathway (return to FIT) is not overridden by the floor.
{
  const r = computeSurveillance({ jur: 'CA_AB', stage: 'subsequent', prior: [], current: [], malignant: false, special: false, bbps: b })
  ok(/FIT/i.test(r.interval), 'AB: return-to-FIT discretion keeps its pathway, not floored to a colonoscopy interval')
}

console.log(`\n${pass} passed, ${fail} failed`)
if (fail > 0) process.exit(1)
console.log('All subsequent-surveillance intervals match the verified derivation.')
