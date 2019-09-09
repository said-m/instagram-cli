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

export type ParamsInterface  = {
  [key in CliFlagsEnum]: string | boolean;
};

export type FlagArgumentsInterface  = {
  [key in CliFlagsEnum]: boolean;
};
