const { song, artist } = require('../db');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const songDetails = await song.findByPk(id, {
      include: [{
        model: artist,
        attributes: ['name']
      }]
    });
    if (songDetails.userId !== req.authData.id) return res.sendStatus(403);
    res.status(200).json({ ...songDetails.dataValues, artist: songDetails.dataValues.artist.name });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
