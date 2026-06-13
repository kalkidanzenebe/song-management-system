const express = require('express');
const { getStatistics } = require('../controllers/statsController');

const router = express.Router();

router.route('/')
  .get(getStatistics);

module.exports = router;
