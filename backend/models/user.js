"use strict";

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    firstname: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return User;
};
