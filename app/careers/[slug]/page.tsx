import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'
import { breadcrumbSchema, webPageSchema, jobPostingSchema } from '@/lib/schema'
import { ROLES, getRole, roleDescriptionHtml } from '@/lib/careers'
import { RoleContent } from './content'

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const role = getRole(slug)
  if (!role) return { title: 'Role not found' }
  return {
    title: `${role.title} | Careers`,
    description: role.summary,
    alternates: { canonical: `/careers/${role.slug}` },
    openGraph: {
      title: `${role.title} | Careers at Aescia`,
      description: role.summary,
      url: `/careers/${role.slug}`,
    },
  }
}

export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const role = getRole(slug)
  if (!role) notFound()

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: role.title, url: `/careers/${role.slug}` },
  ])

  const pageSchema = webPageSchema({
    url: `/careers/${role.slug}`,
    name: `${role.title} | Careers at Aescia`,
    description: role.summary,
  })

  const jobSchema = jobPostingSchema({
    slug: role.slug,
    title: role.title,
    description: roleDescriptionHtml(role),
    datePosted: role.datePosted,
    employmentType: role.employmentType,
    remote: role.remote,
    applicantCountries: role.applicantCountries,
  })

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />
      <SiteNav />
      <RoleContent role={role} />
      <Footer />
    </>
  )
}
