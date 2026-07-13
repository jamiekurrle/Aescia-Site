'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  JURISDICTIONS,
  prepTotal,
  prepAdequate,
  type Findings,
  type Histology,
  type Jurisdiction,
} from './guidelines'
import { FAQ_ITEMS } from './faq'

const HISTOLOGY: [Histology, string][] = [
  ['AWAIT', 'Awaiting histology'],
  ['TA', 'Tubular adenoma'],
  ['TVA', 'Tubulovillous'],
  ['VA', 'Villous'],
  ['SSL', 'Sessile serrated'],
  ['TSA', 'Traditional serrated'],
  ['HP', 'Hyperplastic'],
  ['CANCER', 'Cancer (malignant)'],
  ['NONE', 'No polyps (normal)'],
]

// Plausible histology outcomes while a result is pending, with the approximate
// PER-POLYP share each represents. No single study cleanly partitions all six
// categories, so these are cited RANGES, not point estimates: the per-polyp
// denominator is anchored on Turner 2018 (550,811 polyps), layered with the
// adenoma-subtype split (StatPearls) and the serrated-subtype split (Crockett
// & Nagtegaal 2019). Shares shift with lesion size and with how often small
// hyperplastic polyps are resected. Ordered most-common-first.
const AWAIT_TYPES: { hist: Histology; label: string; prevalence: string }[] = [
  { hist: 'TA', label: 'Tubular adenoma', prevalence: '~45–60%' },
  { hist: 'HP', label: 'Hyperplastic', prevalence: '~20–30%' },
  { hist: 'TVA', label: 'Tubulovillous / villous', prevalence: '~5–15%' },
  { hist: 'SSL', label: 'Sessile serrated', prevalence: '~1–8%' },
  { hist: 'TSA', label: 'Traditional serrated', prevalence: '<1%' },
]

// Country-level pills; Canada expands to a province sub-selector.
const COUNTRIES: { country: 'US' | 'CA' | 'AU' | 'EU'; label: string; guideline?: string; default: Jurisdiction['id'] }[] = [
  { country: 'US', label: 'United States', guideline: 'USMSTF 2020', default: 'US' },
  { country: 'CA', label: 'Canada', default: 'CA_ON' },
  { country: 'AU', label: 'Australia', guideline: 'NHMRC / Cancer Council', default: 'AU' },
  { country: 'EU', label: 'Europe', guideline: 'ESGE 2020', default: 'EU' },
]

const BBPS_SEGMENTS: [string, number][] = [
  ['Right colon', 0],
  ['Transverse', 1],
  ['Left colon', 2],
]

function chip(active: boolean, mono = true) {
  return `${mono ? 'font-mono ' : ''}text-[12.5px] px-3 min-h-[38px] inline-flex items-center border transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
    active
      ? 'bg-foreground text-background border-foreground'
      : 'bg-secondary text-foreground/70 border-border hover:border-accent'
  }`
}

