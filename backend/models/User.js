const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        firstName: {
            type: String,
            require: false,
            max: 100,
        },
        lastName: {
            type: String,
            require: false,
            max: 100,
        },
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        avatar: {
            type: String,
            require: false,
            max: 500,
        },
        contactNumber: {
            type: String,
            require: false,
            max: 100,
        },
        address: {
            type: String,
            require: false,
            max: 500,
        },
        city: {
            type: String,
            require: false,
            max: 50,
        },
        country: {
            type: String,
            require: false,
            max: 50,
        },
        lastLoggedIn: {
            type: Date,
            require: false,
        },
    },
    {timestamps: true}
);
const User = mongoose.model("User", UserSchema);

module.exports = User