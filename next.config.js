/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply to every route, including / and all docs pages
        source: "/:path*",
        headers: [
          // The key fix: override any upstream noindex
          { key: "X-Robots-Tag", value: "index, follow" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
