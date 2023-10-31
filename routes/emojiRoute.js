const express = require("express");
const { createEmojiController } = require("../controllers/emoji");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/create", authMiddleware, createEmojiController);

module.exports = router;
