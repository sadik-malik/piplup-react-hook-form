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
npm run format        # Format all files with oxfmt
npm run format:check  # Check formatting without writing
npm run build         # Build all packages
```

### Testing

```bash
npm run test           # Run tests
```

### Release

```bash
npm run release        # Interactive release: bump → lint → test → publish → tag
npm run release:dry    # Preview what would happen (nothing is written/published)
```
