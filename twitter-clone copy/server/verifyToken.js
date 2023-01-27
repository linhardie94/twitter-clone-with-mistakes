// script to verify tokens
import jwt from 'jsonwebtoken';
import { handleError } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; // check token in browser
    if (!token) return next(handleError(401, "You are not authenticated")); // does it exist

    jwt.verify(token, process.env.JWT, (err, user) => { // verify the token
        if (err) return next(createError(403, "Token is invalid")); //error if it doesn't exist
        req.user = user; // if it exists attach it to user
        next();
    })
};

