export interface Tag {
  key: string;
  url: string;
  name: string;
}

export interface Pictures {
  small: string;
  thumbnail: string;
  medium_mobile: string;
  medium: string;
  large: string;
  extra_large: string;
}

export interface Pictures2 {
  small: string;
  thumbnail: string;
  medium_mobile: string;
  medium: string;
  large: string;
  extra_large: string;
}

export interface User {
  key: string;
  url: string;
  name: string;
  username: string;
  pictures: Pictures2;
}

export interface Datum {
  key: string;
  url: string;
  name: string;
  tags: Tag[];
  created_time: Date;
  updated_time: Date;
  play_count: number;
  favorite_count: number;
  comment_count: number;
  listener_count: number;
  repost_count: number;
  pictures: Pictures;
  slug: string;
  user: User;
  audio_length: number;
}

export interface Paging {
  next: string;
  previous: string;
}

export class MixcloudResponse {
  data?: Datum[];
  paging?: Paging;
  name?: string;
}
