/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  images: {
    domains: ['d1y3bjxf7c78hf.cloudfront.net', 'static.fullstackhrivnak.com'],
  },
};

module.exports = nextConfig;
