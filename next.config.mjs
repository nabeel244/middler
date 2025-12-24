/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/blog/:path*',
        destination: 'https://primary-production-bf78.up.railway.app/:path*',
      },
    ];
  },
};

export default nextConfig;