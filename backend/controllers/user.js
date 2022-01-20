const moment = require("moment");
const bcrypt = require("bcrypt");
const {generateRefreshToken} = require("../helpers/tokenGenerator");
const {generateAccessToken} = require("../helpers/tokenGenerator");
const UserToken = require("../models/UserToken");

module.exports = {
    changePassword: async (req, res) => {
        const {password, newPassword, confirmPassword} = req.body

        try {
            const validPassword = await bcrypt.compare(password, req.user.password);
            if (!validPassword) {
                return res.status(422).json({
                    password: ["Invalid current password"]
                });
            }

            if (newPassword !== confirmPassword) {
                return res.status(422).json({
                    newPassword: ["New password need to be confirmed"]
                });
            }

            const user = req.user

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt)
            await user.save()

            const accessToken = generateAccessToken(req.user);
            const refreshToken = generateRefreshToken(req.user);
            const accessTokenValidUntil = moment().add(2, 'hours')
            const refreshTokenValidUntil = moment().add(30, 'days')

            const newUserToken = new UserToken({
                userId: req.user._id,
                accessToken: accessToken,
                refreshToken: refreshToken,
                validUntil: refreshTokenValidUntil,
            });
            const userToken = await newUserToken.save();

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
            return res.status(500).json({
                error: err.message,
                message: "Something went wrong"
            });
        }

    }
}