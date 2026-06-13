const Song = require('../models/Song');

const getStatistics = async (req, res) => {
  try {
    const songs = await Song.find();
    
    const totalSongs = songs.length;
    const artists = [...new Set(songs.map(s => s.artist))];
    const albums = [...new Set(songs.map(s => s.album))];
    const genres = [...new Set(songs.map(s => s.genre))];
    
    const songsPerGenre = {};
    songs.forEach(song => {
      songsPerGenre[song.genre] = (songsPerGenre[song.genre] || 0) + 1;
    });
    
    const artistStats = {};
    artists.forEach(artist => {
      const artistSongs = songs.filter(s => s.artist === artist);
      const artistAlbums = [...new Set(artistSongs.map(s => s.album))];
      artistStats[artist] = {
        songs: artistSongs.length,
        albums: artistAlbums.length,
      };
    });
    
    const albumStats = {};
    albums.forEach(album => {
      const albumSongs = songs.filter(s => s.album === album);
      albumStats[album] = {
        songs: albumSongs.length,
        artist: albumSongs[0]?.artist,
      };
    });
    
    res.json({
      totalSongs,
      totalArtists: artists.length,
      totalAlbums: albums.length,
      totalGenres: genres.length,
      songsPerGenre,
      artistStats,
      albumStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStatistics };
