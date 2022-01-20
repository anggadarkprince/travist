const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = {
    generateAccessToken: (user) => {
        const payload = {userId: user._id, username: user.username, email: user.email}
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "300s",
        });
    },
    generateRefreshToken: (user) => {
        const payload = {id: user.id, refresh_token: crypto.randomBytes(32).toString('hex')}
        return jwt.sign(payload, process.env.JWT_SECRET);
    }
};