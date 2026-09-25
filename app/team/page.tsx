import type { Metadata } from 'next'
import { breadcrumbSchema } from '@/lib/schema'
import { TeamContent } from './team-content'

export const metadata: Metadata = {
  title: 'The Aescia team and how we support customers',
  description:
    'James Kurrle (Chief Executive Officer, a hospital doctor with critical care experience) and Dr Vasken Dermardiros (Chief Technology Officer, Concordia PhD) work on Aescia full time. Dr Kei Woldendorp is Principal Investigator of the SAFE-Discharge trial at Royal Prince Alfred Hospital, sponsored by Sydney Local Health District. Funded to date through founder capital.',
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Team | Aescia',
    description: 'The two founders, company officers and the SAFE-Discharge Principal Investigator. Funding posture and support model.',
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
