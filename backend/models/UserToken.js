const mongoose = require("mongoose");

const UserTokenSchema = new mongoose.Schema({
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        accessToken: {
            type: String,
            require: true,
            max: 500,
        },
        refreshToken: {
            type: String,
            require: true,
            max: 500,
        },
        validUntil: {
            type: Date,
            require: true,
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        }
    }
);
const UserToken = mongoose.model("UserToken", UserTokenSchema)

module.exports = UserToken