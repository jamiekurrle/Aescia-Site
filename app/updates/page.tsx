import type { Metadata } from 'next'
import { breadcrumbSchema, updatesItemListSchema } from '@/lib/schema'
import { updatesEntries } from '@/lib/updates'
import { UpdatesContent } from './updates-content'

export const metadata: Metadata = {
  title: 'Updates',
  description:
    'A dated log of what Aescia has shipped, what trials and programmes have opened, and what is coming next. No press copy, just facts.',
  alternates: { canonical: '/updates' },
  openGraph: {
    title: 'Updates | Aescia',
    description: 'A dated log of what shipped, what opened, and what is next.',
    url: '/updates',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Updates', url: '/updates' },
])

// Structured-data ItemList for the updates log, sourced from lib/updates.ts
// (the single source shared with /feed.json). Published in English so search
// engines and LLM crawlers ingest one canonical version; the on-page list is
// locale-aware via the i18n provider.
const updatesItemList = updatesItemListSchema(updatesEntries)

export default function UpdatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(updatesItemList) }}
      />
      <UpdatesContent />
    </>
  )
}
