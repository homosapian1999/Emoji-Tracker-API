const db = require("../../models");

// // Getting the model
const Emoji = db.Emoji;

const createEmojiController = async (req, res) => {
  try {
    const { username, emoji, description, date } = req.body;
    if (!username || !emoji || !description || !date) {
      return res.status(400).send({
        success: false,
        message: "Enter details.Bad Request",
      });
    }

    // If mood is already there, you can't create it; Then update and delete;
    const existingUser = await Emoji.findOne({ where: { username: username } });

    if (existingUser) {
      const dataObject = new Date(existingUser.date)
        .toISOString()
        .split("T")[0];

      // Check for a duplicate mood entry
      if (dataObject === date) {
        return res.status(409).send({
          success: false,
          message: "Mood is already created. You can update or delete it",
        });
      }
    }

    const newEmoji = await Emoji.create({
      emoji: emoji,
      description: description,
      date: date,
      username: username,
    });

    return res.send({
      message: "Mood created successfully",
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
