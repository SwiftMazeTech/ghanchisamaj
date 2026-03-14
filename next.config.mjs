/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Keep dev and production artifacts isolated so stale chunks do not break local dev.
  distDir: isProd ? ".next-build" : ".next-dev",
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid stale/corrupted webpack cache chunks in Windows dev sessions.
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
