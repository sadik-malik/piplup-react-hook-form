import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['react'],
  rules: {
    'react/rules-of-hooks': 'error',
    'typescript/no-explicit-any': 'error',
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    '.nx',
    '.husky',
    '**/node_modules/',
    '**/dist/',
    '**/vite.config.*.timestamp*',
    '**/vitest.config.*.timestamp*',
  ],
});
