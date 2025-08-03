// @ts-check

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import yaml from 'js-yaml';
import getWorkspaceRoot from './get-workspace-root.mjs';

/**
 * Read workspace globs from pnpm-workspace.yml
 * @param {string} workspaceRoot
 * @returns {string[]} Array of workspace glob patterns
 */
function getWorkspaceGlobs(workspaceRoot) {
  const pnpmWorkspacePath = path.resolve(workspaceRoot, 'pnpm-workspace.yaml');
  if (!existsSync(pnpmWorkspacePath)) return [];
  try {
    const content = readFileSync(pnpmWorkspacePath, 'utf-8');
    const data = yaml.load(content);
    const pkgs =
      data && typeof data === 'object' && data !== null
        ? /** @type {{ packages?: unknown }} */ (data).packages
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
 * @param {string} workspaceRoot
 * @returns {Record<string, string>}
 */
function getAllLocalPackages(globs, workspaceRoot) {
  /** @type {Record<string, string>} */
  const result = {};
  for (const pattern of globs) {
    // Find all package.json files matching the workspace glob
    const matches = globSync(path.join(pattern, 'package.json'), {
      absolute: true,
      cwd: workspaceRoot,
    });
    for (const pkgJsonPath of matches) {
      if (existsSync(pkgJsonPath)) {
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
  }
  return result;
}

/**
 * Resolve a workspace:* version to the actual version from local packages only
 * @param {string} depName
 * @param {Record<string, string>} localPackages
 * @returns {string|null}
 */
function resolveWorkspaceVersion(depName, localPackages) {
  return localPackages[depName] || null;
}

/**
 * Resolve all workspace:* dependencies in a package.json, mutate in place. Returns true if any error occurred.
 * @param {object} packageJson
 * @param {string[]} depTypes
 * @param {Record<string, string>} localPackages
 * @returns {boolean} true if error, false if all ok
 */
function resolveWorkspaceDependencies(packageJson, depTypes, localPackages) {
  let hadError = false;
  const workspacePackageNames = new Set(Object.keys(localPackages));
  for (const depType of depTypes) {
    if (packageJson[depType]) {
      for (const dep in packageJson[depType]) {
        const version = packageJson[depType][dep];
        if (typeof version === 'string' && version.startsWith('workspace:')) {
          if (workspacePackageNames.has(dep)) {
            const actualVersion = resolveWorkspaceVersion(dep, localPackages);
            if (actualVersion) {
              packageJson[depType][dep] = actualVersion;
            } else {
              // Workspace package found but no version, error
              console.error(
                `Dependency '${dep}' in '${depType}' uses 'workspace:*' but no version could be resolved from the workspace. Please fix your dependencies.`,
              );
              hadError = true;
            }
          } else {
            // Not a workspace package, error
            console.error(
              `Dependency '${dep}' in '${depType}' uses 'workspace:*' but is not defined in the workspace. Please fix your dependencies.`,
            );
            hadError = true;
          }
        }
      }
    }
  }
  return hadError;
}

/**
 * Replace "./dist" with "." in value of an object property
 * @param {Record<string, any>} obj
 * @param {string} outDir
 */
function replaceDistPaths(obj, outDir) {
  for (const key in obj) {
    const value = obj[key];
    const replacePath = `./${outDir}`;
    if (typeof value === 'string' && value.startsWith(replacePath)) {
      obj[key] = value.replace(replacePath, '.');
    } else if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    ) {
      obj[key] = replaceDistPaths(value, outDir);
    }
  }
  return obj;
}

/**
 * Vite plugin to modify the output `package.json` file by replacing paths.
 * Specifically, replaces occurrences of `./dist` with `./` in all string values.
 *
 * @returns {import('vite').Plugin} Vite plugin configuration object
 */
function modifyOutputPackageJson() {
  return {
    apply: 'build',
    name: 'modify-output-package-json',
    writeBundle() {
      const outDir = 'dist';
      const packageJsonPath = path.resolve(outDir, 'package.json');

      if (!existsSync(packageJsonPath)) {
        console.warn(`package.json not found in ${outDir} folder`);
        return;
      }

      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      delete packageJson['files'];

      // Replace workspace:* versions with actual version from local package only
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

      replaceDistPaths(packageJson, outDir);

      // Write the modified package.json back
      writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2),
        'utf-8',
      );
    },
  };
}

export default modifyOutputPackageJson;
