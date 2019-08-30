import { ArgumentOptions } from 'argparse';
import { CliFlagsEnum } from '../enums/flags';

export type FlagDecriptionInterface = [
  Array<string>,
  ArgumentOptions,
];

export type FlagArgumentsInterface  = {
  [key in CliFlagsEnum]?: string;
};
