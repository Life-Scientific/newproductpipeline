import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Cache life configuration (promoted from experimental in Next.js 16)
  cacheLife: {
    // Default cache profile for pages
    page: {
      stale: 60,
      revalidate: 60,
      expire: 300,
    },
  },
  experimental: {
    // Enable scroll restoration for better UX when navigating back
    scrollRestoration: true,
  },
};

export default withBundleAnalyzer(nextConfig);
