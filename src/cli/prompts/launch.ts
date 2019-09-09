import prompts from 'prompts';

export const launchPropmt = (initial = '') => prompts({
  type: 'text',
  name: 'shortcode',
  message: 'Вставьте id публикации из URL',
  validate: value => /^[a-zA-Z0-9_-]{11,}$/.test(value),
  initial,
});
