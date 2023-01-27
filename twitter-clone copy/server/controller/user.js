import { handleError } from '../error.js';
import User from '../models/User.js';
import Tweet from '../models/Tweet.js';

// find user info by id
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
     catch (err) {
        next(err);
    }
};

// update a user 
export const update = async (req, res, next) => {
        if(req.params.id === req.user.id) { //checking if user matches with verified user id
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, { //find user by id params
                    $set: req.body, //set and overwrite data
                }, {
                    new: true, // return new data
                });

                res.status(200).json(updatedUser);
            } catch (err) {
                next(err);
            }
        } else {
            return next(handleError(403, "You can only update your own account."));
        }
};

// delete a user 
export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id) { //checking if user matches with verified user id
        try {
            await User.findByIdAndDelete(req.params.id); // delete user
            await Tweet.remove({userId: req.params.id}); // deleting all tw

            res.status(200).json('User deleted');
        } catch (err) {
            next(err);
        }
    } else {
        return next(handleError(403, "You can only update your own account."));
    };
};

// follow
export const follow = async (req, res, next) => {
    try {

        //user to follow
        const user = await User.findById(req.params.id);
        //current user logged in
        const currentUser = await User.findById(req.body.id);

        if(!user.followers.includes(req.body.id)) { 
            await user.updateOne({ // adding follower to person to follow user
                $push: { followers: req.body.id},
            });

            await currentUser.updateOne({ // updating current user followers
                $push: { following: req.params.id}, 
            });
        } else {
            res.status(403).json("You already follow this user")
        }
        res.status(200).json('Following the user');

    } catch (err) {
        next(err);
    }
};

// unfollow
export const unFollow = async (req, res, next) => {
    try {

        //user to unfollow
        const user = await User.findById(req.params.id);
        //current user logged in
        const currentUser = await User.findById(req.body.id);

        if(currentUser.following.includes(req.params.id)) { 
            await user.updateOne({ // if current user's following includes the person logged in, then we take them off their following list
                $pull: { followers: req.body.id},
            });

            await currentUser.updateOne({ // updating current user followers
                $pull: { following: req.params.id}, 
            });
        } else {
            res.status(403).json("You are not following this user")
        }
        res.status(200).json('Unfollowing the user');

    } catch (err) {
        next(err);
    }
};
