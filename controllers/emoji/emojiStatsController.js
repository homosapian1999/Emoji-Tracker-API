const { Op } = require("sequelize");
const db = require("../../models");

// // Getting the model
const Emoji = db.Emoji;

const emojiStatsController = async (req, res) => {
  try {
    const { username } = req.params;
    const { year, month } = req.body;

    console.log(username, year, month);

    if (!username || !year || !month) {
      return res.status(400).send({
        success: false,
        message: "Bad Request.Missing data",
      });
    }

    if (req.user._id !== username) {
      return res.status(401).send({
        success: false,
        message: "Not Authorized to check stats",
      });
    }

    const EmojiStats = await Emoji.findAll({
      attributes: [
        "emoji",
        [db.sequelize.fn("COUNT", db.sequelize.col("emoji")), "count"],
      ],
      where: {
        username,
        date: {
          [Op.gte]: new Date(year, month - 1, 1), // Start of the specified month
          [Op.lt]: new Date(year, month, 1), // Start of the next month
        },
      },
      group: ["emoji"],
      order: db.sequelize.literal("count DESC"),
    });

    res.send(EmojiStats);
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in Emoji Stats controller",
    });
  }
};

module.exports = emojiStatsController;
