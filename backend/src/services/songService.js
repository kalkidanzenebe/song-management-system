const Song = require('../models/Song');

const getAllSongs = async (genre) => {
  let query = {};
  if (genre) {
    query.genre = genre;
  }
  return await Song.find(query).sort({ createdAt: -1 });
};

const getSongById = async (id) => {
  return await Song.findById(id);
};

const createSong = async (songData) => {
  const song = new Song(songData);
  return await song.save();
};

const updateSong = async (id, songData) => {
  return await Song.findByIdAndUpdate(id, songData, {
    new: true,
    runValidators: true,
  });
};

const deleteSong = async (id) => {
  return await Song.findByIdAndDelete(id);
};

module.exports = {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
};
