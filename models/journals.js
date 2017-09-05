const mongoose = require('mongoose');

const journalsSchema = mongoose.Schema({
	state: {type: String}, 
	dateAdded: { type: 'Date', default: Date.now, required: true },
	body: {type: String}, 
	_creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { collection : 'Journals' });

const Journals = mongoose.model('Journals', journalsSchema);

module.exports = Journals;