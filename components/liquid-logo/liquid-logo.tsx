'use client'

import { useEffect, useState } from 'react'
import { parseLogoImage } from './parse-logo-image'
import { defaultParams, type ShaderParams } from './params'
import { LiquidCanvas } from './canvas'

export function LiquidLogo({
  src = '/icon.svg',
  params,
  className,
}: {
  src?: string
  params?: Partial<ShaderParams>
  className?: string
}) {
  const [imageData, setImageData] = useState<ImageData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const merged: ShaderParams = { ...defaultParams, ...params }

  useEffect(() => {
    let cancelled = false
    parseLogoImage(src)
      .then(({ imageData }) => {
        if (!cancelled) setImageData(imageData)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [src])

  if (error) {
    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b53a2c' }}>
        Logo load failed
      </div>
    )
  }

  if (!imageData) {
    return <div className={className} style={{ background: 'transparent' }} aria-hidden />
  }

  return <LiquidCanvas imageData={imageData} params={merged} className={className} />
}
