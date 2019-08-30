import { ArgumentParser } from 'argparse';
import { readFileSync } from 'fs';
import { join } from 'path';
import { postFlag } from './post';

const _cliFlags = new ArgumentParser({
  version: JSON.parse(
    readFileSync(
      join(__dirname, '..', '..', '..', 'package.json'),
      'utf-8',
    ),
  ).version,
});

_cliFlags.addArgument(...postFlag);

export const cliFlags = _cliFlags;
