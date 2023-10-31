const express = require("express");
const {
  loginController,
  registerController,
  forgetPasswordController,
} = require("../controllers/auth");

const router = express.Router();

router.get("/register", registerController);
router.get("/login", loginController);
router.get("/forgot", forgetPasswordController);

module.exports = router;
