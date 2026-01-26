import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends(
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ),
  {
    plugins: {
      '@nx': nxEslintPlugin,
      '@typescript-eslint': typescriptEslintPlugin,
      import: eslintPluginImport,
      'jsx-a11y': eslintPluginJsxA11y,
      perfectionist: eslintPluginPerfectionist,
      prettier: eslintPluginPrettier,
      'unused-imports': eslintPluginUnusedImports,
    },
  },
  {
    rules: {
      'no-restricted-exports': 'off',
      'no-restricted-imports': ['error', { patterns: ['@mui/*/*/*'] }],
      'perfectionist/sort-array-includes': [
        'error',
        {
          groupKind: 'literals-first',
          ignoreCase: true,
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-enums': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-exports': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          groups: ['multiline', 'unknown', 'shorthand'],
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-maps': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-named-exports': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-object-types': [
        'error',
        {
          customGroups: {},
          groups: [],
          ignoreCase: true,
          order: 'asc',
          partitionByNewLine: false,
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          ignoreCase: true,
          order: 'asc',
          partitionByComment: false,
          partitionByNewLine: false,
          styledComponents: true,
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              onlyDependOnLibsWithTags: ['*'],
              sourceTag: '*',
            },
          ],
          enforceBuildableLibDependency: true,
        },
      ],
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'ignore',
          pathGroups: [
            {
              group: 'builtin',
              pattern: 'react',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'react/jsx-no-useless-fragment': 'off',
      'react/prop-types': 'off',
      semi: 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  ...compat.config({ extends: ['plugin:@nx/typescript'] }).map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
    rules: {
      ...config.rules,
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          selector: 'variable',
        },
        {
          format: ['PascalCase'],
          selector: 'typeLike',
        },
      ],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/semi': 'off',
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    },
  })),
  ...compat.config({ extends: ['plugin:@nx/javascript'] }).map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    rules: {
      ...config.rules,
    },
  })),
  {
    ignores: [
      'dist',
      'node_modules',
      '.nx',
      '.husky',
      '**/node_modules/',
      '**/dist/',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
];
