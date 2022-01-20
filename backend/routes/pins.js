const express = require("express")
const router = express.Router()

const auth = require("../middlewares/auth");
const pinController = require("../controllers/pin")

router.get("/", pinController.getAllPins);
router.get("/my-pins", auth, pinController.getMyPins)
router.post("/", auth, pinController.savePin)
router.get("/:pinId", auth, pinController.getPin)
router.put("/:pinId", auth, pinController.updatePin)
router.delete("/:pinId", auth, pinController.deletePin)

module.exports = router;