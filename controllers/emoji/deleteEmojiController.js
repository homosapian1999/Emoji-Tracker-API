const db = require("../../models");

// // Getting the model
const Emoji = db.Emoji;

const deleteEmojiController = async (req, res) => {
  try {
    const { emojiId } = req.params;

    // If Mood is there then only delete;
    const existingEmoji = await Emoji.findOne({ where: { emojiId: emojiId } });
    if (existingEmoji) {
      if (existingEmoji.username !== req.user._id) {
        return res.status(401).send({
          success: false,
          message: "You are not authorized",
        });
      }

      const deletedEmoji = await Emoji.destroy({ where: { emojiId: emojiId } });
      return res.status(201).send({
        success: true,
        message: "Mood has been deleted successfully",
        deletedEmoji,
      });
    }
    return res.status(404).send({
      success: false,
      message: "Emoji Not Found",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in Delete Mood Controller",
    });
  }
};

module.exports = deleteEmojiController;
