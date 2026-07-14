import type { JurId } from './engine'

// URL slug <-> jurisdiction. US is the base path (/colonoscopy-surveillance);
// the rest get /colonoscopy-surveillance/[slug]. Plain module so both the
// client UI and the server routes can import it.
export const SLUG_TO_JUR: Record<string, JurId> = {
  'united-states': 'US',
  'canada-ontario': 'CA_ON',
  'canada-alberta': 'CA_AB',
  'canada-british-columbia': 'CA_BC',
  australia: 'AU',
  europe: 'EU',
}

export const JUR_TO_SLUG: Record<JurId, string> = {
  US: 'united-states',
  CA_ON: 'canada-ontario',
  CA_AB: 'canada-alberta',
  CA_BC: 'canada-british-columbia',
  AU: 'australia',
  EU: 'europe',
}

// Europe / EEA / UK ISO-3166 codes that map to the ESGE guideline.
const EUROPE = new Set([
  'GB', 'IE', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'LU', 'PT', 'AT', 'CH', 'SE',
  'NO', 'DK', 'FI', 'IS', 'PL', 'CZ', 'SK', 'SI', 'HR', 'HU', 'RO', 'BG', 'GR',
  'EE', 'LV', 'LT', 'MT', 'CY',
])

// Map a visitor's country (Vercel x-vercel-ip-country) to the closest guideline.
// This only pre-selects the switcher; the base page's SEO metadata stays US.
export function countryToJur(cc: string | null | undefined): JurId {
  if (!cc) return 'US'
  const c = cc.toUpperCase()
  if (c === 'CA') return 'CA_ON'
  if (c === 'AU' || c === 'NZ') return 'AU'
  if (EUROPE.has(c)) return 'EU'
  return 'US'
}
