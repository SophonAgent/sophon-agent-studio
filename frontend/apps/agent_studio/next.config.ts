import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/paas',
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/chat',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://10.37.19.225:8080/api/v1/:path*',
        basePath: false,
      },
      {
        source: '/mcp/wrapper/:path*',
        destination: 'http://10.37.19.225:8080/mcp/wrapper/:path*',
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
