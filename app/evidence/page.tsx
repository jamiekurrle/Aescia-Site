import { redirect } from 'next/navigation'

// /evidence is taken down pending a TGA-compliant rewrite. While the rewrite
// is in progress, requests for /evidence are redirected (HTTP 307, temporary
// — Next.js app-router default for redirect() in a server component) to
// /hospitals so existing inbound links continue to land on relevant content.
//
// When the rewrite ships, this file is replaced with the new page content
// and /evidence is restored to nav, footer, evidence-ribbon CTA, and sitemap.
export default function EvidencePage() {
  redirect('/hospitals')
}
