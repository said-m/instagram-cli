#!/usr/bin/env node

import { Namespace } from 'argparse';
import { writeFile } from 'fs';
import { join } from 'path';
import hasProperty from 'ts-has-property';
import { getPost } from '../lib/methods';
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
      `Необходимо задать аргумент "${ getFlags(postFlag).join('"/"') }".\n`,
      'Помощь: "-h"',
    );
  }

  // @ts-ignore
  const result = await getPost(args.post);

  if (!result) {
    return console.log('Не удалось получить данные публикации.');
  }

  const fileName = args.post + ' - instagram-post.json';

  try {
    writeFile(
      join(process.cwd(), fileName),
      JSON.stringify(result, null, 2),
      () => console.log(`Результат записан в файл "${ fileName }" в текущем каталоге`),
    );
  } catch (error) {
    console.error('Ошибка при записи результата в файл:', error);
  }
}

launch().catch();
