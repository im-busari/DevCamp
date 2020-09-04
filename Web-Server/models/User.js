const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg:
          'Please, give us a unique username. You will need it to login later.',
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
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      //  this.setDataValue('password', hash(value));
    },
    validate: {
      //  TODO: Add RegExp
      isLowercase: true,
      isUppercase: true,
    },
  },
});

module.exports = User;
