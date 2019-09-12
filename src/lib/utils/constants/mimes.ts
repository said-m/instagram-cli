import { MimesEnum } from '../enums';

export const MIME_EXTENSIONS: {
  [key in MimesEnum]: string;
} = {
  [MimesEnum.jpg]: 'jpg',
  [MimesEnum.png]: 'png',
  [MimesEnum.gif]: 'gif',
  [MimesEnum.mp4]: 'mp4',
}
