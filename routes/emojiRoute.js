const express = require("express");
const {
  createEmojiController,
  updateEmojiController,
  deleteEmojiController,
  emojiStatsController,
} = require("../controllers/emoji");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes

router.post("/create", authMiddleware, createEmojiController);
router.patch("/update/:emojiId", authMiddleware, updateEmojiController);
router.delete("/delete/:emojiId", authMiddleware, deleteEmojiController);
router.get("/monthly-stats/:username", authMiddleware, emojiStatsController);

module.exports = router;
