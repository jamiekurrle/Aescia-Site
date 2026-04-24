import type { Metadata } from 'next'
import { breadcrumbSchema } from '@/lib/schema'
import { TeamContent } from './team-content'

export const metadata: Metadata = {
  title: 'The team behind Aescia',
  description:
    'Founders, operating team, and named clinical collaborators building a continuous-care platform for surgical recovery and specialty-clinic workflow.',
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Team | Aescia',
    description: 'Founders, operating team, and named clinical collaborators building Aescia.',
    url: '/team',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Team', url: '/team' },
])

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <TeamContent />
    </>
  )
}
