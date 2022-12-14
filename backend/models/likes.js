"use strict";
const { Model } = require("sequelize");
const User = require("./user");
const Post = require("./post");

//use like model to create connection between post and user table
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Likes, User, Post }) {
      User.hasMany(Likes);
      Likes.belongsTo(User);
      Post.hasMany(Likes);
      Likes.belongsTo(Post);
    }
  }
  Likes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
