const validateSong = (req, res, next) => {
  const { title, artist, album, genre } = req.body;

  if (!title || !artist || !album || !genre) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  next();
};

module.exports = { validateSong };
