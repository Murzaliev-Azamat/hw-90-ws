export interface Artist {
  id: string;
  name: string;
  image: string | null;
  info: string;
}

export type ArtistWithoutId = Omit<Artist, 'id'>;

export interface AlbumMutation {
  artist: string;
  name: string;
  image: string | null;
  year: number;
}

export interface TrackMutation {
  album: string;
  name: string;
  time: string;
  trackNumber: number;
  linkToYoutube?: string;
}

export interface TrackHistoryMutation {
  user: ObjectId;
  track: string;
  datetime: Date;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
}