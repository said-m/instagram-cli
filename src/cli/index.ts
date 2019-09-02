#!/usr/bin/env node

import { Namespace } from 'argparse';
import { createWriteStream, mkdirSync } from 'fs';
import { join } from 'path';
import { GetMedia } from '../lib/methods';
import { allSettled } from '../lib/utils/helpers/all-settled';
import { cliFlags } from './flags';
import { postFlag } from './flags/post';
import { getFlagArgument, getFlags } from './flags/utils/helpers';
import { CliFlagsEnum } from './utils/enums/flags';
import { FlagArgumentsInterface } from './utils/interfaces/flags';

async function launch(): Promise<void> {
  const parsedAgrs: Namespace = cliFlags.parseArgs();
  const args: Partial<FlagArgumentsInterface> = { ...parsedAgrs };

  const postArg = getFlagArgument(args, CliFlagsEnum.post);

  if (!postArg) {
    return console.log(
      `Необходимо задать аргумент "${getFlags(postFlag).join('"/"')}".\n`,
      'Помощь: "-h"',
    );
  }

  const fileName = args.post + ' - instagram-post';

  const media = await (new GetMedia()).byShortcode(postArg);

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

  const downloads = [];
  for (const thisMediaIndex in media) {
    const thisMedia = await media[thisMediaIndex];

    if (!thisMedia) {
      continue;
    }

    const path = join(process.cwd(), fileName, thisMediaIndex + '.' + thisMedia.extension);

    console.log('начинаем запись ', thisMediaIndex);
    downloads.push(
      new Promise(
        resolve => thisMedia.stream.pipe(createWriteStream(path)).on(
          'close',
          () => {
            console.log('Заканчиваем', thisMediaIndex);

            resolve();
          },
        ),
      ),
    );
  }

  try {
    await allSettled(downloads);

    console.log('---- saved ----');
  } catch (error) {
    console.error(
      'Не получилось сохранить медиа',
      error,
    );
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
