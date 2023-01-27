import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
    userId: {
        type: String,
        //required: true, //removed this because it was making my maintweet post bug out
    },
    description: {
        type: String,
        required: true,
        max: 280,
    },
    likes: {
        type: Array,
        defaultValue: [],
    },
}, 
{timestamps: true}
);

export default mongoose.model("Tweet", TweetSchema);