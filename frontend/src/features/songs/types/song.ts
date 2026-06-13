export interface Song {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSongDto extends Omit<Song, '_id' | 'createdAt' | 'updatedAt'> {}

export interface UpdateSongDto extends Partial<CreateSongDto> {}
