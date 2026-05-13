#!/usr/bin/env tsx
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createInterface } from 'node:readline';

interface PackageJson {
  name: string;
  version: string;
  private?: boolean;
  workspaces?: string[];
  [key: string]: unknown;
}

interface PackageEntry {
  dir: string;
  json: PackageJson;
}
interface UpdateEntry extends PackageEntry {
  next: string;
}

type BumpType = 'patch' | 'minor' | 'major';

// Absolute path to the monorepo root (one level above the scripts directory).
const ROOT = resolve(import.meta.dirname, '..');

/**
 * Execute a shell command in the repo root.
 * - `silent` runs the command and captures output instead of streaming it.
 * - `dryRun` prints the command and returns without executing.
 */
function run(
  cmd: string,
  { silent = false, dryRun = false }: { silent?: boolean; dryRun?: boolean } = {},
): string {
  if (dryRun) {
    console.log(`  [dry-run] ${cmd}`);
    return '';
  }
  if (!silent) console.log(`  $ ${cmd}`);
  return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: silent ? 'pipe' : 'inherit' }) ?? '';
}

/**
 * Synchronously read and parse a JSON file.
 */
function readJson<T = unknown>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

/**
 * Write an object to disk as pretty-printed JSON (with trailing newline).
 */
function writeJson(path: string, data: unknown): void {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

/**
 * Simple interactive prompt wrapper returning a Promise for user input.
 */
function prompt(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((res) =>
    rl.question(question, (ans) => {
      rl.close();
      res(ans);
    }),
  );
}

/**
 * Bump a semver-like version string by the given `BumpType`
 * The function tolerates non-numeric prefixes (e.g., `v1.2.3`).
 */
function bumpVersion(current: string, type: BumpType): string {
  const [major, minor, patch] = current
    .replace(/^[^0-9]*/, '')
    .split('.')
    .map(Number) as [number, number, number];
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw Error('Unknown version type');
  }
}

/**
 * Discover workspace packages by reading the root package.json `workspaces`.
 * Returns an array of `PackageEntry` with absolute directory paths and parsed
 * package.json objects. Optionally filter by package name.
 */
function getPackages(filter?: string): PackageEntry[] {
  const rootPkg = readJson<PackageJson>(join(ROOT, 'package.json'));
  const packages: PackageEntry[] = [];
  for (const pattern of rootPkg.workspaces ?? []) {
    const base = pattern.replace(/\/\*$/, '');
    try {
      const glob = run(`ls -d ${join(ROOT, base)}/*/`, { silent: true });
      for (const pkgDir of glob.trim().split('\n').filter(Boolean)) {
        try {
          const pkgJson = readJson<PackageJson>(join(pkgDir.trim(), 'package.json'));
          if (!pkgJson.private && (!filter || pkgJson.name === filter)) {
            packages.push({ dir: pkgDir.trim(), json: pkgJson });
          }
        } catch {
          // ignore directories without package.json
        }
      }
    } catch {
      // ignore glob failures for missing workspace folders
    }
  }
  return packages;
}

/**
 * Run a series of checks before publishing: ensure clean git tree, typecheck,
 * lint, format, build, and test. `dryRun` allows skipping actual execution.
 */
