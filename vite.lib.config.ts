import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // подтянет ваши paths из tsconfig.json
    dts({ include: ['src'] }),
  ],
  resolve: {
    alias: {
      // одноточечный импорт: @DobruniaUI → src/index.ts
      '@DobruniaUI': path.resolve(__dirname, 'src/index.ts', '../index.ts'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'DobruniaUI',
      fileName: (f) => `index.${f}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
    },
  },
});
