/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Removido output: 'standalone' para compatibilidad con Netlify
  experimental: {
    // topLevelAwait removed as it's not recognized by Next.js
  },
};

export default nextConfig;