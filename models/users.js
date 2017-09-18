const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	username: {type: String},
	token:'String',
	journalsRef: [{ type: mongoose.Schema.Types.ObjectId, ref:'Journals'}],
	placesRef: [{ type: mongoose.Schema.Types.ObjectId, ref:'Places'}],
	dateAdded: { type: 'Date', default: Date.now, required: true },
}, { collection : 'User' });

userSchema.methods.validatePassword = function(password) {
		// let cheater = (bcrypt.hash(password, 10));
		// setTimeout(function(){console.log('cheater:',cheater)},3000);
    return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
