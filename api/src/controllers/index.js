const logUser = require('./logUser');
const createSong = require('./createSong');
const findOrCreateArtist = require('./findOrCreateArtist');
const getUserArtists = require('./getUserArtists');
const getUserSongs = require('./getUserSongs');
const getDeletedUserSongs = require('./getDeletedUserSongs');
const getSongDetails = require('./getSongDetails');
const updateSong = require('./updateSong');
const deleteUserSong = require('./deleteUserSong');
const restoreUserSong = require('./restoreUserSong');

module.exports = {
  logUser,
  createSong,
  findOrCreateArtist,
  getUserArtists,
  getUserSongs,
  getDeletedUserSongs,
  getSongDetails,
  updateSong,
  deleteUserSong,
  restoreUserSong
};
