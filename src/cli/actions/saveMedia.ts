import { createWriteStream } from 'fs';
import { OutputInterface } from 'iods';
import { join } from 'path';
import { GetMedia } from '../../lib/methods';
import { allSettled, allSettledStatusEnum } from '../../lib/utils/helpers';
import { SaveInputInterface } from '../utils/interfaces';

export const saveMedia = async (
  {
    data,
    settings,
  }: SaveInputInterface,
): Promise<
  OutputInterface<Array<string>> | undefined
> => {
  const mediaList = await (new GetMedia()).byPostData(data);

  const downloads = [];
  for (const thisMediaIndex in mediaList) {
    const thisMedia = await mediaList[parseInt(thisMediaIndex)];

    if (!thisMedia) {
      continue;
    }

    const mediaFileName = (settings.fileName ? settings.fileName + ' - ' : '') +
      thisMediaIndex + '.' + thisMedia.extension;
    const filePath = join(settings.dirPath, mediaFileName);

    console.info(`Стартовало сохранение: ${ filePath }`);

    downloads.push(
      new Promise<string>(
        resolve => thisMedia.stream.pipe(
          createWriteStream(filePath),
        ).on(
          'close',
          () => {
            console.info(`Завершено сохранение: ${ filePath }`);
            resolve(filePath);
          },
        ),
      ),
    );
  }

  const downloadedList = await allSettled(downloads);
  const successes: Array<string> = [];

  downloadedList.forEach(
    (thisDownload, thisDownloadIndex) => {
      if (thisDownload.status === allSettledStatusEnum.r) {
        return console.error(
          'Ошибка при сохранении медиа:',
          thisDownloadIndex,
          thisDownload.reason,
        );
      }

      successes.push(thisDownload.value);
    },
  );

  console.log(
    'Результат сохранения медиа ищите в папке:\n',
    settings.dirPath,
  );

  return {
    data: successes,
  };
};
