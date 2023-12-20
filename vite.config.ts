import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr'

export default defineConfig(() => {
  return {
    base: '/demo/',
    build: {
      // rollupOptions: {
      //   output: {
      //     entryFileNames: `[name].[hash].js`, // Flatten JS output
      //     chunkFileNames: `[name].[hash].js`, // Flatten chunked JS
      //     assetFileNames: `[name].[hash].[ext]` // Flatten other assets
      //   },
      // },
      outDir: 'build',
    },
    plugins: [react(), viteTsconfigPaths(), svgr({ svgrOptions: { icon: true } })],
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
