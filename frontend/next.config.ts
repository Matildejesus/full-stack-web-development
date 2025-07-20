import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  reactStrictMode: true,
  basePath: '', // Ensure this is empty
  assetPrefix: ''
};

export default nextConfig;
