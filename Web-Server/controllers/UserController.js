require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, UserBio, Role } = require('../models/index');

class UserController {
  //  Give me all users (with their bio and role)
  getAllUsers(req, res) {
    User.findAll({
      include: [
        {
          model: Role,
          as: 'role',
        },
        {
          model: UserBio,
        },
      ],
    })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => console.error(err));
  }

  //  Gets the currently logged in user
  getSelf(req, res) {
    res.status(200).send(req.user);
  }

  //  Register
  signup(req, res) {
    User.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, // Hashing set function inside the module
        //
        UserBio: {
          caption: req.body.caption,
        },
      },
      {
        include: [
          {
            association: User.UserBio,
          },
        ],
      }
    )
      .then((user) => {
        res.status(201).send(user.toJSON());
      })
      .catch((err) => {
        res.status(403).json(err.errors[0].message);
      });
  }

  //  Login and receive an Auth Token (JWT)
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
          res.status(200).json({ token });
        } else {
          res.status(403).send('Wrong login credentials.');
        }
      })
      .catch((err) => {
        res.status(403).json(`Something went wrong:\n${err}`);
      });
  }

  //  Updates the currently logged in user  TODO: Integration tests
  updateSelf(req, res) {
    User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: {
          username: req.user.user.username,
        },
      }
    )
      .then(() => {
        res.status(200).send('Your account was updated accordingly.');
      })
      .catch((err) => {
        res.status(400).send(`Failed to update the resource: ${err}`);
      });
  }

  //  Check if username exists   TODO: Integration tests
  checkUsername(req, res) {
    User.findOne({ where: { username: req.params.username } })
      .then((user) => {
        if (user instanceof models.User) {
          res.status(200).send(user);
        } else {
          res.status(404).send('This user does not exist in our DB.');
        }
      })
      .catch((err) => {
        res.status(500).send('Something is wrong: ', err);
      });
  }

  //  Follow another user
  followUser(req, res) {}

  //  Unfollow another user
  unfollowUser(req, res) {}
}

module.exports = new UserController();
