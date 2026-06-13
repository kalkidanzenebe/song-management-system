const express = require('express');
const {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
} = require('../controllers/songController');
const { validateSong } = require('../validators/songValidator');

const router = express.Router();

router.route('/')
  .get(getAllSongs)
  .post(validateSong, createSong);

router.route('/:id')
  .get(getSongById)
  .put(validateSong, updateSong)
  .delete(deleteSong);

module.exports = router;
