const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/song_book`, {
  native: false,
  logging: false
});

const models = [];

fs.readdirSync(path.join(__dirname, 'models')).forEach(file => {
  if (file.slice(-3) === '.js') {
    const model = require(`./models/${file}`);
    models.push(model);
  }
});

models.forEach(model => model(sequelize));

const { user, artist, song } = sequelize.models;

user.hasMany(song);
song.belongsTo(user);

artist.hasMany(song);
song.belongsTo(artist);

user.hasMany(artist);
artist.belongsTo(user);

module.exports = {
  db: sequelize,
  ...sequelize.models
};
