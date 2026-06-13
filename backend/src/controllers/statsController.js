const statsService = require('../services/statsService');

const getStatistics = async (req, res) => {
  try {
    const stats = await statsService.getStatistics();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStatistics };
