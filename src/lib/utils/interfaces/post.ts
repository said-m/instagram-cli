import { IgDimensionsInterface, IgEdgeMediaPreviewInterface, IgFluffyNodeInterface, IgLocationInterface, IgShortcodeMediaInterface, IgStickyNodeInterface, IgTentacledNodeInterface, IgUserClassInterface } from '.';

export interface PostInterface {
  id: IgShortcodeMediaInterface['id'];
  author: AuthorInterface;
  time: IgShortcodeMediaInterface['taken_at_timestamp'];
  likes: IgEdgeMediaPreviewInterface['count'];
  media: Array<MediaItemInterface>;
  isAd: IgShortcodeMediaInterface['is_ad'];
  text?: IgFluffyNodeInterface['text'];
  location?: IgLocationInterface['name'];
}

export interface AuthorInterface {
  id: IgUserClassInterface['id'];
  userName: IgUserClassInterface['username'];
  fullName?: IgUserClassInterface['full_name'];
  isVerified: IgUserClassInterface['is_verified'];
  avatar: IgUserClassInterface['profile_pic_url'];
}

export interface MediaItemInterface extends MediaSetInterface {
  id: IgStickyNodeInterface['id'];
  shortcode: IgStickyNodeInterface['shortcode'];
  sets: Array<MediaSetInterface>;
  tagged: Array<IgTentacledNodeInterface>;
  video?: MediaVideoInterface;
}

export interface MediaSetInterface {
  url: IgShortcodeMediaInterface['display_url'];
  dimensions: IgDimensionsInterface;
}

export interface MediaVideoInterface {
  url: Required<IgStickyNodeInterface>['video_url'];
  views: Required<IgStickyNodeInterface>['video_view_count'];
}
