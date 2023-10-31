const { comparePassword } = require("../../helpers/authHelper");
const db = require("../../models");
const jwt = require("jsonwebtoken");

// Getting the model
const User = db.User;

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Handling Bad Request
    if (!username || !password) {
      return res.status(400).send({
        success: "false",
        message: "Enter details to login",
      });
    }

    // Getting the user
    const user = await User.findOne({ where: { username: username } });

    // Checking the username
    if (!user) {
      return res.status(400).send({
        success: "false",
        message: "Invalid credentials",
      });
    }

    // Checking the password:

    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(400).send({
        success: "false",
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ _id: user.username }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: "true",
      message: "Login successfully",
      token,
    });
  } catch (err) {
    return res.status(500).send({
      success: "false",
      message: "Error in login controller",
    });
  }
};

module.exports = loginController;
