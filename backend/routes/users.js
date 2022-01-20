const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const userController = require("../controllers/user")

router.put("/change-password", auth, userController.changePassword)
router.put("/update-profile", auth, userController.updateProfile)

module.exports = router;