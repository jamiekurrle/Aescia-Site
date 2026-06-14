'use client'

import { useMemo, useState } from 'react'

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
}

type Defaults = {
  annualScopes: number
  lateCancelRatePct: number
  noShowRatePct: number
  facilityFeeUsd: number
  endoscopistFeeUsd: number
  currentBackfillPct: number
  nurseMinutesPerPatient: number
}

const DEFAULTS: Defaults = {
  annualScopes: 5000, // a little above the ~4,500 average US GI ASC; multi-endoscopist site
  lateCancelRatePct: 5, // late cancellations (~24h notice), the fillable pool; typical 3–8%
  noShowRatePct: 8,
  facilityFeeUsd: 1011, // Allen 2023 midpoint; recovered revenue (gross facility fee), not margin
  endoscopistFeeUsd: 300, // commercial-basis physician fee per colonoscopy, to match the commercial facility
  // default above: Medicare ASC professional fee ~$215 marked up at a commercial physician rate (MedPAC/CBO
  // put commercial physician pay ~1.3–1.5× Medicare; ~1.4× → ~$300). Drives the endoscopist loss line only.
  currentBackfillPct: 25, // share of late cancellations the site refills today; Weiss operator
  // estimate ~25%. Short-notice slots are hard to fill without a prep-ready pool, which is the
  // gap Aescia closes. No public benchmark found; 25% is the concrete operator anchor.
  nurseMinutesPerPatient: 20, // nurse time per patient on prep calls
}

function usd(n: number) {
  if (!Number.isFinite(n)) return '$0'
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 10_000) return `$${Math.round(n / 1000)}K`
  if (n >= 1_000) return `$${(n / 1000).toFixed(1)}K`
  return `$${Math.round(n).toLocaleString('en-US')}`
}

function fmtPct(p: number) {
  return `${(p * 100).toFixed(0)}%`
}

