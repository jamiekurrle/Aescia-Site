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
  // A paused role says so in the snippet, so anyone reading a search result or
  // a shared link knows before they click.
  const description = role.open
    ? role.summary
    : `Not currently hiring for this role. ${role.summary}`
  return {
    title: role.open ? `${role.title} | Careers` : `${role.title} | Not currently hiring`,
    description,
    alternates: { canonical: `/careers/${role.slug}` },
    openGraph: {
      title: role.open
        ? `${role.title} | Careers at Aescia`
        : `${role.title} | Not currently hiring at Aescia`,
      description,
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

  // Only an open role advertises itself as a job. A paused role keeps its page
  // but drops the JobPosting markup, so Google for Jobs and the aggregators
  // that ingest from it stop treating the page as a live vacancy.
  const jobSchema = role.open
    ? jobPostingSchema({
        slug: role.slug,
        title: role.title,
        description: roleDescriptionHtml(role),
        datePosted: role.datePosted,
        employmentType: role.employmentType,
        remote: role.remote,
        applicantCountries: role.applicantCountries,
      })
    : null

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
      {jobSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
        />
      )}
      <SiteNav />
      <RoleContent role={role} />
      <Footer />
    </>
  )
}
