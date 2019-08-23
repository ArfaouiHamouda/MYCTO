"use strict";
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {}
  );
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsToMany(models.User, {
      through: "Favori",
      as: "users",
      foreignKey: "movieId",
      otherKey: "userId"
    });
  };
  return Movie;
};
