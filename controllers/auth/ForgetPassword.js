const { hashPassword, comparePassword } = require("../../helpers/authHelper");
const db = require("../../models");

// Getting the model
const User = db.User;

const forgetPasswordController = async (req, res) => {
  try {
    const { email, recoveryKey, newPassword } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Enter valid email and key",
      });
    }

    const matchKey = user.recoveryKey === recoveryKey;

    if (!matchKey) {
      return res.status(400).send({
        success: false,
        message: "Enter valid email and key",
      });
    }

    // If newPassword and old Password are same:
    const samePassword = await comparePassword(newPassword, user.password);
    if (samePassword) {
      return res.status(400).send({
        success: false,
        message: "You cannot use previous passwords",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = await User.update(
      { password: hashedPassword },
      { where: { email: email } }
    );

    return res.status(201).send({
      success: true,
      message: "Password reset successful",
      updatedUser,
    });
  } catch (err) {
    return res.status(500).send({
      success: "false",
      message: "Error in forget password controller",
      err,
    });
  }
};

module.exports = forgetPasswordController;
