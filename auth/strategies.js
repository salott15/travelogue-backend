const passport = require('passport');
const {BasicStrategy} = require('passport-http');
const {
    // Assigns the Strategy export to the name JwtStrategy using object
    // destructuring
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Assigning_to_new_variable_names
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt');

const User = require('../models/users');
const {JWT_SECRET} = require('../config');

// const basicStrategy = new BasicStrategy((username, password, callback) => {console.log('(username, password, callback):',username, password, callback);})

const basicStrategy = new BasicStrategy((username, password, callback) => {
    let user;
    User.findOne({email: username})
        .then(_user => {
            user = _user;
            if (!user) {
              console.log('NO USER');
                // Return a rejected promise so we break out of the chain of .thens.
                // Any errors like this will be handled in the catch block.
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password'
                });
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            if (!isValid) {
              console.log('NOT VALID');
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username or password'
                });
            }
            return callback(null, user);
        })
        .catch(err => {
            console.log('ERR -ERR',err);
            if (err.reason === 'LoginError') {
                return callback(null, false, err);
            }
            return callback(err, false);
        });
});

const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: JWT_SECRET,
        // Look for the JWT as a Bearer auth header
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        // Only allow HS256 tokens - the same as the ones we issue
        algorithms: ['HS256']
    },
    (payload, done) => {
        console.log('JWT RAN', payload.user);
        done(null, payload.user);
    }
);

module.exports = {basicStrategy, jwtStrategy};
