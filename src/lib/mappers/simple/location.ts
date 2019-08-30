import { IgShortcodeMediaInterface } from '../../interfaces';

export function location(
  data: IgShortcodeMediaInterface,
): string | undefined {
  try {
    return data.location.name;
  } catch {
    return;
  }
}
