import { IgTypenameEnum } from '../enums';

export interface IgResponseInterface {
  graphql: IgGraphInterface;
}

export interface IgGraphInterface {
  shortcode_media: IgPostInterface;
}

export interface IgMediaInterface<Types = IgTypenameEnum> {
  __typename: Types;
  id: string;
  shortcode: string;
  dimensions: IgDimensionsInterface;
  gating_info: null;
  media_preview: string;
  display_url: string;
  display_resources: Array<IgDisplayResourceInterface>;
  dash_info?: IgDashInfoInterface;
  video_url?: string;
  video_view_count?: number;
  is_video: boolean;
  should_log_client_event: boolean;
  tracking_token: string;
  edge_media_to_tagged_user: IgTaggedUsersInterface;
  accessibility_caption?: string;
}

export type IgPostInterface<Types = IgTypenameEnum> = IgMediaInterface<Types> & {
  edge_media_to_caption: IgCaptionsInterface;
  caption_is_edited: boolean;
  has_ranked_comments: boolean;
  edge_media_to_parent_comment: IgReplyCommentsInterface;
  edge_media_preview_comment: IgPreviewCommentsInterface;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_media_preview_like: IgPreviewLikesInterface;
  edge_media_to_sponsor_user: IgCaptionsInterface;
  location: IgLocationInterface | null;
  viewer_has_liked: boolean;
  viewer_has_saved: boolean;
  viewer_has_saved_to_collection: boolean;
  viewer_in_photo_of_you: boolean;
  viewer_can_reshare: boolean;
  owner: IgPostOwnerInterface;
  is_ad: boolean;
  edge_web_media_to_related_media: IgCaptionsInterface;
  encoding_status?: null;
  is_published?: boolean;
  product_type?: string;
  title?: string;
  video_duration?: number;
  thumbnail_src?: string;
} & (
  Types extends IgTypenameEnum.sidecar
    ? {
      edge_sidecar_to_children: IgSidecardsInterface;
    }
    : {}
);

export interface IgOwnerInterface {
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
  full_name?: string;
}

export interface IgPostOwnerInterface extends IgOwnerInterface {
  blocked_by_viewer: boolean;
  followed_by_viewer: boolean;
  has_blocked_viewer: boolean;
  is_private: boolean;
  is_unpublished: boolean;
  requested_by_viewer: boolean;
}

export interface IgPageInfoInterface {
  has_next_page: boolean;
  end_cursor: null | string;
}

export interface IgDashInfoInterface {
  is_dash_eligible: boolean;
  video_dash_manifest: string;
  number_of_qualities: number;
}

export interface IgDimensionsInterface {
  height: number;
  width: number;
}

export interface IgDisplayResourceInterface {
  src: string;
  config_width: number;
  config_height: number;
}

export type IgEdgesInterface<Item, hasCount = undefined> = {
  edges: Array<IgNodeInterface<Item>>;
} & (
    hasCount extends undefined
    ? {}
    : {
      count: number,
    }
  );

export interface IgNodeInterface<Input> {
  node: Input;
}

export type IgPreviewInterface<Input> = IgEdgesInterface<Input, number>;

export type IgPreviewCommentsInterface = IgPreviewInterface<IgCommentInterface>;

export interface IgReplyCommentsInterface extends IgPreviewCommentsInterface {
  page_info: IgPageInfoInterface;
}

export interface IgCommentInterface {
  id: string;
  text: string;
  created_at: number;
  did_report_as_spam: boolean;
  owner: IgOwnerInterface;
  viewer_has_liked: boolean;
  edge_liked_by: IgEdgesInterface<IgPreviewLikesInterface>;
  edge_threaded_comments?: IgReplyCommentsInterface;
}

export type IgPreviewLikesInterface = IgPreviewInterface<IgOwnerInterface>;

export type IgCaptionsInterface = IgEdgesInterface<IgCaptionInterface>;

export interface IgCaptionInterface {
  text: string;
}

export type IgTaggedUsersInterface = IgEdgesInterface<IgTaggedUserInterface>;

export interface IgTaggedUserInterface {
  user: IgOwnerInterface;
  x: number;
  y: number;
}

export type IgSidecardsInterface = IgEdgesInterface<IgMediaInterface<
  Exclude<IgTypenameEnum, IgTypenameEnum.sidecar>
>>;

export interface IgLocationInterface {
  id: string;
  has_public_page: boolean;
  name: string;
  slug: string;
  address_json: string;
}
