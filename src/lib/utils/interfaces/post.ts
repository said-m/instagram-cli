import { IgDimensionsInterface, IgLocationInterface } from '.';
import { IgCaptionInterface, IgMediaInterface, IgPostInterface, IgPostOwnerInterface, IgPreviewLikesInterface, IgTaggedUserInterface } from './instagram';

export interface PostInterface {
  id: IgPostInterface['id'];
  author: AuthorInterface;
  time: IgPostInterface['taken_at_timestamp'];
  likes: IgPreviewLikesInterface['count'];
  media: Array<MediaItemInterface>;
  isAd: IgPostInterface['is_ad'];
  text?: IgCaptionInterface['text'];
  location?: IgLocationInterface['name'];
}

export interface AuthorInterface {
  id: IgPostOwnerInterface['id'];
  userName: IgPostOwnerInterface['username'];
  fullName?: IgPostOwnerInterface['full_name'];
  isVerified: IgPostOwnerInterface['is_verified'];
  avatar: IgPostOwnerInterface['profile_pic_url'];
}

export interface MediaItemInterface extends MediaSetInterface {
  id: IgMediaInterface['id'];
  shortcode: IgMediaInterface['shortcode'];
  sets: Array<MediaSetInterface>;
  tagged: Array<IgTaggedUserInterface>;
  video?: MediaVideoInterface;
}

export interface MediaSetInterface {
  url: IgPostInterface['display_url'];
  dimensions: IgDimensionsInterface;
}

export interface MediaVideoInterface {
  url: Required<IgMediaInterface>['video_url'];
  views: Required<IgMediaInterface>['video_view_count'];
}
