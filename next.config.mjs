import bundleAnalyzer from '@next/bundle-analyzer';
import { createMDX } from 'fumadocs-mdx/next';
import createNextIntlPlugin from 'next-intl/plugin';
 

// 看清楚：这里的路径必须和你实际文件一致！！
// 如果你的 request.ts 不在这个位置，需要告诉我目录
const withNextIntl = createNextIntlPlugin('./src/core/i18n/request.ts');
const withMDX = createMDX();
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.VERCEL ? undefined : 'standalone',
  reactStrictMode: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  async redirects() {
    return [];
  },
  turbopack: {
    resolveAlias: {},
  },

  experimental: {
    // 仅保留有效的配置项，已删除 'turbopackFileSystemCacheForDev', 'turbopack', 'reactCompiler'
    serverComponentsExternalPackages: ["@prisma/client"],
    // 如果没有其他有效的 experimental 项，你可以删除整个 experimental 字段
  },
  
  // ... 其他配置项保持不变
};

// 如果 experimental 字段为空，建议直接删除整个字段：
/*
const nextConfig = {
  // ... 你的配置
  // experimental: {}, // 删除这行或以上所有内容
};
*/

export default withNextIntl(nextConfig);

