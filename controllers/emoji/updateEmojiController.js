const db = require("../../models");

// // Getting the model
const Emoji = db.Emoji;

const updateEmojiController = async (req, res) => {
  try {
    const { emojiId } = req.params;
    const { newEmoji, newDescription } = req.body;
    if (!newEmoji || !newDescription) {
      return res.status(400).send({
        success: false,
        message: "Enter new emoji and description",
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
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in Update Mood Controller",
    });
  }
};

module.exports = updateEmojiController;
