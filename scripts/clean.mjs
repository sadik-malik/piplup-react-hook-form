// @ts-check

import enquirer from 'enquirer';
import { rimraf } from 'rimraf';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { prompt } = enquirer;

const patterns = [
  './packages/*/dist',
  '**/vite.config.*.timestamp*',
];

const nodeModules = ['./packages/*/node_modules'];

const defaultValues = {
  deleteNodeModules: false,
};

async function main() {
  try {
    const argv = yargs(hideBin(process.argv))
      .option('yes', {
        alias: 'y',
        default: false,
        description: 'Run script with default values without prompting',
        type: 'boolean',
      })
      .help(true)
      .version(false)
      .parseSync();

    let $patterns = [...patterns];
    let deleteNodeModules;
    if (argv.yes) {
      deleteNodeModules = true;
    } else {
      /** @type {{deleteNodeModules: boolean }} */
      const response = await prompt([
        {
          initial: defaultValues.deleteNodeModules,
          message: 'Do you want to delete packages `node_modules` directories?',
          name: 'deleteNodeModules',
          type: 'confirm',
        },
      ]);
      deleteNodeModules = response.deleteNodeModules;
    }
    if (deleteNodeModules) {
      $patterns = $patterns.concat(nodeModules);
    }
    await rimraf($patterns, { glob: true });
    process.exit(0);
  } catch (err) {
    console.error('Clean failed:', err);
    process.exit(1);
  }
}

main();