export function ClinicsRoi() {
  const [annualScopes, setAnnualScopes] = useState(DEFAULTS.annualScopes)
  const [lateCancelRatePct, setLateCancelRatePct] = useState(DEFAULTS.lateCancelRatePct)
  const [noShowRatePct, setNoShowRatePct] = useState(DEFAULTS.noShowRatePct)
  const [facilityFeeUsd, setFacilityFeeUsd] = useState(DEFAULTS.facilityFeeUsd)
  const [endoscopistFeeUsd, setEndoscopistFeeUsd] = useState(DEFAULTS.endoscopistFeeUsd)
  const [currentBackfillPct, setCurrentBackfillPct] = useState(DEFAULTS.currentBackfillPct)
  const [nurseMinutesPerPatient, setNurseMinutesPerPatient] = useState(DEFAULTS.nurseMinutesPerPatient)

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

      const slotValue = prevention + backfill // headline: slot recovery only
      const allInValue = slotValue + staffSaved // with conditional staff time
      return {
        band,
        prevention,
        backfill,
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
    // only — staff time excluded) valued at the endoscopist professional fee instead of the
    // facility fee. A recovered scope is one the endoscopist gets to bill; a lost one is not.
    const recoverableSlotsConservative = fee > 0 ? rows[0].slotValue / fee : 0
    const monthlyEndoscopistLossConservative = (recoverableSlotsConservative * endoscopistFeeUsd) / 12

    return { rows, aesciaCost, staffSaved, monthlyValueConservative, monthlyEndoscopistLossConservative, lateCancels, noShows }
  }, [annualScopes, lateCancelRatePct, noShowRatePct, facilityFeeUsd, endoscopistFeeUsd, currentBackfillPct, nurseMinutesPerPatient])

  return (
    <div className="bg-background border border-border overflow-hidden">
      {/* Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
        <div className="bg-background p-7 lg:p-10">
          <h3
            className="font-display text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] mb-2"
            style={{ fontVariationSettings: "'opsz' 80" }}
          >
            Your numbers
          </h3>
          <p className="text-[13px] text-foreground/70 mb-7 leading-[1.6]">
            Set the inputs to your own ASC. Defaults are an average US GI ASC and the US literature midpoints, sourced below. Every figure to the right rescales in real time.
          </p>

          <div className="space-y-6">
            <NumberField
              label="Annual colonoscopy volume (scopes per year)"
              value={annualScopes}
              setValue={setAnnualScopes}
              min={500}
              max={50000}
              step={100}
              suffix="scopes"
            />
            <NumberField
              label="Late cancellation rate (about 24h notice)"
              hint="Cancellations that arrive late enough the slot would sit empty, but with about a day's notice, which is enough to backfill. Typical 3–8%. Same-day prep failures are not counted here because they cannot be refilled in time."
              value={lateCancelRatePct}
              setValue={setLateCancelRatePct}
              min={0}
              max={20}
              step={0.5}
              suffix="%"
            />
            <NumberField
              label="No-show rate (patient does not arrive)"
              hint="Common range: 5–15%. Separate from the late cancellation above, and not backfillable (no notice). Edit to your actual rate."
              value={noShowRatePct}
              setValue={setNoShowRatePct}
              min={0}
              max={40}
              step={0.5}
              suffix="%"
            />
            <NumberField
              label="Recovered revenue per slot (USD)"
              hint="What a recovered slot bills, not margin. Allen 2023 ASC range $989–$1,034; default $1,011. Set yours; Medicare-heavy panels collect less."
              value={facilityFeeUsd}
              setValue={setFacilityFeeUsd}
              min={200}
              max={5000}
              step={1}
              prefix="$"
            />
            <NumberField
              label="Endoscopist professional fee per scope (USD)"
              hint="The proceduralist's fee per scope, separate from the facility fee above. Default $300 is a commercial-basis physician fee (Medicare ASC professional fee ~$215 marked up to a commercial physician rate), matching the commercial facility default; Medicare-heavy lists collect closer to $215. Drives the endoscopist loss line only, not the ROI multiple."
              value={endoscopistFeeUsd}
              setValue={setEndoscopistFeeUsd}
              min={0}
              max={2000}
              step={1}
              prefix="$"
            />
            <NumberField
              label="Late cancellations you refill today"
              hint="Share of late cancellations your team refills now. Default 25%: short-notice slots are hard to fill without a prep-ready pool. Aescia credits only the lift above this."
              value={currentBackfillPct}
              setValue={setCurrentBackfillPct}
              min={0}
              max={100}
              step={1}
              suffix="%"
            />
            <NumberField
              label="Nurse time per patient on prep calls"
              hint="Minutes per patient your team spends on prep reminders and confirmations. Drives the staff-time line below; ~60% is automatable."
              value={nurseMinutesPerPatient}
              setValue={setNurseMinutesPerPatient}
              min={0}
              max={60}
              step={1}
              suffix="min"
            />
          </div>
        </div>

        <div className="bg-secondary p-7 lg:p-10">
          <h3
            className="font-display text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.02em] mb-2"
            style={{ fontVariationSettings: "'opsz' 80" }}
          >
            Range of outcomes
          </h3>
          <p className="text-[13px] text-foreground/70 mb-7 leading-[1.6]">
            Three bands tied to effect sizes from the literature. Aescia commits to no point estimate. Pilots are scoped to confirm where on the range your site lands.
          </p>

          <div className="divide-y divide-border border-y border-border bg-background">
            {results.rows.map((r) => (
              <div key={r.band} className="grid grid-cols-[104px_1fr_auto] gap-3 px-4 sm:px-5 py-6 items-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
                  {r.band === 'conservative' ? 'Conservative' : r.band === 'expected' ? 'Expected' : 'Potential'}
                </div>
                <div
                  className="font-display text-[22px] lg:text-[27px] leading-[1.1] tracking-[-0.018em]"
                  style={{ fontVariationSettings: "'opsz' 96" }}
                >
                  {usd(r.allInValue)}
                  <span className="text-foreground/45 text-[12px] font-mono ml-1.5">/yr</span>
                </div>
                <div className="text-right">
                  <div
                    className="font-display text-[34px] lg:text-[46px] leading-none tracking-[-0.025em] text-brass"
                    style={{ fontVariationSettings: "'opsz' 144" }}
                  >
                    {r.ratioAllIn.toFixed(1)}×
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-foreground/55 mt-1.5">ROI</div>
                </div>
              </div>
            ))}
          </div>

          {/* Loss framing replaces the cost box: the value slipping away each month without Aescia. */}
          <div className="mt-7 bg-background border border-border p-6 lg:p-7">
            <div className="font-display text-[18px] lg:text-[24px] tracking-[-0.02em] text-brass mb-2" style={{ fontVariationSettings: "'opsz' 120" }}>Every month without Aescia</div>
            <div
              className="font-display text-[26px] lg:text-[34px] leading-[1.1] tracking-[-0.02em]"
              style={{ fontVariationSettings: "'opsz' 120" }}
            >
              you are losing about {usd(results.monthlyValueConservative)}
            </div>
            <div
              className="font-display text-[18px] lg:text-[22px] leading-[1.2] tracking-[-0.02em] text-foreground/80 mt-2"
              style={{ fontVariationSettings: "'opsz' 96" }}
            >
              and your endoscopists are losing about {usd(results.monthlyEndoscopistLossConservative)} in professional fees
            </div>
            <div className="text-[11px] text-foreground/55 mt-2.5 leading-[1.6]">
              Conservative band, contingent on a pilot validating the effect at your site. Assumptions and sources are below.
            </div>
          </div>
        </div>
      </div>

      {/* Assumptions, crawlable */}
      <div className="border-t border-border p-7 lg:p-10 bg-background">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/60 mb-4">Assumptions, made visible</h4>
        <ul className="grid md:grid-cols-2 gap-x-10 gap-y-2 text-[13px] text-foreground/80">
          <li>Late cancellation reduction: <strong>{fmtPct(ASSUMPTIONS.cancelReduction.conservative)} / {fmtPct(ASSUMPTIONS.cancelReduction.expected)} / {fmtPct(ASSUMPTIONS.cancelReduction.better)}</strong> (conservative / expected / potential).</li>
          <li>No-show reduction: <strong>{fmtPct(ASSUMPTIONS.noShowReduction.conservative)} / {fmtPct(ASSUMPTIONS.noShowReduction.expected)} / {fmtPct(ASSUMPTIONS.noShowReduction.better)}</strong>.</li>
          <li>Prep-aware backfill rate on late cancellations: <strong>{fmtPct(ASSUMPTIONS.backfillRate.conservative)} / {fmtPct(ASSUMPTIONS.backfillRate.expected)} / {fmtPct(ASSUMPTIONS.backfillRate.better)}</strong>, against a current rate you set (default 25%). The model credits only the lift over your current rate, on late cancellations only. Pilot-to-prove against your own baseline.</li>
          <li>Prevention is netted by your current backfill: a late cancellation you would have refilled anyway is not counted as a recovered slot, so prevention and backfill do not double-count.</li>
          <li>A recovered slot is valued at the <strong>recovered revenue (gross facility fee) you set</strong>, not contribution margin. The endoscopist professional-fee loss is shown as a separate line and is <strong>not</strong> included in the facility figure or the ROI multiple; pathology and other downstream revenue are not counted.</li>
          <li>Endoscopist professional fee: the per-scope figure you set drives the separate endoscopist loss line, on the same recoverable slots. Default <strong>$300</strong> is a commercial-basis physician fee, chosen to match the commercial facility default: the Medicare ASC professional fee for a colonoscopy is ~$215, marked up at a commercial physician rate (MedPAC/CBO put commercial physician pay at ~1.3–1.5× Medicare). Medicare-heavy lists collect closer to $215; set this to your own payer mix.</li>
          <li>Staff time is <strong>included</strong> in the figures above: <strong>{Math.round(ASSUMPTIONS.nurseAutomatablePct * 100)}%</strong> of your nurse prep-call minutes (default 20 min/patient) at <strong>${ASSUMPTIONS.nurseRateUsdPerHour}/hr</strong> loaded. Treat it as the soft part of the range: it is real cash only if you redeploy the freed hours into more cases or a deferred hire.</li>
          <li>Aescia price: <strong>${ASSUMPTIONS.aesciaPerScopeUsd}/scope</strong>, US institutional rate, which is the spend the ROI multiple is measured against. Volume tiers and design-partner discounts not reflected here.</li>
          <li>Aescia commits to the <strong>conservative band</strong> in writing during design-partner pilots; the backfill lift is confirmed against your own baseline in the pilot.</li>
          <li>Backfill applies to late cancellations only (about a day's notice). Same-day prep failures and no-shows are not backfillable, so they count toward prevention, never backfill. No-show default 8% (typical 5–15%).</li>
          <li>Beran 2024 (Am J Gastroenterol, n=358,257, 154 studies) anchors that inadequate prep is a common, upstream problem with addressable risk factors. Cancellation/no-show effect sizes are from the prep-coaching and SMS-reminder literature.</li>
          <li>Facility fee: Allen 2023, CMS ASC CPT 45378–45385 (USD $989–$1,034).</li>
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
