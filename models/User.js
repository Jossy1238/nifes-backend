const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, required:true, lowercase: true, trim: true },
    password: { 
        type: String, 
        minlength: 6, 
        maxlength: 128,
        required:true 
    },
    phoneNumber: { type: String},
    currentCountry: { 
        type: String, 
        required:true 
    },
    major: { 
        type: String, 
    },
    degree: { 
        type: String, 
        required:true
    },
    joinYear: { 
        type: String, 
    },
    graduationYear: { 
        type: String, 
        required:true
    },
    image: { type: String, default: "" },
    role:{
        type: String,
        enum: ["alumni", "manager"],
        default: "alumni"
    }

}, { timestamps: true });



module.exports = mongoose.model("User", UserSchema);