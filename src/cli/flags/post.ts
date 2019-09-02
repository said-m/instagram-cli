import { CliFlagsEnum } from '../utils/enums/flags';
import { FlagDecriptionInterface } from '../utils/interfaces/flags';
import { createFlag } from './utils/helpers';

export const postFlag: FlagDecriptionInterface = [
  createFlag(CliFlagsEnum.post),
  {
    help: 'Вставьте id публикации',
  },
];
