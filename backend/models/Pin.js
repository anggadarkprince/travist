const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            min: 3,
            max: 60,
        },
        description: {
            type: String,
            required: true,
            min: 3,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
        lng: {
            type: Number,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
    },
    {timestamps: true}
);
const Pin = mongoose.model("Pin", PinSchema)

module.exports = Pin