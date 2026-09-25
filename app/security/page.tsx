import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PageContent } from './content'

export const metadata: Metadata = {
  title: 'Security',
  description:
    'Aescia trial data is stored in Australia (Amazon Web Services Sydney region, through Supabase). Aescia holds liability and cyber insurance with Chubb. An independent penetration test, a privacy impact assessment and International Organization for Standardization (ISO) 27001 certification are planned.',
  alternates: { canonical: '/security' },
  openGraph: {
    title: 'Security | Aescia',
    description: 'Trial data is stored in Australia (Amazon Web Services Sydney region, through Supabase). Aescia is not yet certified; International Organization for Standardization (ISO) 27001 certification is planned.',
    url: '/security',
  },
}

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Security', url: '/security' },
])

const pageSchema = webPageSchema({
  url: '/security',
  name: 'Security',
  description:
    'Where Aescia stores trial data, how its hosting providers are certified, its insurance, and its planned penetration test, privacy impact assessment and International Organization for Standardization (ISO) 27001 certification.',
})

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <SiteNav />
      <main id="main" className="bg-background min-h-screen">
        <PageContent />
      </main>
      <Footer />
    </>
  )
}
