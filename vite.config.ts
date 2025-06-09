import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  const isLib = command === 'build' && mode === 'lib';
  const isDemoProduction = command === 'build' && mode !== 'lib';

  return {
    // Настройка base path для GitHub Pages
    base: isDemoProduction ? '/DobruniaUI/' : '/',

    plugins: [
      react(),
      tsconfigPaths(),
      // генерим .d.ts только в режиме сборки библиотеки
      ...(isLib ? [dts()] : []),
    ],
    resolve: {
      alias: {
        '@DobruniaUI': path.resolve(__dirname, 'src/index.ts'),
        '@DobruniaUI/': path.resolve(__dirname, 'src'),
      },
    },
    // если это сборка библиотеки — подключаем lib-опции,
    // иначе (в dev) Vite просто игнорирует build-секцию
    ...(isLib && {
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: 'DobruniaUI',
          fileName: (format) => {
            if (format === 'es') return 'index.es.js';
            if (format === 'umd') return 'index.umd.js';
            return `index.${format}.js`;
          },
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
    }),

    // Настройки для демо-сборки
    ...(!isLib && {
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false,
      },
    }),
  };
});
