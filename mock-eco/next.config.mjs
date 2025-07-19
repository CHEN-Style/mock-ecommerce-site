/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 启用现代图片格式
    formats: ['image/webp', 'image/avif'],
    // 支持的设备尺寸
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // 图片尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 启用图片优化
    unoptimized: false,
    // 图片缓存时间 (秒)
    minimumCacheTTL: 31536000, // 1年缓存
    // 允许的图片域名
    domains: [],
    // 危险操作：允许所有域名（仅开发环境）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 性能优化
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // HTTP Headers优化
  async headers() {
    return [
      {
        source: '/goods/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/Logo/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  }
};

export default nextConfig;
