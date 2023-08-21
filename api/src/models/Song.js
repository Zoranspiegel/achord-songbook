const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('song', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(5000),
      allowNull: false
    }
  });
};
