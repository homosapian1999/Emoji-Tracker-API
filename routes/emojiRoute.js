const express = require("express");
const { createEmojiController } = require("../controllers/emoji");

const router = express.Router();

router.get("/create", createEmojiController);

module.exports = router;
