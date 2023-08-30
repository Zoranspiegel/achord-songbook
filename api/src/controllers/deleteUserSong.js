const { song } = require('../db');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSong = await song.destroy({
      where: { id }
    });
    res.status(200).json(deletedSong);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
