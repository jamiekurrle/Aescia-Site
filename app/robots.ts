import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.aesciahealth.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/tools/', '/v2/'],
      },
      // AI crawlers: explicit allow. Aescia wants to be discoverable and cited
      // by LLM-backed discovery tools the same way traditional search engines
      // index the site. No disallow rules here; follow /robots.txt defaults.
      { userAgent: 'GPTBot', allow: '/', disallow: ['/v2/'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/v2/'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/v2/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/v2/'] },
      { userAgent: 'Claude-Web', allow: '/', disallow: ['/v2/'] },
      { userAgent: 'anthropic-ai', allow: '/', disallow: ['/v2/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/v2/'] },
      { userAgent: 'Perplexity-User', allow: '/', disallow: ['/v2/'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/v2/'] },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/v2/'] },
      { userAgent: 'Bytespider', allow: '/', disallow: ['/v2/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
