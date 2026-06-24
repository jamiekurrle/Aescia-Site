const SITE_URL = 'https://www.aesciahealth.com'

// AI crawlers we explicitly allow (same set as the previous metadata robots).
// Aescia wants to be discoverable and cited by LLM-backed tools the same way
// traditional search engines index the site. /v2/ stays disallowed everywhere.
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bytespider',
]

// Served as a Route Handler (not the Next.js metadata `robots.ts`) because the
// metadata API cannot emit the Content-Signal directive.
export function GET() {
  const blocks: string[] = []

  blocks.push(
    [
      'User-Agent: *',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /_next/',
      'Disallow: /tools/',
      'Disallow: /v2/',
      // Content Signals (contentsignals.org / draft-romm-aipref-contentsignals):
      // how this site's content may be used by automated systems. Aescia wants
      // to be found and cited, so all three are yes.
      'Content-Signal: search=yes, ai-input=yes, ai-train=yes',
    ].join('\n'),
  )

  for (const bot of AI_BOTS) {
    blocks.push(['User-Agent: ' + bot, 'Allow: /', 'Disallow: /v2/'].join('\n'))
  }

  blocks.push('Sitemap: ' + SITE_URL + '/sitemap.xml')

  return new Response(blocks.join('\n\n') + '\n', {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
