import enquirer from 'enquirer';
import { releaseChangelog, releasePublish, releaseVersion } from 'nx/release/index.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { prompt } = enquirer;

const defaultValues = {
  dryRun: false,
  firstRelease: false,
  generateChangelog: true,
  publishPackages: true,
  runVersioning: true,
  verbose: false,
  versionType: 'patch',
};

const versionTypes = ['patch', 'minor', 'major', 'prerelease'];

/**
 * Run Nx release version
 * @param {string} versionType
 * @param {boolean} dryRun
 * @param {boolean} verbose
 * @param {boolean} firstRelease
 */
async function runVersioning(versionType, dryRun, verbose, firstRelease) {
  console.log('\n📦 Running versioning...');
  try {
    const { projectsVersionData, workspaceVersion } = await releaseVersion({
      dryRun,
      firstRelease,
      specifier: versionType,
      verbose,
    });
    console.log(`✅ Versioning completed. Workspace version: ${workspaceVersion}`);
    return { projectsVersionData, workspaceVersion };
  } catch (error) {
    console.error('❌ Versioning failed:', error.message);
    throw error;
  }
}

/**
 * Generate changelog
 * @param {any} versionData
 * @param {string} workspaceVersion
 * @param {boolean} dryRun
 * @param {boolean} verbose
 * @param {boolean} firstRelease
 */
async function generateChangelog(versionData, workspaceVersion, dryRun, verbose, firstRelease) {
  console.log('\n� Generating changelog...');
  try {
    await releaseChangelog({
      dryRun,
      firstRelease,
      verbose,
      version: workspaceVersion,
      versionData,
    });
    console.log('✅ Changelog generation completed');
  } catch (error) {
    console.error('❌ Changelog generation failed:', error.message);
    throw error;
  }
}

/**
 * Publish packages
 * @param {boolean} dryRun
 * @param {boolean} verbose
 * @param {boolean} firstRelease
 */
async function publishPackages(dryRun, verbose, firstRelease) {
  console.log('\n� Publishing packages...');
  try {
    const publishResults = await releasePublish({
      dryRun,
      firstRelease,
      verbose,
    });
    
    const allSuccessful = Object.values(publishResults).every((result) => result.code === 0);
    if (allSuccessful) {
      console.log('✅ Publishing completed successfully');
    } else {
      console.error('❌ Some packages failed to publish');
      console.error('Publish results:', publishResults);
      throw new Error('Publishing failed for some packages');
    }
    
    return publishResults;
  } catch (error) {
    console.error('❌ Publishing failed:', error.message);
    throw error;
  }
}

/**
 * Main release function
 */
async function main() {
  try {
    const argv = yargs(hideBin(process.argv))
      .option('yes', {
        alias: 'y',
        default: false,
        description: 'Run script with default values without prompting',
        type: 'boolean',
      })
      .option('dry-run', {
        alias: 'd',
        default: false,
        description: 'Run in dry-run mode (no actual changes)',
        type: 'boolean',
      })
      .option('version-type', {
        alias: 'v',
        choices: versionTypes,
        description: 'Version type to use for release',
        type: 'string',
      })
      .option('verbose', {
        default: false,
        description: 'Enable verbose logging',
        type: 'boolean',
      })
      .option('first-release', {
        default: false,
        description: 'Run as first release (no previous release exists)',
        type: 'boolean',
      })
      .help(true)
      .version(false)
      .parseSync();

    console.log('🎯 Piplup Release Script');
    console.log('========================\n');

    const config = { ...defaultValues };

    // Override with CLI arguments
    if (argv.dryRun) config.dryRun = true;
    if (argv.versionType) config.versionType = argv.versionType;
    if (argv.verbose) config.verbose = true;
    if (argv.firstRelease) config.firstRelease = true;

    let versionData = null;
    let workspaceVersion = null;

    if (argv.yes) {
      console.log('Running with default configuration...');
      // Versioning
      if (config.runVersioning) {
        const versionResult = await runVersioning(config.versionType, config.dryRun, config.verbose, config.firstRelease);
        versionData = versionResult.projectsVersionData;
        workspaceVersion = versionResult.workspaceVersion;
      }
      // Changelog
      if (config.generateChangelog && versionData && workspaceVersion) {
        await generateChangelog(versionData, workspaceVersion, config.dryRun, config.verbose, config.firstRelease);
      }
      // Publish
      if (config.publishPackages) {
        await publishPackages(config.dryRun, config.verbose, config.firstRelease);
      }
    } else {
      // Prompt for first release
      let result = await prompt({
        initial: config.firstRelease,
        message: 'Is this the first release (no previous release exists)?',
        name: 'firstRelease',
        type: 'confirm',
      });
      config.firstRelease = result['firstRelease'];

      // Prompt for dry run
      result = await prompt({
        initial: config.dryRun,
        message: 'Run in dry-run mode (no actual changes)?',
        name: 'dryRun',
        type: 'confirm',
      });
      config.dryRun = result['dryRun'];

      // Prompt for verbose
      result = await prompt({
        initial: config.verbose,
        message: 'Enable verbose logging?',
        name: 'verbose',
        type: 'confirm',
      });
      config.verbose = result['verbose'];

      // Prompt for versioning
      result = await prompt({
        initial: config.runVersioning,
        message: 'Run versioning (nx release version)?',
        name: 'runVersioning',
        type: 'confirm',
      });
      config.runVersioning = result['runVersioning'];

      if (config.runVersioning) {
        result = await prompt({
          choices: versionTypes,
          initial: versionTypes.indexOf(config.versionType),
          message: 'Select version type:',
          name: 'versionType',
          type: 'select',
        });
        config.versionType = result['versionType'];

        // Run versioning step
        const versionResult = await runVersioning(config.versionType, config.dryRun, config.verbose, config.firstRelease);
        versionData = versionResult.projectsVersionData;
        workspaceVersion = versionResult.workspaceVersion;
      } else {
        console.log('⏭️  Skipping versioning');
      }

      // Prompt for changelog
      result = await prompt({
        initial: config.generateChangelog,
        message: 'Generate changelog (nx release changelog)?',
        name: 'generateChangelog',
        type: 'confirm',
      });
      config.generateChangelog = result['generateChangelog'];

      if (config.generateChangelog) {
        if (versionData && workspaceVersion) {
          await generateChangelog(versionData, workspaceVersion, config.dryRun, config.verbose, config.firstRelease);
        } else {
          console.log('⚠️  Cannot generate changelog without version data. Skipping...');
        }
      } else {
        console.log('⏭️  Skipping changelog generation');
      }

      // Prompt for publish
      result = await prompt({
        initial: config.publishPackages,
        message: 'Publish packages (nx release publish)?',
        name: 'publishPackages',
        type: 'confirm',
      });
      config.publishPackages = result['publishPackages'];

      if (config.publishPackages) {
        await publishPackages(config.dryRun, config.verbose, config.firstRelease);
      } else {
        console.log('⏭️  Skipping package publishing');
      }
    }

    console.log('\n✅ Release process completed successfully!');

    if (config.dryRun) {
      console.log('\n💡 This was a dry run. Run without --dry-run to execute actual release.');
    } else {
      console.log('\n🎉 Packages have been released!');
      console.log('📋 Next steps:');
      console.log('  - Verify the packages on npm');
      console.log('  - Check the generated changelog');
      console.log('  - Update documentation if needed');
    }

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Release failed:', error.message);
    process.exit(1);
  }
}

main();
