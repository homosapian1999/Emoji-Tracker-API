const express = require("express");
const {
  createEmojiController,
  updateEmojiController,
} = require("../controllers/emoji");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes

router.get("/create", authMiddleware, createEmojiController);
router.get("/update/:emojiId", authMiddleware, updateEmojiController);

module.exports = router;
