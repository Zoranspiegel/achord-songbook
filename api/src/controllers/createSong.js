const { song } = require('../db');

module.exports = async (req, res) => {
  try {
    console.log(req.authData.id);
    const { artistId, ...rest } = req.body;
    const newSong = await song.create(rest);
    await newSong.setArtist(artistId);
    await newSong.setUser(req.authData.id);
    res.status(201).json(newSong.id);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};
