const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true},
    date: { type: Date, required: false},
    venue: { type: String, required: true },    
    description: { type: String, required: true },
    image: { type: String, required: false }, // Store the image file path
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },     //Reference field that stores the user that created the event

}, { timestamps: true });



module.exports = mongoose.model("Event", EventSchema);