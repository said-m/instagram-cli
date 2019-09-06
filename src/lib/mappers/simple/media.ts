import { isSidecardsPost } from '../../utils/helpers/is-sidecards-post';
import { IgMediaInterface, IgPostInterface, MediaItemInterface } from '../../utils/interfaces';
import { sets, video } from '../simple';

export function media(
  data: IgPostInterface,
): Array<MediaItemInterface> {
  let list: Array<IgMediaInterface>;

  if (isSidecardsPost(data)) {
    list = data.edge_sidecar_to_children.edges.map(
      thisChild => thisChild.node,
    );
  } else {
    list = [data];
  }

  return list.map<MediaItemInterface>(
    thisItem => ({
      id: thisItem.id,
      shortcode: thisItem.shortcode,
      url: thisItem.display_url,
      sets: sets(thisItem),
      tagged: thisItem.edge_media_to_tagged_user.edges.map(
        thisEdge => thisEdge.node,
      ),
      dimensions: thisItem.dimensions,
      video: video(thisItem),
    }),
  );
}
