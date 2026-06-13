export interface Stats {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: Record<string, number>;
  artistStats: Record<string, { songs: number; albums: number }>;
  albumStats: Record<string, { songs: number; artist: string }>;
}
