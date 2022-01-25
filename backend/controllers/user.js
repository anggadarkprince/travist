const moment = require("moment");
const bcrypt = require("bcrypt");
const {generateRefreshToken} = require("../helpers/tokenGenerator");
const {generateAccessToken} = require("../helpers/tokenGenerator");
const User = require("../models/User");
const UserToken = require("../models/UserToken");
const _ = require('lodash');

module.exports = {
    getAccount: async (req, res) => {
        return res.status(200).json(req.user);
    },
    updateProfile: async (req, res) => {
        const {firstName, lastName, email, username, contactNumber, address} = req.body

        try {
            const user = await User.findOneAndUpdate({_id: req.user._id}, {
                firstName, lastName, email, username, contactNumber, address
            })
            return res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                contactNumber: user.contactNumber,
                address: user.address,
            });
        } catch (e) {
            return res.status(500).json({
                message: "Something went wrong",
                error: e.message,
            });
        }
    },
    changePassword: async (req, res) => {
        const {currentPassword, newPassword, confirmNewPassword} = req.body

        try {
            const validationError = {};

            const validPassword = await bcrypt.compare(currentPassword, req.user.password);
            if (!validPassword) {
                validationError.currentPassword = ["Invalid current password"]
            }

            if (!newPassword) {
                validationError.newPassword = [
                    ...(validationError.newPassword || []),
                    "New password is required"
                ]
            }

            if (currentPassword.length < 6) {
                validationError.newPassword = [
                    ...(validationError.newPassword || []),
                    "Minimum password is 6 characters"
                ]
            }

            if (currentPassword === newPassword) {
                validationError.newPassword = [
                    ...(validationError.newPassword || []),
                    "New password can't be same with current one"
                ]
            }

            if (newPassword !== confirmNewPassword) {
                validationError.confirmNewPassword = [
                    ...(validationError.confirmNewPassword || []),
                    "New password need to be confirmed"
                ]
            }

            if (!_.isEmpty(validationError)) {
                return res.status(422).json(validationError);
            }

            const user = req.user

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt)
            await user.save()

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
        } catch (e) {
            return res.status(500).json({
                message: "Something went wrong",
                error: e.message,
            });
        }
    }
}