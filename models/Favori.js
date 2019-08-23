'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favori = sequelize.define('Favori', {
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER
  }, {});
  Favori.associate = function(models) {
    // associations can be defined here
  };
  return Favori;
};