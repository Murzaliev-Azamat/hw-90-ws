export interface Artist {
  _id: string;
  name: string;
  image: string;
  info: string;
  isPublished: boolean;
}

export interface ArtistApi {
  name: string;
  image: File | null;
  info: string;
}

export interface Album {
  _id: string;
  artist: {
    _id: string;
    name: string;
    image: string;
    info: string;
  };
  name: string;
  year: string;
  image: string;
  isPublished: boolean;
}

export interface AlbumApi {
  artist: string;
  name: string;
  year: string;
  image: File | null;
}

export interface Track {
  _id: string;
  album: {
    _id: string;
    artist: {
      _id: string;
      name: string;
      image: string;
      info: string;
    };
    name: string;
    year: string;
    image: string;
  };
  name: string;
  time: string;
  trackNumber: number;
  linkToYoutube?: string;
  isPublished: boolean;
}

export interface TrackApi {
  album: string;
  name: string;
  time: string;
  trackNumber: string;
  linkToYoutube?: string;
}

export interface TrackHistory {
  _id: string;
  track: {
    _id: string;
    album: {
      _id: string;
      artist: {
        _id: string;
        name: string;
        info: string;
        image: string;
      };
      image: string;
      name: string;
      year: number;
    };
    name: string;
    time: string;
    trackNumber: number;
  };
  user: string;
  datetime: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}
