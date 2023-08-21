const { artist } = require('../db');

module.exports = async (req, res) => {
  try {
    const { artistName, ...rest } = req.body;
    const [foundOrCreatedArtist, created] = await artist.findOrCreate({
      where: {
        name: artistName
      },
      defaults: rest
    });
    const statusCode = created ? 201 : 200;
    res.status(statusCode).json(foundOrCreatedArtist.id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
