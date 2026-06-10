'use client'

import { useMemo, useState } from 'react'

// ---------------------------------------------------------------------------
// Aescia for Clinics — interactive ROI calculator.
// Honest ranges (conservative / expected / better-case), every assumption
// visible inline, no manufactured urgency. Each effect size traces to the
// literature cited on /clinics (Mehta 2021, Allen 2023, Lebwohl 2011). The
// same-day cancellation baseline is anchored to Hopkins 2020 (Gastrointest
// Endosc 92(2):382-386) — ~3% same-day PIBP triage cancellation, with ~1/3
// of cancelled patients not returning within 6 months; typical band 3-8%.
// Beran 2024 (Am J Gastroenterol, n=358,257, 154 studies) is kept separate:
// it shows inadequate prep is a common problem with addressable risk
// factors — NOT the cancellation rate. The footnotes restate that the
// figures are contingent on a pilot validating the effect for the customer's
// own site.
// ---------------------------------------------------------------------------

// Effect-size assumptions, made conservative on the low end. These are the
// numbers a model crawling the page should be able to see, so we render them
// as text below the calculator as well.
const ASSUMPTIONS = {
  prepReduction: { conservative: 0.2, expected: 0.35, better: 0.5 },
  noShowReduction: { conservative: 0.15, expected: 0.25, better: 0.4 },
  aesciaPerScopeUsd: 8, // US institutional rate post-conversion; see /clinics pricing block.
}

type Defaults = {
  annualScopes: number
  pibpCancelRatePct: number
  noShowRatePct: number
  facilityFeeUsd: number
}

