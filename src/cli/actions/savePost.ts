import { writeFile } from 'fs';
import { OutputInterface } from 'iods';
import { join } from 'path';
import { SaveInputInterface } from '../utils/interfaces';

export const savePost = async (
  {
    data,
    settings,
  }: SaveInputInterface,
): Promise<
  OutputInterface<string> | undefined
> => {
  const filePath = join(
    settings.dirPath,
    settings.fileName,
  ) + '.json';

  try {
    await new Promise(
      resolve => writeFile(
        filePath,
        JSON.stringify(data, null, 2),
        resolve,
      ),
    );

    console.log(`Данные публикации записаны в файл "${ filePath }"`);

    return {
      data: filePath,
    };
  } catch (error) {
    console.error('Ошибка при записи данных публикации в файл:', error);

    return;
  }
};
