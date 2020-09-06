const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.UserBio = User.belongsTo(models.UserBio, {
        foreignKey: 'bioId',
      });
      this.Role = User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isAlpha: true,
          len: {
            args: [3, 50],
            msg: 'Please, mind the allowed min and max number of characters.',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notNull: true,
          notEmpty: true,
          len: {
            args: [3, 50],
            msg: 'Please, mind the allowed min and max number of characters.',
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true,
          notEmpty: true,
          notNull: {
            msg:
              'Please, give us a unique username. You will need it to login later.',
          },
          len: {
            args: [5, 50],
            msg: 'Please, mind the allowed min and max number of characters.',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notNull: {
            msg: 'Please, provide your email address.',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hash);
        },
        validate: {
          //  TODO: Add RegExp
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.sync()
    .then(() => console.log('User model synced successfully'))
    .catch((err) => console.error(err));
  return User;
};
