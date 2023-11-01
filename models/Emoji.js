const shortid = require("shortid");

module.exports = (sequelize, DataTypes) => {
  const Emoji = sequelize.define("Emoji", {
    emojiId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => shortid.generate(),
      primaryKey: true,
    },
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
