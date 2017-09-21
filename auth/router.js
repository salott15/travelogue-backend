const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/users');

const createAuthToken = user => {
    return jwt.sign({user}, config.JWT_SECRET, {
        subject: user.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    },function(err,data){console.log('data:',data); user.token = data; console.log(user);});
};

const router = express.Router();

router.post(
    '/login',
    // The user provides a username and password to login
    passport.authenticate('basic', {session: false/*, failWithError: true*/}),
    (req, res) => {
      // console.log('posting:',req);
        const authToken = createAuthToken(req.user);
        res.json({authToken});
        // res.json(createAuthToken(req.user))
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
