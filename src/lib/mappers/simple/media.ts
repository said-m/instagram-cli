import { IgShortcodeMediaInterface, IgStickyNodeInterface, MediaItemInterface } from '../../interfaces';
import { sets, video } from '../simple';

export function media(
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
      sets: sets(thisItem),
      tagged: thisItem.edge_media_to_tagged_user.edges.map(
        thisEdge => thisEdge.node,
      ),
      dimensions: thisItem.dimensions,
      video: video(thisItem),
    }),
  );
}
