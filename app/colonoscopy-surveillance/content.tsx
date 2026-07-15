'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  compute,
  prepAdequate,
  JURISDICTIONS,
  type JurId,
  type ExamMode,
  type PriorRisk,
  type LesionInput,
  type Jurisdiction,
  type Result,
} from './engine'
import { FAQ_ITEMS } from './faq'
import { JUR_TO_SLUG } from './slugs'

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
const COUNTRIES: { country: Jurisdiction['country']; label: string; guideline?: string; default: JurId }[] = [
  { country: 'US', label: 'United States', guideline: 'USMSTF 2020', default: 'US' },
  { country: 'CA', label: 'Canada', default: 'CA_ON' },
  { country: 'AU', label: 'Australia', guideline: 'NHMRC / Cancer Council', default: 'AU' },
  { country: 'EU', label: 'Europe', guideline: 'ESGE 2020', default: 'EU' },
]
const PRIOR: [PriorRisk, string][] = [
  ['normal', 'Normal (no polyps)'],
  ['low', 'Low-risk (1–2 small adenomas)'],
  ['intermediate', '3–4 adenomas'],
  ['high', 'High-risk adenoma(s)'],
  ['complex', 'Serrated / piecemeal / >10 adenomas'],
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
  const [mode, setMode] = useState<ExamMode>('index')
  const [priorRisk, setPriorRisk] = useState<PriorRisk>('high')
  const [rows, setRows] = useState<Row[]>([newRow('AWAIT')])
  const [malignant, setMalignant] = useState(false)
  const [special, setSpecial] = useState(false)
  const [bbps, setBbps] = useState<[number, number, number]>([3, 3, 3])
  const [copyState, setCopyState] = useState<'idle' | 'ok' | 'err'>('idle')

  const active = JURISDICTIONS.find((j) => j.id === jur)!

  // Hydrate from a shared link's query string on first load, BEFORE the
  // jurisdiction effect below rewrites the path to the bare guideline URL.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const p = new URLSearchParams(window.location.search)
    if (![...p.keys()].length) return
    const toInt = (s: string | null, max: number) => Math.max(0, Math.min(max, Math.round(Number(s) || 0)))
    const m = p.get('m')
    if (m === 's') setMode('surveillance')
    else if (m === 'i') setMode('index')
    const pr = p.get('pr')
    if (pr && ['normal', 'low', 'intermediate', 'high', 'complex'].includes(pr)) setPriorRisk(pr as PriorRisk)
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

  // Remember last jurisdiction, and reflect it in the URL path for bookmarking.
  useEffect(() => {
    try {
      localStorage.setItem('cs-jur', jur)
    } catch {}
    const slug = JUR_TO_SLUG[jur]
    const path = jur === 'US' ? '/colonoscopy-surveillance' : `/colonoscopy-surveillance/${slug}`
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.replaceState(null, '', path)
    }
  }, [jur])

  const lesions: LesionInput[] = rows
    .filter((r) => r.count > 0 && r.hist !== 'NONE')
    .map((r) => ({ hist: (r.hist === 'AWAIT' ? 'TA' : r.hist) as LesionInput['hist'], count: r.count, size: r.size, hgd: r.hgd, piece: r.piece, proximal: r.proximal }))

  const awaiting = rows.length === 1 && rows[0].hist === 'AWAIT' && rows[0].count > 0 && !malignant && !special
  const result = compute({ jur, mode, lesions, priorRisk, malignant, special, bbps })

  // Awaiting single-lesion breakdown (per possible histology)
  const breakdown = awaiting
    ? AWAIT_TYPES.map((t) => {
        const r = compute({ jur, mode, lesions: [{ hist: t.hist, count: rows[0].count, size: rows[0].size, hgd: rows[0].hgd, piece: rows[0].piece, proximal: false }], priorRisk, malignant: false, special: false, bbps })
        return { label: t.label, prevalence: t.prevalence, interval: r.interval }
      })
    : []

  const total = bbps[0] + bbps[1] + bbps[2]
  const adequate = prepAdequate(bbps)
  const clamp = (v: string, max: number) => Math.max(0, Math.min(max, Math.round(parseFloat(v || '0') || 0)))
  const setRow = (key: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)))

  // Encode the full scenario (guideline in the path; mode, prior risk, prep,
  // scope flags, and every lesion in the query) so a copied link reproduces it.
  const buildShareUrl = () => {
    const slug = JUR_TO_SLUG[jur]
    const path = jur === 'US' ? '/colonoscopy-surveillance' : `/colonoscopy-surveillance/${slug}`
    const p = new URLSearchParams()
    p.set('m', mode === 'surveillance' ? 's' : 'i')
    if (mode === 'surveillance') p.set('pr', priorRisk)
    p.set('b', bbps.join(''))
    if (malignant) p.set('mal', '1')
    if (special) p.set('sp', '1')
    p.set('l', rows.map((r) => `${r.hist}:${r.count}:${r.size}:${r.hgd ? 1 : 0}${r.piece ? 1 : 0}${r.proximal ? 1 : 0}`).join(','))
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.aesciahealth.com'
    return `${origin}${path}?${p.toString()}`
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
            Enter the polyps removed and this tool implements the published post-polypectomy
            surveillance rule for the guideline you select, showing the rule and its source. Supports
            multiple lesion types and first or subsequent surveillance.
          </p>
          <p className="text-[13px] leading-relaxed text-foreground/72 max-w-2xl mt-3">
            For health professionals. A reference that reproduces published guidelines and labels any
            implementation assumption — not personal medical advice. Patients should discuss their
            interval with their doctor.
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
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/72 mr-1">Province</span>
                {JURISDICTIONS.filter((j) => j.country === 'CA').map((j) => (
                  <button key={j.id} onClick={() => setJur(j.id)} aria-pressed={jur === j.id} className={chip(jur === j.id)}>
                    {j.province} · {j.guideline}
                  </button>
                ))}
              </div>
              <p className="text-[11.5px] leading-relaxed text-foreground/72 mb-6 max-w-3xl">
                Canada has no maintained national post-polypectomy guideline; the provinces differ.
                Select the applicable province.
              </p>
            </>
          )}

          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-6 lg:gap-8 items-start">
            {/* Inputs */}
            <div className="bg-card border border-border rounded-lg p-6 lg:p-7">
              {/* Scope gate */}
              <div className="mb-6 bg-[#FBF3E3] border border-[#EAD9B0] rounded p-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#7A5312] mb-2">Before you start — scope</div>
                <p className="text-[12px] leading-relaxed text-[#5E4310] mb-3">
                  For sporadic post-polypectomy surveillance in average-risk adults, assuming complete
                  resection and an adequate exam. Tick if any of these apply — the result changes to a
                  referral:
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

              {/* Exam mode */}
              <div className="mb-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/72 mb-3">This colonoscopy is</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <button onClick={() => setMode('index')} aria-pressed={mode === 'index'} className={chip(mode === 'index', false)}>
                    Index (baseline)
                  </button>
                  <button onClick={() => setMode('surveillance')} aria-pressed={mode === 'surveillance'} className={chip(mode === 'surveillance', false)}>
                    A surveillance follow-up
                  </button>
                </div>
                {mode === 'surveillance' && (
                  <div className="mt-2">
                    <div className="text-[12px] text-foreground/72 mb-2">Risk category at the previous colonoscopy</div>
                    <div className="flex flex-wrap gap-2">
                      {PRIOR.map(([k, label]) => (
                        <button key={k} onClick={() => setPriorRisk(k)} aria-pressed={priorRisk === k} className={chip(priorRisk === k, false)}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
                <p className="text-[11.5px] leading-relaxed text-foreground/72 mt-3">
                  Add a row per lesion type. Australia and British Columbia band the interval on the
                  combined count; the US, Canada (Ontario/Alberta), and Europe score each type and take
                  the shortest.
                </p>
              </div>
            </div>

            {/* Result */}
            <ResultCard result={result} awaiting={awaiting} breakdown={breakdown} sourceName={active.source.name} sourceUrl={active.source.url} largeLesion={rows.some((r) => r.size >= 10 && r.count > 0)} />
          </div>

          <div className="mt-8 bg-secondary/60 border border-border rounded-lg p-5 lg:p-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/72 mb-2">How to read this</div>
            <p className="text-[13px] leading-relaxed text-foreground/72">
              An educational reference for health professionals that implements published surveillance
              guidelines and shows the rule and source behind each interval; where a guideline is
              silent, the result is labelled as an implementation assumption. It is{' '}
              <strong className="text-foreground">not medical advice, not a medical device, and does not make or
              replace a clinical decision.</strong>{' '}
              Confirm every interval against the cited guideline for the individual patient. The
              calculation runs in your browser; the findings you enter are not transmitted or stored.
              The Aescia clinical team reviews this tool periodically against the published guidelines
              and updates it when they change.{' '}
              <a href="mailto:contact@aesciahealth.com?subject=Colonoscopy%20surveillance%20calculator%20error%20report" className="text-accent hover:underline">
                If you notice an error, please tell us.
              </a>
            </p>
          </div>
        </div>
      </section>

      <ResearchSection />
      <FaqSection />

      {/* Guideline sources ---------------------------------------------- */}
      <section className="px-6 lg:px-10 py-14 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-[12px] uppercase tracking-[0.14em] text-foreground/72 mb-6">Guideline sources</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {JURISDICTIONS.map((j) => (
              <a key={j.id} href={j.source.url} target="_blank" rel="noopener noreferrer" className="block bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors">
                <div className="text-[14px] font-semibold text-foreground mb-1">{j.label}{j.province ? ` · ${j.province}` : ''} · {j.guideline}</div>
                <div className="text-[12px] text-foreground/72 leading-relaxed">{j.source.name} ↗</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14">
        <div className="max-w-4xl mx-auto">
          <p className="text-[13px] leading-relaxed text-foreground/72 mb-3">A free reference from Aescia for the endoscopy community, reviewed and periodically updated by the Aescia clinical team.</p>
          <div className="bg-secondary/50 border border-border rounded-lg p-5 mb-6">
            <p className="text-[13px] leading-relaxed text-foreground/72">
              Aescia builds pre-procedure and surveillance-recall software for endoscopy clinics — if
              tracking recall intervals across a whole service is your problem, not a single case,{' '}
              <Link href="/clinics" className="text-accent hover:underline">see what we do</Link>.
            </p>
          </div>
          <p className="text-[12px] leading-relaxed text-foreground/72">
            Reference tool for health professionals. Not medical advice. Not a medical device. Does not
            make or replace clinical decisions. We review this tool periodically against the source
            guidelines and update it when they change, but guidelines are revised without notice; verify
            against the current version before acting. If you notice an error, please tell us at{' '}
            <a href="mailto:contact@aesciahealth.com" className="text-accent hover:underline">contact@aesciahealth.com</a>.
          </p>
        </div>
      </section>
    </>
  )
}

function ResultCard({
  result,
  awaiting,
  breakdown,
  sourceName,
  sourceUrl,
  largeLesion,
}: {
  result: Result
  awaiting: boolean
  breakdown: { label: string; prevalence: string; interval: string }[]
  sourceName: string
  sourceUrl: string
  largeLesion: boolean
}) {
  const accent = result.override || result.discretion ? 'border-[#97590C]' : awaiting ? 'border-[#97590C]' : 'border-brass'
  return (
    <div role="status" aria-live="polite" className={`bg-card border-l-[3px] ${accent} border-y border-r border-border rounded-lg p-6 lg:p-7`}>
      {result.prepInadequate && !awaiting && (
        <div className="mb-4 bg-[#FBF3E3] border border-[#EAD9B0] rounded px-3 py-2.5 text-[12px] leading-relaxed text-[#7A5312]">
          <strong>Bowel prep inadequate.</strong> The colon may not be fully cleared — the interval is capped and the exam should be repeated.
        </div>
      )}

      {awaiting ? (
        <>
          <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-[#97590C] font-semibold mb-3">Awaiting histology</div>
          <div className="font-display text-[22px] lg:text-[25px] font-bold tracking-tight text-foreground leading-tight mb-1">Interval depends on the result</div>
          <div className="text-[12.5px] text-foreground/72 mb-3">For the number and size entered, here is the interval each possible histology would give, with roughly how often each type is found. Set once histopathology returns.</div>
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.08em] text-foreground/72 mb-1 px-0.5"><span>Histology · typical share</span><span>Interval</span></div>
          <ul>
            {breakdown.map((b) => (
              <li key={b.label} className="flex items-center justify-between gap-3 py-2 border-b border-border/60 last:border-0">
                <span className="flex items-center gap-2.5 text-[13px] text-foreground/80"><span className="font-mono text-[11px] text-foreground/72 tabular-nums w-16 text-right">{b.prevalence}</span>{b.label}</span>
                <span className="text-[13px] font-semibold text-foreground text-right">{b.interval}</span>
              </li>
            ))}
          </ul>
          {largeLesion && (
            <div className="mt-3 bg-[#FBF3E3] border border-[#EAD9B0] rounded px-3 py-2 text-[11.5px] leading-relaxed text-[#7A5312]">A lesion ≥10 mm is much more likely to be advanced, villous, or serrated than these population figures suggest.</div>
          )}
          <p className="text-[11px] leading-relaxed text-foreground/72 mt-3">Approximate per-polyp shares (ranges); shift with lesion size. <a href="https://pubmed.ncbi.nlm.nih.gov/29231190/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Source ↗</a></p>
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
          <div className="text-[13px] text-foreground/72 mt-2">The guideline does not specify a fixed interval for this case.</div>
        </>
      ) : (
        <>
          <div className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-brass font-semibold mb-3 flex items-center gap-2 flex-wrap">
            Guideline-recommended interval
            {result.assumption && <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-[#8A5A17] bg-[#FBF3E3] border border-[#EAD9B0] rounded-full px-2 py-0.5">implementation assumption</span>}
          </div>
          <div className="font-display text-[30px] lg:text-[34px] font-bold tracking-tight text-foreground leading-tight">{result.interval}</div>
          {result.modality && <div className="text-[13.5px] text-foreground/72 mt-1.5">Guideline modality: {result.modality}</div>}
        </>
      )}

      {!awaiting && (
        <>
          <div className="mt-5 pt-4 border-t border-border">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-foreground/72 block mb-1.5">{result.override ? 'Why' : 'Driven by'}</span>
            <p className="text-[13.5px] leading-relaxed text-foreground/80">{result.driver}.</p>
          </div>
          {result.quote && (
            <div className="mt-4">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-foreground/72 block mb-1.5">{result.override ? 'Basis' : 'Guideline wording'}</span>
              <p className="text-[12.5px] leading-relaxed text-foreground/72 italic border-l-2 border-border pl-3">{result.quote}</p>
            </div>
          )}
          {result.notes.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {result.notes.map((note, i) => (
                <li key={i} className="text-[12.5px] leading-relaxed text-foreground/72 flex gap-2"><span className="text-brass mt-0.5" aria-hidden="true">→</span>{note}</li>
              ))}
            </ul>
          )}
        </>
      )}

      <div className="mt-5 pt-4 border-t border-border">
        <p className="text-[11.5px] leading-relaxed text-foreground/72 mb-2">Clinician reference. Not personal medical advice; confirm against the guideline for the individual patient.</p>
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-foreground/72 hover:text-accent leading-relaxed">{sourceName} ↗</a>
      </div>
    </div>
  )
}

function ResearchSection() {
  return (
    <section className="px-6 lg:px-10 py-14 lg:py-20 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">What is changing</span>
          <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
        </div>
        <h2 className="font-display text-[26px] lg:text-[34px] font-bold tracking-tight mb-4">Where post-polypectomy surveillance is heading</h2>
        <p className="text-[15px] leading-relaxed text-foreground/72 mb-10 max-w-2xl">Context only — this does not change the interval the calculator computes, which follows the guideline you select.</p>
        <div className="space-y-10">
          {RESEARCH.map((group) => (
            <div key={group.heading}>
              <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-foreground/72 mb-4 pb-2 border-b border-border">{group.heading}</h3>
              <div className="space-y-6">
                {group.items.map((item) => (
                  <div key={item.title}>
                    <div className="flex items-baseline gap-2 flex-wrap mb-1">
                      <h4 className="text-[15px] font-semibold text-foreground">{item.title}</h4>
                      <span className={`font-mono text-[10px] uppercase tracking-[0.06em] px-1.5 py-0.5 rounded-full ${item.strength === 'strong' ? 'text-[#1F6B47] bg-[#E6F1EA]' : 'text-[#8A6D2F] bg-[#F6EFE0]'}`}>{item.strength === 'strong' ? 'Strong evidence' : 'Early signal'}</span>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-foreground/72 mb-1.5">{item.body}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {item.sources.map((s) => (
                        <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-accent hover:underline">{s.label} ↗</a>
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
  )
}

function FaqSection() {
  return (
    <section className="px-6 lg:px-10 py-14 lg:py-20 border-b border-border">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent">Common questions</span>
          <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
        </div>
        <h2 className="font-display text-[26px] lg:text-[34px] font-bold tracking-tight mb-8">Colonoscopy surveillance intervals — quick answers</h2>
        <div className="divide-y divide-border">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="py-5">
              <h3 className="text-[16px] font-semibold text-foreground mb-2">{item.q}</h3>
              <p className="text-[14px] leading-relaxed text-foreground/80">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const RESEARCH: { heading: string; items: { title: string; body: string; strength: 'strong' | 'signal'; sources: { label: string; url: string }[] }[] }[] = [
  {
    heading: 'Guideline direction',
    items: [
      { title: 'The 2020 guidelines lengthened low-risk intervals — and real-world adherence lags', body: 'USMSTF 2020 and ESGE 2020 both pushed low-risk findings toward 7–10 years or back to screening, yet uptake lags: in one large US health system, roughly a quarter of screening colonoscopies were flagged as probable or possible overuse, and guideline-concordant interval-setting remains inconsistent in practice.', strength: 'strong', sources: [{ label: 'ESGE 2020', url: 'https://doi.org/10.1055/a-1185-3109' }, { label: 'Overuse data', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10294020/' }] },
      { title: 'Serrated-lesion surveillance is being defined by new metachronous-risk data', body: 'A 2024 systematic review and meta-analysis (14 studies, ~494,000 patients) quantified cancer and advanced-lesion risk after serrated-polyp resection, firming up which serrated findings warrant shorter intervals and which can be de-escalated.', strength: 'strong', sources: [{ label: 'GIE 2024', url: 'https://doi.org/10.1016/j.gie.2024.05.021' }] },
    ],
  },
  {
    heading: 'De-escalation evidence',
    items: [
      { title: 'The EPoS randomized trials test interval length head-on', body: 'The European Polyp Surveillance trials randomize low-risk patients to surveillance at 5 and 10 years versus 10 years only, and high-risk patients to 3/5/10 versus 5/10 years — the first large RCTs on interval length.', strength: 'strong', sources: [{ label: 'EPoS design', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5412707/' }] },
      { title: 'Modelling and national cohorts support returning low-risk adenomas to stool screening', body: 'Microsimulation and OncoSim analyses of sending 1–2 low-risk-adenoma patients back to FIT found little cancer penalty with large colonoscopy savings — the pathway Australia (iFOBT) and Canada (FIT) already encode for low-risk findings.', strength: 'signal', sources: [{ label: 'Return-to-FIT model', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11083724/' }] },
    ],
  },
  {
    heading: 'AI and optical diagnosis',
    items: [
      { title: 'AI optical diagnosis for "resect-and-discard" did not add net benefit (2024)', body: 'Pooling 11 studies, computer-aided diagnosis matched unassisted expert optical diagnosis on the proportion of diminutive polyps that could skip pathology, tempering the idea that AI can soon assign intervals in real time without histology.', strength: 'strong', sources: [{ label: 'Lancet Gastro Hep 2024', url: 'https://doi.org/10.1016/S2468-1253(24)00222-X' }] },
      { title: 'AI detection finds more small polyps — which can paradoxically shorten intervals', body: 'Because computer-aided detection raises adenoma detection without a matching rise in advanced lesions, microsimulation projects more patients crossed into surveillance.', strength: 'signal', sources: [{ label: 'BMJ Medicine 2025', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11955961/' }] },
    ],
  },
  {
    heading: 'Non-invasive tests',
    items: [
      { title: 'The Shield blood test won FDA screening approval (2024)', body: 'In the ECLIPSE trial, Guardant’s cell-free-DNA test showed 83% sensitivity for colorectal cancer at 90% specificity, and it is FDA-approved as a primary screening option for average-risk adults 45+. Approved for screening, not surveillance, and its sensitivity for advanced precancerous lesions is low (~13%).', strength: 'strong', sources: [{ label: 'ECLIPSE, NEJM 2024', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2304714' }, { label: 'FDA approval', url: 'https://www.fda.gov/medical-devices/recently-approved-devices/shield-p230009' }] },
    ],
  },
]
