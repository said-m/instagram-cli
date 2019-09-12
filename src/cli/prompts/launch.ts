import prompts from 'prompts';
import { URL_REGEXP } from '../../lib/utils/constants';
import { parseShortcode } from '../utils/helpers';

export const launchPropmt = (initial = '') => prompts({
  type: 'text',
  name: 'shortcode',
  message: 'Вставьте id публикации из URL или саму ссылку',
  initial,
  validate: (value: string) => URL_REGEXP.instagram.key.test(value) ||
    URL_REGEXP.instagram.full.test(value),
  format: parseShortcode,
});
