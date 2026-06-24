import { updatesEntries } from '@/lib/updates'

const SITE_URL = 'https://www.aesciahealth.com'

// JSON Feed 1.1 (jsonfeed.org) of the company updates log, for agents and
// aggregators that monitor for changes. Same source as the /updates page and
// its ItemList JSON-LD (lib/updates.ts).
export function GET() {
  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Aescia updates',
    home_page_url: `${SITE_URL}/updates`,
    feed_url: `${SITE_URL}/feed.json`,
    description:
      'A dated log of what Aescia has shipped, what trials and programmes have opened, and what is coming next.',
    language: 'en',
    items: updatesEntries.map((e) => ({
      id: `${SITE_URL}/updates#e${e.n}`,
      url: e.url ?? `${SITE_URL}/updates#e${e.n}`,
      title: e.title,
      content_text: e.body,
      date_published: `${e.date}T00:00:00Z`,
    })),
  }

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'content-type': 'application/feed+json; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
