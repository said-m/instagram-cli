#!/usr/bin/env node

import { ArgumentParser } from 'argparse';
import { readFileSync, writeFile } from 'fs';
import { join } from 'path';
import { getPost } from '../lib/methods';

// TYPES

enum CliKeysEnum {
  post = 'post',
}

// ARGUMENTS

const argumentParser = new ArgumentParser({
  version: JSON.parse(
    readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'),
  ).version,
});

argumentParser.addArgument(
  getCliArguments(CliKeysEnum.post),
  {
    help: 'Вставьте id публикации',
  },
);

// BUSINESS LOGIC

function getCliArguments(key: CliKeysEnum): Array<string> {
  return [
    `-${ key[0] }`,
    `--${ key }`,
  ];
}

async function launch(): Promise<void> {
  const args = argumentParser.parseArgs();

  if (!args.post) {
    const keys = getCliArguments(CliKeysEnum.post);

    return console.log(
      `Необходимо задать аргумент "${ keys.join('"/"') }".\n`,
      'Помощь: "-h"',
    );
  }

  try {
    const result = await getPost(args.post);
    const fileName = args.post + ' - instagram-post.json';

    writeFile(
      join(process.cwd(), fileName),
      JSON.stringify(result, null, 2),
      () => console.log(`Результат записан в файл "${ fileName }" в текущем каталоге`),
    );
  } catch (error) {
    console.error('Ошибка при выполнении команды:', error);
  }
}

// LAUNCHER

launch().catch();
