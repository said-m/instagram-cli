#!/usr/bin/env node

import { Namespace } from 'argparse';
import { createWriteStream, mkdirSync } from 'fs';
import { join } from 'path';
import { implementation as allSettled } from 'promise.allsettled';
import { Writable } from 'stream';
import hasProperty from 'ts-has-property';
import { getMedia } from '../lib/methods';
import { CliFlagsEnum } from './enums/flags';
import { cliFlags } from './flags';
import { getFlags } from './flags/helpers';
import { postFlag } from './flags/post';
import { FlagArgumentsInterface } from './interfaces/flags';

async function launch(): Promise<void> {
  const parsedAgrs: Namespace = cliFlags.parseArgs();
  const args: FlagArgumentsInterface = { ...parsedAgrs };

  if (!hasProperty(args, CliFlagsEnum.post)) {
    return console.log(
      `Необходимо задать аргумент "${getFlags(postFlag).join('"/"')}".\n`,
      'Помощь: "-h"',
    );
  }

  const fileName = args.post + ' - instagram-post';

  const media = await getMedia(args.post);

  if (!media) {
    return console.log('Не получилось выгрузить изображения');
  }

  function ensureDirSync(dirpath: string) {
    try {
      mkdirSync(dirpath, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.error('Ошибка при попытке создать папку');
      }
    }
  }

  ensureDirSync(fileName);

  const downloads: Array<Writable> = [];
  for (const thisMediaIndex in media) {
    const thisMedia = await media[thisMediaIndex];

    if (!thisMedia) {
      continue;
    }

    const path = join(process.cwd(), fileName, thisMediaIndex + '.' + thisMedia.fileExtension);

    downloads.push(
      thisMedia.stream.pipe(createWriteStream(path)),
    );
  }

  try {
    await allSettled(downloads);

    console.log('---- saved ----');
  } catch {
    console.error('Не получилось сохранить медиа');
  }


  // const result = await getPost(args.post);

  // if (!result) {
  //   return console.log('Не удалось получить данные публикации.');
  // }

  // const fileName = args.post + ' - instagram-post.json';

  // try {
  //   writeFile(
  //     join(process.cwd(), fileName),
  //     JSON.stringify(result, null, 2),
  //     () => console.log(`Результат записан в файл "${ fileName }" в текущем каталоге`),
  //   );
  // } catch (error) {
  //   console.error('Ошибка при записи результата в файл:', error);
  // }
}

launch().catch();
