'use client'

import { useMemo, useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { dict } from '@/lib/dictionaries/pages/clinics-roi'

// Self-contained translation lookup for the /clinics ROI calculator. The shared
// i18n provider supplies the active locale; roi.* keys live in
// lib/dictionaries/pages/clinics-roi.ts and are resolved here with an English
// fallback, mirroring the provider's own fallback behaviour without editing
// lib/i18n.tsx. Dynamic numbers (USD figures, percentages) are computed in this
// component and substituted into placeholder TOKENS at render time, so only the
// surrounding words are translated.
function useRoiT() {
  const { locale } = useI18n()
  return (key: string): string => {
    const loc = dict[locale as string]
    return (loc && loc[key]) || dict.en[key] || key
  }
}

// ---------------------------------------------------------------------------
// Aescia for Clinics — interactive ROI calculator.
// Honest ranges (conservative / expected / potential), every assumption
// visible inline, no manufactured urgency. Each effect size traces to the
// prep-coaching and SMS-reminder literature cited on /clinics (Mehta 2021,
// Allen 2023, Lebwohl 2011).
//
// Two slot-recovery levers act on LATE cancellations (about a day's notice),
// which are the fillable pool: PREVENTION reduces them, and prep-aware BACKFILL
// fills the ones that remain (a prep-ready patient starts prep tonight and takes
// tomorrow's slot, last on the list). No-shows get prevention only (no notice).
// Same-day prep failures are excluded: they cannot be refilled in time.
// Prevention's cancellation credit is NETTED by the site's current backfill rate
// so prevention and backfill do not double-count the same slot. Staff time is a
// separate, conditional line (real cash only if freed nurse time is redeployed).
// All figures are contingent on a pilot validating the effect at the site.
// ---------------------------------------------------------------------------

// Effect-size assumptions, made conservative on the low end. These are the
// numbers a model crawling the page should be able to see, so we render them
// as text below the calculator as well.
const ASSUMPTIONS = {
  // Relative reduction in LATE cancellations (about a day's notice) from prep coaching,
  // logistics confirmation and reminders.
  cancelReduction: { conservative: 0.2, expected: 0.35, better: 0.5 },
  noShowReduction: { conservative: 0.15, expected: 0.25, better: 0.4 },
  // Aescia-achieved backfill rate on LATE cancellations (SOC baseline ~40%). The lever
  // credits only the INCREMENTAL lift over the site's current rate. Pilot-to-prove.
  backfillRate: { conservative: 0.55, expected: 0.65, better: 0.75 },
  aesciaPerScopeUsd: 8, // US institutional rate post-conversion; see /clinics pricing block.
  nurseRateUsdPerHour: 45, // loaded blended LPN/RN
  nurseAutomatablePct: 0.6, // routine share of prep-call time the companion offloads

  // Full-episode per-scope revenue pools beyond the facility fee. Expected (population-weighted) US
  // COMMERCIAL values, sourced and adversarially checked. They ride on the SAME recovered slots but
  // accrue to OTHER parties, so they sit in the full-episode breakdown, never in the ROI multiple.
  anesthesiaPerScopeUsd: 240, // MAC-weighted: ~$410 commercial allowed per monitored-anesthesia case x ~58%
  // anesthesia-professional utilization (Predmore, Clin Gastroenterol Hepatol 2019; USC Schaeffer/AJMC 2021).
  // Accrues to the anesthesia group. Band $160–$340.
  pathologyPerScopeUsd: 60, // biopsy-weighted: CPT 88305 ~$82/specimen x ~1.7 specimens x ~45% biopsy rate.
  // 88305 pays ~$74 Medicare 2025 / ~$90–240 commercial; GIQuIC ADR ~40% (PayerPrice 2026). Softest figure
  // here (low confidence); accrues to the pathology lab.

  // Upstream prep-quality lever: prep coaching reduces inadequate prep, avoiding repeat/aborted scopes that
  // consume a future slot. Shown as an ADDITIVE pool, separate from the cancellation/no-show headline.
  inadequatePrepReduction: { conservative: 0.25, expected: 0.4, better: 0.5 }, // relative reduction in inadequate
  // prep from coaching/navigation/SMS (Guo 2016 GIE; Tian 2021 JMIR; Faveri 2025 J Surg Res).
  prepRepeatFraction: 0.3, // share of inadequate preps that consume a repeat/aborted slot. GIQuIC 31.9%
  // recommended-within-1yr (Calderwood 2022 GIE) x VA 59.2% completed (Wongjarupong 2024 Fed Pract) = 0.19 floor;
  // 0.30 default also captures aborts and later/sooner-than-recommended repeats.

  // Downstream surveillance recapture: lost-to-follow-up patients a recall system can bring back if capacity allows.
  surveillanceShareOfVolume: 0.25, // surveillance as a share of total colonoscopy volume (US single-center series)
  surveillanceOverdueFraction: 0.48, // surveillance-eligible patients overdue / never returned (US Medicare 5yr
  // non-return; Schoen/Pinsky 2014). High-risk-adenoma and large-polyp cohorts cross-check ~50–57%.
  surveillanceRecaptureFraction: 0.25, // realistic steady-state share of the overdue backlog a recall program recovers
}

type Defaults = {
  annualScopes: number
  lateCancelRatePct: number
  noShowRatePct: number
  facilityFeeUsd: number
  endoscopistFeeUsd: number
  currentBackfillPct: number
  nurseMinutesPerPatient: number
  inadequatePrepRatePct: number
}

const DEFAULTS: Defaults = {
  annualScopes: 5000, // a little above the ~4,500 average US GI ASC; multi-endoscopist site
  lateCancelRatePct: 3, // late cancellations (~24h notice), the fillable pool. With no-show below, the
  // combined late-cancel + no-show default is 8%, matching the ASGE GI Operations Benchmarking combined
  // no-show/cancellation metric (~5.6–8.45%; the survey reports the two as one field). Late-cancel typical 3–8%.
  noShowRatePct: 5, // paired with lateCancelRatePct so the combined rate = 8% (ASGE combined benchmark)
  facilityFeeUsd: 1011, // Allen 2023 midpoint; recovered revenue (gross facility fee), not margin
  endoscopistFeeUsd: 400, // reasonable commercial professional fee per colonoscopy. Medicare pays ~$220–300
  // (CPT 45378 ~$218 / 45385 ~$296 at the 2026 $33.40 conversion factor); commercial runs ~$300–500. $400
  // against the commercial facility default keeps the facility:professional split near 2.5:1 (normal commercial).
  currentBackfillPct: 25, // share of late cancellations the site refills today. Industry waitlist
  // benchmarks put manual/standard fill at ~25–30% (automated systems claim ~70%); 25% is the
  // conservative low end. Short-notice slots are hard to fill without a prep-ready pool, the gap Aescia closes.
  nurseMinutesPerPatient: 20, // nurse time per patient on prep calls
  inadequatePrepRatePct: 15, // inadequate/suboptimal bowel prep prevalence; US real-world 10–25%, USMSTF 2025
  // benchmark is >=90% adequate (i.e. <=10% inadequate). 15% is a defensible real-world operating midpoint.
}

function usd(n: number) {
  if (!Number.isFinite(n)) return '$0'
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 10_000) return `$${Math.round(n / 1000)}K`
  if (n >= 1_000) return `$${(n / 1000).toFixed(1)}K`
  return `$${Math.round(n).toLocaleString('en-US')}`
}

