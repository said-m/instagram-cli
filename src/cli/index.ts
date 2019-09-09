#!/usr/bin/env node

import { Namespace } from 'argparse';
import hasProperty from 'ts-has-property';
import { cliFlags } from './flags';
import { getFlagArgument } from './flags/utils/helpers';
import { interactiveCli } from './interactive';
import { save } from './save';
import { CliFlagsEnum } from './utils/enums/flags';
import { ParamsInterface } from './utils/interfaces/flags';

async function launch(): Promise<void> {
  const parsedAgrs: Namespace = cliFlags.parseArgs();
  const args: Partial<ParamsInterface> = { ...parsedAgrs };

  const postArg = getFlagArgument(args, CliFlagsEnum.post);
  const mediaArg = getFlagArgument(args, CliFlagsEnum.media);
  const interactiveArg = getFlagArgument(args, CliFlagsEnum.interactive);

  if (!hasProperty(args, CliFlagsEnum.id, 'string')) {
    return console.log('Необходимо указать ключ публикации');
  }

  if (interactiveArg) {
    await interactiveCli({
      data: args,
      settings: {},
    });

    return;
  }

  try {
    await save({
      data: {
        shortcode: args.shortcode,
        post: postArg || false,
        media: mediaArg || false,
      }
    });
  } catch {}
}

launch().catch();
