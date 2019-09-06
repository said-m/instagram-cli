import { ArgumentOptions } from 'argparse';
import { CliFlagsEnum } from '../enums/flags';

export type ArgumentDecriptionInterface = [
  string,
  ArgumentOptions,
];

export type FlagDecriptionInterface = [
  Array<string>,
  ArgumentOptions,
];

export type FlagArgumentsInterface  = {
  [key in CliFlagsEnum]: string;
};
