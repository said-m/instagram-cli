import hasProperty from 'ts-has-property';
import { URL_REGEXP } from '../../../lib/utils/constants';

export const parseShortcode = (value: string): string => {
  if (URL_REGEXP.instagram.full.test(value)) {
    const match = value.match(URL_REGEXP.instagram.full);
    const matchIndex = 5;

    if (!match) {
      throw Error('Ошибка обработки ссылки на публикации');
    }

    if (
      !hasProperty(match, matchIndex, 'string') ||
      !URL_REGEXP.instagram.key.test(match[matchIndex])
    ) {
      throw Error('Не удалось распарсить ссылку');
    }

    return match[matchIndex];
  }

  if (!URL_REGEXP.instagram.key.test(value)) {
    throw Error('Не удалось найти id публикации');
  }

  return value;
};
