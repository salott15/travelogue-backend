const User = require('../models/users');
const passport = require('passport');

exports.newUser = function(req, res) {
	console.log(req.body);
	let {email, password, firstname = '', lastname = ''} = req.body;
    // Username and password come in pre-trimmed, otherwise we throw an error
    // before this
    let firstName = firstname.trim();
    let lastName = lastname.trim();
    email = email.trim();
    password = password.trim();
    let username = email;

    return User.find({email})
        .count()
        .then(count => {
            if (count > 0) {
                // There is an existing user with the same username
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'Email already in use',
                    location: 'username'
                });
            }
            // If there is no existing user, hash the password
            return User.hashPassword(password);
        })
        .then(hash => {
            return User.create({
                email,
                password: hash,
                firstname: firstName,
                lastname: lastName,
                username,
            });
        })
        .then(user => {
            return res.status(201).json(user);
        })
        .catch(err => {
        	console.log(err);
            // Forward validation errors on to the client, otherwise give a 500
            // error because something unexpected has happened
            if (err.reason === 'ValidationError') {
                return res.status(err.code).json(err);
            }
            res.status(500).json({code: 500, message: 'Internal server error'});
        });
 }

 exports.updateUser = function (req, res) {
 	User.findOneAndUpdate(req.params.uid, req.body)
 	.exec().then((data) => {res.status(200).json(data)});
 }

 exports.deleteUser = function (req, res) {
 	User.findByIdAndRemove(req.params.uid)
 	.exec().then((data) => {res.status(204).json(data)});
 }

 exports.getUser = function (req, res) {
 	User.findById(req.params.uid)
    .exec().then((data) => {res.status(200).json(data)});
 }

exports.getUsers = function(req, res) {
	User.find({}, function(err, docs) { 
		if (!err){ 
			console.log(docs);
			res.status(200).json(docs); 
		} 
		else {throw err;} 
	});
}