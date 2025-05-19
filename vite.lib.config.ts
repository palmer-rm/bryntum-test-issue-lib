import { defineConfig } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'bryntum-calendar-lib',
      fileName: format => `bryntum-calendar-lib.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [createVuePlugin(), dts({ rollupTypes: true })],
  resolve: {
    alias: [{ find: '/@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    port: 8080,
    fs: {
      // allow: ['..'],
      strict: false,
    },
  },
});
