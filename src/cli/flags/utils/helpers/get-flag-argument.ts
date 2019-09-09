import hasProperty from 'ts-has-property';
import { CliFlagsEnum } from '../../../utils/enums/flags';
import { ParamsInterface } from '../../../utils/interfaces/flags';

export const getFlagArgument = (
  args: Partial<ParamsInterface>,
  flag: CliFlagsEnum,
): boolean | undefined => {
  if (!hasProperty(args, flag, true)) {
    return;
  }

  return !!args[flag];
};
