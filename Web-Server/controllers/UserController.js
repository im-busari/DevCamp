require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class UserController {
  getAllUsers(req, res) {
    User.findAll()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => console.error(err));
  }

  signup(req, res) {
    User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // Hashing set function inside the module
    })
      .then((user) => {
        res.status(201).send(user.toJSON());
      })
      .catch((err) => {
        res.status(403).json(err.errors[0].message);
      });
  }

  signin(req, res) {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (
          req.body.password &&
          bcrypt.compareSync(req.body.password, user.password)
        ) {
          //  TODO: Move JWT to .env
          const token = jwt.sign({ user }, 'slay$n', {
            expiresIn: '24h',
          });
          //  Return user's JWT special token
          res.status(200).json(token);
        } else {
          res.status(403).send('Wrong login credentials.');
        }
      })
      .catch((err) => {
        res.status(403).json(`Something went wrong:\n${err}`);
      });
  }

  update(req, res) {
    //     const jane = await User.create({ name: "Jane" });
    //     console.log(jane.name); // "Jane"
    //     jane.name = "Ada";
    // // the name is still "Jane" in the database
    //     await jane.save();
    // // Now the name was updated to "Ada" in the database!
    res.send('The user was updated');
  }
}

module.exports = new UserController();
