const songService = require('../services/songService');

const getAllSongs = async (req, res) => {
  try {
    const { genre } = req.query;
    const songs = await songService.getAllSongs(genre);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSongById = async (req, res) => {
  try {
    const song = await songService.getSongById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSong = async (req, res) => {
  try {
    const song = await songService.createSong(req.body);
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSong = async (req, res) => {
  try {
    const song = await songService.updateSong(req.params.id, req.body);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSong = async (req, res) => {
  try {
    const song = await songService.deleteSong(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
};
