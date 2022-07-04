import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { remarkMdxCodeMeta } from 'remark-mdx-code-meta';
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter';
import { remarkMdxToc } from 'remark-mdx-toc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { remarkMdxDocgen } from './scripts/remark-mdx-docgen';
import { viteReactDevtools } from './scripts/vite-react-devtools';

export default defineConfig({
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  },
  plugins: [
    react(),
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
        remarkMdxCodeMeta,
        remarkMdxToc,
        [remarkMdxDocgen, { sourceRootPath: resolve(__dirname, '../packages/react/src') }],
      ],
      rehypePlugins: [rehypeSlug],
    }),
    VitePWA({
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Agile UI',
        description: 'React + TypeScript UI Components',
        short_name: 'agile-ui',
        start_url: '/home',
        lang: 'zh-CN',
        icons: [
          { src: 'icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        theme_color: '#228be6',
        background_color: '#FFFFFF',
        display: 'standalone',
      },
    }),
    viteReactDevtools(),
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('/node_modules/')) {
            if (
              id.includes('/node_modules/sucrase/') ||
              id.includes('/node_modules/prismjs/') ||
              id.includes('/node_modules/react-live/') ||
              id.includes('/node_modules/prism-react-renderer/') ||
              id.includes('/node_modules/use-editable/')
            ) {
              return 'react-live';
            }

            if (
              id.includes('/node_modules/twind') ||
              id.includes('/node_modules/@twind') ||
              id.includes('/node_modules/style-vendorizer')
            ) {
              return 'twind';
            }

            if (
              id.includes('/node_modules/react/') ||
              id.includes('/node_modules/react-dom/') ||
              id.includes('/node_modules/react-is/') ||
              id.includes('/node_modules/scheduler/') ||
              id.includes('/node_modules/prop-types/')
            ) {
              return 'react';
            }

            return 'vendor';
          }

          if (id.includes('/packages/')) {
            return 'agile';
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@agile-ui/react': resolve(__dirname, '../packages/react/src'),
      '@agile-ui/react-hooks': resolve(__dirname, '../packages/react-hooks/src'),
      '@agile-ui/react-icons': resolve(__dirname, '../packages/react-icons/src'),
      '@agile-ui/twind': resolve(__dirname, '../packages/twind/src'),
      '@agile-ui/utils': resolve(__dirname, '../packages/utils/src'),
    },
  },
});
