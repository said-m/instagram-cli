import Axios from 'axios';
import { post } from '../mappers/complex';
import { IgResponseInterface, PostInterface } from '../utils/interfaces';

export async function getPost(id: string): Promise<
  PostInterface | undefined
> {
  if (!id) {
    console.log('Необходимо передать id публикации');

    return;
  }

  const loadData = async (): Promise<
    IgResponseInterface | undefined
  > => {
    try {
      const { data } = await Axios.get<IgResponseInterface>(
        `https://instagram.com/p/${ id }`,
        {
          params: {
            __a: 1,
          },
          responseType: 'json',
        },
      );

      return data;
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  const data = await loadData();

  if (!data) {
    return;
  }

  return post(data);
}
