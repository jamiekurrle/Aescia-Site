import type { Metadata } from 'next'
import { Suspense } from 'react'
import { breadcrumbSchema } from '@/lib/schema'
import ContactContent from './contact-content'

export const metadata: Metadata = {
  title: 'Request a briefing or a security pack under NDA',
  description:
    'A hospital evaluation and a clinic demo are different conversations. Pick the one that matches your team, and we will route it to the right person.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Aescia',
    description: 'Hospital evaluation, clinic demo, security pack under NDA.',
    url: '/contact',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Contact', url: '/contact' },
])

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Suspense fallback={null}>
        <ContactContent />
      </Suspense>
    </>
  )
}
