/* eslint-disable node/no-sync */

import fs from 'node:fs';
import path from 'node:path';
import {
  RoarrError,
} from '../errors';

export const findNearestRoarrConfigurationPath = (startPath: string = process.cwd()): string | null => {
  let currentPath = startPath;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const roarrConfigurationPath = path.join(currentPath, '.roarr.js');

    try {
      fs.accessSync(roarrConfigurationPath, fs.constants.F_OK);
    } catch {
      const nextPath = path.resolve(currentPath, '..');

      if (nextPath === currentPath) {
        break;
      }

      currentPath = nextPath;

      continue;
    }

    try {
      fs.accessSync(roarrConfigurationPath, fs.constants.R_OK);

      return roarrConfigurationPath;
    } catch {
      throw new RoarrError('Found .roarr.js but do not have read permission.');
    }
  }

  return null;
};
