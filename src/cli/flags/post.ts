import { CliFlagsEnum } from '../enums/flags';
import { FlagDecriptionInterface } from '../interfaces/flags';
import { createFlag } from './helpers';

export const postFlag: FlagDecriptionInterface = [
  createFlag(CliFlagsEnum.post),
  {
    help: 'Вставьте id публикации',
  },
];
