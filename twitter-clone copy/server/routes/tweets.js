import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { createTweet, deleteTweet, likeOrDislike, getAllTweets, getUserTweets, getExploreTweets } from '../controller/tweet.js';


const router = express.Router();

// create a tweet
router.post('/', createTweet)
//verifyToken // removed this from post because it was making my MainTweet post bug out
// delete a tweet
router.delete('/:id', verifyToken, deleteTweet)

// like or dislike a tweet
router.put('/:id/like', likeOrDislike)

//get all timeline tweets
router.get('/timeline/:id', getAllTweets);

//get user tweets only
router.get('/user/all/:id', getUserTweets);

//explore all tweets
router.get('/explore', getExploreTweets);

export default router;