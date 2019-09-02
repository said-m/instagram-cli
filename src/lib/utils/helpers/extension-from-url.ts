import { isArray } from '@said-m/common';

export const extensionFromUrl = (url: string): string | undefined => {
  const splited = url.match(/\.([^\./\?]+)($|\?)/);

  return isArray(splited) ? splited[1] : undefined;
};
