const jwt = require("jsonwebtoken");
const TokenExpiredError = require("jsonwebtoken/lib/TokenExpiredError");
const User = require("../models/User");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessToken = req.cookies?.accessToken || (authHeader && authHeader.split(" ")[1]);

    if (accessToken) {
        jwt.verify(accessToken, process.env.JWT_SECRET, async (err, userPayload) => {
            if (err) {
                if (err instanceof TokenExpiredError) {
                    return res.status(401).send({status: "expired", message: "Token is expired"});
                }
                return res.status(403).json({message: "Token is invalid"});
            }

            try {
                req.accessToken = accessToken;
                const user = await User.findById(userPayload._id);
                if (user) {
                    req.user = user;
                    next();
                } else {
                    return res.status(403).json({message: "User is invalid"});
                }
            } catch (err) {
                return res.status(500).json({
                    error: err.message,
                    message: "Something went wrong"
                });
            }
        });
    } else {
        res.status(401).json({message: "You are not authenticated"});
    }
};