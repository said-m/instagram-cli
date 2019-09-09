import { ArgumentParser } from 'argparse';
import { readFileSync } from 'fs';
import { join } from 'path';
import { interactiveFlag } from './interactive';
import { mediaFlag } from './media';
import { postFlag } from './post';
import { shortcodeArg } from './shortcode';

const cliFlags = new ArgumentParser({
  version: JSON.parse(
    readFileSync(
      join(__dirname, '..', '..', '..', 'package.json'),
      'utf-8',
    ),
  ).version,
});

cliFlags.addArgument(...shortcodeArg);
cliFlags.addArgument(...postFlag);
cliFlags.addArgument(...mediaFlag);
cliFlags.addArgument(...interactiveFlag);

export { cliFlags };
