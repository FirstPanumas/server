const User = require("../Models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, password } = req.body;
    var user = await User.findOne({ name });
    // check user
    if (user) {
      return res.send("User already Exitsts").status(400);
    }
    //bcrypt password
    const salt = await bcrypt.genSalt(10);
    user = new User({
      name,
      password,
    });
    user.password = await bcrypt.hash(password, salt);
   await  user.save()
    res.send("Register Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  try {
    res.send(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
