const db = require("../../models");

// // Getting the model
const Emoji = db.Emoji;

const createEmojiController = async (req, res) => {
  try {
    const { username, emoji, description } = req.body;

    // console.log(req.body);

    const newEmoji = await Emoji.create({
      emoji: emoji,
      description: description,
      date: new Date(),
      username: username,
    });

    return res.send({
      message: "Job DOne",
      newEmoji,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in creating the emoji",
    });
  }
};

module.exports = createEmojiController;
