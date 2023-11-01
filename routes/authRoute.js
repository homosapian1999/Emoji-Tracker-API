const express = require("express");
const {
  loginController,
  registerController,
  forgetPasswordController,
} = require("../controllers/auth");

const router = express.Router();

router.post("/register", registerController);
router.get("/login", loginController);
router.post("/forgot", forgetPasswordController);

module.exports = router;