function preflight(dryRun: boolean): void {
  console.log('\n📋 Running pre-flight checks...');
  const status = run('git status --porcelain', { silent: true });
  if (status.trim()) {
    console.error('\n❌ Working tree is not clean.\n', status);
    process.exit(1);
  }
  console.log('  🔍 Type-checking...');
  run('npm run typecheck', { dryRun });
  console.log('  🔍 Linting...');
  run('npm run lint', { dryRun });
  console.log('  🎨 Formatting...');
  run('npm run fmt:check', { dryRun });
  console.log('  🏗️  Building...');
  run('npm run build', { dryRun });
  console.log('  🧪 Testing...');
  run('npm run test', { dryRun });
  console.log('  ✅ All checks passed.\n');
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const tagIdx = args.indexOf('--tag');
  const distTag = tagIdx !== -1 ? (args[tagIdx + 1] ?? 'latest') : 'latest';
  const pkgIdx = args.indexOf('--package');
  const pkgFilter = pkgIdx !== -1 ? args[pkgIdx + 1] : undefined;

  // Entry banner for the release flow.
  console.log('🚀 Monorepo Release');
  if (dryRun) console.log('   (DRY RUN)\n');

  const packages = getPackages(pkgFilter);
  if (packages.length === 0) {
    console.error('❌ No publishable packages found.');
    process.exit(1);
  }

  console.log(`📦 Packages (${packages.length}):`);
  packages.forEach(({ json }) => console.log(`   - ${json.name}@${json.version}`));

  // Ask the user what kind of version bump to perform.
  const rawBump = (await prompt('\nBump type? [patch|minor|major] (default: patch): ')) || 'patch';
  if (!['patch', 'minor', 'major'].includes(rawBump)) {
    console.error(`❌ Invalid: ${rawBump}`);
    process.exit(1);
  }

  const bumpType = rawBump as BumpType;
  const updates: UpdateEntry[] = packages.map(({ dir, json }) => {
    const next = bumpVersion(json.version, bumpType);
    console.log(`   ${json.name}: ${json.version} → ${next}`);
    return { dir, json, next };
  });

  if ((await prompt('\nProceed? [y/N]: ')).toLowerCase() !== 'y') {
    console.log('Aborted.');
    process.exit(0);
  }

  // preflight will be run inside `preparePhase` to avoid duplicate execution.

  // Split main work into three phases: preparePhase, versionPhase, releasePhase.
  // - preparePhase runs preflight checks (already run above for parity).
  // - versionPhase applies version bumps to each package and returns a map of
  //   package name -> new version for dependency rewrites.
  // - releasePhase rewrites workspace dependency ranges, commits, tags,
  //   publishes packages, and pushes the release.

  function preparePhase(dry: boolean): void {
    // Centralized place for additional pre-publish preparation steps.
    preflight(dry);
  }

  function versionPhase(updatesList: UpdateEntry[], dry: boolean): Map<string, string> {
    const map = new Map<string, string>();
    for (const { json, next } of updatesList) map.set(json.name, next);
    for (const { dir, json, next } of updatesList) {
      json.version = next;
      if (!dry) writeJson(join(dir, 'package.json'), json);
    }
    return map;
  }

  function releasePhase(
    updatesList: UpdateEntry[],
    nameToNextMap: Map<string, string>,
    allPkgs: PackageEntry[],
    dry: boolean,
    tagName: string,
  ): void {
    // Rewrite `dependencies` and `peerDependencies` across workspace packages
    // so that internal references point to the new versions. Skip `file:` links.
    for (const { dir: otherDir, json: otherJson } of allPkgs) {
      let changed = false;
      for (const field of ['dependencies', 'peerDependencies'] as const) {
        const deps = otherJson[field] as Record<string, string> | undefined;
        if (!deps) continue;
        for (const [pkgName, nextVersion] of nameToNextMap) {
          const orig = deps[pkgName];
          if (!orig) continue;
          if (orig.startsWith('file:')) continue;
          const usesWorkspace = orig.startsWith('workspace:');
          const newVer = usesWorkspace ? `workspace:^${nextVersion}` : `^${nextVersion}`;
          if (deps[pkgName] !== newVer) {
            deps[pkgName] = newVer;
            changed = true;
            console.log(`  → Updated ${otherJson.name}:${field}.${pkgName} -> ${newVer}`);
          }
        }
      }
      if (changed && !dry) writeJson(join(otherDir, 'package.json'), otherJson);
    }

    // Write changelog and update lockfile before committing the release.
    // Run changelog generator with --write to update CHANGELOG.md.
    run('npx tsx scripts/changelog.mts --write', { dryRun: dry });

    // Update lockfile to reflect package.json changes without performing a full install.
    run('npm install --package-lock-only', { dryRun: dry });

    // Commit, tag, publish, and push.
    run('git add -A', { dryRun: dry });
    run(`git commit -m "chore(release): ${tagName}"`, { dryRun: dry });
    run(`git tag ${tagName}`, { dryRun: dry });

    for (const { dir, json, next } of updatesList) {
      console.log(`\n  Publishing ${json.name}@${next}...`);
      run(`cd ${dir} && npm publish --access public --tag ${distTag}`, { dryRun: dry });
    }

    run('git push --follow-tags', { dryRun: dry });
  }

  // Execute the split phases.

  const tag =
    updates.length === 1
      ? `${updates[0]!.json.name}@${updates[0]!.next}`
      : `release@${updates[0]!.next}`;

  // Compute all workspace packages once and reuse for dependency rewrites.
  const allPackages = getPackages();
  preparePhase(dryRun);
  const nameToNext = versionPhase(updates, dryRun);
  releasePhase(updates, nameToNext, allPackages, dryRun, tag);

  console.log(`\n✅ Released ${tag}!\n`);
}

main().catch((err: Error) => {
  console.error('\n❌ Release failed:', err.message);
  process.exit(1);
});