// One-decimal $K (with $M rollover) for the loss-box total and facility line, so
// every figure in the breakdown shares the same precision and the lines add up to
// the headline total.
function usdK1(n: number) {
  if (!Number.isFinite(n)) return '$0'
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  return `$${(n / 1000).toFixed(1)}K`
}

function fmtPct(p: number) {
  return `${(p * 100).toFixed(0)}%`
}

export function ClinicsRoi() {
  const t = useRoiT()
  const [annualScopes, setAnnualScopes] = useState(DEFAULTS.annualScopes)
  const [lateCancelRatePct, setLateCancelRatePct] = useState(DEFAULTS.lateCancelRatePct)
  const [noShowRatePct, setNoShowRatePct] = useState(DEFAULTS.noShowRatePct)
  const [facilityFeeUsd, setFacilityFeeUsd] = useState(DEFAULTS.facilityFeeUsd)
  const [endoscopistFeeUsd, setEndoscopistFeeUsd] = useState(DEFAULTS.endoscopistFeeUsd)
  const [currentBackfillPct, setCurrentBackfillPct] = useState(DEFAULTS.currentBackfillPct)
  const [nurseMinutesPerPatient, setNurseMinutesPerPatient] = useState(DEFAULTS.nurseMinutesPerPatient)
  const [inadequatePrepRatePct, setInadequatePrepRatePct] = useState(DEFAULTS.inadequatePrepRatePct)

  const results = useMemo(() => {
    const lateCancels = annualScopes * (lateCancelRatePct / 100)
    const noShows = annualScopes * (noShowRatePct / 100)
    const fee = facilityFeeUsd // recovered revenue per slot (gross facility fee, not margin)
    const socFill = Math.min(Math.max(currentBackfillPct / 100, 0), 1)
    const aesciaCost = annualScopes * ASSUMPTIONS.aesciaPerScopeUsd

    // Staff time: input-side, band-independent. SOFT — real cash only if the site redeploys
    // the freed nurse time. Held OUT of the headline ROI and shown as a separate line.
    const staffSaved =
      annualScopes *
      (nurseMinutesPerPatient / 60) *
      ASSUMPTIONS.nurseRateUsdPerHour *
      ASSUMPTIONS.nurseAutomatablePct

    // Inadequate-prep volume, drives the upstream prep recovery folded into each band below.
    const inadequatePreps = annualScopes * (inadequatePrepRatePct / 100)

    const rows = (['conservative', 'expected', 'better'] as const).map((band) => {
      // L1 Prevention. The late-cancellation side is NETTED by the site's current backfill
      // rate: a late cancel the site would have refilled anyway bills the fee regardless, so
      // preventing it adds no net slot — only the (1 - socFill) share was truly going empty.
      // The no-show side gets full credit (a no-show is not backfillable).
      const preventCancels = lateCancels * ASSUMPTIONS.cancelReduction[band] * (1 - socFill) * fee
      const preventNoShows = noShows * ASSUMPTIONS.noShowReduction[band] * fee
      const prevention = preventCancels + preventNoShows

      // L2 Prep-aware backfill. Incremental fill over the site's current rate, on the late
      // cancellations that REMAIN after prevention. Late cancels only (about a day's notice
      // is enough for a prep-ready patient to start prep tonight and take tomorrow's slot;
      // a no-show gives no notice).
      const remainingCancels = lateCancels * (1 - ASSUMPTIONS.cancelReduction[band])
      const backfillLift = Math.max(0, ASSUMPTIONS.backfillRate[band] - socFill)
      const backfill = remainingCancels * backfillLift * fee

      // L3 Upstream prep recovery, folded into the same recovered-slot pool. Reducing inadequate prep
      // avoids repeat/aborted procedures; each one frees a slot worth the same recovered facility revenue.
      // Disjoint from L1/L2: cancellations and no-shows are procedures that never happen, while these are
      // procedures that proceed on inadequate prep and must be repeated, so there is no double-count.
      const prepRecovery = inadequatePreps * ASSUMPTIONS.inadequatePrepReduction[band] * ASSUMPTIONS.prepRepeatFraction * fee

      const slotValue = prevention + backfill + prepRecovery // headline: logistics + prep recovery
      const allInValue = slotValue + staffSaved // with conditional staff time
      return {
        band,
        prevention,
        backfill,
        prepRecovery,
        slotValue,
        allInValue,
        aesciaCost,
        net: slotValue - aesciaCost,
        ratio: aesciaCost > 0 ? slotValue / aesciaCost : 0,
        ratioAllIn: aesciaCost > 0 ? allInValue / aesciaCost : 0,
      }
    })

    const monthlyValueConservative = rows[0].allInValue / 12 // staff time now folded into the figure

    // The proceduralist's parallel loss: the SAME recoverable slots (conservative, slot recovery
    // only) valued at the endoscopist professional fee instead of the facility fee. A recovered
    // scope is one the endoscopist gets to bill; a lost one is not. Nurse-time savings stay inside
    // the facility figure (a facility gain), so they are not in this professional line.
    // NOTE: a third pool, anesthesia (monitored anesthesia care), also rides on each slot but
    // accrues to the anesthesia group — not the facility or the endoscopist — so it is deliberately
    // excluded from the buyer's number here.
    const recoverableSlotsConservative = fee > 0 ? rows[0].slotValue / fee : 0
    const monthlyEndoscopistLossConservative = (recoverableSlotsConservative * endoscopistFeeUsd) / 12

    // Full-episode pools on the SAME conservative recoverable slots. Facility and professional are the buyer's;
    // anesthesia and pathology accrue to the anesthesia group and the lab, shown for the full picture only.
    const monthlyAnesthesiaLossConservative = (recoverableSlotsConservative * ASSUMPTIONS.anesthesiaPerScopeUsd) / 12
    const monthlyPathologyLossConservative = (recoverableSlotsConservative * ASSUMPTIONS.pathologyPerScopeUsd) / 12

    // Prep recovery is folded into each band's slotValue above; these expose the prep PORTION for the
    // breakdown line (avoided repeat/aborted procedures and their value), conservative–potential.
    const prepAvoidedConservative = inadequatePreps * ASSUMPTIONS.inadequatePrepReduction.conservative * ASSUMPTIONS.prepRepeatFraction
    const prepAvoidedBetter = inadequatePreps * ASSUMPTIONS.inadequatePrepReduction.better * ASSUMPTIONS.prepRepeatFraction
    const prepValueConservative = prepAvoidedConservative * fee
    const prepValueBetter = prepAvoidedBetter * fee

    // Downstream surveillance recapture: working down the lost-to-follow-up backlog, contingent on schedule capacity.
    const surveillanceScopesPerYear =
      annualScopes * ASSUMPTIONS.surveillanceShareOfVolume * ASSUMPTIONS.surveillanceOverdueFraction * ASSUMPTIONS.surveillanceRecaptureFraction
    const surveillanceValuePerYear = surveillanceScopesPerYear * fee

    return {
      rows,
      aesciaCost,
      staffSaved,
      monthlyValueConservative,
      monthlyEndoscopistLossConservative,
      monthlyAnesthesiaLossConservative,
      monthlyPathologyLossConservative,
      monthlyTotalConservative:
        monthlyValueConservative +
        monthlyEndoscopistLossConservative +
        monthlyAnesthesiaLossConservative +
        monthlyPathologyLossConservative,
      prepAvoidedConservative,
      prepAvoidedBetter,
      prepValueConservative,
      prepValueBetter,
      surveillanceScopesPerYear,
      surveillanceValuePerYear,
      lateCancels,
      noShows,
    }
  }, [annualScopes, lateCancelRatePct, noShowRatePct, facilityFeeUsd, endoscopistFeeUsd, currentBackfillPct, nurseMinutesPerPatient, inadequatePrepRatePct])

  return (
    <div className="bg-background border border-border overflow-hidden">
      {/* Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
        <div className="bg-background p-7 lg:p-10">
          <h3
            className="font-display text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] mb-2"
            style={{ fontVariationSettings: "'opsz' 80" }}
          >
            {t('roi.inputs.heading')}
          </h3>
          <p className="text-[13px] text-foreground/70 mb-7 leading-[1.6]">
            {t('roi.inputs.intro')}
          </p>

          <div className="space-y-6">
            <NumberField
              label={t('roi.field.scopes.label')}
              value={annualScopes}
              setValue={setAnnualScopes}
              min={500}
              max={50000}
              step={100}
              suffix="scopes"
            />
            <NumberField
              label={t('roi.field.lateCancel.label')}
              hint={t('roi.field.lateCancel.hint')}
              value={lateCancelRatePct}
              setValue={setLateCancelRatePct}
              min={0}
              max={20}
              step={0.5}
              suffix="%"
            />
            <NumberField
              label={t('roi.field.noShow.label')}
              hint={t('roi.field.noShow.hint')}
              value={noShowRatePct}
              setValue={setNoShowRatePct}
              min={0}
              max={40}
              step={0.5}
              suffix="%"
            />
            <NumberField
              label={t('roi.field.facilityFee.label')}
              hint={t('roi.field.facilityFee.hint')}
              value={facilityFeeUsd}
              setValue={setFacilityFeeUsd}
              min={200}
              max={5000}
              step={1}
              prefix="$"
            />
            <NumberField
              label={t('roi.field.endoscopistFee.label')}
              hint={t('roi.field.endoscopistFee.hint')}
              value={endoscopistFeeUsd}
              setValue={setEndoscopistFeeUsd}
              min={0}
              max={2000}
              step={1}
              prefix="$"
            />
            <NumberField
              label={t('roi.field.backfill.label')}
              hint={t('roi.field.backfill.hint')}
              value={currentBackfillPct}
              setValue={setCurrentBackfillPct}
              min={0}
              max={100}
              step={1}
              suffix="%"
            />
            <NumberField
              label={t('roi.field.nurseMinutes.label')}
              hint={t('roi.field.nurseMinutes.hint')}
              value={nurseMinutesPerPatient}
              setValue={setNurseMinutesPerPatient}
              min={0}
              max={60}
              step={1}
              suffix="min"
            />
            <NumberField
              label={t('roi.field.inadequatePrep.label')}
              hint={t('roi.field.inadequatePrep.hint')}
              value={inadequatePrepRatePct}
              setValue={setInadequatePrepRatePct}
              min={0}
              max={50}
              step={0.5}
              suffix="%"
            />
          </div>
        </div>

        <div className="bg-secondary p-7 lg:p-10">
          <h3
            className="font-display text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] mb-2"
            style={{ fontVariationSettings: "'opsz' 80" }}
          >
            {t('roi.outcomes.heading')}
          </h3>
          <p className="text-[13px] text-foreground/70 mb-7 leading-[1.6]">
            {t('roi.outcomes.intro')}
          </p>

          <div className="divide-y divide-border border-y border-border bg-background">
            {results.rows.map((r) => (
              <div key={r.band} className="grid grid-cols-[104px_1fr_auto] gap-3 px-4 sm:px-5 py-6 items-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
                  {r.band === 'conservative' ? t('roi.band.conservative') : r.band === 'expected' ? t('roi.band.expected') : t('roi.band.potential')}
                </div>
                <div
                  className="font-display text-[22px] lg:text-[27px] leading-[1.1] tracking-[-0.018em]"
                  style={{ fontVariationSettings: "'opsz' 96" }}
                >
                  {usd(r.allInValue)}
                  <span className="text-foreground/45 text-[12px] font-mono ml-1.5">{t('roi.perYear')}</span>
                </div>
                <div className="text-right">
                  <div
                    className="font-display text-[34px] lg:text-[46px] leading-none tracking-[-0.025em] text-brass"
                    style={{ fontVariationSettings: "'opsz' 144" }}
                  >
                    {r.ratioAllIn.toFixed(1)}×
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-foreground/55 mt-1.5">{t('roi.roiLabel')}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Loss framing replaces the cost box: the value slipping away each month without Aescia. */}
          <div className="mt-7 bg-background border border-border p-6 lg:p-7">
            <div
              className="font-display text-[26px] lg:text-[34px] leading-[1.12] tracking-[-0.02em]"
              style={{ fontVariationSettings: "'opsz' 144" }}
            >
              {(() => {
                const [pre, post] = t('roi.loss.headline').split('{value}')
                return (
                  <>
                    {pre}
                    <span className="text-brass block mt-4 text-[44px] lg:text-[60px] leading-[1] tracking-[-0.03em]">~{usdK1(results.monthlyTotalConservative)}</span>
                    {post}
                  </>
                )
              })()}
            </div>
            <div className="mt-5 pt-4 border-t border-border space-y-1.5">
              {[
                { value: usdK1(results.monthlyValueConservative), label: t('roi.loss.facility') },
                { value: usd(results.monthlyEndoscopistLossConservative), label: t('roi.loss.endoscopist') },
                { value: usd(results.monthlyAnesthesiaLossConservative), label: t('roi.loss.anesthesia') },
                { value: usd(results.monthlyPathologyLossConservative), label: t('roi.loss.pathology') },
              ].map((row) => (
                <div
                  key={row.label}
                  className="font-display text-[17px] lg:text-[20px] leading-[1.2] tracking-[-0.02em]"
                  style={{ fontVariationSettings: "'opsz' 96" }}
                >
                  <span className="text-brass">~{row.value}</span>{' '}
                  <span className="text-foreground/75">{row.label}</span>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-foreground/55 mt-4 leading-[1.6]">
              {t('roi.loss.caveat')}
            </div>
          </div>
        </div>
      </div>

      {/* Beyond the cancellation/no-show headline: the upstream prep-quality pool and the downstream
          surveillance recapture. Both are additive to the figures above and shown separately so the
          headline ROI stays the conservative cancellation/no-show floor. */}
      <div className="border-t border-border grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        <div className="bg-background p-7 lg:p-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55 mb-3">{t('roi.prep.heading')}</div>
          <div className="font-display text-[17px] lg:text-[21px] leading-[1.35] tracking-[-0.012em]" style={{ fontVariationSettings: "'opsz' 72" }}>
            {t('roi.prep.body')
              .replace('{nLow}', String(Math.round(results.prepAvoidedConservative)))
              .replace('{nHigh}', String(Math.round(results.prepAvoidedBetter)))
              .replace('{valLow}', usd(results.prepValueConservative))
              .replace('{valHigh}', usd(results.prepValueBetter))}
          </div>
        </div>
        <div className="bg-background p-7 lg:p-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55 mb-3">{t('roi.surveillance.heading')}</div>
          <div className="font-display text-[17px] lg:text-[21px] leading-[1.35] tracking-[-0.012em]" style={{ fontVariationSettings: "'opsz' 72" }}>
            {t('roi.surveillance.note')
              .replace('{scopes}', String(Math.round(results.surveillanceScopesPerYear)))
              .replace('{value}', usd(results.surveillanceValuePerYear))}
          </div>
        </div>
      </div>

      {/* Assumptions, crawlable */}
      <div className="border-t border-border p-7 lg:p-10 bg-background">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/60 mb-4">{t('roi.assumptions.heading')}</h4>
        <ul className="grid md:grid-cols-2 gap-x-10 gap-y-2 text-[13px] text-foreground/80">
          <li>{t('roi.assumptions.cancelReduction')
            .replace('{c}', fmtPct(ASSUMPTIONS.cancelReduction.conservative))
            .replace('{e}', fmtPct(ASSUMPTIONS.cancelReduction.expected))
            .replace('{p}', fmtPct(ASSUMPTIONS.cancelReduction.better))}</li>
          <li>{t('roi.assumptions.noShowReduction')
            .replace('{c}', fmtPct(ASSUMPTIONS.noShowReduction.conservative))
            .replace('{e}', fmtPct(ASSUMPTIONS.noShowReduction.expected))
            .replace('{p}', fmtPct(ASSUMPTIONS.noShowReduction.better))}</li>
          <li>{t('roi.assumptions.backfillRate')
            .replace('{c}', fmtPct(ASSUMPTIONS.backfillRate.conservative))
            .replace('{e}', fmtPct(ASSUMPTIONS.backfillRate.expected))
            .replace('{p}', fmtPct(ASSUMPTIONS.backfillRate.better))}</li>
          <li>{t('roi.assumptions.netting')}</li>
          <li>{t('roi.assumptions.facilityValue')}</li>
          <li>{t('roi.assumptions.endoscopistFee')}</li>
          <li>{t('roi.assumptions.staffTime')
            .replace('{pct}', String(Math.round(ASSUMPTIONS.nurseAutomatablePct * 100)))
            .replace('{rate}', String(ASSUMPTIONS.nurseRateUsdPerHour))}</li>
          <li>{t('roi.assumptions.price')
            .replace('{price}', String(ASSUMPTIONS.aesciaPerScopeUsd))}</li>
          <li>{t('roi.assumptions.commitment')}</li>
          <li>{t('roi.assumptions.backfillScope')}</li>
          <li>{t('roi.assumptions.beran')}</li>
          <li>{t('roi.assumptions.facilityFee')}</li>
          <li>{t('roi.assumptions.anesthesia').replace('{anes}', String(ASSUMPTIONS.anesthesiaPerScopeUsd))}</li>
          <li>{t('roi.assumptions.pathology').replace('{path}', String(ASSUMPTIONS.pathologyPerScopeUsd))}</li>
          <li>{t('roi.assumptions.prep')
            .replace('{prep}', String(inadequatePrepRatePct))
            .replace('{c}', fmtPct(ASSUMPTIONS.inadequatePrepReduction.conservative))
            .replace('{e}', fmtPct(ASSUMPTIONS.inadequatePrepReduction.expected))
            .replace('{p}', fmtPct(ASSUMPTIONS.inadequatePrepReduction.better))
            .replace('{repeat}', String(Math.round(ASSUMPTIONS.prepRepeatFraction * 100)))}</li>
          <li>{t('roi.assumptions.surveillance')}</li>
        </ul>
      </div>
    </div>
  )
}

function NumberField({
  label,
  hint,
  value,
  setValue,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  label: string
  hint?: string
  value: number
  setValue: (n: number) => void
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
}) {
  return (
    <label className="block">
      <span className="block text-[13px] text-foreground/85 font-medium mb-1">{label}</span>
      {hint && <span className="block text-[11.5px] text-foreground/60 mb-2 leading-[1.5]">{hint}</span>}
      <div className="flex items-stretch border border-border bg-background focus-within:border-foreground/40 transition-colors">
        {prefix && (
          <span className="px-3 py-2.5 font-mono text-[12px] text-foreground/60 border-r border-border bg-secondary/50 flex items-center">
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (Number.isFinite(v)) setValue(v)
          }}
          className="w-full px-3 py-2.5 bg-transparent font-mono text-[14px] text-foreground outline-none"
        />
        {suffix && (
          <span className="px-3 py-2.5 font-mono text-[11px] text-foreground/60 border-l border-border bg-secondary/50 flex items-center">
            {suffix}
          </span>
        )}
      </div>
    </label>
  )
}
