const db = require("../../models");

// // Getting the model
const Emoji = db.Emoji;

const updateEmojiController = async (req, res) => {
  try {
    const { emojiId } = req.params;
    const { newEmoji, newDescription } = req.body;
    console.log(req.user._id);
    if (!newEmoji || !newDescription) {
      return res.status(400).send({
        success: false,
        message: "Enter new emoji and description",
      });
    }

    const existingEmoji = await Emoji.findOne({ where: { emojiId: emojiId } });
    if (existingEmoji) {
      // If not the user
      if (existingEmoji.username !== req.user._id) {
        return res.status(401).send({
          success: false,
          message: "You are not authorized",
        });
      }

      const updatedEmoji = await Emoji.update(
        { emoji: newEmoji, description: newDescription },
        { where: { emojiId: emojiId } }
      );
      return res.status(201).send({
        success: true,
        message: "Mood has been updated successfully",
        updatedEmoji,
      });
    }

    return res.status(404).send({
      success: false,
      message: "Emoji not Found Or you are unauthorized",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in Update Mood Controller",
    });
  }
};

module.exports = updateEmojiController;
