import prompts from 'prompts';

export enum ActionPromptEnum {
  post = 'Данные публикации',
  media = 'Медиа файлы публикации',
}

export const actionPrompt = () => prompts({
  type: 'multiselect',
  name: 'action',
  message: 'Что хотите получить?',
  choices: [
    {
      title: ActionPromptEnum.post,
      value: ActionPromptEnum.post,
    },
    {
      title: ActionPromptEnum.media,
      value: ActionPromptEnum.media,
    },
  ],
});
