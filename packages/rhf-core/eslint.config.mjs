import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import cypress from 'eslint-plugin-cypress/flat';
import jsonParser from 'jsonc-eslint-parser';
import baseConfig from '../../eslint.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  cypress.configs['recommended'],
  ...baseConfig,
  ...compat.extends('plugin:@nx/react'),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['{package,project}.json'],
    languageOptions: { parser: jsonParser },
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          buildTargets: ['build'],
          checkMissingDependencies: true,
          checkObsoleteDependencies: true,
          checkVersionMismatches: true,
          ignoredDependencies: [
            '@types/react',
            '@eslint/eslintrc',
            '@eslint/js',
            'jsonc-eslint-parser',
            '@nx/react',
            '@vitejs/plugin-react',
            'vite-plugin-dts',
            '@nx/vite',
            'vite',
            "cypress",
            "eslint-plugin-cypress"
          ],
          ignoredFiles: ['eslint.config.js', 'rollup.config.js'],
          includeTransitiveDependencies: true,
          useLocalPathsForWorkspaceDependencies: true,
        },
      ],
    },
  },
  { ignores: ['dist'] },
];
