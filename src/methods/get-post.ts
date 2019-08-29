import requestPromise from 'request-promise';
import { IgPostInterface, IgShortcodeMediaInterface, IgStickyNodeInterface, MediaItemInterface, MediaSetInterface, MediaVideoInterface, PostInterface } from '../interfaces';

export async function getPost(id: string): Promise<PostInterface | undefined> {
  if (!id) {
    console.log('Необходимо передать id публикации');

    return;
  }

  try {
    const {
      graphql: {
        shortcode_media: data,
      },
    }: IgPostInterface = await requestPromise.get({
      uri: `https://instagram.com/p/${ id }`,
      qs: {
        __a: 1,
      },
      json: true,
      gzip: true,
    });

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
      text: getText(data),
      media: getMedia(data),
      location: getLocation(data),
      isAd: data.is_ad,
    };
  } catch (error) {
    console.error('Ошибка при загрузке данных', error);
  }
}

function getText(data: IgShortcodeMediaInterface): string | undefined {
  try {
    return data.edge_media_to_caption.edges[0].node.text;
  } catch {
    return;
  }
}

function getLocation(data: IgShortcodeMediaInterface): string | undefined {
  try {
    return data.location.name;
  } catch {
    return;
  }
}

function getMedia(
  data: IgShortcodeMediaInterface,
): Array<MediaItemInterface> {
  let list: Array<IgStickyNodeInterface>;

  if (!data.edge_sidecar_to_children) {
    list = [data];
  } else {
    list = data.edge_sidecar_to_children.edges.map(
      thisChild => thisChild.node,
    );
  }

  return list.map<MediaItemInterface>(
    thisItem => ({
      id: thisItem.id,
      shortcode: thisItem.shortcode,
      url: thisItem.display_url,
      sets: getSets(thisItem),
      tagged: thisItem.edge_media_to_tagged_user.edges.map(
        thisEdge => thisEdge.node,
      ),
      dimensions: thisItem.dimensions,
      video: getVideo(thisItem),
    }),
  );
}

function getVideo(
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

function getSets(
  data: IgStickyNodeInterface,
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
