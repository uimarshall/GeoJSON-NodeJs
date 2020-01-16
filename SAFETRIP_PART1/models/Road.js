const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoadSchema = new Schema({
    roadId: {
        type: String,
        required: [true, "Please add a road Id"],
        unique: true,
        trim: true,
        maxlength: [12, "Road Id must be less than 12 chars"]
    },
    address: {
        type: String,
        required: [true, "Please put ad Address"]
    },
    location: {
        type: {
            type: String,
            enum: ["Point"] // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Road", RoadSchema);