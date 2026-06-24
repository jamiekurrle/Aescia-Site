import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Footer } from '@/components/footer'

// A real 404 must not inherit the root layout's metadata: app/layout.tsx sets
// canonical '/' and robots { index: true, follow: true }, both of which would
// otherwise cascade onto the 404. `canonical: null` strips the inherited
// canonical so a genuine 404 is not read as a duplicate of the homepage, and an
// explicit noindex overrides the inherited 'index, follow'. (Next.js also emits
// its own noindex for not-found; the two agree, so there is no conflicting
// directive.)
export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page does not exist or has moved.',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main
        id="main"
        className="bg-background text-foreground flex min-h-screen items-center justify-center px-6 py-24"
      >
        <div className="max-w-xl text-center">
          <p className="text-[13px] font-medium uppercase tracking-wide text-foreground/50">
            Error 404
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            This page has moved or no longer exists
          </h1>
          <p className="mt-4 text-foreground/70">
            The link may be out of date. Return to the homepage, or use the
            navigation above to find what you need.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium underline underline-offset-4 hover:no-underline"
            >
              Return to homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
