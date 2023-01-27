import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//connecting routes to index.js server
import userRoutes from './routes/users.js';
import authRoutes from './routes/auths.js';
import tweetRoutes from './routes/tweets.js';

//initialising express
const app = express();


//using dotenv to create secure MongoDB connections
dotenv.config();

//connecting to MongoDB
const connect = () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
           console.log("Connected to MongoDB");
        })
        .catch((err) => {
            throw err;
        });
};

//connecting routes to index.js server
app.use(cookieParser());
app.use(express.json());
app.use(cors()); // don't forget to call cors otherwise you api calls from frontend wont work
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tweets', tweetRoutes);

//initialise port
app.listen(8000, () => {
    connect();
    console.log('Listening on port 8000: http://localhost:8000');
})