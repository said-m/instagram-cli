import { IgPostInterface } from '../../utils/interfaces';

export function location(
  data: IgPostInterface,
): string | undefined {
  return (
    data.location && data.location.name
  ) ||
  undefined;
}
