/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: 'default',
    domains: ['middler.com', 'www.middler.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'subdomain',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'business-logos-middler.s3.us-east-1.amazonaws.com',
        pathname: '**',
      },
    ],
    unoptimized:
      process.env.NODE_ENV === 'development' ||
      process.env.NEXT_PUBLIC_DISABLE_OPTIMIZATION === 'true',
  },
  output: 'standalone',
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
