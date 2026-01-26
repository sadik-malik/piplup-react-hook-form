#!/usr/bin/env node

// @ts-check

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import enquirer from 'enquirer';
import { globSync } from 'glob';

const { prompt } = enquirer;

/**
 * Read projects under `packages/` that contain a `project.json`.
 * @returns {Array<{dir: string, name: string, sourceRoot: string}>}
 */
function readProjects() {
  const pkgsDir = path.resolve(process.cwd(), 'packages');
  if (!fs.existsSync(pkgsDir)) return [];
  return fs
    .readdirSync(pkgsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const projJson = path.join(pkgsDir, d.name, 'project.json');
      if (!fs.existsSync(projJson)) return null;
      try {
        const pj = JSON.parse(fs.readFileSync(projJson, 'utf8'));
        return {
          dir: path.join('packages', d.name),
          name: pj.name || d.name,
          sourceRoot: pj.sourceRoot || path.join('packages', d.name, 'src'),
        };
      } catch {
        return null;
      }
    })
    .filter((value) => value !== null);
}

/**
 * Prompt the user to select projects.
 * @param {Array<{dir: string, name: string, sourceRoot: string}>} projects
 * @returns {Promise<string[]>} array of selected project names (strings). If `__all` chosen, expands to all project names.
 */
async function selectProjects(projects) {
  const choices = [
    { message: 'All packages', name: '__all' },
    ...projects.map((p) => ({ message: p.name, name: p.name })),
  ];

  /** @type {{ projects: string[] }} */
  const projectRes = await prompt([
    {
      choices: choices,
      message: 'Select packages to test (space to select):',
      name: 'projects',
      type: 'multiselect',
    },
  ]);

  const selected = projectRes.projects;
  if (!selected || selected.length === 0) {
    console.error('No packages selected. Aborting.');
    process.exit(1);
  }

  const selectedValues = selected.map((s) =>
    typeof s === 'string' ? s : String(s),
  );
  if (selectedValues.includes('__all')) {
    return projects.map((p) => p.name);
  }
  return selectedValues;
}

/**
 * Prompt whether to run in watch mode.
 * @returns {Promise<boolean>}
 */
async function promptWatch() {
  /** @type {{ watch: boolean }} */
  /** @type {{ watch: 'yes' | 'no' }} */
  const watchRes = await prompt([
    {
      choices: [
        { message: 'Yes', name: 'yes' },
        { message: 'No', name: 'no' },
      ],
      message: 'Run in watch mode?',
      name: 'watch',
      type: 'select',
    },
  ]);
  return watchRes.watch === 'yes';
}

/**
 * Scan selected projects for spec files and optionally prompt user to select files.
 * @param {Array<{dir: string, name: string, sourceRoot: string}>} projects
 * @param {string[]} selectedProjects
 * @returns {Promise<string[]>} array of spec file paths (relative) or an empty array to run all.
 */
async function selectSpecs(projects, selectedProjects) {
  const allSpecs = [];
  for (const proj of projects) {
    if (!selectedProjects.includes(proj.name)) continue;
    const root = path.resolve(process.cwd(), proj.sourceRoot || proj.dir);
    const patterns = [
      path.join(root, '**/*.spec.{ts,tsx,js,jsx}'),
      path.join(root, '**/*.test.{ts,tsx,js,jsx}'),
    ];
    for (const pat of patterns) {
      const found = globSync(pat, { nodir: true });
      allSpecs.push(...found.map((f) => path.relative(process.cwd(), f)));
    }
  }

  if (!allSpecs.length) return [];

  /** @type {{ selectFiles: 'yes' | 'no' }} */
  const selectFilesRes = await prompt([
    {
      choices: [
        { message: 'Yes', name: 'yes' },
        { message: 'No', name: 'no' },
      ],
      message:
        'Select specific spec files to run? (No = run all files for selected packages)',
      name: 'selectFiles',
      type: 'select',
    },
  ]);

  if (selectFilesRes.selectFiles !== 'yes') return [];

  const specChoices = allSpecs.map((s) => ({ message: s, name: s }));
  /** @type {{ specs: string[] }} */
  const specRes = await prompt([
    {
      choices: specChoices,
      message: 'Select spec files to run (space to select):',
      name: 'specs',
      type: 'multiselect',
    },
  ]);

  return (specRes.specs || []).map((s) => String(s));
}

async function main() {
  const projects = readProjects();
  if (!projects.length) {
    console.error('No projects found under packages/.');
    process.exit(1);
  }
  const selectedProjects = await selectProjects(projects);
  const watch = await promptWatch();

  // Build nx command
  const nxArgs = [];
  if (selectedProjects.length === projects.length) {
    nxArgs.push('run-many', '--target=component-test', '--all');
    if (watch) nxArgs.push('--watch');
  } else if (selectedProjects.length > 1) {
    nxArgs.push(
      'run-many',
      '--target=component-test',
      `--projects=${selectedProjects.join(',')}`,
    );
    if (watch) nxArgs.push('--watch');
  } else {
    nxArgs.push('run', `${selectedProjects[0]}:component-test`);
    if (watch) nxArgs.push('--watch');
  }

  if (!watch) {
    const specsToRun = await selectSpecs(projects, selectedProjects);
    // If the user selected specific spec files, pass them through to nx
    if (specsToRun && specsToRun.length) {
      nxArgs.push('--', '--spec', specsToRun.join(','));
    }
  }

  console.log('Running: pnpm', ['nx', ...nxArgs].join(' '));

  const child = spawn('pnpm', ['nx', ...nxArgs], { stdio: 'inherit' });
  child.on('exit', (code) => process.exit(code));
}

main();
