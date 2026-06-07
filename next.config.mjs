/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/problem', destination: '/hospitals', permanent: true },
      { source: '/solution', destination: '/platform', permanent: true },
      // Dead URLs from the old information architecture (returned genuine 404s).
      // Permanent redirects to the closest live page so old external links and
      // stale search-index entries land somewhere relevant instead of a 404.
      { source: '/about', destination: '/team', permanent: true },
      { source: '/clinical-regulatory', destination: '/governance', permanent: true },
    ]
  },
}

export default nextConfig
