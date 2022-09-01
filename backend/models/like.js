'use strict';
module.exports = (sequelize, DataTypes) => {
    var Like = sequelize.define('Like', {
        idPost: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Post',
                key: 'id'
            }
        },
        idUser: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        isLike: DataTypes.INTEGER
    }, {});
    Like.associate = function (models) {
        // associations can be defined here

        models.User.belongsToMany(models.Post, {
            through: models.Like,
            foreignKey: 'idUser',
            otherKey: 'idPost',
        });

        models.Post.belongsToMany(models.User, {
            through: models.Like,
            foreignKey: 'idPost',
            otherKey: 'idUser',
        });

        models.Like.belongsTo(models.User, {
            foreignKey: 'idUser',
            as: 'user',
        });

        models.Like.belongsTo(models.Post, {
            foreignKey: 'idPost',
            as: 'post',
        });
    };
    return Like;
};