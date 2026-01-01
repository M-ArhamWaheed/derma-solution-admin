import type { NextConfig } from "next";

// Lightweight conditional analyzer: only require when explicitly enabled.
const enableAnalyzer = process.env.ANALYZE === 'true';

let withBundleAnalyzer: (cfg: NextConfig) => NextConfig = (c) => c;
if (enableAnalyzer) {
  try {
    // Require lazily to avoid adding the analyzer package to normal builds.
    // This keeps the dev server fast unless profiling is needed.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bundleAnalyzer = require('@next/bundle-analyzer')({ enabled: true });
    withBundleAnalyzer = bundleAnalyzer;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('@next/bundle-analyzer not installed — skipping analyzer.');
  }
}

// Minimal/explicit Next config focused on dev/compile speed and avoiding
// experimental flags that increase invalidations. Keep config lean.
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Keep images config but avoid overly permissive patterns where possible.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Avoid custom webpack splitChunks or aggressive chunking here — Next/Turbopack
  // handle bundling. If Turbopack is enabled in dev, webpack overrides can
  // increase module graph size and slow cold starts; keep webpack hooks minimal.
  webpack: (config, { isServer }) => {
    // No-op hook kept for tracing only. Do not add transform plugins here
    // unless they are proven to reduce modules (e.g. optimizing a specific
    // heavy package). Avoid global aliasing that pulls many files.
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
