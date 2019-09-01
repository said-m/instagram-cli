import { isArray } from '@said-m/common';
import Axios from 'axios';
import { Writable } from 'stream';
import { getPost } from '.';

const fileExtension = function (uri: string): string | undefined {
  const splited = uri.match(/\.([^\./\?]+)($|\?)/);

  return isArray(splited) ? splited[1] : undefined;
};

export async function getMedia(id: string): Promise<
  Array<Promise<
    {
      stream: Writable,
      fileExtension: string,
    } | undefined
  >> | undefined
> {
  if (!id) {
    console.log('Необходимо передать id публикации');

    return;
  }

  const data = await getPost(id);

  if (!data) {
    return;
  }

  const loadImage = (uri: string): Promise<
    {
      stream: Writable,
      fileExtension: string,
    } | undefined
  > => new Promise(async (response, reject) => {
    try {
      const { data } = await Axios.get<Writable>(
        uri,
        {
          responseType: 'stream',
        },
      );

      response({
        stream: data,
        fileExtension: fileExtension(uri) || 'unknown',
      });
    } catch (error) {
      console.error('Ошибка при получении медиа-файла');
    }
  });

  return data.media.map(async thisMedia => {
    if (thisMedia.video) {
      return loadImage(thisMedia.video.url);
    }

    return loadImage(thisMedia.url);
  });
}
