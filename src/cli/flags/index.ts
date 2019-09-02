import { ArgumentParser } from 'argparse';
import { readFileSync } from 'fs';
import { join } from 'path';
import { mediaFlag } from './media';
import { postFlag } from './post';

const cliFlags = new ArgumentParser({
  version: JSON.parse(
    readFileSync(
      join(__dirname, '..', '..', '..', 'package.json'),
      'utf-8',
    ),
  ).version,
});

cliFlags.addArgument(...postFlag);
cliFlags.addArgument(...mediaFlag);

export { cliFlags, };
