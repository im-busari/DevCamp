'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.User = Post.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Post.init(
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
