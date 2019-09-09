import { InputInterface } from 'iods';
import { join } from 'path';
import { getPost } from '../lib/methods';
import { saveMedia, savePost } from './actions';
import { CliFlagsEnum } from './utils/enums/flags';
import { createDir } from './utils/helpers';

export const save = async (
  input: InputInterface<{
    [CliFlagsEnum.id]: string;
    [CliFlagsEnum.post]: boolean;
    [CliFlagsEnum.media]: boolean;
  }>,
): Promise<void> => {
  if (!(input.data.post || input.data.media)) {
    return console.info('Нужно хоть что-то требовать от проги');
  }

  const postData = await getPost(input.data.shortcode);

  if (!postData) {
    return console.log('Не удалось получить данные публикации.');
  }

  const isSubDir = input.data.media && input.data.post;
  const saveName = `${ input.data.shortcode } - instagram-cli`;
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

  if (input.data.post) {
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

  if (input.data.media) {
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
