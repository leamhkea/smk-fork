/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iip-thumb.smk.dk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.smk.dk',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

