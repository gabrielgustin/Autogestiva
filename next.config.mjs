/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // La página de tiendas online se dio de baja: quien llegue desde Google va a páginas web
  async redirects() {
    return [{ source: "/tiendas-online", destination: "/paginas-web-cordoba", permanent: true }]
  },
  devIndicators: false,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
