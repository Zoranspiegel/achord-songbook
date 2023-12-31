const { song } = require('../db');

module.exports = async (req, res) => {
  try {
    const { artist, ...rest } = req.body;
    const newSong = await song.create(rest);
    await newSong.setArtist(artist);
    await newSong.setUser(req.authData.id);
    res.status(201).json(newSong.id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
