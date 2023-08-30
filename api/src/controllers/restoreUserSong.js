const { song } = require('../db');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const restoredSong = await song.restore({ where: { id } });
    res.status(200).json(restoredSong);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
