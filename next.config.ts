import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    cacheLife: {
      // Default cache profile for pages
      page: {
        stale: 60,
        revalidate: 60,
        expire: 300,
      },
    },
  },
};

export default nextConfig;
