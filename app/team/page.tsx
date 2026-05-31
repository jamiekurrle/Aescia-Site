import type { Metadata } from 'next'
import { breadcrumbSchema } from '@/lib/schema'
import { TeamContent } from './team-content'

export const metadata: Metadata = {
  title: 'The Aescia team and how we support customers',
  description:
    'James Kurrle (CEO, critical-care physician) and Vasken Dermardiros (CTO, Concordia PhD) lead Aescia, with named clinical collaborators including Kei Woldendorp at Royal Prince Alfred Hospital. Bootstrapped to date; non-dilutive grants in flight; SAFE round opens Q4 2026. Named implementation contact during the design-partner phase; coverage across Sydney, Barcelona, and US timezones.',
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Team | Aescia',
    description: 'Founders, operating team, and named clinical collaborators. Funding posture and support model.',
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
