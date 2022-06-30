import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import pkg from './package.json';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es'],
      name: pkg.name,
      fileName: 'index',
    },
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies)],
    },
  },
  resolve: {
    alias: {
      '@agile-solid/utils': resolve(__dirname, '../packages/utils/src'),
      '@agile-solid/hooks': resolve(__dirname, '../packages/hooks/src'),
    },
  },
});
