import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(() => ({
  // Self-hosted on the k3s cluster behind the shared Cloudflare Tunnel, served at
  // the root of its own host (e.g. https://fitgram.mattresscollective.pt/).
  base: '/',
  plugins: [
    // NativeWind's JSX runtime bridges Tailwind `className` onto RN primitives.
    react({ jsxImportSource: 'nativewind' }),
  ],
  define: {
    global: 'globalThis',
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Use the web implementation of React Native primitives.
      'react-native': 'react-native-web',
    },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  optimizeDeps: {
    include: ['react-native-web'],
    esbuildOptions: {
      loader: { '.js': 'jsx' } as const,
    },
  },
}));
