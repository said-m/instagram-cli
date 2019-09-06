import { IgPostInterface } from '../../utils/interfaces';

export function text(
  data: IgPostInterface,
): string | undefined {
  try {
    return data.edge_media_to_caption.edges[0].node.text;
  } catch {
    return;
  }
}
