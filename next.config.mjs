/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    topLevelAwait: true,
  },
};

export default nextConfig;

// Elimino la clave experimental.topLevelAwait si existe
// ... existing code ...