/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    NEXT_MAPBOX_PUBLIC_TOKEN: process.env.NEXT_MAPBOX_PUBLIC_TOKEN ?? "",
  },
};

module.exports = nextConfig;
