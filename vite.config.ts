import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // подтянет ваши paths из tsconfig.json
  ],
  resolve: {
    alias: {
      '@DobruniaUI': path.resolve(__dirname, 'src/index.ts'),
      '@DobruniaUI/': path.resolve(__dirname, 'src'),
    },
  },
});
