const { song, artist } = require('../db');

module.exports = async (req, res) => {
  try {
    const allUserSongs = await song.findAll({
      where: {
        userId: req.authData.id
      },
      include: {
        model: artist,
        attributes: ['name']
      }
    });
    const formattedAllUserSongs = allUserSongs.map(song => {
      return {
        ...song.dataValues,
        artist: song.dataValues.artist.name
      };
    });
    res.status(200).json(formattedAllUserSongs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
