import mongoose from "mongoose";

// creating the schema for a user in MongoDB
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileProfile: {
        type: String,
    },
    followers: {
        type: Array,
        defaultValue: []
    },
    following: {
        type: Array,
        defaultValue: []
    },
    description: {
        type: String,
    },
    profilePicture: { type: String },

}, {timestamps: true}
);

export default mongoose.model("User", UserSchema);