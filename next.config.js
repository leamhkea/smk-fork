// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'iip-thumb.smk.dk',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'api.smk.dk',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  rewrites: async () => {
    if (process.env.VERCEL_ENV === "production") {
      return [
        {
          source: "/_next/static/chunks/:path*.map",
          destination: "/404",
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;
