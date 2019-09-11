import hasProperty from 'ts-has-property';
import { CliFlagsEnum } from '../../../utils/enums/flags';
import { ParamsInterface } from '../../../utils/interfaces/flags';

export const getFlagArgument = (
  args: Partial<ParamsInterface>,
  flag: CliFlagsEnum,
): boolean => {
  if (!hasProperty(args, flag, 'boolean')) {
    return false;
  }

  return args[flag];
};
