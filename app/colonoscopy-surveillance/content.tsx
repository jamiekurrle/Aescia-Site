'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import {
  compute,
  prepAdequate,
  JURISDICTIONS,
  type JurId,
  type LesionInput,
  type Jurisdiction,
  type Result,
  type Source,
  type Superseded,
} from './engine'
import { JUR_TO_SLUG, routeToJur } from './slugs'
import { SEO_CONTENT } from './seo-content'

type HistOpt = LesionInput['hist'] | 'AWAIT' | 'NONE'
const HISTOLOGY: [HistOpt, string][] = [
  ['AWAIT', 'Awaiting histology'],
  ['NONE', 'No polyps'],
  ['TA', 'Tubular adenoma'],
  ['TVA', 'Tubulovillous'],
  ['VA', 'Villous'],
  ['SSL', 'Sessile serrated'],
  ['TSA', 'Traditional serrated'],
  ['HP', 'Hyperplastic'],
]
const AWAIT_TYPES: { hist: LesionInput['hist']; label: string; prevalence: string }[] = [
  { hist: 'TA', label: 'Tubular adenoma', prevalence: '~45–60%' },
  { hist: 'HP', label: 'Hyperplastic', prevalence: '~20–30%' },
  { hist: 'TVA', label: 'Tubulovillous / villous', prevalence: '~5–15%' },
  { hist: 'SSL', label: 'Sessile serrated', prevalence: '~1–8%' },
  { hist: 'TSA', label: 'Traditional serrated', prevalence: '<1%' },
]
const BBPS_SEGMENTS: [string, number][] = [['Right colon', 0], ['Transverse', 1], ['Left colon', 2]]
// The awaiting-histology breakdown is scored at an adequate preparation, so each
// row carries this guideline's routine interval for that histology. Where the
// examination's own preparation was inadequate, the published preparation
// pathway is the result and this breakdown is demoted beneath it.
const ADEQUATE_BBPS: [number, number, number] = [3, 3, 3]
const COUNTRIES: { country: Jurisdiction['country']; label: string; guideline?: string; default: JurId }[] = [
  { country: 'US', label: 'United States', guideline: 'USMSTF 2020', default: 'US' },
  { country: 'CA', label: 'Canada', default: 'CA_ON' },
  { country: 'AU', label: 'Australia', guideline: 'NHMRC / Cancer Council', default: 'AU' },
  { country: 'EU', label: 'Europe', guideline: 'ESGE 2020', default: 'EU' },
]
let rowSeq = 0
interface Row {
  key: number
  hist: HistOpt
  count: number
  size: number
  hgd: boolean
  piece: boolean
  proximal: boolean
}
function newRow(hist: HistOpt = 'AWAIT'): Row {
  rowSeq += 1
  return { key: rowSeq, hist, count: 1, size: 8, hgd: false, piece: false, proximal: false }
}

function chip(active: boolean, mono = true) {
  return `${mono ? 'font-mono ' : ''}text-[12.5px] px-3 min-h-[38px] inline-flex items-center border transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
    active ? 'bg-foreground text-background border-foreground' : 'bg-secondary text-foreground/72 border-border hover:border-accent'
  }`
}