const DEFAULTS: Defaults = {
  annualScopes: 2600, // average US GI ASC annual colonoscopy volume; larger sites scale up
  pibpCancelRatePct: 5, // same-day PIBP triage cancellation; Hopkins 2020 ~3%, typical band 3–8%
  noShowRatePct: 8,
  facilityFeeUsd: 1011, // Allen 2023 midpoint
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
  const [pibpCancelRatePct, setPibpCancelRatePct] = useState(DEFAULTS.pibpCancelRatePct)
  const [noShowRatePct, setNoShowRatePct] = useState(DEFAULTS.noShowRatePct)
  const [facilityFeeUsd, setFacilityFeeUsd] = useState(DEFAULTS.facilityFeeUsd)

  const results = useMemo(() => {
    const pibpCancels = annualScopes * (pibpCancelRatePct / 100)
    const noShows = annualScopes * (noShowRatePct / 100)

    // Each cancelled/repeated slot loses one facility fee; same for no-shows
    // (the slot does not bill). This intentionally ignores professional fees
    // and downstream pathology — the conservative-case lower bound.
    const grossPerScopeLost = facilityFeeUsd

    const valueRecovered = (prepFactor: number, noShowFactor: number) =>
      pibpCancels * prepFactor * grossPerScopeLost + noShows * noShowFactor * grossPerScopeLost

    const aesciaCost = annualScopes * ASSUMPTIONS.aesciaPerScopeUsd

    const rows = (['conservative', 'expected', 'better'] as const).map((band) => {
      const value = valueRecovered(
        ASSUMPTIONS.prepReduction[band],
        ASSUMPTIONS.noShowReduction[band],
      )
      const net = value - aesciaCost
      return {
        band,
        value,
        aesciaCost,
        net,
        ratio: aesciaCost > 0 ? value / aesciaCost : 0,
      }
    })

    const monthlyValueConservative = rows[0].value / 12

    return { rows, aesciaCost, monthlyValueConservative, pibpCancels, noShows }
  }, [annualScopes, pibpCancelRatePct, noShowRatePct, facilityFeeUsd])

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
            Set the four inputs to your own ASC. Defaults are the average US GI ASC volume and the US literature midpoints, sourced below. Every figure to the right rescales in real time.
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
              label="Same-day cancellation rate for presumed inadequate prep (PIBP)"
              hint="Typical 3–8%. Hopkins 2020 (Gastrointest Endosc) reported ~3% same-day PIBP triage cancellation. Edit to your actual rate."
              value={pibpCancelRatePct}
              setValue={setPibpCancelRatePct}
              min={0}
              max={20}
              step={0.5}
              suffix="%"
            />
            <NumberField
              label="No-show rate (patient does not arrive)"
              hint="Common range: 5–15%. Separate from the PIBP triage cancellation above. Edit to your actual rate."
              value={noShowRatePct}
              setValue={setNoShowRatePct}
              min={0}
              max={40}
              step={0.5}
              suffix="%"
            />
            <NumberField
              label="Facility fee per slot (USD)"
              hint="Allen 2023 ASC range: $989–$1,034. Default $1,011."
              value={facilityFeeUsd}
              setValue={setFacilityFeeUsd}
              min={200}
              max={5000}
              step={1}
              prefix="$"
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
              <div key={r.band} className="grid grid-cols-[96px_1fr_auto] gap-3 px-4 sm:px-5 py-5 items-baseline">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
                  {r.band === 'conservative' ? 'Conservative' : r.band === 'expected' ? 'Expected' : 'Better-case'}
                </div>
                <div
                  className="font-display text-[24px] lg:text-[30px] leading-[1.15] tracking-[-0.018em]"
                  style={{ fontVariationSettings: "'opsz' 96" }}
                >
                  {usd(r.value)}
                </div>
                <div className="font-mono text-[11px] text-foreground/65 text-right tracking-tight">
                  {r.ratio.toFixed(1)}× of Aescia cost
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            <div className="bg-background p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60 mb-2">Aescia cost (annual)</div>
              <div className="font-display text-[22px] tracking-[-0.015em]">{usd(results.aesciaCost)}</div>
              <div className="text-[11px] text-foreground/60 mt-1">at $8/scope, US institutional rate</div>
            </div>
            <div className="bg-background p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60 mb-2">Value at stake (per month, conservative)</div>
              <div className="font-display text-[22px] tracking-[-0.015em]">{usd(results.monthlyValueConservative)}</div>
              <div className="text-[11px] text-foreground/60 mt-1">contingent on a pilot validating the effect at your site</div>
            </div>
          </div>

          <p className="text-[12px] text-foreground/65 leading-[1.65] mt-6 border-l-2 border-brass/60 pl-4">
            The conservative band assumes a 20% reduction in same-day PIBP cancellations and a 15% reduction in no-shows. Expected and better-case scale linearly to the upper effect sizes published in the prep-coaching and SMS-reminder literature. Aescia commits to the conservative band in writing during design-partner pilots; expected and better are upside, not promises.
          </p>
        </div>
      </div>

      {/* Assumptions, crawlable */}
      <div className="border-t border-border p-7 lg:p-10 bg-background">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/60 mb-4">Assumptions, made visible</h4>
        <ul className="grid md:grid-cols-2 gap-x-10 gap-y-2 text-[13px] text-foreground/80">
          <li>Same-day PIBP cancellation reduction: <strong>{fmtPct(ASSUMPTIONS.prepReduction.conservative)} / {fmtPct(ASSUMPTIONS.prepReduction.expected)} / {fmtPct(ASSUMPTIONS.prepReduction.better)}</strong> (conservative / expected / better).</li>
          <li>No-show or same-day cancellation reduction: <strong>{fmtPct(ASSUMPTIONS.noShowReduction.conservative)} / {fmtPct(ASSUMPTIONS.noShowReduction.expected)} / {fmtPct(ASSUMPTIONS.noShowReduction.better)}</strong>.</li>
          <li>Each cancelled or repeated slot loses one facility fee. Professional fees and pathology downstream not counted.</li>
          <li>Aescia price: <strong>${ASSUMPTIONS.aesciaPerScopeUsd}/scope</strong> US institutional rate. Volume tiers and design-partner discounts not reflected here.</li>
          <li>Same-day PIBP cancellation baseline: <strong>~3% (typical 3–8%)</strong>, Hopkins 2020 (Gastrointest Endosc 92(2):382-386), with ~1/3 of cancelled patients not returning within 6 months; no-shows from a field-typical band.</li>
          <li>Beran 2024 (Am J Gastroenterol, n=358,257, 154 studies) anchors that inadequate prep is a common, upstream problem with addressable risk factors — not the same-day cancellation rate the model acts on.</li>
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
