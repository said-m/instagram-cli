import { InputInterface } from 'iods';
import hasProperty from 'ts-has-property';
import { getPost } from '../lib/methods';
import { actionPrompt, ActionPromptEnum, exitPrompt, finishPrompt, FinishPromptEnum, launchPropmt } from './prompts';
import { save } from './save';
import { CliFlagsEnum } from './utils/enums/flags';
import { ParamsInterface } from './utils/interfaces';

export interface InteractiveSettingsInterface {
  useDefault?: boolean;
}

export const interactiveCli = async (
  input: InputInterface<
    Partial<ParamsInterface>,
    InteractiveSettingsInterface
  >,
): Promise<void> => {
  const id = hasProperty(input.data, CliFlagsEnum.id, 'string')
    ? input.data.shortcode
    : undefined;

  if (!id && input.settings.useDefault) {
    return console.log('Ошибка инициализации Cli');
  }

  const { shortcode } = input.settings.useDefault
    ? {
      shortcode: id,
    }
    : await launchPropmt(id);

  if (!shortcode) {
    const { exit } = await exitPrompt('ID не вставлен.');

    if (exit) {
      return;
    }

    return interactiveCli(input);
  }

  const { action } = await actionPrompt();

  if (!(action && action.length)) {
    const { exit } = await exitPrompt('Ничего не выбрано.');

    if (exit) {
      return;
    }

    return interactiveCli({
      data: input.data,
      settings: {
        ...input.settings,
        useDefault: true,
      },
    });
  }

  const actionList = {
    post: action.includes(ActionPromptEnum.post),
    media: action.includes(ActionPromptEnum.media),
  };

  const postData = await getPost(shortcode);

  if (!postData) {
    const { exit } = await exitPrompt('Не удалось получить данные.');

    if (exit) {
      return;
    }

    return interactiveCli({
      data: {
        ...input.data,
        shortcode: undefined,
      },
      settings: input.settings,
    });
  }

  try {
    await save({
      data: {
        shortcode,
        ...actionList,
      },
    });

    const { finish } = await finishPrompt();

    switch (finish) {
      case FinishPromptEnum.exit:
        return;
      case FinishPromptEnum.new:
        return interactiveCli({
          data: {
            ...input.data,
            shortcode: undefined,
          },
          settings: input.settings,
        });
    }

    return console.warn('Действие не выбрано');
  } catch {}
};
