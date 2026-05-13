import { readFileSync } from 'node:fs';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import packageJSON from './package.json';

const license = readFileSync(path.resolve('./LICENSE'), {
  encoding: 'utf-8',
});
const banner = ['/*', '@license', license, '*/', "'use client';"].join('\n');

const external = [...new Set([...Object.keys(packageJSON.peerDependencies), 'react/jsx-runtime'])];

export default defineConfig({
  build: {
    sourcemap: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    emptyOutDir: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: {
        index: 'src/index.ts',
      },
      fileName: (format, entryName) => {
        const extension = format === 'es' ? 'mjs' : 'js';
        return `${entryName}.${extension}`;
      },
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
      name: 'test',
    },
    minify: true,
    outDir: './dist',
    reportCompressedSize: true,
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external,
      output: {
        banner,
        sourcemapExcludeSources: true,
      },
    },
  },
  cacheDir: '../../node_modules/.vite/packages/rhf-core',
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  root: __dirname,
});
