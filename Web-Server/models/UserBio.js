'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserBio.init(
    {
      caption: DataTypes.STRING,
      content: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      occupation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserBio',
    }
  );

  return UserBio;
};
