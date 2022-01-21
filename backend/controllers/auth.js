const User = require("../models/User");
const UserToken = require("../models/UserToken");
const bcrypt = require("bcrypt");
const moment = require('moment');
const jwt = require("jsonwebtoken");
const {isEmailAddress} = require("../helpers/emailCheck");
const {generateRefreshToken, generateAccessToken} = require("../helpers/tokenGenerator");

module.exports = {
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                firstName: req.body.firstName || req.body.username,
                lastName: req.body.lastName || "",
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
            res.status(500).json({
                message: "Something went wrong",
                error: err.message
            });
        }
    },
    login: async (req, res) => {
        try {
            const {username, password} = req.body
            let conditions = {username: username};
            if (isEmailAddress(username)) {
                conditions = {email: username};
            }

            const user = await User.findOne(conditions);
            if (!user) {
                return res.status(401).json({
                    message: "User is not found"
                });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({
                    message: "Wrong username or password"
                });
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            const accessTokenValidUntil = moment().add(2, 'hours')
            const refreshTokenValidUntil = moment().add(30, 'days')

            const newUserToken = new UserToken({
                userId: user._id,
                accessToken: accessToken,
                refreshToken: refreshToken,
                validUntil: refreshTokenValidUntil,
            });
            const userToken = await newUserToken.save();

            user.lastLoggedIn = new Date()
            await user.save()

            // send token cookie header
            res.cookie('accessToken', accessToken, {
                expires: accessTokenValidUntil.toDate(),
                secure: false,
                httpOnly: true,
            });
            res.cookie('refreshToken', refreshToken, {
                expires: refreshTokenValidUntil.toDate(),
                secure: false,
                httpOnly: true,
            });

            // send authentication response
            res.status(200).json({
                accessToken: userToken.accessToken,
                refreshToken: userToken.refreshToken,
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (err) {
            res.status(500).json({
                message: "Something went wrong",
                error: err.message
            });
        }
    },
    refreshToken: async (req, res) => {
        const refreshToken = req.body.refreshToken || req.cookies?.refreshToken;
        const userToken = await UserToken.findOne({refreshToken: refreshToken})
        if (!userToken) {
            return res.status(403).json({message: "Invalid refresh token"});
        }

        jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, payload) => {
            err && res.status(500).json({message: "Failed to verify token"});

            await UserToken.deleteOne({refreshToken: refreshToken});

            const user = await User.findById(payload._id)
            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);
            const accessTokenValidUntil = moment().add(2, 'hours')
            const refreshTokenValidUntil = moment().add(30, 'days')

            const newUserToken = new UserToken({
                userId: user._id,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                validUntil: refreshTokenValidUntil,
            });
            const userToken = await newUserToken.save();

            // send token cookie header
            res.cookie('accessToken', userToken.accessToken, {
                expires: accessTokenValidUntil.toDate(),
                secure: false,
                httpOnly: true,
            });
            res.cookie('refreshToken', userToken.refreshToken, {
                expires: refreshTokenValidUntil.toDate(),
                secure: false,
                httpOnly: true,
            });

            res.status(200).json({
                accessToken: userToken.accessToken,
                refreshToken: userToken.refreshToken,
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        });
    },
    logout: async (req, res) => {
        const accessToken = req.accessToken;
        try {
            await UserToken.deleteOne({accessToken: accessToken});

            res.clearCookie('accessToken', {path: '/'})
            res.clearCookie('refreshToken', {path: '/'})

            res.status(200).json({message: "You successfully logged out"});
        } catch (err) {
            res.status(500).json({
                message: "Something went wrong",
                error: err.message
            });
        }
    }
}
