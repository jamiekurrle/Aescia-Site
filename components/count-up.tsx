'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `value` when `started` flips true, over ~1.1s
 * with an ease-out curve. Only cited figures are ever passed in here; the
 * animation is presentation, the number is the claim.
 *
 * Accessibility: the animated span is aria-hidden and the final formatted
 * value is always present for screen readers; prefers-reduced-motion renders
 * the final value with no animation.
 */
export function CountUp({
  value,
  started,
  prefix = '',
  suffix = '',
}: {
  value: number
  started: boolean
  prefix?: string
  suffix?: string
}) {
  const [display, setDisplay] = useState(0)
  const [reduced, setReduced] = useState(false)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!started || reduced) return
    const t0 = performance.now()
    const duration = 1100
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(value * eased))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [started, reduced, value])

  const format = (n: number) => `${prefix}${n.toLocaleString('en-US')}${suffix}`
  const final = format(value)
  const shown = reduced ? final : format(display)

  return (
    <>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{final}</span>
    </>
  )
}
