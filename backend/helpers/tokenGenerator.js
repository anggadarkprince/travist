const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = {
    generateAccessToken: (user) => {
        const payload = {_id: user._id, username: user.username, email: user.email}
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "3600s",
        });
    },
    generateRefreshToken: (user) => {
        const payload = {_id: user._id, refreshToken: crypto.randomBytes(32).toString('hex')}
        return jwt.sign(payload, process.env.JWT_SECRET);
    }
};