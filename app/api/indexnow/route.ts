import { NextResponse } from 'next/server'

// IndexNow submission endpoint.
//
// IndexNow lets us push new or changed URLs to participating search engines
// (Bing, Yandex, and others) for near-immediate crawling, instead of waiting
// for them to rediscover the sitemap. Brave's index keys off Googlebot, which
// IndexNow does not feed, so this is complementary to the sitemap, not a
// replacement for it.
//
// The IndexNow key is NOT a secret. It is a public ownership token, served as a
// plain-text file at /<key>.txt (see public/<key>.txt). A committed default is
// provided so this works out of the box; override with the INDEXNOW_KEY env var
// in Vercel if the key is ever rotated (and update the public file to match).

const SITE_URL = 'https://aesciahealth.com'
const SITE_HOST = 'aesciahealth.com'
const DEFAULT_KEY = '3f9a1c7e5b2d4860a1f8c3e90d7b6a24'

function resolveKey() {
  return process.env.INDEXNOW_KEY || DEFAULT_KEY
}

// Normalise an incoming path or absolute URL to an absolute URL on this host.
function toAbsolute(input: string): string | null {
  if (typeof input !== 'string') return null
  const trimmed = input.trim()
  if (!trimmed) return null
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed.startsWith(SITE_URL) ? trimmed : null
  }
  return `${SITE_URL}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`
}

export async function POST(request: Request) {
  const key = resolveKey()

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body. Expected { "urls": ["/path", ...] }.' }, { status: 400 })
  }

  const rawUrls = (body as { urls?: unknown })?.urls
  if (!Array.isArray(rawUrls) || rawUrls.length === 0) {
    return NextResponse.json({ error: 'Provide a non-empty "urls" array of paths or absolute URLs.' }, { status: 400 })
  }

  const urlList = Array.from(
    new Set(rawUrls.map((u) => toAbsolute(String(u))).filter((u): u is string => Boolean(u))),
  )

  if (urlList.length === 0) {
    return NextResponse.json({ error: 'No valid URLs for this host after normalisation.' }, { status: 400 })
  }

  const payload = {
    host: SITE_HOST,
    key,
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList,
  }

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })

    return NextResponse.json(
      {
        submitted: urlList.length,
        indexNowStatus: res.status,
        ok: res.ok,
        urls: urlList,
      },
      { status: res.ok ? 200 : 502 },
    )
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to reach the IndexNow API.', detail: err instanceof Error ? err.message : String(err) },
      { status: 502 },
    )
  }
}

// A GET returns the resolved key location so the setup can be verified in a
// browser without exposing anything sensitive.
export async function GET() {
  const key = resolveKey()
  return NextResponse.json({
    keyLocation: `${SITE_URL}/${key}.txt`,
    usage: 'POST { "urls": ["/path", ...] } to submit URLs to IndexNow.',
  })
}
