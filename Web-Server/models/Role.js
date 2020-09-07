'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );
  Role.sync({ force: true })
    .then(() => console.log('Role model synced successfully'))
    .catch((err) => console.error(err));
  return Role;
};
