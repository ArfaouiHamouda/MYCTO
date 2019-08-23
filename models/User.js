"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      avatar: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Movie, {
      through: "Favori",
      as: "movies",
      foreignKey: "userId",
      otherKey: "movieId"
    });
  };
  return User;
};
