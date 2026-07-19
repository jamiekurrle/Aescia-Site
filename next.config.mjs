/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: '/problem', destination: '/hospitals', permanent: true },
      { source: '/solution', destination: '/platform', permanent: true },
      // The colonoscopy-survey prize terms live under /colonoscopy-survey/.
      // People retype or share the bare path, so catch it at the root too.
      { source: '/prize-terms.html', destination: '/colonoscopy-survey/prize-terms.html', permanent: false },
      { source: '/prize-terms', destination: '/colonoscopy-survey/prize-terms.html', permanent: false },
      // Dead URLs from the old information architecture (returned genuine 404s).
      // Permanent redirects to the closest live page so old external links and
      // stale search-index entries land somewhere relevant instead of a 404.
      { source: '/about', destination: '/team', permanent: true },
      { source: '/clinical-regulatory', destination: '/governance', permanent: true },
      // Hyphen-less variant of the same dead page that Google still has on file
      // (/clinicalregulatory). permanent:true issues a 308, which Google treats
      // as a permanent redirect equivalent to a 301 for canonicalisation.
      { source: '/clinicalregulatory', destination: '/governance', permanent: true },
      // Pages that were live on prod, got indexed, and were then deleted without
      // a redirect. Google still crawls them and reports them as 404s.
      // /roi-calculator shipped 2026-03-22 and was removed in the 2026-05-30
      // overhaul; /clinics#roi is where its content now lives.
      { source: '/roi-calculator', destination: '/clinics#roi', permanent: true },
      // The iframe target /roi-calculator used. public/tools was never committed,
      // so this was broken on prod for its whole life; robots disallows /tools/,
      // but redirect it in case it was crawled before robots.txt existed.
      { source: '/tools/roi-calculator/index.html', destination: '/clinics#roi', permanent: true },
      // A stray scaffold page ("test page works") that shipped to prod and was
      // indexed before being removed in the 2026-04-19 redesign.
      { source: '/test-page', destination: '/', permanent: true },
      // The /v2 design-experiment subtree was public until 2026-06-24, when a
      // production gate was added. robots.txt disallows "/v2/" with a trailing
      // slash, which does not match the bare path, so /v2 alone stayed crawlable
      // and 404s. Redirect rather than robots-block: blocking an already-indexed
      // URL leaves it in the index instead of removing it.
      { source: '/v2', destination: '/', permanent: true },
    ]
  },
  async headers() {
    // Vercel's default for un-hashed public/ files is max-age=0,
    // must-revalidate, which forces a revalidation round-trip on every
    // repeat view. These assets are versioned by filename (bump the -v
    // suffix when content changes), so they can be cached for a year.
    // Partners logos are not versioned: replace them by RENAMING the
    // file, never in place, or repeat visitors keep the old one for up
    // to a year.
    const immutable = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
    return [
      { source: '/hero-video-v2.mp4', headers: immutable },
      { source: '/hero-video-v2.webm', headers: immutable },
      { source: '/hero-poster-v2.jpg', headers: immutable },
      { source: '/partners/:path*', headers: immutable },
    ]
  },
}

export default nextConfig
