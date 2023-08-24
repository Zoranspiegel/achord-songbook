const { artist } = require('../db');

module.exports = async (req, res) => {
  try {
    const allUserArtists = await artist.findAll({ where: { userId: req.authData.id } });
    res.status(200).json(allUserArtists);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
