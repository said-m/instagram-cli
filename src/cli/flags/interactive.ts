import { CliFlagsEnum } from '../utils/enums/flags';
import { FlagDecriptionInterface } from '../utils/interfaces/flags';
import { createFlag } from './utils/helpers';

export const interactiveFlag: FlagDecriptionInterface = [
  createFlag(CliFlagsEnum.interactive),
  {
    help: 'Запустить в интерактивном режиме',
    action: 'storeTrue',
  },
];
