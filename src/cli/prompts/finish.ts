import prompts from 'prompts';

export enum FinishPromptEnum {
  new = 'Новая публикация',
  exit = 'Завершить работу',
}

export const finishPrompt = () => prompts({
  type: 'select',
  name: 'finish',
  message: 'Обработка завершена, выберите дальнейшее действие.',
  choices: [
    {
      title: FinishPromptEnum.new,
      value: FinishPromptEnum.new,
    },
    {
      title: FinishPromptEnum.exit,
      value: FinishPromptEnum.exit,
    },
  ],
});
