import { IgShortcodeMediaInterface } from '../../utils/interfaces';

export function text(
  data: IgShortcodeMediaInterface,
): string | undefined {
  try {
    return data.edge_media_to_caption.edges[0].node.text;
  } catch {
    return;
  }
}
