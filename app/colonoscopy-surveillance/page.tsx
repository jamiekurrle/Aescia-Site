import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { makeMetadata, SurveillancePageShell } from './shared'
import { countryToJur } from './slugs'

// Base page = United States (USMSTF 2020) for SEO/canonical. Per-guideline pages
// live at /colonoscopy-surveillance/[slug] (australia, canada-ontario,
// canada-alberta, canada-british-columbia, europe) for bookmarking and ranking.
// The visitor's country only pre-selects the switcher; metadata stays US.
export const metadata: Metadata = makeMetadata('US', '/colonoscopy-surveillance')

export default async function ColonoscopySurveillancePage() {
  const h = await headers()
  const initialJur = countryToJur(h.get('x-vercel-ip-country'))
  return <SurveillancePageShell jur="US" canonicalPath="/colonoscopy-surveillance" initialJur={initialJur} />
}
