// @ts-check

import fs from 'node:fs';
import path from 'node:path';

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

      if (!fs.existsSync(packageJsonPath)) {
        console.warn(`package.json not found in ${outDir} folder`);
        return;
      }

      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      delete packageJson['files'];

      /**
       * Replace "./dist" with "." in value of an object property
       * @param {Record<string, any>} obj
       */
      const replace = (obj) => {
        for (const key in obj) {
          const value = obj[key];
          const replacePath = `./${outDir}`;
          if (typeof value === 'string' && value.startsWith(replacePath)) {
            obj[key] = value.replace(replacePath, '.');
          } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            obj[key] = replace(value);
          }
        }
        return obj;
      };

      replace(packageJson);

      // Write the modified package.json back
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
    },
  };
}

export default modifyOutputPackageJson;
