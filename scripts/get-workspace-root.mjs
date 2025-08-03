// @ts-check

import path from 'node:path';
import url from 'node:url';

/**
 * Returns the full path of the root directory of this repository.
 */
function getWorkspaceRoot() {
  const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
  const workspaceRoot = path.resolve(currentDirectory, '..');
  return workspaceRoot;
}

export default getWorkspaceRoot;
