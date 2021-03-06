const mongoose = require('mongoose');

const placesSchema = mongoose.Schema({
	state: {type: String}, 
	dateAdded: { type: 'Date', default: Date.now, required: true },
	placename: {type: String},
	placereview: {type: String},
	_creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { collection : 'Places' });

const Places = mongoose.model('Places', placesSchema);

module.exports = Places;