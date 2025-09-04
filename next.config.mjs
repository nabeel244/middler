/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Bundle analysis and optimization
  webpack: (config, { dev, isServer }) => {
    // Split chunks for better caching
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          motion: {
            test: /[\\/]node_modules[\\/](motion|framer-motion)[\\/]/,
            name: 'motion',
            chunks: 'all',
          },
          swiper: {
            test: /[\\/]node_modules[\\/]swiper[\\/]/,
            name: 'swiper',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
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
    // Optimize images for performance
    formats: ['image/webp', 'image/avif'],
    unoptimized:
      process.env.NODE_ENV === 'development' ||
      process.env.NEXT_PUBLIC_DISABLE_OPTIMIZATION === 'true',
  },
  
  output: 'standalone',
  
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