export function PageContent({ initialJur = 'US' }: { initialJur?: JurId }) {
  const [jur, setJur] = useState<JurId>(initialJur)
  const [rows, setRows] = useState<Row[]>([newRow('AWAIT')])
  const [malignant, setMalignant] = useState(false)
  const [special, setSpecial] = useState(false)
  const [bbps, setBbps] = useState<[number, number, number]>([3, 3, 3])
  const [copyState, setCopyState] = useState<'idle' | 'ok' | 'err'>('idle')

  const active = JURISDICTIONS.find((j) => j.id === jur)!
  const seo = SEO_CONTENT[jur]

  // The route sets the guideline, unconditionally, so a queryless URL always
  // renders the guideline named in its title and canonical link. No stored, geo,
  // or prior selection can override the pathname. Then hydrate any findings
  // carried in the query string, encoded to match buildShareUrl below.
  useEffect(() => {
    if (typeof window === 'undefined') return
    setJur(routeToJur(window.location.pathname))
    const p = new URLSearchParams(window.location.search)
    if (![...p.keys()].length) return
    const toInt = (s: string | null, max: number) => Math.max(0, Math.min(max, Math.round(Number(s) || 0)))
    const b = p.get('b')
    if (b && /^[0-3]{3}$/.test(b)) setBbps([+b[0], +b[1], +b[2]] as [number, number, number])
    setMalignant(p.get('mal') === '1')
    setSpecial(p.get('sp') === '1')
    const l = p.get('l')
    if (l) {
      const valid = new Set(HISTOLOGY.map(([k]) => k as string))
      const parsed = l.split(',').map((tok) => {
        const [hist, count, size, flags = '000'] = tok.split(':')
        return { key: (rowSeq += 1), hist: hist as HistOpt, count: toInt(count, 40), size: toInt(size, 90), hgd: flags[0] === '1', piece: flags[1] === '1', proximal: flags[2] === '1' }
      }).filter((r) => valid.has(r.hist))
      if (parsed.length) setRows(parsed)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Only lesions with a known histology feed the interval. A row still awaiting
  // histology is never assumed to be a tubular adenoma; it keeps the interval
  // pending until its type is entered.
  const knownLesions: LesionInput[] = rows
    .filter((r) => r.count > 0 && r.hist !== 'NONE' && r.hist !== 'AWAIT')
    .map((r) => ({ hist: r.hist as LesionInput['hist'], count: r.count, size: r.size, hgd: r.hgd, piece: r.piece, proximal: r.proximal }))

  const awaitingRows = rows.filter((r) => r.hist === 'AWAIT' && r.count > 0)
  // Any lesion whose histology is pending leaves the interval indeterminate.
  const awaiting = awaitingRows.length > 0 && !malignant && !special
  const result = compute({ jur, lesions: knownLesions, malignant, special, bbps })

  // With exactly one lesion pending, show the interval each possible histology
  // for it would give, holding any known lesions fixed. With two or more
  // pending, the combination is indeterminate; the result card says so.
  const breakdown = awaiting && awaitingRows.length === 1
    ? AWAIT_TYPES.map((t) => {
        const a = awaitingRows[0]
        const r = compute({ jur, lesions: [...knownLesions, { hist: t.hist, count: a.count, size: a.size, hgd: a.hgd, piece: a.piece, proximal: false }], malignant: false, special: false, bbps: ADEQUATE_BBPS })
        return { label: t.label, prevalence: t.prevalence, interval: r.interval }
      })
    : []

  const total = bbps[0] + bbps[1] + bbps[2]
  const adequate = prepAdequate(bbps)
  const clamp = (v: string, max: number) => Math.max(0, Math.min(max, Math.round(parseFloat(v || '0') || 0)))
  const setRow = (key: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)))

  // Route for a guideline: US is the base path, the rest their own slug.
  const pathFor = (j: JurId) => (j === 'US' ? '/colonoscopy-surveillance' : `/colonoscopy-surveillance/${JUR_TO_SLUG[j]}`)
  // Encode the full scenario (prep, scope flags, and every lesion) so a switch
  // or a copied link reproduces it. The hydrate effect above parses these.
  const buildQuery = () => {
    const p = new URLSearchParams()
    p.set('b', bbps.join(''))
    if (malignant) p.set('mal', '1')
    if (special) p.set('sp', '1')
    p.set('l', rows.map((r) => `${r.hist}:${r.count}:${r.size}:${r.hgd ? 1 : 0}${r.piece ? 1 : 0}${r.proximal ? 1 : 0}`).join(','))
    return p.toString()
  }
  // A real link to a guideline's route, carrying the current findings. Switching
  // guideline is a navigation, so the destination page's metadata is its own.
  const hrefFor = (j: JurId) => `${pathFor(j)}?${buildQuery()}`
  const buildShareUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.aesciahealth.com'
    return `${origin}${hrefFor(jur)}`
  }

  const writeClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return true
      }
    } catch {}
    // Fallback for browsers / in-app webviews that block the async clipboard API.
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.top = '0'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }

  const copyLink = async () => {
    const url = buildShareUrl()
    const ok = await writeClipboard(url)
    setCopyState(ok ? 'ok' : 'err')
    setTimeout(() => setCopyState('idle'), 3000)
  }

  return (
    <>
      {/* Hero ------------------------------------------------------------ */}
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-10 px-6 lg:px-10 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">Clinician reference tool</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            </div>
            <button
              onClick={copyLink}
              aria-label="Copy a link to this scenario to bookmark or share"
              className={`max-w-full font-mono text-[11px] uppercase tracking-[0.12em] px-3 py-2 border bg-secondary transition-colors ${copyState === 'err' ? 'border-[#B53A2C] text-[#B53A2C]' : copyState === 'ok' ? 'border-[#1F6B47] text-[#1F6B47]' : 'border-border text-foreground/72 hover:border-accent'}`}
              title="Copy this scenario's link to bookmark or share"
            >
              {copyState === 'ok' ? 'Link copied ✓' : copyState === 'err' ? 'Copy failed — select the URL' : 'Bookmark / copy link'}
            </button>
          </div>
          <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[54px] leading-[1.06] tracking-[-0.03em] mb-5" style={{ fontVariationSettings: "'opsz' 144" }}>
            Colonoscopy surveillance interval
          </h1>
          <p className="text-[16px] lg:text-[18px] leading-relaxed text-foreground/72 max-w-2xl">
            Enter the polyps removed and see the surveillance interval the guideline sets, with the
            rule and its source.
          </p>
        </div>
      </section>

      {/* Calculator ------------------------------------------------------ */}
      <section className="px-6 lg:px-10 py-10 lg:py-14 border-b border-border">
        <div className="max-w-6xl mx-auto">
          {/* Guideline switch */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/72 mr-1">Guideline</span>
            {COUNTRIES.map((c) => {
              const on = active.country === c.country
              const target = on ? jur : c.default
              return (
                <Link key={c.country} href={hrefFor(target)} aria-current={on ? 'page' : undefined} className={chip(on)}>
                  {c.label}
                  {c.guideline ? ` · ${c.guideline}` : ''}
                </Link>
              )
            })}
          </div>
          {active.country === 'CA' && (
            <>
              <div className="flex flex-wrap items-center gap-2 mb-3 pl-3 border-l-2 border-brass/50">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/72 mr-1">Province</span>
                {JURISDICTIONS.filter((j) => j.country === 'CA').map((j) => (
                  <Link key={j.id} href={hrefFor(j.id)} aria-current={jur === j.id ? 'page' : undefined} className={chip(jur === j.id)}>
                    {j.province} · {j.guideline}
                  </Link>
                ))}
              </div>
              <p className="text-[11.5px] leading-relaxed text-foreground/72 mb-6 max-w-3xl">
                Canada has no maintained national post-polypectomy guideline; the provinces differ.
              </p>
            </>
          )}

          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-6 lg:gap-8 items-start">
            {/* Inputs */}
            <div className="bg-card border border-border rounded-lg p-6 lg:p-7">
              <div className="mb-6 border-l-2 border-accent pl-3">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent mb-1">Baseline colonoscopy only</div>
                <p className="text-[12.5px] leading-relaxed text-foreground/80">
                  Not for intervals after a surveillance colonoscopy.
                </p>
              </div>

              {/* Scope gate */}
              <div className="mb-6 bg-[#FBF3E3] border border-[#EAD9B0] rounded p-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#7A5312] mb-2">Outside the guidelines</div>
                <p className="text-[12px] leading-relaxed text-[#5E4310] mb-3">
                  Tick if any apply.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setMalignant((v) => !v)} aria-pressed={malignant} className={chip(malignant, false)}>
                    Malignant (cancer in polyp)
                  </button>
                  <button onClick={() => setSpecial((v) => !v)} aria-pressed={special} className={chip(special, false)}>
                    IBD / hereditary / FHx CRC
                  </button>
                </div>
              </div>

              {/* Bowel prep */}
              <div className="mb-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/72 mb-4">Bowel prep · Boston scale</div>
                {BBPS_SEGMENTS.map(([name, idx]) => (
                  <div key={idx} className="flex items-center gap-2 mb-2.5">
                    <span className="text-[13px] text-foreground/72 min-w-[104px]">{name}</span>
                    {[0, 1, 2, 3].map((v) => (
                      <button
                        key={v}
                        onClick={() => setBbps((b) => { const n = [...b] as [number, number, number]; n[idx] = v; return n })}
                        aria-label={`${name} score ${v}`}
                        aria-pressed={bbps[idx] === v}
                        className={`w-10 h-10 text-[13px] border transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${bbps[idx] === v ? 'bg-foreground text-background border-foreground' : 'bg-secondary text-foreground/72 border-border hover:border-accent'}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                ))}
                <div className="text-[13px] text-foreground/72 mt-3">
                  Total <b className="font-mono">{total} / 9</b> · <span className={adequate ? 'text-[#1F6B47] font-semibold' : 'text-[#97590C] font-semibold'}>{adequate ? 'Adequate' : 'Inadequate'}</span>
                </div>
              </div>

              {/* Lesion rows */}
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/72 mb-3">Polyps removed</div>
                <div className="space-y-4">
                  {rows.map((r, i) => (
                    <div key={r.key} className={`border border-border rounded-lg p-3 ${malignant || special ? 'opacity-40 pointer-events-none' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-foreground/72">Lesion type {rows.length > 1 ? i + 1 : ''}</span>
                        {rows.length > 1 && (
                          <button onClick={() => setRows((rs) => rs.filter((x) => x.key !== r.key))} className="text-foreground/72 hover:text-[#B53A2C] text-[16px] leading-none" title="Remove">
                            ×
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {HISTOLOGY.map(([k, label]) => {
                          const on = r.hist === k
                          const isAw = k === 'AWAIT'
                          return (
                            <button
                              key={k}
                              onClick={() => setRow(r.key, { hist: k, proximal: k === 'HP' ? r.proximal : false })}
                              aria-pressed={on}
                              className={`text-[12px] px-2.5 min-h-[34px] inline-flex items-center border transition-colors ${on && isAw ? 'bg-[#97590C] text-white border-[#97590C] font-semibold' : on ? 'bg-foreground text-background border-foreground' : isAw ? 'bg-[#FBF3E3] text-[#8A5A17] border-[#EAD9B0]' : 'bg-secondary text-foreground/72 border-border hover:border-accent'}`}
                            >
                              {label}
                            </button>
                          )
                        })}
                      </div>
                      {r.hist === 'NONE' ? (
                        <p className="text-[12.5px] leading-relaxed text-foreground/72">No lesion at this exam — scored as a normal colonoscopy.</p>
                      ) : (
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                          <label className="flex items-center gap-2 text-[13px] text-foreground/72">
                            Number
                            <input type="number" min={0} max={40} value={r.count} onChange={(e) => setRow(r.key, { count: clamp(e.target.value, 40) })} className="w-14 bg-secondary border border-border rounded px-2 py-1.5 text-[13px] text-foreground focus:border-accent focus-visible:ring-2 focus-visible:ring-ring outline-none" />
                          </label>
                          <label className="flex items-center gap-2 text-[13px] text-foreground/72">
                            Largest
                            <input type="number" min={0} max={90} value={r.size} onChange={(e) => setRow(r.key, { size: clamp(e.target.value, 90) })} className="w-14 bg-secondary border border-border rounded px-2 py-1.5 text-[13px] text-foreground focus:border-accent focus-visible:ring-2 focus-visible:ring-ring outline-none" />
                            <span className="text-foreground/72">mm</span>
                          </label>
                          <button onClick={() => setRow(r.key, { hgd: !r.hgd })} aria-pressed={r.hgd} className={chip(r.hgd, false)}>HGD</button>
                          <button onClick={() => setRow(r.key, { piece: !r.piece })} aria-pressed={r.piece} className={chip(r.piece, false)}>Piecemeal</button>
                          {r.hist === 'HP' && (
                            <button onClick={() => setRow(r.key, { proximal: !r.proximal })} aria-pressed={r.proximal} className={chip(r.proximal, false)}>Proximal</button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button onClick={() => setRows((rs) => [...rs, newRow('TA')])} className={`mt-3 font-mono text-[12px] font-semibold text-accent bg-secondary border border-border hover:border-accent rounded px-3 py-2 transition-colors ${malignant || special ? 'opacity-40 pointer-events-none' : ''}`}>
                  + Add another lesion type
                </button>
              </div>
            </div>

            {/* Result */}
            <ResultCard result={result} awaiting={awaiting} breakdown={breakdown} sourceName={active.source.name} sourceUrl={active.source.url} />
          </div>
        </div>
      </section>

      {/* Guideline interval table (reference / search / answer-engine) --- */}
      <section className="px-6 lg:px-10 py-14 lg:py-16 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">{active.label}{active.province ? ` · ${active.province}` : ''}</span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
          </div>
          <h2 className="font-display text-[26px] lg:text-[34px] font-bold tracking-tight mb-4">
            How {active.guideline} sets the colonoscopy surveillance interval
          </h2>
          <p className="text-[15px] leading-relaxed text-foreground/72 mb-8 max-w-3xl">{seo.intro}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="font-mono text-[11px] uppercase tracking-[0.1em] text-foreground/72 font-semibold py-2 pr-4 align-bottom">Finding at the baseline colonoscopy</th>
                  <th className="font-mono text-[11px] uppercase tracking-[0.1em] text-foreground/72 font-semibold py-2 align-bottom">Surveillance interval</th>
                </tr>
              </thead>
              <tbody>
                {seo.table.map((row, i) => (
                  <tr key={i} className="border-b border-border/60 align-top">
                    <td className="text-[13.5px] leading-relaxed text-foreground/80 py-2.5 pr-4">{row.finding}</td>
                    <td className="text-[13.5px] leading-relaxed font-semibold text-foreground py-2.5">{row.interval}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[13.5px] leading-relaxed text-foreground/72 mt-6 max-w-3xl">{seo.divergence}</p>
          <p className="text-[13px] leading-relaxed text-foreground/72 mt-4">
            Source: <a href={active.source.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{active.source.name} ↗</a>. This is the baseline colonoscopy table; enter specific findings in the calculator above for the rule and its exact wording.
          </p>
        </div>
      </section>

      {/* Reference ------------------------------------------------------- */}
      <section className="px-6 lg:px-10 py-14 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-[14px] leading-relaxed text-foreground/80">
            For common questions and the source behind each rule across all the guidelines, see the{' '}
            <Link href="/colonoscopy-surveillance/guide" className="text-accent hover:underline">colonoscopy surveillance guideline reference</Link>.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14">
        <div className="max-w-4xl mx-auto">
          <p className="text-[12px] leading-relaxed text-foreground/72 mb-4">
            Reference tool for health professionals. Not medical advice, not a medical device, and does
            not make or replace a clinical decision. The calculation runs in your browser; the findings
            you enter are not transmitted or stored. The Aescia clinical team reviews this tool
            periodically against the source guidelines and updates it when they change, but guidelines
            are revised without notice; verify against the current version before acting. If you notice
            an error, tell us at{' '}
            <a href="mailto:contact@aesciahealth.com?subject=Colonoscopy%20surveillance%20calculator%20error%20report" className="text-accent hover:underline">contact@aesciahealth.com</a>.
          </p>
          <p className="text-[12px] leading-relaxed text-foreground/72">
            Aescia builds pre-procedure and surveillance-recall software for endoscopy clinics.{' '}
            <Link href="/clinics" className="text-accent hover:underline">See what we do</Link>.
          </p>
        </div>
      </section>
    </>
  )
}

type BreakdownRow = { label: string; prevalence: string; interval: string }

// The page's amber panel: marks a statement the society did not make.
function Caveat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-3 bg-[#FBF3E3] border border-[#EAD9B0] rounded px-3 py-2.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#7A5312] font-semibold mb-1">{label}</div>
      <p className="text-[11.5px] leading-relaxed text-[#5E4310]">{children}</p>
    </div>
  )
}

function Notes({ notes, muted = false }: { notes: string[]; muted?: boolean }) {
  if (notes.length === 0) return null
  return (
    <ul className={`space-y-1.5 ${muted ? 'mt-2.5' : 'mt-4'}`}>
      {notes.map((note, i) => (
        <li key={i} className={`leading-relaxed text-foreground/72 flex gap-2 ${muted ? 'text-[11.5px]' : 'text-[12.5px]'}`}>
          <span className="text-brass mt-0.5" aria-hidden="true">→</span>
          {note}
        </li>
      ))}
    </ul>
  )
}

// The verbatim guideline wording, its location reference, its recommendation
// strength and any notes, kept behind a disclosure so the result leads with the
// interval, the rule, and the source rather than the evidence.
function GuidelineWording({
  quoteLabel = 'Guideline wording',
  strength,
  quote,
  location,
  sourceDoc,
  notes,
}: {
  quoteLabel?: string
  strength?: string
  quote?: string
  location?: string
  sourceDoc?: Source | null
  notes?: string[]
}) {
  const hasNotes = !!notes && notes.length > 0
  if (!quote && !hasNotes && !sourceDoc && strength === undefined) return null
  return (
    <details className="mt-4">
      <summary className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-foreground/72 cursor-pointer hover:text-accent select-none">Show exact guideline wording</summary>
      <div className="mt-3 space-y-4">
        {strength !== undefined && (
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-foreground/72 block mb-1.5">Recommendation strength</span>
            <p className="text-[12.5px] leading-relaxed text-foreground/72">{strength}</p>
          </div>
        )}
        {quote && (() => {
          // Some sources are cited as a grid row (finding | interval | recommendation |
          // evidence), not as prose. Render those as the table row they are, highlighted,
          // rather than as a pseudo-quote.
          const cells = quote.split(' | ').map((c) => c.trim())
          const isTableRow = cells.length === 4
          return (
            <div>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-foreground/72 block mb-1.5">{isTableRow ? 'Guideline table entry' : quoteLabel}</span>
              {isTableRow ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-[9px] font-mono uppercase tracking-[0.06em] text-foreground/72">
                        <th className="font-normal py-1 pr-3 align-bottom">Finding</th>
                        <th className="font-normal py-1 pr-3 align-bottom">Interval</th>
                        <th className="font-normal py-1 pr-3 align-bottom">Recommendation</th>
                        <th className="font-normal py-1 align-bottom">Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[#FBF3E3]">
                        <td className="text-[12px] text-[#5E4310] py-1.5 pr-3">{cells[0]}</td>
                        <td className="text-[12px] font-semibold text-[#5E4310] py-1.5 pr-3 whitespace-nowrap">{cells[1]}</td>
                        <td className="text-[12px] text-[#5E4310] py-1.5 pr-3">{cells[2]}</td>
                        <td className="text-[12px] text-[#5E4310] py-1.5">{cells[3]}</td>
                      </tr>
                    </tbody>
                  </table>
                  {location && <p className="font-mono text-[10px] leading-relaxed text-foreground/72 mt-1.5">{location}</p>}
                </div>
              ) : (
                <>
                  <p className="text-[12.5px] leading-relaxed text-foreground/72 italic border-l-2 border-border pl-3">{quote}</p>
                  {location && <p className="font-mono text-[10.5px] leading-relaxed text-foreground/72 mt-1.5 pl-3">{location}</p>}
                </>
              )}
            </div>
          )
        })()}
        {sourceDoc && (
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-foreground/72 block mb-1.5">Source document</span>
            <a href={sourceDoc.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-foreground/72 hover:text-accent leading-relaxed">{sourceDoc.name} ↗</a>
          </div>
        )}
        {hasNotes && <Notes notes={notes!} />}
      </div>
    </details>
  )
}

function Breakdown({ breakdown }: { breakdown: BreakdownRow[] }) {
  return (
    <>
      <table className="w-full text-left border-collapse mt-4">
        <thead>
          <tr className="text-[10px] font-mono uppercase tracking-[0.08em] text-foreground/72">
            <th className="font-normal py-1 pr-4 align-bottom">Prevalence</th>
            <th className="font-normal py-1 pr-4 align-bottom">Histopathology</th>
            <th className="font-normal py-1 text-right align-bottom">Guideline interval</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map((b) => (
            <tr key={b.label} className="border-b border-border/60 last:border-0">
              <td className="font-mono text-[11px] text-foreground/72 tabular-nums py-2 pr-4 whitespace-nowrap align-top">{b.prevalence}</td>
              <td className="text-[13px] text-foreground/80 py-2 pr-4">{b.label}</td>
              <td className="text-[13px] font-semibold text-foreground py-2 text-right align-top whitespace-nowrap">{b.interval}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[11px] text-foreground/72 mt-3"><a href="https://pubmed.ncbi.nlm.nih.gov/29231190/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Prevalence source ↗</a></p>
    </>
  )
}

// The routine interval the findings carry, shown beneath the preparation
// pathway and conditioned on the precondition this examination did not meet.
function SupersededBlock({ sup }: { sup: Superseded }) {
  const lead = sup.override
    ? 'These findings would still sit outside this guideline’s scope:'
    : sup.discretion || sup.notSpecified
      ? 'This guideline would still publish no interval for these findings:'
      : 'This guideline’s interval for these findings would be:'
  return (
    <div className="mt-5 pt-4 border-t border-border">
      <div className="bg-secondary/50 border border-border rounded px-3.5 py-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/72 mb-1.5">If the preparation had been adequate</div>
        <p className="text-[12px] leading-relaxed text-foreground/72 mb-1.5">{lead}</p>
        <div className="text-[15px] font-semibold text-foreground/80 leading-tight">{sup.interval}</div>
        {sup.modality && <div className="text-[11.5px] text-foreground/72 mt-1">{sup.modality}</div>}
        <p className="text-[11.5px] leading-relaxed text-foreground/72 mt-2.5">{sup.driver}.</p>
        {sup.calculatorRule && (
          <Caveat label="Interval selected by this calculator, not by the guideline">{sup.calculatorRule}</Caveat>
        )}
        {(sup.quote || sup.precondition || sup.notes.length > 0) && (
          <details className="mt-3">
            <summary className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/72 cursor-pointer hover:text-accent select-none">Show exact guideline wording</summary>
            <div className="mt-2.5 space-y-2.5">
              {sup.quote && (
                <div>
                  <p className="text-[11.5px] leading-relaxed text-foreground/72 italic border-l-2 border-border pl-3">{sup.quote}</p>
                  {sup.location && <p className="font-mono text-[10px] leading-relaxed text-foreground/72 mt-1 pl-3">{sup.location}</p>}
                </div>
              )}
              {sup.precondition && (
                <p className="text-[11.5px] leading-relaxed text-foreground/72">
                  This guideline publishes that interval on the precondition of an adequate examination. Its
                  wording: <span className="italic">“{sup.precondition.quote}”</span> ({sup.precondition.location}).
                </p>
              )}
              <Notes notes={sup.notes} muted />
            </div>
          </details>
        )}
      </div>
    </div>
  )
}

function ResultCard({
  result,
  awaiting,
  breakdown,
  sourceName,
  sourceUrl,
}: {
  result: Result
  awaiting: boolean
  breakdown: BreakdownRow[]
  sourceName: string
  sourceUrl: string
}) {
  // The guideline itself stops short of an interval: out of its scope, declined,
  // or simply not stated. Amber marks those, an exam outside the guideline's
  // stated preconditions, an interval this calculator selected, and the
  // awaiting-histology holding state.
  const stopsShort = result.override || result.discretion || result.notSpecified

  // An inadequately prepared examination did not meet the precondition every
  // routine interval is published on. The engine answers such an exam with the
  // society's published preparation pathway and carries the routine interval it
  // demoted as `supersededInterval`, so that field marks this path exactly.
  const prepPathway = result.prepInadequate && result.supersededInterval !== null
  // The society publishes a repeat interval; a repeat with no timing attached
  // (a modality, and an interval it does not specify); or neither.
  const repeatPublished = prepPathway && !result.notSpecified
  const repeatUntimed = prepPathway && result.notSpecified && result.modality !== null
  // A published preparation statement to attribute. Where the society published
  // none, the result quotes the guideline's precondition and the card footer
  // already names that guideline.
  const hasPathway = repeatPublished || repeatUntimed

  // Set on the element: `border-border` covers all four sides, so a left-edge
  // colour has to outrank it rather than sit beside it in the class list.
  const accent = stopsShort || result.prepInadequate || result.calculatorRule || awaiting ? '#97590C' : 'var(--brass)'
  // Driver, wording and notes belong to the preparation pathway when it is the
  // result, so they show even while histology is outstanding.
  const showDetail = !awaiting || prepPathway

  return (
    <div role="status" aria-live="polite" style={{ borderLeftColor: accent }} className="bg-card border-l-[3px] border-y border-r border-border rounded-lg p-6 lg:p-7">
      {result.prepInadequate && !prepPathway && (
        <div className="mb-4 bg-[#FBF3E3] border border-[#EAD9B0] rounded px-3 py-2.5 text-[12px] leading-relaxed text-[#7A5312]">
          <strong>Bowel preparation inadequate.</strong> These findings sit outside this guideline's
          scope regardless, so that result stands. Preparation guidance is below.
        </div>
      )}

      {prepPathway ? (
        <>
          <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-[#97590C] font-semibold mb-3">
            {repeatPublished
              ? 'Inadequate preparation · repeat interval'
              : repeatUntimed
                ? 'Inadequate preparation · repeat required'
                : 'Inadequate preparation · no interval published'}
          </div>
          <div className="font-display text-[22px] lg:text-[25px] font-bold tracking-tight text-foreground leading-tight">{result.interval}</div>
          {result.modality && <div className="text-[13px] text-foreground/72 mt-1.5">{result.modality}</div>}
          <div className="text-[13px] leading-relaxed text-foreground/72 mt-2">
            {repeatPublished
              ? 'The repeat timing this society sets when preparation was inadequate. It replaces the routine interval.'
              : repeatUntimed
                ? 'The society requires a repeat but sets no timing. It is a clinical decision.'
                : 'The guideline’s intervals assume an adequate exam and it sets no replacement. The timing is a clinical decision.'}
          </div>
          {result.separateDocument && (
            <Caveat label="Published in a separate document">
              This is published in a different document from the surveillance guideline these intervals
              come from. That document is named and linked below.
            </Caveat>
          )}
        </>
      ) : awaiting ? (
        <>
          <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-[#97590C] font-semibold mb-3">Awaiting histology</div>
          <div className="font-display text-[22px] lg:text-[25px] font-bold tracking-tight text-foreground leading-tight mb-1">Interval depends on the result</div>
          {breakdown.length > 0 ? (
            <>
              <div className="text-[12.5px] text-foreground/72 mb-3">The interval each possible histology for the pending lesion would give. Confirm once histology returns.</div>
              <Breakdown breakdown={breakdown} />
            </>
          ) : (
            <div className="text-[13px] leading-relaxed text-foreground/72 mt-1">More than one lesion is awaiting histology. Enter the histology for each lesion to get an interval.</div>
          )}
        </>
      ) : result.override ? (
        <>
          <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-[#97590C] font-semibold mb-3">Outside routine surveillance</div>
          <div className="font-display text-[24px] lg:text-[27px] font-bold tracking-tight text-foreground leading-tight">{result.interval}</div>
        </>
      ) : result.discretion ? (
        <>
          <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-[#97590C] font-semibold mb-3">Endoscopist discretion</div>
          <div className="font-display text-[24px] lg:text-[27px] font-bold tracking-tight text-foreground leading-tight">{result.interval}</div>
          <div className="text-[13px] leading-relaxed text-foreground/72 mt-2">The guideline leaves this to the endoscopist. Its reasoning is below.</div>
        </>
      ) : result.notSpecified ? (
        <>
          <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-[#97590C] font-semibold mb-3">Not specified by this guideline</div>
          <div className="font-display text-[24px] lg:text-[27px] font-bold tracking-tight text-foreground leading-tight">{result.interval}</div>
          <div className="text-[13px] leading-relaxed text-foreground/72 mt-2">The guideline sets no interval for this. It is a clinical decision. Its wording is below.</div>
        </>
      ) : (
        <>
          <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-brass font-semibold mb-3">Recommended interval</div>
          <div className="font-display text-[30px] lg:text-[34px] font-bold tracking-tight text-foreground leading-tight">{result.interval}</div>
          {result.modality && <div className="text-[13.5px] text-foreground/72 mt-1.5">{result.modality}</div>}
        </>
      )}

      {result.calculatorRule && (
        <Caveat label="Interval selected by this calculator, not by the guideline">{result.calculatorRule}</Caveat>
      )}

      {showDetail && (
        <>
          <div className="mt-5 pt-4 border-t border-border">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-foreground/72 block mb-1.5">Why</span>
            <p className="text-[13.5px] leading-relaxed text-foreground/80">{result.driver}.</p>
          </div>
          <GuidelineWording
            quoteLabel={prepPathway ? 'Published wording' : result.override ? 'Basis' : 'Guideline wording'}
            strength={hasPathway ? (result.strength ?? 'None printed against this statement in the source document.') : undefined}
            quote={result.quote || undefined}
            location={result.location || undefined}
            sourceDoc={hasPathway ? result.source : null}
            notes={result.notes}
          />
        </>
      )}

      {prepPathway && !awaiting && result.supersededInterval && <SupersededBlock sup={result.supersededInterval} />}
      {prepPathway && awaiting && breakdown.length > 0 && (
        <div className="mt-5 pt-4 border-t border-border">
          <div className="bg-secondary/50 border border-border rounded px-3.5 py-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/72 mb-1.5">If the preparation had been adequate</div>
            <p className="text-[12px] leading-relaxed text-foreground/72">The interval each possible histology for the pending lesion would give.</p>
            <Breakdown breakdown={breakdown} />
          </div>
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-border">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-foreground/72 block mb-1.5">Source</span>
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-foreground/72 hover:text-accent leading-relaxed">{sourceName} ↗</a>
      </div>
    </div>
  )
}