export function PageContent() {
  const [jur, setJur] = useState<Jurisdiction['id']>('US')
  const [findings, setFindings] = useState<Findings>({
    nPolyps: 2,
    maxSize: 8,
    hist: 'AWAIT',
    hgd: false,
    piece: false,
    proximalHp: false,
    bbps: [3, 3, 3],
  })

  const active = JURISDICTIONS.find((j) => j.id === jur)!
  const result = active.compute(findings)
  const total = prepTotal(findings.bbps)
  const adequate = prepAdequate(findings.bbps)
  const scopeless = findings.hist === 'NONE' || findings.hist === 'CANCER'

  // While histology is pending, show what the interval would be for each
  // possible result, ordered most-common-first (by per-polyp prevalence).
  const breakdown = result.provisional
    ? AWAIT_TYPES.map((t) => {
        // proximalHp is HP-location-specific and unknown while awaiting histology.
        const r = active.compute({ ...findings, hist: t.hist, proximalHp: false })
        return { label: t.label, prevalence: t.prevalence, interval: r.interval }
      })
    : []

  const set = (patch: Partial<Findings>) => setFindings((f) => ({ ...f, ...patch }))
  const clamp = (v: string, max: number) => Math.max(0, Math.min(max, Math.round(parseFloat(v || '0') || 0)))
  const setHist = (k: Histology) => {
    // proximalHp only applies to hyperplastic; clear it when leaving HP so a
    // stale flag can't leak into another histology's compute or the breakdown.
    const proximalHp = k === 'HP' ? findings.proximalHp : false
    if (k === 'NONE' || k === 'CANCER') set({ hist: k, nPolyps: 0, proximalHp })
    else set({ hist: k, nPolyps: findings.nPolyps < 1 ? 1 : findings.nPolyps, proximalHp })
  }

  return (
    <>
      {/* Hero ------------------------------------------------------------ */}
      <section className="pt-32 pb-10 lg:pt-40 lg:pb-12 px-6 lg:px-10 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">
              Clinician reference tool
            </span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h1
            className="font-display text-[32px] sm:text-[44px] lg:text-[54px] leading-[1.06] tracking-[-0.03em] mb-5"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Colonoscopy surveillance interval
          </h1>
          <p className="text-[16px] lg:text-[18px] leading-relaxed text-foreground/70 max-w-2xl">
            Enter the findings from the report and see the guideline-recommended surveillance
            interval, the exact rule that produced it, and the source. Switch between the US,
            Canadian, Australian, and European guidelines.
          </p>
          <p className="text-[13px] leading-relaxed text-foreground/70 max-w-2xl mt-3">
            For health professionals. This is a reference, not personal medical advice — if you are a
            patient, discuss your surveillance interval with your doctor.
          </p>
        </div>
      </section>

      {/* Calculator ------------------------------------------------------ */}
      <section className="px-6 lg:px-10 py-10 lg:py-14 border-b border-border">
        <div className="max-w-6xl mx-auto">
          {/* Jurisdiction switch — country level */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/65 mr-1">
              Guideline
            </span>
            {COUNTRIES.map((c) => {
              const on = active.country === c.country
              return (
                <button key={c.country} onClick={() => setJur(on ? jur : c.default)} aria-pressed={on} className={chip(on)}>
                  {c.label}
                  {c.guideline ? ` · ${c.guideline}` : ''}
                </button>
              )
            })}
          </div>

          {active.country === 'CA' && (
            <>
              <div className="flex flex-wrap items-center gap-2 mb-3 pl-3 border-l-2 border-brass/50">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/65 mr-1">
                  Province
                </span>
                {JURISDICTIONS.filter((j) => j.country === 'CA').map((j) => (
                  <button key={j.id} onClick={() => setJur(j.id)} aria-pressed={jur === j.id} className={chip(jur === j.id)}>
                    {j.province} · {j.guideline}
                  </button>
                ))}
              </div>
              <p className="text-[11.5px] leading-relaxed text-foreground/72 mb-6 max-w-3xl">
                Canada has no maintained national post-polypectomy guideline; the provinces differ.
                Ontario, Alberta (ACRCSP 2023), and British Columbia give different intervals for some
                findings — notably 1–4 low-risk adenomas and serrated-lesion counts. Select the
                applicable province.
              </p>
            </>
          )}

          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-6 lg:gap-8 items-start">
            {/* Inputs */}
            <div className="bg-card border border-border rounded-lg p-6 lg:p-7">
              {/* Bowel prep */}
              <div className="mb-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/65 mb-4">
                  Bowel prep · Boston scale
                </div>
                {BBPS_SEGMENTS.map(([name, idx]) => (
                  <div key={idx} className="flex items-center gap-2 mb-2.5">
                    <span className="text-[13px] text-foreground/70 min-w-[104px]">{name}</span>
                    {[0, 1, 2, 3].map((v) => (
                      <button
                        key={v}
                        onClick={() => {
                          const b = [...findings.bbps] as [number, number, number]
                          b[idx] = v
                          set({ bbps: b })
                        }}
                        aria-label={`${name} score ${v}`}
                        aria-pressed={findings.bbps[idx] === v}
                        className={`w-10 h-10 text-[13px] border transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
                          findings.bbps[idx] === v
                            ? 'bg-foreground text-background border-foreground'
                            : 'bg-secondary text-foreground/70 border-border hover:border-accent'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                ))}
                <div className="text-[13px] text-foreground/70 mt-3">
                  Total <b className="font-mono">{total} / 9</b> ·{' '}
                  <span className={adequate ? 'text-[#1F6B47] font-semibold' : 'text-[#97590C] font-semibold'}>
                    {adequate ? 'Adequate' : 'Inadequate'}
                  </span>
                </div>
              </div>

              {/* Findings */}
              <div className="mb-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/65 mb-3">
                  Findings
                </div>

                <div className="text-[12px] text-foreground/65 mb-2" id="histology-label">Histology of this lesion type</div>
                <div role="group" aria-labelledby="histology-label" className="flex flex-wrap gap-2 mb-2">
                  {HISTOLOGY.map(([k, label]) => {
                    const on = findings.hist === k
                    const isAwait = k === 'AWAIT'
                    return (
                      <button
                        key={k}
                        onClick={() => setHist(k)}
                        aria-pressed={on}
                        className={`text-[12.5px] px-3 min-h-[38px] inline-flex items-center border transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
                          on && isAwait
                            ? 'bg-[#97590C] text-white border-[#97590C] font-semibold'
                            : on
                              ? 'bg-foreground text-background border-foreground'
                              : isAwait
                                ? 'bg-[#FBF3E3] text-[#8A5A17] border-[#EAD9B0] hover:border-[#97590C] font-medium'
                                : 'bg-secondary text-foreground/70 border-border hover:border-accent'
                        }`}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
                <p className="text-[11.5px] leading-relaxed text-foreground/65 mb-4">
                  Enter one lesion type at a time. For a report with more than one type (e.g. adenomas
                  and serrated lesions), run each separately; the shortest interval usually governs,
                  though Australia and British Columbia set some intervals on the combined lesion count
                  (flagged in the result). Assumes
                  complete resection, and is for sporadic post-polypectomy surveillance only —
                  inflammatory bowel disease, hereditary syndromes, and strong family history follow
                  separate pathways.
                </p>

                <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 mb-4 ${scopeless ? 'opacity-40 pointer-events-none' : ''}`}>
                  <label className="flex items-center gap-3 text-[13px] text-foreground/70">
                    Number of this type
                    <input
                      type="number"
                      min={0}
                      max={40}
                      disabled={scopeless}
                      value={findings.nPolyps}
                      onChange={(e) => set({ nPolyps: clamp(e.target.value, 40) })}
                      className="w-16 bg-secondary border border-border rounded px-2.5 py-2 text-[13px] text-foreground focus:border-accent focus-visible:ring-2 focus-visible:ring-ring outline-none"
                    />
                  </label>
                  <label className="flex items-center gap-3 text-[13px] text-foreground/70">
                    Largest of this type
                    <input
                      type="number"
                      min={0}
                      max={90}
                      disabled={scopeless}
                      value={findings.maxSize}
                      onChange={(e) => set({ maxSize: clamp(e.target.value, 90) })}
                      className="w-16 bg-secondary border border-border rounded px-2.5 py-2 text-[13px] text-foreground focus:border-accent focus-visible:ring-2 focus-visible:ring-ring outline-none"
                    />
                    <span className="text-foreground/72">mm</span>
                  </label>
                </div>

                <div className="text-[12px] text-foreground/65 mb-2" id="flags-label">Flags</div>
                <div role="group" aria-labelledby="flags-label" className={`flex flex-wrap gap-2 ${scopeless ? 'opacity-40 pointer-events-none' : ''}`}>
                  <button onClick={() => set({ hgd: !findings.hgd })} aria-pressed={findings.hgd} disabled={scopeless} className={chip(findings.hgd, false)}>
                    High-grade dysplasia
                  </button>
                  <button onClick={() => set({ piece: !findings.piece })} aria-pressed={findings.piece} className={chip(findings.piece, false)}>
                    Piecemeal (≥20 mm)
                  </button>
                  {findings.hist === 'HP' && (
                    <button onClick={() => set({ proximalHp: !findings.proximalHp })} aria-pressed={findings.proximalHp} className={chip(findings.proximalHp, false)}>
                      Proximal to sigmoid
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Result */}
            <ResultCard result={result} breakdown={breakdown} largeLesion={findings.maxSize >= 10} sourceName={active.source.name} sourceUrl={active.source.url} />
          </div>

          {/* Non-device / disclaimer strip */}
          <div className="mt-8 bg-secondary/60 border border-border rounded-lg p-5 lg:p-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/65 mb-2">
              How to read this
            </div>
            <p className="text-[13px] leading-relaxed text-foreground/70">
              This is an educational reference for health professionals that reproduces published
              surveillance guidelines and shows the rule and source behind each interval. It is{' '}
              <strong className="text-foreground">not medical advice, not a medical device, and does not make or
              replace a clinical decision.</strong>{' '}
              Confirm every interval against the cited guideline for the individual patient. The
              calculation runs in your browser and the findings you enter are never transmitted or
              stored; like every page on this site, it loads privacy-preserving, cookieless analytics
              that record only anonymous page-visit data.
            </p>
          </div>
        </div>
      </section>

      {/* What's changing / research ------------------------------------- */}
      <section className="px-6 lg:px-10 py-14 lg:py-20 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">What is changing</span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h2 className="font-display text-[26px] lg:text-[34px] font-bold tracking-tight mb-4">
            Where post-polypectomy surveillance is heading
          </h2>
          <p className="text-[15px] leading-relaxed text-foreground/70 mb-10 max-w-2xl">
            Context only — this does not change the interval the calculator computes, which follows the
            guideline you select. It flags the evidence most likely to move the next revision.
          </p>

          <div className="space-y-10">
            {RESEARCH.map((group) => (
              <div key={group.heading}>
                <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-foreground/65 mb-4 pb-2 border-b border-border">
                  {group.heading}
                </h3>
                <div className="space-y-6">
                  {group.items.map((item) => (
                    <div key={item.title}>
                      <div className="flex items-baseline gap-2 flex-wrap mb-1">
                        <h4 className="text-[15px] font-semibold text-foreground">{item.title}</h4>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-[0.06em] px-1.5 py-0.5 rounded-full ${
                            item.strength === 'strong' ? 'text-[#1F6B47] bg-[#E6F1EA]' : 'text-[#8A6D2F] bg-[#F6EFE0]'
                          }`}
                        >
                          {item.strength === 'strong' ? 'Strong evidence' : 'Early signal'}
                        </span>
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-foreground/70 mb-1.5">{item.body}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {item.sources.map((s) => (
                          <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-accent hover:underline">
                            {s.label} ↗
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ------------------------------------------------------------ */}
      <section className="px-6 lg:px-10 py-14 lg:py-20 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">
              Common questions
            </span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h2 className="font-display text-[26px] lg:text-[34px] font-bold tracking-tight mb-8">
            Colonoscopy surveillance intervals — quick answers
          </h2>
          <div className="divide-y divide-border">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="py-5">
                <h3 className="text-[16px] font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-[14px] leading-relaxed text-foreground/75">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guideline sources ---------------------------------------------- */}
      <section className="px-6 lg:px-10 py-14 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-[12px] uppercase tracking-[0.14em] text-foreground/65 mb-6">Guideline sources</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {JURISDICTIONS.map((j) => (
              <a key={j.id} href={j.source.url} target="_blank" rel="noopener noreferrer" className="block bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors">
                <div className="text-[14px] font-semibold text-foreground mb-1">{j.label} · {j.guideline}</div>
                <div className="text-[12px] text-foreground/70 leading-relaxed">{j.source.name} ↗</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note / attribution -------------------------------------- */}
      <section className="px-6 lg:px-10 py-14">
        <div className="max-w-4xl mx-auto">
          <p className="text-[13px] leading-relaxed text-foreground/70 mb-3">
            A free reference from Aescia for the endoscopy community.
          </p>
          <div className="bg-secondary/50 border border-border rounded-lg p-5 mb-6">
            <p className="text-[13px] leading-relaxed text-foreground/70">
              Aescia builds pre-procedure and surveillance-recall software for endoscopy clinics — if
              tracking recall intervals across a whole service is your problem, not a single case,{' '}
              <Link href="/clinics" className="text-accent hover:underline">see what we do</Link>.
            </p>
          </div>
          <p className="text-[12px] leading-relaxed text-foreground/72">
            Reference tool for health professionals. Not medical advice. Not a medical device. Does not
            make or replace clinical decisions. Surveillance guidelines are updated periodically; verify
            against the current version of the cited guideline before acting on any interval.
          </p>
        </div>
      </section>
    </>
  )
}

// ---------------------------------------------------------------------------
// Result panel — handles three modes: out-of-scope override, provisional
// (awaiting histology), and a determined interval. A persistent prep-inadequate
// banner shows whenever prep was inadequate, regardless of which rule governs.
// ---------------------------------------------------------------------------
function ResultCard({
  result,
  breakdown,
  largeLesion,
  sourceName,
  sourceUrl,
}: {
  result: ReturnType<Jurisdiction['compute']>
  breakdown: { label: string; prevalence: string; interval: string }[]
  largeLesion: boolean
  sourceName: string
  sourceUrl: string
}) {
  const accent = result.override ? 'border-[#97590C]' : result.provisional ? 'border-[#97590C]' : 'border-brass'
  return (
    <div className={`bg-card border-l-[3px] ${accent} border-y border-r border-border rounded-lg p-6 lg:p-7`}>
      {result.prepInadequate && (
        <div className="mb-4 bg-[#FBF3E3] border border-[#EAD9B0] rounded px-3 py-2.5 text-[12px] leading-relaxed text-[#7A5312]">
          <strong>Bowel prep inadequate.</strong> The colon may not be fully cleared and lesions can be
          missed — the interval is capped and the exam should be repeated.
        </div>
      )}

      {result.override ? (
        <>
          <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-[#97590C] font-semibold mb-3">
            Outside routine surveillance
          </div>
          <div className="font-display text-[24px] lg:text-[27px] font-bold tracking-tight text-foreground leading-tight">
            {result.interval}
          </div>
        </>
      ) : result.provisional ? (
        <>
          <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-[#97590C] font-semibold mb-3">
            Awaiting histology
          </div>
          <div className="font-display text-[22px] lg:text-[25px] font-bold tracking-tight text-foreground leading-tight mb-1">
            Interval depends on the result
          </div>
          <div className="text-[12.5px] text-foreground/70 mb-1">
            For the number and size entered, here is the interval each possible histology would give,
            with roughly how often each type is found. The final interval is set once histopathology
            returns.
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.08em] text-foreground/72 mt-3 mb-1 px-0.5">
            <span>Histology · typical share</span>
            <span>Interval</span>
          </div>
          <ul>
            {breakdown.map((b) => (
              <li key={b.label} className="flex items-center justify-between gap-3 py-2 border-b border-border/60 last:border-0">
                <span className="flex items-center gap-2.5 text-[13px] text-foreground/80">
                  <span className="font-mono text-[11px] text-foreground/65 tabular-nums w-16 text-right">{b.prevalence}</span>
                  {b.label}
                </span>
                <span className="text-[13px] font-semibold text-foreground text-right">{b.interval}</span>
              </li>
            ))}
          </ul>
          {largeLesion && (
            <div className="mt-3 bg-[#FBF3E3] border border-[#EAD9B0] rounded px-3 py-2 text-[11.5px] leading-relaxed text-[#7A5312]">
              A lesion 10 mm or larger is much more likely to be advanced, villous, or serrated than
              these population figures suggest — most advanced neoplasia is found in polyps this size.
            </div>
          )}
          <p className="text-[11px] leading-relaxed text-foreground/65 mt-3">
            Approximate per-polyp shares shown as ranges; they shift with lesion size and with how
            often small hyperplastic polyps are resected. Denominator anchored on{' '}
            <a href="https://pubmed.ncbi.nlm.nih.gov/29231190/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Turner 2018 ↗
            </a>
            ; subtype splits from{' '}
            <a href="https://www.ncbi.nlm.nih.gov/books/NBK553180/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              StatPearls ↗
            </a>{' '}
            and{' '}
            <a href="https://www.gastrojournal.org/article/S0016-5085(19)41115-3/fulltext" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Crockett &amp; Nagtegaal 2019 ↗
            </a>
          </p>
        </>
      ) : (
        <>
          <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-brass font-semibold mb-3">
            Guideline-recommended interval
          </div>
          <div className="font-display text-[30px] lg:text-[34px] font-bold tracking-tight text-foreground leading-tight">
            {result.interval}
          </div>
          {result.modality && (
            <div className="text-[13.5px] text-foreground/72 mt-1.5">Guideline modality: {result.modality}</div>
          )}
        </>
      )}

      {!result.provisional && (
        <>
          <div className="mt-5 pt-4 border-t border-border">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-foreground/72 block mb-1.5">
              {result.override ? 'Why' : 'Driven by'}
            </span>
            <p className="text-[13.5px] leading-relaxed text-foreground/80">
              {result.driver}.
              {!result.override && ' The shortest (highest-risk) interval across all findings governs.'}
            </p>
          </div>

          <div className="mt-4">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-foreground/72 block mb-1.5">
              {result.override ? 'Basis' : 'Guideline wording'}
            </span>
            <p className="text-[12.5px] leading-relaxed text-foreground/70 italic border-l-2 border-border pl-3">
              {result.quote}
            </p>
          </div>

          {result.notes.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {result.notes.map((note, i) => (
                <li key={i} className="text-[12.5px] leading-relaxed text-foreground/65 flex gap-2">
                  <span className="text-brass mt-0.5" aria-hidden="true">→</span>
                  {note}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <div className="mt-5 pt-4 border-t border-border">
        <p className="text-[11.5px] leading-relaxed text-foreground/65 mb-2">
          Clinician reference. Not personal medical advice; confirm against the guideline for the
          individual patient.
        </p>
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-foreground/65 hover:text-accent leading-relaxed">
          {sourceName} ↗
        </a>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// "What's changing" — curated, cited developments (2020–2026). Educational
// context that sits below the calculator; does not feed the logic.
// ---------------------------------------------------------------------------
const RESEARCH: {
  heading: string
  items: { title: string; body: string; strength: 'strong' | 'signal'; sources: { label: string; url: string }[] }[]
}[] = [
  {
    heading: 'Guideline direction',
    items: [
      {
        title: 'The 2020 guidelines lengthened low-risk intervals — and real-world adherence lags',
        body: 'USMSTF 2020 and ESGE 2020 both pushed low-risk findings toward 7–10 years or back to screening, yet uptake lags: in one large US health system, roughly a quarter of screening colonoscopies were flagged as probable or possible overuse, and guideline-concordant interval-setting remains inconsistent in practice.',
        strength: 'strong',
        sources: [
          { label: 'ESGE 2020', url: 'https://doi.org/10.1055/a-1185-3109' },
          { label: 'Overuse data', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10294020/' },
        ],
      },
      {
        title: 'Serrated-lesion surveillance is being defined by new metachronous-risk data',
        body: 'A 2024 systematic review and meta-analysis (14 studies, ~494,000 patients) quantified cancer and advanced-lesion risk after serrated-polyp resection, firming up which serrated findings warrant shorter intervals and which can be de-escalated.',
        strength: 'strong',
        sources: [{ label: 'GIE 2024', url: 'https://doi.org/10.1016/j.gie.2024.05.021' }],
      },
    ],
  },
  {
    heading: 'De-escalation evidence',
    items: [
      {
        title: 'The EPoS randomized trials test interval length head-on',
        body: 'The European Polyp Surveillance trials randomize low-risk patients to surveillance at 5 and 10 years versus 10 years only, and high-risk patients to 3/5/10 versus 5/10 years — the first large RCTs on interval length. If the low-risk arms show no excess cancer, future guidelines may drop the early surveillance scope entirely.',
        strength: 'strong',
        sources: [{ label: 'EPoS design', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5412707/' }],
      },
      {
        title: 'Modelling and national cohorts support returning low-risk adenomas to stool screening',
        body: 'Microsimulation and OncoSim analyses of sending 1–2 low-risk-adenoma patients back to FIT found little cancer penalty with large colonoscopy savings — the pathway Australia (iFOBT) and Canada (FIT) already encode for low-risk findings.',
        strength: 'signal',
        sources: [{ label: 'Return-to-FIT model', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11083724/' }],
      },
    ],
  },
  {
    heading: 'AI and optical diagnosis',
    items: [
      {
        title: 'AI optical diagnosis for "resect-and-discard" did not add net benefit (2024)',
        body: 'Pooling 11 studies, computer-aided diagnosis matched unassisted expert optical diagnosis on the proportion of diminutive polyps that could skip pathology, tempering the idea that AI can soon assign intervals in real time without histology.',
        strength: 'strong',
        sources: [{ label: 'Lancet Gastro Hep 2024', url: 'https://doi.org/10.1016/S2468-1253(24)00222-X' }],
      },
      {
        title: 'AI detection finds more small polyps — which can paradoxically shorten intervals',
        body: 'Because computer-aided detection raises adenoma detection without a matching rise in advanced lesions, microsimulation projects more patients crossed into surveillance, prompting debate about whether interval rules need to adapt to AI-era colonoscopy.',
        strength: 'signal',
        sources: [{ label: 'BMJ Medicine 2025', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11955961/' }],
      },
    ],
  },
  {
    heading: 'Non-invasive tests',
    items: [
      {
        title: 'The Shield blood test won FDA screening approval (2024)',
        body: 'In the ECLIPSE trial, Guardant’s cell-free-DNA test showed 83% sensitivity for colorectal cancer at 90% specificity, and it is FDA-approved as a primary screening option for average-risk adults 45+. It is approved for screening, not surveillance, and its sensitivity for advanced precancerous lesions is low (~13%) — but blood-based and ctDNA tests are the most likely near-term disruptors of who enters and stays in surveillance.',
        strength: 'strong',
        sources: [
          { label: 'ECLIPSE, NEJM 2024', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2304714' },
          { label: 'FDA approval', url: 'https://www.fda.gov/medical-devices/recently-approved-devices/shield-p230009' },
        ],
      },
    ],
  },
]
