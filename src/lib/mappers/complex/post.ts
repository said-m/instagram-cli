import { IgPostInterface, PostInterface } from '../../interfaces';
import { location, media, text } from '../simple';

export function post(
  input: IgPostInterface,
): PostInterface | undefined {
  try {
    const data = input.graphql.shortcode_media;

    return {
      id: data.id,
      author: {
        id: data.owner.id,
        userName: data.owner.username,
        fullName: data.owner.full_name,
        avatar: data.owner.profile_pic_url,
        isVerified: data.owner.is_verified,
      },
      time: data.taken_at_timestamp,
      likes: data.edge_media_preview_like.count,
      text: text(data),
      media: media(data),
      location: location(data),
      isAd: data.is_ad,
    };
  } catch (error) {
    console.error(
      'Не удалось распасить данные.',
      'Возможно, Instagram изменил структуру объекта.',
      error,
    );
  }
}
