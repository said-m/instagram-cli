#!/usr/bin/env node

import { Namespace } from 'argparse';
import { join } from 'path';
import { getPost } from '../lib/methods';
import { saveMedia, savePost } from './actions';
import { cliFlags } from './flags';
import { getFlagArgument } from './flags/utils/helpers';
import { CliFlagsEnum } from './utils/enums/flags';
import { createDir } from './utils/helpers';
import { FlagArgumentsInterface } from './utils/interfaces/flags';

async function launch(): Promise<void> {
  const parsedAgrs: Namespace = cliFlags.parseArgs();
  const args: Partial<FlagArgumentsInterface> = { ...parsedAgrs };

  const idArg = getFlagArgument(args, CliFlagsEnum.id);
  const postArg = getFlagArgument(args, CliFlagsEnum.post);
  const mediaArg = getFlagArgument(args, CliFlagsEnum.media);

  if (!idArg) {
    return console.log('Необходимо указать ключ публикации');
  }

  if (!(postArg || mediaArg)) {
    return console.info('Нужно хоть что-то требовать от проги');
  }

  const postData = await getPost(idArg);

  if (!postData) {
    return console.log('Не удалось получить данные публикации.');
  }

  const isSubDir = mediaArg && postArg;
  const saveName = `${ idArg } - instagram-cli`;
  const dirPath = isSubDir
    ? join(
      process.cwd(),
      saveName,
    )
    : process.cwd();

  const isFolderCreated = await createDir(dirPath);

  if (!isFolderCreated) {
    return console.error('Ошибка при попытке создать папку для сохранения');
  }

  if (postArg) {
    try {
      await savePost({
        data: postData,
        settings: {
          dirPath,
          fileName: isSubDir ? 'data' : saveName,
        },
      });
    } catch {}
  }

  if (mediaArg) {
    try {
      await saveMedia({
        data: postData,
        settings: {
          dirPath,
          fileName: '',
        },
      });
    } catch {}
  }
}

launch().catch();
