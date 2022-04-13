'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    firstname: DataTypes.STRING,
    password: DataTypes.STRING
  }, {}
  );

  User.associate = function (models) {
    // associations can be defined here
    models.User.hasMany(models.Post);
  };

  return User;
};