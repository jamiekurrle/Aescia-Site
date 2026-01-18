const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // Canonical host: force www -> root domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.aesciahealth.com' }],
        destination: 'https://aesciahealth.com/:path*',
        permanent: true,
      },
    ]
  },

  // IMPORTANT:
  // Do NOT set X-Robots-Tag here.
  // If you previously added headers() with X-Robots-Tag: noindex, delete it.
}

module.exports = withNextra(nextConfig)
