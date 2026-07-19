'use client'

import { useEffect, useMemo, useState } from 'react'

interface TypewriterTextProps {
  text: string
  speedMs?: number
  startDelayMs?: number
  className?: string
  onDone?: () => void
}

// The script-detection patterns below use ES2018 Unicode property escapes.
// They are built with the RegExp constructor because regex literals are
// validated against the TypeScript compile target (ES6 here), which predates
// property escapes; every browser and Node version this site supports
// evaluates them natively at runtime.

// Letters that join cursively or carry combining marks (Arabic-family
// scripts, or any combining mark). Splitting these into per-character boxes
// breaks glyph shaping: Arabic letters fall back to their isolated forms and
// marks detach from their base character. Words containing them are revealed
// as whole units instead.
const JOINING_OR_COMBINING = new RegExp(
  '[\\p{Script=Arabic}\\p{Script=Syriac}\\p{Script=Mongolian}\\p{Script=Nko}]|\\p{M}',
  'u'
)

// Scripts written without spaces between words (Chinese, Japanese, Thai,
// Lao, Khmer, Burmese). Whitespace splitting yields one giant unbreakable
// token for these, which cannot wrap on small screens, so text containing
// them is segmented into words with Intl.Segmenter.
const NO_SPACE_RANGES =
  '\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}\\p{Script=Thai}\\p{Script=Lao}\\p{Script=Khmer}\\p{Script=Myanmar}'
const NO_SPACE_SCRIPT = new RegExp(`[${NO_SPACE_RANGES}]`, 'u')

// Splitter for no-space scripts in browsers without Intl.Segmenter (Firefox
// before 125): each no-space-script character becomes its own token so lines
// can break anywhere, matching how those scripts wrap natively; runs of any
// other characters stay whole.
const NO_SPACE_FALLBACK = new RegExp(`\\s+|[${NO_SPACE_RANGES}]|[^\\s${NO_SPACE_RANGES}]+`, 'gu')

// Closing punctuation that must not start a line. Segmenters emit these as
// standalone tokens; merging each into the preceding token preserves the
// no-line-start rule once tokens become atomic inline blocks.
const CLOSING_PUNCTUATION = /^[。．，、！？；：）】」』〉》…‥·]+$/

function tokenize(text: string): string[] {
  if (!NO_SPACE_SCRIPT.test(text)) {
    return text.split(/(\s+)/).filter((token) => token.length > 0)
  }
  const raw =
    typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function'
      ? Array.from(new Intl.Segmenter(undefined, { granularity: 'word' }).segment(text), (s) => s.segment)
      : text.match(NO_SPACE_FALLBACK) ?? [text]
  const tokens: string[] = []
  for (const token of raw) {
    const prev = tokens[tokens.length - 1]
    if (prev !== undefined && !/\s$/.test(prev) && CLOSING_PUNCTUATION.test(token)) {
      tokens[tokens.length - 1] = prev + token
    } else {
      tokens.push(token)
    }
  }
  return tokens
}

/**
 * Reveals text one character at a time with a blinking caret. The full
 * string is always present in a visually-hidden span so screen readers and
 * no-JS/crawler renders get the complete text immediately rather than the
 * in-progress fragment. Falls back to an instant, full reveal for
 * prefers-reduced-motion. Words in joining or mark-bearing scripts (Arabic
 * and friends) fade in as whole units so their glyphs shape together, and
 * no-space scripts (Chinese, Japanese, Thai) wrap at segmented word
 * boundaries instead of rendering as one unbreakable run.
 */
