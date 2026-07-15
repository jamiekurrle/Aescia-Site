import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { makeMetadata, SurveillancePageShell } from '../shared'
import { SLUG_TO_JUR } from '../slugs'

// One static page per non-US guideline, so each is bookmarkable and rankable.
// The US guideline lives at the base /colonoscopy-surveillance path.
const SLUGS = Object.keys(SLUG_TO_JUR).filter((s) => SLUG_TO_JUR[s] !== 'US')

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const jur = SLUG_TO_JUR[slug]
  if (!jur || jur === 'US') return {}
  return makeMetadata(jur, `/colonoscopy-surveillance/${slug}`)
}

export default async function GuidelinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const jur = SLUG_TO_JUR[slug]
  if (!jur || jur === 'US') notFound()
  return <SurveillancePageShell jur={jur} canonicalPath={`/colonoscopy-surveillance/${slug}`} />
}
