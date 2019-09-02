import { mkdirSync } from 'fs';

export const createDir = async (paht: string): Promise<boolean> => {
  try {
    mkdirSync(
      paht,
      {
        recursive: true,
      },
    );

    return true;
  } catch (err) {
    if (err.code === 'EEXIST') {
      return true;
    }
    console.error('Ошибка при попытке создать папку');

    return false;
  }
};
