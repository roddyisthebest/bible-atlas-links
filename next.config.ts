import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.openbible.info',
        port: '',
        pathname: '/geo/images/**',
      },
    ],
  },
};

export default nextConfig;
