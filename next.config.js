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

// hej

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      // Sæt source map optioner for produktion client build
      config.devtool = "source-map"; // sikrer fuld source map inkl. sourcesContent
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iip-thumb.smk.dk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.smk.dk",
        pathname: "/**",
      },
    ],
  },
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
