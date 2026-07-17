import type { Metadata } from 'next'
import { makeMetadata, SurveillancePageShell } from './shared'

// Base page = United States (USMSTF 2020). Per-guideline pages live at
// /colonoscopy-surveillance/[slug] (australia, canada-ontario, canada-alberta,
// canada-british-columbia, europe). The route sets the guideline: the base path
// always renders the US guideline, matching its title and canonical URL. A
// visitor picks another guideline through the switcher, which navigates to that
// guideline's own route.
export const metadata: Metadata = makeMetadata('US', '/colonoscopy-surveillance')

export default function ColonoscopySurveillancePage() {
  return <SurveillancePageShell jur="US" canonicalPath="/colonoscopy-surveillance" />
}
