import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],

  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@agile-ui/react': resolve(__dirname, './packages/react/src'),
      '@agile-ui/react-hooks': resolve(__dirname, './packages/react-hooks/src'),
      '@agile-ui/react-icons': resolve(__dirname, './packages/react-icons/src'),
      '@agile-ui/twind': resolve(__dirname, './packages/twind/src'),
      '@agile-ui/utils': resolve(__dirname, './packages/utils/src'),
    },
  },
});
