import hasProperty from 'ts-has-property';
import { CliFlagsEnum } from '../../enums/flags';
import { FlagArgumentsInterface } from '../../interfaces/flags';

export const getFlagArgument = (
  args: FlagArgumentsInterface,
  flag: CliFlagsEnum,
): string | undefined => {
  if (!hasProperty(args, flag)) {
    return;
  }

  return args[flag];
};
