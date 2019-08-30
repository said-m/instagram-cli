import { IgStickyNodeInterface, MediaVideoInterface } from '../../interfaces';

export function video(
  data: IgStickyNodeInterface,
): MediaVideoInterface | undefined {
  if (
    !data.is_video ||
    typeof data.video_url !== 'string' ||
    typeof data.video_view_count !== 'number'
  ) {
    return;
  }

  return {
    url: data.video_url,
    views: data.video_view_count,
  };
}
