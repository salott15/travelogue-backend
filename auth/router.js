const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/users');

var tkn;
var uid;

const createAuthToken = user => {
    return jwt.sign({user}, config.JWT_SECRET, {
        subject: user.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    },function(err,data){console.log('data:',data); user.token = data; tkn = data; uid = user._id; console.log(user);});
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
        // res.json(createAuthToken(req.user))
        res.sendStatus(200);
    }
);

router.get(
  '/authtoken',
  (req, res) => {
    console.log('tkn',tkn);
    res.status(200).json({tkn, uid});
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
