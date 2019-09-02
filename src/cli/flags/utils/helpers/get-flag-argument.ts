import hasProperty from 'ts-has-property';
import { CliFlagsEnum } from '../../../utils/enums/flags';
import { FlagArgumentsInterface } from '../../../utils/interfaces/flags';

export const getFlagArgument = (
  args: Partial<FlagArgumentsInterface>,
  flag: CliFlagsEnum,
): string | undefined => {
  if (!hasProperty(args, flag)) {
    return;
  }

  return args[flag];
};
