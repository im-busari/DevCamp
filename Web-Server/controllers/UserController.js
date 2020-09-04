const User = require('../models/User');

class UserController {
  async get(req, res) {
    await User.findAll()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => console.error(err));
  }

  async signup(req, res) {
    try {
      const user = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, // Hashing set function inside the module
      });
      res.status(201).send(user.toJSON());
    } catch (err) {
      console.error(err);
      res.status(403).send(err.errors[0].message);
    }
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
