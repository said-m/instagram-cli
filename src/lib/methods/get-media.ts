import Axios, { AxiosResponse } from 'axios';
import { Writable } from 'stream';
import hasProperty from 'ts-has-property';
import { getPost } from '.';
import { mimes } from '../utils/constants';
import { HttpHeadersEnum } from '../utils/enums';
import { extensionFromUrl } from '../utils/helpers';
import { PostInterface } from '../utils/interfaces';
import { GetMediaMimesEnum } from './utils/enums';
import { GetMediaItemInterface, GetMediaOutputInterface } from './utils/interfaces';

export class GetMedia {
  static readonly allowedMimes: Array<GetMediaMimesEnum> = Object.values(GetMediaMimesEnum);

  async byShortcode(name: string): Promise<
    GetMediaOutputInterface
  > {
    const data = await getPost(name);

    if (!data) {
      return;
    }

    return this.byPostData(data);
  }

  byPostData(value: PostInterface): GetMediaOutputInterface {
    const mediaUrlList = value.media.map(
      thisMedia => thisMedia.video
        ? thisMedia.video.url
        : thisMedia.url,
    );

    return mediaUrlList.map(
      thisUrl => this.readMedia(thisUrl),
    );
  }

  private async readMedia(url: string): Promise<
    GetMediaItemInterface | undefined
  > {
    const fileMime = await this.isExistMedia(url);

    if (!fileMime) {
      return;
    }

    const response = await this.getStream(url);

    if (!response) {
      return;
    }

    return {
      stream: response.data,
      extension: fileMime === true
        ? extensionFromUrl(url) || 'unknown'
        : mimes[fileMime].extensions[0],
    };
  }

  private async isExistMedia(url: string, isStrict = true): Promise<
    GetMediaMimesEnum | boolean
  > {
    try {
      const { headers } = await Axios.head<void>(url);

      if (isStrict) {
        return (
          hasProperty(headers, HttpHeadersEnum.contentType)
          && GetMedia.allowedMimes.find(
            thisMime => thisMime === headers[HttpHeadersEnum.contentType],
          )
        ) || false;
      }

      return true;
    } catch (error) {
      console.error(
        'Ошибка обращения к ресурсу:',
        error,
      );

      return false;
    }
  }

  private async getStream(url: string): Promise<
    AxiosResponse<Writable> | undefined
  > {
    try {
      const response = await Axios.get<Writable>(
        url,
        {
          responseType: 'stream',
        },
      );

      return response;
    } catch (error) {
      console.error(
        'Ошибка при получении ресурса:',
        error,
      );

      return;
    }
  }
}
