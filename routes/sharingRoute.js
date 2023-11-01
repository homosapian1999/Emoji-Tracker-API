const express = require("express");
const {
  createShareLinkController,
  disableShareLinkController,
} = require("../controllers/sharing");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes;
router.post("/create", authMiddleware, createShareLinkController);
router.post("/disable/:uniqueLink", authMiddleware, disableShareLinkController);

module.exports = router;
