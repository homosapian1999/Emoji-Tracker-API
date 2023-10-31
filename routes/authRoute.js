const express = require("express");
const { loginController, registerController } = require("../controllers/auth");

const router = express.Router();

router.get("/register", registerController);
router.get("/login", loginController);

module.exports = router;
