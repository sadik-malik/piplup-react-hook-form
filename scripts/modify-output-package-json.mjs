import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import yaml from 'js-yaml';
import getWorkspaceRoot from './get-workspace-root.mjs';

/**
 * Read workspace globs from pnpm-workspace.yaml
 * @param {string} workspaceRoot
 * @returns {string[]}
 */
function getWorkspaceGlobs(workspaceRoot) {
  const pnpmWorkspacePath = path.resolve(workspaceRoot, 'pnpm-workspace.yaml');
  if (!existsSync(pnpmWorkspacePath)) return [];

  try {
    const content = readFileSync(pnpmWorkspacePath, 'utf-8');
    const data = yaml.load(content);
    const pkgs =
      data && typeof data === 'object' && data !== null
        ? data.packages
        : undefined;

    if (Array.isArray(pkgs)) {
      return pkgs.filter((g) => typeof g === 'string');
    }
  } catch (e) {
    console.warn(`Failed to read pnpm-workspace.yaml: ${e.message}`);
  }

  return [];
}

/**
 * Get all local packages in the workspace (name -> version)
 * @param {string[]} globs
 * @param {string} workspaceRoot
 * @returns {Record<string, string>}
 */
function getAllLocalPackages(globs, workspaceRoot) {
  const result = {};

  for (const pattern of globs) {
    const matches = globSync(`${pattern}/package.json`, {
      absolute: true,
      cwd: workspaceRoot,
    });

    for (const pkgJsonPath of matches) {
      try {
        const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
        if (pkgJson.name && pkgJson.version) {
          result[pkgJson.name] = pkgJson.version;
        }
      } catch (e) {
        console.warn(
          `Failed to parse package.json at ${pkgJsonPath}: ${e.message}`,
        );
      }
    }
  }

  return result;
}

/**
 * Resolve workspace dependencies in-place
 * @param {object} packageJson
 * @param {string[]} depTypes
 * @param {Record<string, string>} localPackages
 * @returns {boolean} true if error occurred
 */
function resolveWorkspaceDependencies(packageJson, depTypes, localPackages) {
  let hadError = false;
  const workspacePackageNames = new Set(Object.keys(localPackages));

  for (const depType of depTypes) {
    const deps = packageJson[depType];
    if (!deps) continue;

    for (const dep of Object.keys(deps)) {
      const version = deps[dep];
      if (typeof version !== 'string' || !version.startsWith('workspace:')) {
        continue;
      }

      if (!workspacePackageNames.has(dep)) {
        console.error(
          `Dependency '${dep}' in '${depType}' uses 'workspace:*' but is not part of the workspace.`,
        );
        hadError = true;
        continue;
      }

      const actualVersion = localPackages[dep];
      if (!actualVersion) {
        console.error(
          `Dependency '${dep}' in '${depType}' could not resolve a local version.`,
        );
        hadError = true;
        continue;
      }

      const range = version.replace('workspace:', '');
      deps[dep] = range === '*' ? actualVersion : `${range}${actualVersion}`;
    }
  }

  return hadError;
}

/**
 * Replace "./dist" with "." recursively in object values
 * @param {Record<string, any>} obj
 * @param {string} outDir
 */
function replaceDistPaths(obj, outDir) {
  const replacePath = `./${outDir}`;

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string' && value.startsWith(replacePath)) {
      obj[key] = value.replace(replacePath, '.');
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      replaceDistPaths(value, outDir);
    }
  }
}

/**
 * Vite plugin to normalize output package.json for publishing
 * @returns {import('vite').Plugin}
 */
function modifyOutputPackageJson() {
  let outDir = 'dist';
  let rootDir = process.cwd();

  return {
    apply: 'build',
    closeBundle() {
      const packageJsonPath = path.resolve(rootDir, outDir, 'package.json');

      if (!existsSync(packageJsonPath)) {
        console.warn(`package.json not found in ${packageJsonPath}.`);
        return;
      }

      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

      // Remove "files" only if exports exist
      if (packageJson.exports) {
        delete packageJson.files;
      }

      const depTypes = [
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'optionalDependencies',
      ];

      const workspaceRoot = getWorkspaceRoot();
      const workspaceGlobs = getWorkspaceGlobs(workspaceRoot);
      const localPackages = getAllLocalPackages(workspaceGlobs, workspaceRoot);

      const hadWorkspaceError = resolveWorkspaceDependencies(
        packageJson,
        depTypes,
        localPackages,
      );

      if (hadWorkspaceError) {
        process.exit(1);
      }
      replaceDistPaths(packageJson, path.basename(outDir));

      writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2),
        'utf-8',
      );
    },
    configResolved(resolvedConfig) {
      // outDir and rootDir from Vite config
      outDir = resolvedConfig.build.outDir || 'dist';
      rootDir = resolvedConfig.root || process.cwd();
    },
    enforce: 'post',
    name: 'modify-output-package-json',
  };
}

export default modifyOutputPackageJson;
