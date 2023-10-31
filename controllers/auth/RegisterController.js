const { hashPassword } = require("../../helpers/authHelper");
const db = require("../../models");

// Getting the model
const User = db.User;

const registerController = async (req, res) => {
  try {
    const { username, name, email, password, recoveryKey } = req.body;
    console.log(req.body);
    // Checking the details
    if (!username || !name || !email || !password || !recoveryKey) {
      return res.status(400).send({
        success: false,
        message: "Enter details",
      });
    }

    // Check for exiting username:
    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Username already exists",
      });
    }

    // Check for existing email:
    const existingEmail = await User.findOne({ where: { email: email } });
    if (existingEmail) {
      return res.status(409).send({
        success: false,
        message: "Email already taken",
      });
    }

    // Hashing the password and creating new user

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      username: username,
      name: name,
      email: email,
      password: hashedPassword,
      recoveryKey: recoveryKey,
    });

    return res.status(201).send({
      success: true,
      message: "User created successfully",
      result: { username },
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in registeration",
      err,
    });
  }
};

// Login Controller

module.exports = registerController;
