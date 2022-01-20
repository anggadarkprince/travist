const jwt = require("jsonwebtoken");
const TokenExpiredError = require("jsonwebtoken/lib/TokenExpiredError");
const User = require("../models/User");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessToken = req.cookies?.accessToken || (authHeader && authHeader.split(" ")[1]);

    if (accessToken) {
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                if (err instanceof TokenExpiredError) {
                    return res.status(401).send({message: "Token is expired"});
                }
                return res.status(403).json({message: "Token is invalid"});
            }

            try {
                req.accessToken = accessToken;
                req.user = User.findById(user.userId);
                next();
            } catch (err) {
                return res.status(500).json({message: "Something went wrong"});
            }
        });
    } else {
        res.status(401).json({message: "You are not authenticated"});
    }
};