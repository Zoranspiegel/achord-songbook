const { Op } = require('sequelize');
const { song, artist } = require('../db');

module.exports = async (req, res) => {
  try {
    const artistId = req.query.artist;
    if (artistId) {
      const allSongsByArtist = await song.findAll({
        where: {
          artistId: {
            [Op.eq]: artistId
          }
        },
        include: {
          model: artist,
          attributes: ['name']
        }
      });
      const formattedAllSongsByArtist = allSongsByArtist.map(song => {
        return {
          ...song.dataValues,
          artist: song.dataValues.artist.name
        };
      });
      res.status(200).json(formattedAllSongsByArtist);
    } else {
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
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
