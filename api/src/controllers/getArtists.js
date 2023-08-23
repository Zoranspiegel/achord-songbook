const { artist } = require('../db');

module.exports = async (req, res) => {
  try {
    console.log(req.authData.id);
    const allArtists = await artist.findAll({ where: { userId: req.authData.id } });
    res.status(200).json(allArtists);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
