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

// The guideline a route resolves to. The pathname is the sole authority: the
// base path is the United States (USMSTF), and every other path is its slug's
// guideline. This is a pure function of the path, so no stored, geo, or prior
// state can make a route render a guideline that disagrees with its own title
// and canonical URL.
export function routeToJur(pathname: string): JurId {
  const slug = pathname.replace(/^\/colonoscopy-surveillance\/?/, '').replace(/\/$/, '')
  return (slug && SLUG_TO_JUR[slug]) || 'US'
}
