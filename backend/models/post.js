'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post', {
    title: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    text: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  }, {}
  );

  Post.associate = function (models) {
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };

  return Post;
};