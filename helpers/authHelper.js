const bcrypt = require("bcrypt");

const hashPassword = async (passswod) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passswod, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.log(err);
  }
};

const comparePassword = async (passswod, hashedPassword) => {
  return await bcrypt.compare(passswod, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
