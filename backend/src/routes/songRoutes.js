const express = require('express');
const {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
} = require('../controllers/songController');

const router = express.Router();

router.route('/')
  .get(getAllSongs)
  .post(createSong);

router.route('/:id')
  .get(getSongById)
  .put(updateSong)
  .delete(deleteSong);

module.exports = router;
