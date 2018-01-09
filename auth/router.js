const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/users');

var tkn;
var uid;
var firstname;

const createAuthToken = user => {
    return jwt.sign({user}, config.JWT_SECRET, {
        subject: user.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    },function(err,data){console.log('data:',data); user.token = data; tkn = data; uid = user._id; firstname = user.firstname; console.log(user);});
};

const router = express.Router();

router.post(
    '/login',
    // The user provides a username and password to login
    passport.authenticate('basic', {session: false/*, failWithError: true*/}),
    (req, res) => {
      // console.log('posting:',req);
        const authToken = createAuthToken(req.user);
        // res.json({authToken});
        res.json({token: authToken, username: req.user.username})
    }
);

router.get(
  '/authtoken',
  (req, res) => {
    console.log('tkn',tkn);
    res.status(200).json({tkn, uid, firstname});
});

router.post(
    '/refresh',
    // The user exchanges an existing valid JWT for a new one with a later
    // expiration
    passport.authenticate('jwt'),
    (req, res) => {
        const authToken = createAuthToken(req.user);
        res.json({authToken});
    }
);

module.exports = {router};
