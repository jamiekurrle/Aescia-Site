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
export async function proxy(req: NextRequest) {
  if (req.headers.get('host') === 'aesciahealth.com') {
    const url = req.nextUrl.clone()
    url.protocol = 'https'
    url.host = 'www.aesciahealth.com'
    url.port = '' // default 443; guards against a port leaking into the redirect
    return NextResponse.redirect(url, 308)
  }

  // Markdown for agents: when a client requests text/markdown, serve the
  // curated /llms-full.txt instead of the HTML page. Browsers never send this
  // Accept value, so they still get HTML. Applies to any content page (not
  // /api/* and not file-like paths such as /facts.json or /sitemap.xml, which
  // serve their own representations). Fails open: any error returns the normal
  // response.
  const pathname = req.nextUrl.pathname
  const isContentPage = !pathname.startsWith('/api') && !/\.[a-z0-9]+$/i.test(pathname)
  if (
    req.method === 'GET' &&
    isContentPage &&
    (req.headers.get('accept') || '').includes('text/markdown')
  ) {
    try {
      const md = await fetch(new URL('/llms-full.txt', req.nextUrl.origin))
      if (md.ok) {
        return new NextResponse(await md.text(), {
          status: 200,
          headers: {
            'content-type': 'text/markdown; charset=utf-8',
            // Tell caches the representation depends on Accept, so a browser
            // and an agent hitting the same URL don't get each other's body.
            vary: 'Accept',
            'cache-control': 'public, max-age=3600',
          },
        })
      }
    } catch {
      // fall through to the normal HTML response
    }
  }

  const res = NextResponse.next()

  // RFC 8288 Link headers on the homepage: point agents at the machine-readable
  // descriptions of the site that actually exist — the /llms.txt index, the
  // /llms-full.txt snapshot, the /facts.json fact sheet, and the /feed.json
  // updates feed. All are real resources, so no dead links.
  if (pathname === '/') {
    res.headers.set(
      'Link',
      '</llms.txt>; rel="describedby"; type="text/plain", ' +
        '</llms-full.txt>; rel="describedby"; type="text/markdown", ' +
        '</facts.json>; rel="describedby"; type="application/json", ' +
        '</feed.json>; rel="alternate"; type="application/feed+json"',
    )
  }

  return res
}

export const config = {
  // Run on everything except Next internals and static assets. This still
  // covers pages, /sitemap.xml, /robots.txt, and API routes, so every apex
  // request canonicalises to www.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
