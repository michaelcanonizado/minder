/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mongoose requirements as per: https://mongoosejs.com/docs/nextjs.html
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose']
  },
  webpack: config => {
    config.experiments = {
      topLevelAwait: true
    };
    return config;
  }
};

export default nextConfig;
