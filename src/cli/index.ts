#!/usr/bin/env node

import { Namespace } from 'argparse';
import { createWriteStream, writeFile } from 'fs';
import { join } from 'path';
import { GetMedia, getPost } from '../lib/methods';
import { allSettled, allSettledStatusEnum } from '../lib/utils/helpers/all-settled';
import { cliFlags } from './flags';
import { getFlagArgument } from './flags/utils/helpers';
import { CliFlagsEnum } from './utils/enums/flags';
import { createDir } from './utils/helpers';
import { FlagArgumentsInterface } from './utils/interfaces/flags';

async function launch(): Promise<void> {
  const parsedAgrs: Namespace = cliFlags.parseArgs();
  const args: Partial<FlagArgumentsInterface> = { ...parsedAgrs };

  const postArg = getFlagArgument(args, CliFlagsEnum.post);
  const mediaArg = getFlagArgument(args, CliFlagsEnum.media);

  if (!(postArg || mediaArg)) {
    return console.log('Нужно хоть что-то требовать от проги');
  }

  const fileName = (postArg || mediaArg) + ' - instagram-cli';
  const currentFolder = process.cwd();

  if (mediaArg) {
    const media = await (new GetMedia()).byShortcode(mediaArg);

    if (!media) {
      return console.error('Не удалось получить медиа файлы');
    }

    const folderPath = join(currentFolder, fileName);
    const isFolderCreated = await createDir(folderPath);

    if (!isFolderCreated) {
      return console.error('Ошибка при попытке создать папку для сохранения медиа');
    }

    const downloads = [];
    for (const thisMediaIndex in media) {
      const thisMedia = await media[thisMediaIndex];

      if (!thisMedia) {
        continue;
      }

      const mediaFileName = thisMediaIndex + '.' + thisMedia.extension;
      const filePath = join(folderPath, mediaFileName);

      console.info(`Стартовало сохранение: ${ mediaFileName }`);

      downloads.push(
        new Promise(
          resolve => thisMedia.stream.pipe(
            createWriteStream(filePath),
          ).on(
            'close',
            () => {
              console.info(`Завершено сохранение: ${ mediaFileName }`);
              resolve();
            },
          ),
        ),
      );
    }

    const downloaded = await allSettled(downloads);

    downloaded.forEach(
      (thisDownload, thisDownloadIndex) => {
        switch (thisDownload.status) {
          case allSettledStatusEnum.o:
            return console.warn('Не удалось вовремя сохранить медиа:', thisDownloadIndex);
          case allSettledStatusEnum.r:
            return console.error(
              'Ошибка при сохранении медиа:',
              thisDownloadIndex,
              thisDownload.reason,
            );
        }
      },
    );

    console.log(`Результат сохранения медиа ищите в папке ${
      fileName
    } в текущем каталоге`);
  }

  if (postArg) {
    const result = await getPost(postArg);

    if (!result) {
      return console.log('Не удалось получить данные публикации.');
    }

    try {
      writeFile(
        join(currentFolder, fileName + '.json'),
        JSON.stringify(result, null, 2),
        () => console.log(`Данные публикации записаны в файл "${
          fileName + '.json'
        }" в текущем каталоге`),
      );
    } catch (error) {
      console.error('Ошибка при записи данных публикации в файл:', error);
    }
  }
}

launch().catch();
