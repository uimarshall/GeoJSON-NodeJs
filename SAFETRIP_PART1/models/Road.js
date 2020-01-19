const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");
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
        //A middleware will be created to convert the address to coordinates using geocoder.
        type: String
            // required: [true, "Please put an Address"]
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

// Goecode and create location
// Instead of saving the raw address to d database, we geocode it into coordinates 1st
RoadSchema.pre("save", async function() {
    const codeAddressToCoordinates = await geocoder.geocode(this.address);
    console.log(codeAddressToCoordinates);
    this.location = {
        type: "Point",
        coordinates: [
            codeAddressToCoordinates[0].longitude,
            codeAddressToCoordinates[0].latitude
        ],
        formattedAddress: codeAddressToCoordinates[0].formattedAddress
    };

    // Do not save address but coordinates to Db
    this.address = undefined;
    // next();
}); //'pre' means d code should run 1st b4 saving to Db

module.exports = mongoose.model("Road", RoadSchema);