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
      <noscript>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Contact Aescia</h1>
          <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>
            The contact form needs JavaScript to load. If it does not appear, email us
            directly at{' '}
            <a href="mailto:contact@aesciahealth.com" style={{ textDecoration: 'underline' }}>
              contact@aesciahealth.com
            </a>{' '}
            and we will route your message to the right person.
          </p>
          <p style={{ marginBottom: '0.5rem', lineHeight: 1.6 }}>
            Tell us which conversation matches your team:
          </p>
          <ul style={{ margin: '0 0 1rem 1.25rem', lineHeight: 1.6 }}>
            <li>Hospital evaluation, for post-discharge monitoring and the SAFE-Discharge programme.</li>
            <li>Clinic demo, for pre-procedure pathway software at endoscopy centres and specialty clinics.</li>
          </ul>
          <p style={{ lineHeight: 1.6 }}>
            We reply within two business days.
          </p>
        </div>
      </noscript>
      <Suspense fallback={null}>
        <ContactContent />
      </Suspense>
    </>
  )
}
