const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
  firstname: {
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
  lastname: {
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
});

User.sync()
  .then(() => console.log('User model synced successfully'))
  .catch((err) => console.error(err));

module.exports = User;
