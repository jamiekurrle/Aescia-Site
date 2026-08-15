import { NextResponse } from 'next/server'

// Unlocks the private RPAH preview at /tools/rpah.
//
// The password is checked here rather than in the page, so it never reaches the
// browser. On success the response carries an httpOnly cookie that proxy.ts
// looks for; the static file under /tools/rpah cannot be reached without it.

export const runtime = 'edge'

export async function POST(req: Request) {
  let password = ''
  try {
    const body = (await req.json()) as { password?: unknown }
    password = typeof body.password === 'string' ? body.password : ''
  } catch {
    password = ''
  }

  const expected = process.env.RPAH_PREVIEW_PASSWORD || 'rpah'
  if (password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('rpah_preview', '1', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/tools/rpah',
    maxAge: 60 * 60 * 12,
  })
  return res
}
