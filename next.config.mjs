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
    ]
  },
}

export default nextConfig
