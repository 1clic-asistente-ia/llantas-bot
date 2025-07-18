/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    // topLevelAwait removed as it's not recognized by Next.js
  },
};

export default nextConfig;

// Elimino la clave experimental.topLevelAwait si existe
// ... existing code ...