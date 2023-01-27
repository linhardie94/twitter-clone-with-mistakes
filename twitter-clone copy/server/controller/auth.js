import express from 'express';
import User from '../models/User.js';
import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { handleError } from '../error.js';

// signup user and add them to the database
export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt); // hashing the password therefore we encrypt it
        const newUser = new User({...req.body, password: hash});

        await newUser.save();

        const token = jwt.sign({id: newUser._id}, process.env.JWT);

        const {password, ...otherData} = newUser._doc; // extracting password and other data from the post response
        res.cookie('access_token', token, {
            httpOnly: true,
        })
        .status(200)
        .json(otherData);
    } catch (err) {
        next(err);
    }
};

// sign in
export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username}); //finding the user in the database

        if(!user) return next(handleError(404, "User not found")); // handle error

        const isCorrect = await bcrypt.compare(req.body.password, user.password); //comparing the password

        if(!isCorrect) return next(handleError(400, "Incorrect password")); 

        const token = jwt.sign({id: user._id}, process.env.JWT); //if password is correct then give token
        const {password,...otherData} = user._doc; //remove password from the response

        res.cookie('access_token', token, {httpOnly: true}).status(200).json(otherData);

    } catch (err) {
        next(err);
    }
};