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

  const locationName = idArg + ' - instagram-cli';
  const currentFolder = process.cwd();

  if (postArg) {
    const fileName = join(
      locationName,
      mediaArg ? 'data' : '',
    ) + '.json';

    try {
      writeFile(
        join(currentFolder, fileName),
        JSON.stringify(postData, null, 2),
        () => console.log(`Данные публикации записаны в файл "${ fileName }"`),
      );
    } catch (error) {
      console.error('Ошибка при записи данных публикации в файл:', error);
    }
  }

  if (mediaArg) {
    const media = await (new GetMedia()).byPostData(postData);

    const folderPath = join(currentFolder, locationName);
    const isFolderCreated = await createDir(folderPath);

    if (!isFolderCreated) {
      return console.error('Ошибка при попытке создать папку для сохранения медиа');
    }

    const downloads = [];
    for (const thisMediaIndex in media) {
      const thisMedia = await media[parseInt(thisMediaIndex)];

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
        if (thisDownload.status === allSettledStatusEnum.r) {
          return console.error(
            'Ошибка при сохранении медиа:',
            thisDownloadIndex,
            thisDownload.reason,
          );
        }
      },
    );

    console.log(`Результат сохранения медиа ищите в папке ${
      locationName
    } в текущем каталоге`);
  }
}

launch().catch();
