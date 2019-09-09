import prompts from 'prompts';

export enum ExitPromptEnum {
  post = 'Данные публикации',
  media = 'Медиа файлы публикации',
}

export const exitPrompt = (prefix = '') => prompts({
  type: 'toggle',
  name: 'exit',
  message: (prefix ? prefix + ' ' : '') + 'Завершить работу?',
  initial: false,
  active: 'Да',
  inactive: 'Нет',
});
