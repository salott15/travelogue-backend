const Journal = require('../models/journals');
const User = require('../models/users');

exports.getUserJournals = function(req, res) {
	User.findById(req.params.uid)
	.populate("journalsRef").then((data) => {res.status(200).json(data)})
}

exports.getUserJournalByState = function(req,res) {
	Journal.find( { state: req.params.state, _creator: req.params.uid} )
	.exec().then((data) => {
		console.log(data);
		return res.status(200).json(data)})
} 

exports.newJournal = function(req, res) {
	req.body._creator = req.params.uid
	Journal.create(req.body)
	.then((data) => {
	User.findByIdAndUpdate(
	data._creator,
    {$push: {"journalsRef": data._id}}
    )
    .then((data) => {
    return res.status(201).json(data)})})
}

exports.updateJournal = function (req, res) {
	Journal.findOneAndUpdate(req.params.jid, req.body)
	.exec().then((data) => {res.status(200).json(data)})
}

exports.deleteJournal = function (req, res) {
	Journal.findByIdAndRemove(req.params.jid)
	.exec().then((data) => {res.status(204).json(data)})
}