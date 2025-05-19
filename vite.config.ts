import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  const isLib = command === 'build' && mode === 'lib';
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      // генерим .d.ts только в режиме сборки библиотеки
      ...(isLib ? [dts({ include: ['src'] })] : []),
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
    }),
  };
});
