import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Canonical host is https://www.aesciahealth.com.
//
// Redirect the apex (non-www) host to www with a permanent (308) redirect,
// preserving the full path and query string. Exact host equality is used on
// purpose: the www host can never satisfy `=== 'aesciahealth.com'`, so this
// cannot create a redirect loop. (Done here rather than a next.config
// redirects() `has` host rule because that host match is an unanchored regex,
// where "aesciahealth.com" also matches the substring inside
// "www.aesciahealth.com" and would loop.)
//
// Cloudflare is DNS-only for this domain, so it does not perform the redirect;
// this runs at the Vercel edge for both hosts.
//
// File convention: Next.js 16 renamed `middleware` to `proxy`.
export function proxy(req: NextRequest) {
  if (req.headers.get('host') === 'aesciahealth.com') {
    const url = req.nextUrl.clone()
    url.protocol = 'https'
    url.host = 'www.aesciahealth.com'
    url.port = '' // default 443; guards against a port leaking into the redirect
    return NextResponse.redirect(url, 308)
  }
  return NextResponse.next()
}

export const config = {
  // Run on everything except Next internals and static assets. This still
  // covers pages, /sitemap.xml, /robots.txt, and API routes, so every apex
  // request canonicalises to www.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
