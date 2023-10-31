// const db = require("../models");

// // Getting the model
// const User = db.User;

module.exports = (sequelize, DataTypes) => {
  const Emoji = sequelize.define("Emoji", {
    emoji: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Emoji;
};
