# Piplup React Hook Form Monorepo

Welcome to @piplup! This repository contains a collection of useful libraries
empowering Your React apps with essential libraries and tools.

## [@piplup/rhf-core](./packages/rhf-core/README.md)

[![npm](https://img.shields.io/npm/v/@piplup/rhf-core)](https://www.npmjs.com/package/@piplup/rhf-core)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@piplup/rhf-core)
![NPM Downloads](https://img.shields.io/npm/dt/@piplup/rhf-core)

This package contains a set of useful components, hooks and adapter for
integrating native html components and custom components with react-hook-form.

## [@piplup/rhf-adapters](./packages/rhf-adapters/README.md)

[![npm](https://img.shields.io/npm/v/@piplup/rhf-adapters)](https://www.npmjs.com/package/@piplup/rhf-adapters)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@piplup/rhf-adapters)
![NPM Downloads](https://img.shields.io/npm/dt/@piplup/rhf-adapters)

This package contains a set of useful components, hooks and adapter for
integrating libraries like mui with react-hook-form.

---

## Getting Started

```bash
npm install
```

## Scripts

### Development

```bash
npm run lint          # Run oxlint across all packages
npm run lint:fix      # Auto-fix lint issues
npm run fmt           # Format all files with prettier
npm run fmt:check     # Check formatting without writing
npm run build         # Build all packages
```

### Testing

```bash
npm run test           # Run component + E2E tests (headless)
npm run test:unit      # Run Cypress component tests only
npm run test:e2e       # Run Cypress E2E tests only
npm run test:open      # Open Cypress interactive runner
```

### Release

```bash
npm run release        # Interactive release: bump → lint → test → publish → tag
npm run release:dry    # Preview what would happen (nothing is written/published)
node scripts/changelog.js --write  # Regenerate CHANGELOG.md
```

## Release Flow

```
# From your local machine:
npm run release          # interactive — picks bump type, runs all checks, publishes
# OR manually:
git tag release@1.2.3
git push --follow-tags   # triggers the release workflow in CI
```
