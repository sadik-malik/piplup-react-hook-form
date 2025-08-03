/// <reference types='vitest' />

// @ts-check
import { readFileSync } from 'node:fs';
import * as path from 'path';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import packageJSON from './package.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import modifyOutputPackageJson from '../../scripts/modify-output-package-json.mjs';

const license = readFileSync(path.resolve('./LICENSE'), {
  encoding: 'utf-8',
});
const banner = ['/*', '@license', license, '*/', "'use client';"].join('\n');

const external = [
  ...new Set([
    ...Object.keys(packageJSON.peerDependencies),
    'react',
    'react-dom',
    'react/jsx-runtime',
  ]),
];

const globals = {
  '@piplup/utils': 'PiplupUtils',
  react: 'React',
  'react/jsx-runtime': 'jsxRuntime',
};

external.forEach((pkg) => {
  globals[pkg] = pkg
    .replace(/@/g, '')
    .replace(/\//g, '-')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
});

export default defineConfig({
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    emptyOutDir: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: {
        index: 'src/index.ts'
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
        globals,
        sourcemapExcludeSources: true,
      },
    },
  },
  cacheDir: '../../node_modules/.vite/packages/rhf-core',
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['README.md', 'LICENSE']),
    dts({ entryRoot: 'src', tsconfigPath: path.join(__dirname, 'tsconfig.lib.json') }),
    modifyOutputPackageJson(),
  ],
  root: __dirname,
});