export function TypewriterText({ text, speedMs = 24, startDelayMs = 0, className, onDone }: TypewriterTextProps) {
  const chars = useMemo(() => Array.from(text), [text])
  const tokens = useMemo(() => tokenize(text), [text])
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setShown(chars.length)
      setTyping(false)
      onDone?.()
      return
    }

    let rafId = 0
    let start = 0
    let hiddenSince = 0
    let hiddenTotal = 0
    // The start timer arms the loop; the visibility handler may only resume
    // a loop that has been armed and has not yet finished. These flags keep
    // a hide/show cycle from starting the loop before the stagger delay has
    // elapsed (which would leave a second concurrent loop running when the
    // timer fired) and from restarting a completed loop and re-firing onDone.
    let started = false
    let done = false

    // requestAnimationFrame never fires while the tab is backgrounded, but
    // elapsed wall-clock time keeps advancing — without this adjustment, a
    // tab hidden for longer than the animation's total duration would jump
    // straight to "fully typed" the instant it regains focus, skipping the
    // animation entirely. Tracking hidden time and excluding it keeps the
    // reveal paused while hidden and resumed correctly when visible again.
    const loop = (now: number) => {
      if (!start) start = now
      const count = Math.max(0, Math.min(chars.length, Math.floor((now - start - hiddenTotal) / speedMs)))
      setShown(count)
      if (count >= chars.length) {
        done = true
        setTyping(false)
        onDone?.()
        return
      }
      rafId = requestAnimationFrame(loop)
    }

    const handleVisibility = () => {
      if (document.hidden) {
        if (started && !done) hiddenSince = performance.now()
        cancelAnimationFrame(rafId)
      } else {
        // Hidden time only offsets a loop that has already rendered a frame;
        // before the first frame there is nothing to offset.
        if (hiddenSince && start) hiddenTotal += performance.now() - hiddenSince
        hiddenSince = 0
        if (started && !done) rafId = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const startTimer = setTimeout(() => {
      started = true
      if (!document.hidden) rafId = requestAnimationFrame(loop)
    }, startDelayMs)

    return () => {
      clearTimeout(startTimer)
      cancelAnimationFrame(rafId)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  // Every character of the full string is always in the DOM (opacity 0 until
  // revealed), so the final line-wrapping is fixed from the first frame and
  // nothing reflows as characters light up. An inline-block char span is an
  // atomic box, so the browser treats the gap between any two of them as a
  // valid line-break point — wrapping each word's chars in a nowrap span
  // keeps words intact while still animating individual letters inside them.
  const caret = (key: React.Key) => (
    <span key={key} aria-hidden="true" className={`typewriter-caret ${typing ? 'typewriter-caret-blink' : 'typewriter-caret-hidden'}`} />
  )

  const revealed = useMemo(() => {
    let consumed = 0
    const nodes: React.ReactNode[] = []
    for (let ti = 0; ti < tokens.length; ti++) {
      const token = tokens[ti]
      const tokenChars = Array.from(token)
      const isWhitespace = /^\s+$/.test(token)

      // Words in joining or mark-bearing scripts reveal as one unit: the
      // typewriter-char classes provide the same fade, applied to the whole
      // word so its glyphs shape together.
      if (!isWhitespace && JOINING_OR_COMBINING.test(token)) {
        nodes.push(
          <span
            key={ti}
            className={`typewriter-word typewriter-char ${shown > consumed ? 'typewriter-char-revealed' : ''}`}
          >
            {token}
          </span>
        )
        if (shown >= consumed && shown < consumed + tokenChars.length) nodes.push(caret(`caret-${consumed}`))
        consumed += tokenChars.length
        continue
      }

      const spans: React.ReactNode[] = []
      tokenChars.forEach((c, i) => {
        const globalIndex = consumed + i
        if (globalIndex === shown) spans.push(caret(`caret-${globalIndex}`))
        if (c === '\n') {
          spans.push(<br key={i} />)
          return
        }
        if (isWhitespace) {
          // Plain text, not an inline-block box: a space has nothing to
          // fade in, and keeping it as ordinary text lets the browser
          // collapse it away at a line wrap like any normal space would,
          // instead of carrying it over as a leading gap on the next line.
          spans.push(c)
          return
        }
        spans.push(
          <span key={i} className={`typewriter-char ${globalIndex < shown ? 'typewriter-char-revealed' : ''}`}>
            {c}
          </span>
        )
      })
      nodes.push(isWhitespace ? <span key={ti}>{spans}</span> : <span key={ti} className="typewriter-word">{spans}</span>)
      consumed += tokenChars.length
    }
    if (shown >= chars.length) nodes.push(caret('caret-end'))
    return nodes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, shown, typing])

  return (
    <span className={className}>
      <span aria-hidden="true">{revealed}</span>
      <span className="sr-only">{text}</span>
      <style jsx global>{`
        .typewriter-word {
          display: inline-block;
          white-space: nowrap;
        }
        .typewriter-char {
          display: inline-block;
          white-space: pre;
          opacity: 0;
        }
        .typewriter-char-revealed {
          animation: typewriter-char-in 110ms ease-out forwards;
        }
        @keyframes typewriter-char-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .typewriter-caret {
          /* Zero net width (width + margins cancel out) so the caret paints
             a bar without pushing any of the already-laid-out text beside
             it — it moves across the line as typing progresses without
             nudging anything else along the way. Logical margins keep it on
             the trailing side in right-to-left text. */
          display: inline-block;
          width: 2px;
          height: 0.82em;
          margin-inline-start: 2px;
          margin-inline-end: -4px;
          background: currentColor;
          vertical-align: -0.08em;
        }
        .typewriter-caret-blink {
          animation: typewriter-blink 0.9s step-end infinite;
        }
        .typewriter-caret-hidden {
          opacity: 0;
          transition: opacity 0.35s ease-out;
        }
        @keyframes typewriter-blink {
          0%,
          45% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .typewriter-caret {
            display: none;
          }
        }
      `}</style>
    </span>
  )
}
