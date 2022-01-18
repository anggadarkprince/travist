const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(401).json({
                message: "User is not found"
            });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.status(401).json({
                message: "Wrong username or password"
            });
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
});

module.exports = router;