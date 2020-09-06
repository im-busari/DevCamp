require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, UserBio, Role } = require('../models/index');

class UserController {
  //  Give me all users (with their bio and role)
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        include: [{ model: Role, as: 'role' }, { model: UserBio }],
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send('Something is wrong with our server.');
    }
  }

  //  Gets the currently logged in user
  async getSelf(req, res) {
    try {
      const user = await User.findByPk(req.user.user.id, {
        include: [{ model: Role, as: 'role' }, { model: UserBio }],
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(404).send('Unable to find user.');
    }
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
        UserBio: req.body,
      },
      {
        include: [{ association: User.UserBio }],
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

  //  Updates the currently logged in user
  updateSelf(req, res) {
    const { username, bioId } = req.user.user;
    User.update(req.body, {
      where: {
        username: username,
      },
    })
      .then(() => {
        UserBio.update(req.body, {
          where: {
            id: bioId,
          },
        });
        res.status(200).send('Your account was updated accordingly.');
      })
      .catch((err) => {
        res.status(400).send(`Failed to update the resource: ${err}`);
      });
  }

  //  Check if username exists
  //  TODO: Integration tests
  checkUsername(req, res) {
    User.findOne({ where: { username: req.params.username } })
      .then((user) => {
        if (user instanceof User) {
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
  async followUser(req, res) {
    try {
      const user = await User.findByPk(req.user.user.id);
      const followed_user = await User.findByPk(req.params.followedId);
      const rowExists = await user.hasFollowing(followed_user);

      if (!rowExists && user.id !== followed_user.id) {
        await user.addFollowing(followed_user.id);
        res.status(201).send({
          message: `Congratz! You are now following ${followed_user.fullName}.`,
          followed_user: followed_user,
        });
      } else {
        res
          .status(404)
          .send(
            "The user either don't exist or you have already followed him/her."
          );
      }
    } catch (err) {
      res.status(500).send('Something went wrong. ', err);
    }
  }

  //  Unfollow another user
  async unfollowUser(req, res) {
    try {
      const user = await User.findByPk(req.user.user.id);
      const followed_user = await User.findByPk(req.params.followedId);
      const rowExists = await user.hasFollowing(followed_user);

      if (rowExists && user.id !== followed_user.id) {
        user.removeFollowing(followed_user.id);
        res.status(200).send({
          message: `Sorry to hear you got bored. Unfollowed: ${followed_user.fullName}.`,
          unfollowed_user: followed_user,
        });
      } else {
        res
          .status(404)
          .send(`You are not following this user: ${followed_user.fullName}.`);
      }
    } catch (err) {
      res.status(500).send('Something went wrong. ', err);
    }
  }
}

module.exports = new UserController();
