import { CliFlagsEnum } from '../../enums/flags';

export const createFlag = (key: CliFlagsEnum): Array<string> => {
  return [
    `-${ key[0] }`,
    `--${ key }`,
  ];
};
