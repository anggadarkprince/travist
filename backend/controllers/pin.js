const Pin = require("../models/Pin");

module.exports = {
    getAllPins: async (req, res) => {
        try {
            const pins = await Pin.find();
            return res.status(200).json(pins);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    savePin: async (req, res) => {
        const {title, description, rating, lng, lat} = req.body
        const newPin = new Pin({
            userId: req.user._id,
            username: req.user.username,
            title, description, rating, lng, lat
        })
        try {
            const savedPin = await newPin.save()
            return res.status(201).json(savedPin)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    getMyPins: async (req, res) => {
        try {
            const pins = await Pin.find({userId: req.user._id}).exec();
            return res.status(200).json(pins);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    getPin: async (req, res) => {
        try {
            const pin = await Pin.findById(req.params.pinId);
            if (!pin) {
                return res.sendStatus(404);
            }
            return res.status(200).json(pin);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    updatePin: async (req, res) => {
        const {title, description, rating, lng, lat} = req.body
        try {
            const pin = await Pin.findById(req.params.pinId)
            if (!pin) {
                return res.sendStatus(404);
            }
            if (!pin.userId.equals(req.user._id)) {
                return res.sendStatus(401);
            }

            const updatedPin = await Pin.findByIdAndUpdate(req.params.pinId, {
                title, description, rating, lng, lat
            }, {new: true})
            return res.status(200).json(updatedPin)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    deletePin: async (req, res) => {
        try {
            await Pin.deleteOne({_id: req.params.pinId});
            return res.sendStatus(204);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}