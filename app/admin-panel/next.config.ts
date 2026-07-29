import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/user/userDetail.html',
        destination: '/user/user/detail',
        permanent: false,
      },
      {
        source: '/user/userDetail',
        destination: '/user/user/detail',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
