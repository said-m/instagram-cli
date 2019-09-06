import { IgTypenameEnum } from '../enums';
import { IgPostInterface } from '../interfaces';

export const isSidecardsPost = (
  data: IgPostInterface<unknown>,
): data is IgPostInterface<
  IgTypenameEnum.sidecar
> => {
  return data.__typename === IgTypenameEnum.sidecar;
};
