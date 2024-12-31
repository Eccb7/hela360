/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Set to 'standalone' for production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
