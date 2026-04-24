import type { Metadata } from 'next'
import { breadcrumbSchema } from '@/lib/schema'
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

export default function UpdatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <UpdatesContent />
    </>
  )
}
