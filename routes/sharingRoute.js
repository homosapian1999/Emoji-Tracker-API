const express = require("express");
const { createShareLinkController } = require("../controllers/sharing");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes;
router.post("/create", authMiddleware, createShareLinkController);

module.exports = router;
