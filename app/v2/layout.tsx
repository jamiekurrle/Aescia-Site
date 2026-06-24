import { notFound } from 'next/navigation'

// The /v2/* routes are marketing-site design experiments, not production pages.
// They stay in the repo (and remain viewable in preview + local dev) but are
// hidden from production so they never ship to aesciahealth.com. They were
// already excluded from sitemap.ts and disallowed in robots.txt; this closes
// the last gap (direct access) by 404-ing the whole subtree on prod deploys.
export default function V2Layout({ children }: { children: React.ReactNode }) {
  if (process.env.VERCEL_ENV === 'production') {
    notFound()
  }
  return <>{children}</>
}
