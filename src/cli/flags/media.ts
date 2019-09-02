import { CliFlagsEnum } from '../utils/enums/flags';
import { FlagDecriptionInterface } from '../utils/interfaces/flags';
import { createFlag } from './utils/helpers';

export const mediaFlag: FlagDecriptionInterface = [
  createFlag(CliFlagsEnum.media),
  {
    help: 'Вставьте id публикации',
  },
];
