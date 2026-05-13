#!/usr/bin/env tsx
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

function run(cmd: string): string {
  return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' }).trim();
}

interface Bucket {
  label: string;
  items: string[];
}
type BucketMap = Record<string, Bucket>;

let lastTag: string | undefined;
try {
  lastTag = run('git describe --tags --abbrev=0');
} catch {
  lastTag = undefined;
}

const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
const log = run(`git log ${range} --pretty=format:"%H|%s|%an" --no-merges`);

if (!log) {
  console.log('No commits since last release.');
  process.exit(0);
}

const TYPES: BucketMap = {
  feat: { label: '### ✨ Features', items: [] },
  fix: { label: '### 🐛 Bug Fixes', items: [] },
  perf: { label: '### ⚡ Performance', items: [] },
  refactor: { label: '### ♻️  Refactors', items: [] },
  docs: { label: '### 📝 Documentation', items: [] },
  chore: { label: '### 🔧 Chores', items: [] },
  test: { label: '### 🧪 Tests', items: [] },
  ci: { label: '### 👷 CI', items: [] },
  other: { label: '### 📦 Other', items: [] },
};

const BREAKING: string[] = [];

for (const line of log.split('\n')) {
  const [hash, subject, author] = line.split('|') as [string, string, string];
  const short = hash.slice(0, 7);

  if (subject.includes('BREAKING CHANGE') || subject.includes('!:')) {
    BREAKING.push(`- ${subject} (\`${short}\`) — *${author}*`);
  }

  const match = subject.match(/^(\w+)(\(.+?\))?!?: (.+)/);
  if (match) {
    const [, type, scope, msg] = match as [string, string, string | undefined, string];
    const scopeStr = scope ? ` **${scope.slice(1, -1)}**:` : '';
    const entry = `- ${scopeStr} ${msg} (\`${short}\`)`;
    (TYPES[type] ?? TYPES['other']!).items.push(entry);
  } else {
    TYPES['other']!.items.push(`- ${subject} (\`${short}\`)`);
  }
}

const date = new Date().toISOString().slice(0, 10);
const version = readJson<{ version: string }>(resolve(ROOT, 'package.json')).version;
const lines: string[] = [`## [${version}] — ${date}\n`];

if (BREAKING.length) {
  lines.push('### 💥 Breaking Changes\n', ...BREAKING, '');
}
for (const { label, items } of Object.values(TYPES)) {
  if (items.length) {
    lines.push(label + '\n', ...items, '');
  }
}

const entry = lines.join('\n');

if (process.argv.includes('--write')) {
  const changelogPath = resolve(ROOT, 'CHANGELOG.md');
  const existing = existsSync(changelogPath) ? readFileSync(changelogPath, 'utf8') : '';
  writeFileSync(changelogPath, entry + '\n---\n\n' + existing);
  console.log('✅ CHANGELOG.md updated.');
} else {
  console.log(entry);
}

function readJson<T>(p: string): T {
  return JSON.parse(readFileSync(p, 'utf8')) as T;
}
