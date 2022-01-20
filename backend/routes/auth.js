const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authController = require("../controllers/auth")

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);
router.post("/refresh-token", auth, authController.refreshToken);

module.exports = router;