const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const createAuthToken = user => {
    return jwt.sign({user}, process.env.JWT_SECRET, {
        subject: user.username,
        expiresIn: process.env.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};

const router = express.Router();

router.post(
    '/login',
    // The user provides a username and password to login
    //passport.authenticate('basic', {session: false}),
    (req, res) => {
        console.log("hello", req.body)
        const authToken = createAuthToken({username:req.body.username, password:req.body.password});
        res.json({authToken});
    }
);

router.post(
    '/refresh',
    // The user exchanges an existing valid JWT for a new one with a later
    // expiration
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const authToken = createAuthToken(req.user);
        res.json({authToken});
    }
);

module.exports = {router};