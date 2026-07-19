'use client'

import { useEffect, useMemo, useState } from 'react'

interface TypewriterTextProps {
  text: string
  speedMs?: number
  startDelayMs?: number
  className?: string
  onDone?: () => void
}

/**
 * Reveals text one character at a time with a blinking caret. The full
 * string is always present in a visually-hidden span so screen readers and
 * no-JS/crawler renders get the complete text immediately rather than the
 * in-progress fragment. Falls back to an instant, full reveal for
 * prefers-reduced-motion.
 */
export function TypewriterText({ text, speedMs = 24, startDelayMs = 0, className, onDone }: TypewriterTextProps) {
  const chars = useMemo(() => Array.from(text), [text])
  const tokens = useMemo(() => text.split(/(\s+)/).filter((token) => token.length > 0), [text])
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

    // requestAnimationFrame never fires while the tab is backgrounded, but
    // elapsed wall-clock time keeps advancing — without this adjustment, a
    // tab hidden for longer than the animation's total duration would jump
    // straight to "fully typed" the instant it regains focus, skipping the
    // animation entirely. Tracking hidden time and excluding it keeps the
    // reveal paused while hidden and resumed correctly when visible again.
    const loop = (now: number) => {
      if (!start) start = now
      const count = Math.min(chars.length, Math.floor((now - start - hiddenTotal) / speedMs))
      setShown(count)
      if (count >= chars.length) {
        setTyping(false)
        onDone?.()
        return
      }
      rafId = requestAnimationFrame(loop)
    }

    const handleVisibility = () => {
      if (document.hidden) {
        hiddenSince = performance.now()
        cancelAnimationFrame(rafId)
      } else {
        if (hiddenSince) {
          hiddenTotal += performance.now() - hiddenSince
          hiddenSince = 0
        }
        rafId = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const startTimer = setTimeout(() => {
      if (document.hidden) {
        hiddenSince = performance.now()
      } else {
        rafId = requestAnimationFrame(loop)
      }
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
             nudging anything else along the way. */
          display: inline-block;
          width: 2px;
          height: 0.82em;
          margin-left: 2px;
          margin-right: -4px;
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
