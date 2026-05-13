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

const ROOT = resolve(import.meta.dirname, '..');

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

function readJson<T = unknown>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function writeJson(path: string, data: unknown): void {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function prompt(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((res) =>
    rl.question(question, (ans) => {
      rl.close();
      res(ans);
    }),
  );
}

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
  }
}

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
          /* no package.json */
        }
      }
    } catch {
      /* glob failed */
    }
  }
  return packages;
}

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

  console.log('🚀 Monorepo Release');
  if (dryRun) console.log('   (DRY RUN)\n');

  const packages = getPackages(pkgFilter);
  if (packages.length === 0) {
    console.error('❌ No publishable packages found.');
    process.exit(1);
  }

  console.log(`📦 Packages (${packages.length}):`);
  packages.forEach(({ json }) => console.log(`   - ${json.name}@${json.version}`));

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

  preflight(dryRun);

  for (const { dir, json, next } of updates) {
    json.version = next;
    if (!dryRun) writeJson(join(dir, 'package.json'), json);
  }

  const tag =
    updates.length === 1
      ? `${updates[0]!.json.name}@${updates[0]!.next}`
      : `release@${updates[0]!.next}`;
  run('git add -A', { dryRun });
  run(`git commit -m "chore(release): ${tag}"`, { dryRun });
  run(`git tag ${tag}`, { dryRun });

  for (const { dir, json, next } of updates) {
    console.log(`\n  Publishing ${json.name}@${next}...`);
    run(`cd ${dir} && npm publish --access public --tag ${distTag}`, { dryRun });
  }

  run('git push --follow-tags', { dryRun });
  console.log(`\n✅ Released ${tag}!\n`);
}

main().catch((err: Error) => {
  console.error('\n❌ Release failed:', err.message);
  process.exit(1);
});
