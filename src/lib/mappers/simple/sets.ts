import { IgMediaInterface, MediaSetInterface } from '../../utils/interfaces';

export function sets(
  data: IgMediaInterface,
): Array<MediaSetInterface> {
  if (!data.display_resources) {
    return [
      {
        url: data.display_url,
        dimensions: data.dimensions,
      },
    ];
  }

  return data.display_resources.map<MediaSetInterface>(
    thisResource => ({
      url: thisResource.src,
      dimensions: {
        width: thisResource.config_width,
        height: thisResource.config_height,
      },
    }),
  );
}
