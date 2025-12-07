import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    // Enable scroll restoration for better UX when navigating back
    scrollRestoration: true,
  },
  // cacheLife moved out of experimental in Next.js 16
  cacheLife: {
    // Default cache profile for pages
    page: {
      stale: 60,
      revalidate: 60,
      expire: 300,
    },
  },
  // Set Turbopack root to fix workspace detection warning
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
