const User = require('../models/User');

class UserController {
  get(req, res) {
    User.findAll()
      .then((users) => {
        console.log(users);
        res.status(200);
        res.send('User GET req');
      })
      .catch((err) => console.error(err));
  }

  post(req, res) {
    //  const jane = User.build({ name: "Jane" });

    // await jane.save();
    // console.log('Jane was saved to the database!');

    //  const jane = await User.create({ name: "Jane" }); --> this combines build & save
    //  console.log(jane.toJSON());  ===== (JSON.stringify(jane, null, 4))
    res.send('New User with username .... was created');
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
