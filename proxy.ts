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

  // Private preview: /tools/rpah is the RPAH SAFE-Discharge patient app demo.
  // Unlocked by an httpOnly cookie set from /api/rpah-unlock, so the password
  // never reaches the browser and the static file underneath cannot be reached
  // around the gate. /tools/ is already Disallow'd in robots.txt; the header
  // below covers a link leaking somewhere that ignores it.
  if (pathname === '/tools/rpah' || pathname.startsWith('/tools/rpah/')) {
    if (req.cookies.get('rpah_preview')?.value !== '1') {
      return new NextResponse(rpahGatePage(req.nextUrl.searchParams.get('wrong') === '1'), {
        status: 401,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
          'Cache-Control': 'no-store',
        },
      })
    }
  }

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

  // Nothing under /tools/ is public-facing. robots.txt disallows it; this makes
  // it explicit for anything that fetches the page without reading robots.
  if (pathname.startsWith('/tools/')) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  }

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

// The gate page. Same shape as the trial-demo gates on the clinical app: a
// stone ground, a paper card, brass eyebrow. Served straight from the proxy so
// it needs no route of its own, and posts to /api/rpah-unlock, which is where
// the password actually lives.
function rpahGatePage(wrong: boolean) {
  return `<!doctype html>
<html lang="en-AU"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>RPAH Cardiothoracics &mdash; private preview</title>
<style>
  :root{--stone:#F4F6FA;--paper:#FFFFFF;--ink:#1B2745;--ink60:#475A82;--ink40:#7286A8;
        --border:#E2E6EE;--stone-soft:#EBEFF5;--brass:#A6885A;--red:#B53A2C;
        --font:ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       padding:20px;background:var(--stone);color:var(--ink);font-family:var(--font)}
  .card{width:100%;max-width:28rem;background:var(--paper);border:1px solid var(--border);
        border-radius:16px;padding:32px}
  .eyebrow{display:flex;align-items:center;gap:8px;margin-bottom:8px;color:var(--brass);
           font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.22em}
  h1{margin:0;font-size:26px;line-height:1.1;letter-spacing:-.02em}
  p{margin:12px 0 0;font-size:14px;line-height:1.65;color:var(--ink60)}
  a{color:var(--ink);font-weight:600}
  form{margin-top:24px;display:flex;flex-direction:column;gap:12px}
  label span{display:block;margin-bottom:8px;font-size:10px;font-weight:600;
             text-transform:uppercase;letter-spacing:.22em;color:var(--ink40)}
  input{width:100%;padding:12px 16px;font-size:16px;font-family:inherit;color:var(--ink);
        background:var(--stone-soft);border:1px solid ${wrong ? 'var(--red)' : 'var(--border)'};
        border-radius:8px}
  input:focus{outline:2px solid var(--brass);outline-offset:1px}
  .err{margin:0;font-size:12px;font-weight:600;color:var(--red)}
  button{width:100%;padding:13px 20px;font-size:14px;font-weight:600;font-family:inherit;
         color:#fff;background:var(--ink);border:none;border-radius:8px;cursor:pointer}
  button:disabled{opacity:.4;cursor:not-allowed}
</style></head>
<body>
  <div class="card">
    <div class="eyebrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Private preview</div>
    <h1>RPAH Cardiothoracics.</h1>
    <p>The SAFE-Discharge patient app, with a synthetic patient. If James shared the password with you, enter it below. Otherwise email <a href="mailto:james@aesciahealth.com">james@aesciahealth.com</a>.</p>
    <form method="POST" id="f">
      <label><span>Access password</span>
        <input type="password" name="password" id="pw" autofocus autocomplete="current-password" required>
      </label>
      ${wrong ? '<p class="err">That password did not match. Try again, or email James.</p>' : ''}
      <button type="submit" id="go">Open the preview</button>
    </form>
  </div>
<script>
  var f=document.getElementById('f'), pw=document.getElementById('pw'), go=document.getElementById('go');
  f.addEventListener('submit', async function(e){
    e.preventDefault(); go.disabled=true; go.textContent='Checking…';
    try{
      var r=await fetch('/api/rpah-unlock',{method:'POST',headers:{'content-type':'application/json'},
        body:JSON.stringify({password:pw.value})});
      if(r.ok){ location.reload(); return; }
    }catch(err){}
    location.replace(location.pathname+'?wrong=1');
  });
</script>
</body></html>`
}
