/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['iip-thumb.smk.dk', 'api.smk.dk'],
  },
  experimental: {
    useLightningcss: false,
  },
};

module.exports = nextConfig;
