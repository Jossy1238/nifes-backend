const mongoose = require("mongoose");
const Schema = mongoose.Schema

const SubscriberSchema = new Schema({
    email: { type: String, unique: true, required:true, lowercase: true, trim: true },
}, {timestamps: true})

module.exports = mongoose.model("Subscriber", SubscriberSchema);