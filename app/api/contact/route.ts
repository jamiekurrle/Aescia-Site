import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TO = process.env.CONTACT_TO_EMAIL || 'contact@aesciahealth.com'
const FROM = process.env.CONTACT_FROM_EMAIL || 'Aescia Site <no-reply@aesciahealth.com>'

type Payload = {
  name?: string
  email?: string
  role?: string
  org?: string
  country?: string
  notes?: string
  path?: 'hospital' | 'clinic'
  intent?: string
  hp?: string
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  let data: Payload
  try {
    data = (await request.json()) as Payload
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload.' }, { status: 400 })
  }

  // Honeypot: spam bots fill everything including hidden fields.
  if (data.hp && data.hp.trim().length > 0) {
    // Look successful to the bot, but do nothing.
    return NextResponse.json({ ok: true })
  }

  const required: (keyof Payload)[] = ['name', 'email', 'role', 'org', 'country']
  for (const field of required) {
    if (!data[field] || String(data[field]).trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: `Missing field: ${field}` },
        { status: 400 },
      )
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(String(data.email))) {
    return NextResponse.json(
      { ok: false, error: 'Please provide a valid work email.' },
      { status: 400 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set.')
    return NextResponse.json(
      {
        ok: false,
        error: 'The contact endpoint is not configured. Please email contact@aesciahealth.com directly.',
      },
      { status: 503 },
    )
  }

  const resend = new Resend(apiKey)
  const pathLabel = data.path === 'clinic' ? 'Clinic' : 'Hospital'
  const subject = `${pathLabel} enquiry · ${String(data.org).slice(0, 80)}`

  const lines: string[] = [
    `New enquiry from aesciahealth.com`,
    ``,
    `Path: ${data.path ?? 'unknown'}`,
    `Intent: ${data.intent ?? 'none'}`,
    `Name: ${data.name}`,
    `Role: ${data.role}`,
    `Organisation: ${data.org}`,
    `Country: ${data.country}`,
    `Email: ${data.email}`,
    ``,
    `Notes:`,
    `${data.notes ?? '(none)'}`,
  ]
  const text = lines.join('\n')
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height:1.55; color:#0B1F2A;">
      <h2 style="font-family: Georgia, serif; font-weight:400; margin:0 0 16px 0;">New ${escapeHtml(pathLabel).toLowerCase()} enquiry</h2>
      <p style="margin:0 0 20px 0; color:#555;">Received from aesciahealth.com contact form.</p>
      <table style="border-collapse: collapse; width:100%; max-width:560px;">
        ${[
          ['Path', data.path ?? 'unknown'],
          ['Intent', data.intent ?? 'none'],
          ['Name', data.name ?? ''],
          ['Role', data.role ?? ''],
          ['Organisation', data.org ?? ''],
          ['Country', data.country ?? ''],
          ['Email', data.email ?? ''],
        ]
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px; border-bottom:1px solid #eee; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#888; vertical-align:top; width:130px;">${escapeHtml(
                k,
              )}</td><td style="padding:8px 12px; border-bottom:1px solid #eee; color:#0B1F2A;">${escapeHtml(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <h3 style="font-family: Georgia, serif; font-weight:400; margin:28px 0 8px 0;">Notes</h3>
      <p style="white-space: pre-wrap; color:#0B1F2A;">${escapeHtml(String(data.notes ?? '(none)'))}</p>
    </div>
  `

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: String(data.email),
      subject,
      text,
      html,
      headers: {
        'X-Aescia-Path': String(data.path ?? 'unknown'),
        'X-Aescia-Intent': String(data.intent ?? 'none'),
      },
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json(
        { ok: false, error: 'Email delivery failed. Please email contact@aesciahealth.com directly.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json(
      { ok: false, error: 'Email delivery failed. Please email contact@aesciahealth.com directly.' },
      { status: 500 },
    )
  }
}
