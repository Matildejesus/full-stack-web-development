import type { NextConfig } from "next";

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  basePath: '/admin', 
  assetPrefix: '/admin'
}

export default nextConfig;