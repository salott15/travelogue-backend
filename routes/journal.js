let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');

const journalC = require('../controllers/journalc');

mongoose.Promise = global.Promise;

router.get("/:uid", journalC.getUserJournals);

router.get("/:uid/:state", journalC.getUserJournalByState);

router.post("/:uid", journalC.newJournal);

router.put("/:jid", journalC.updateJournal);

router.delete("/:jid", journalC.deleteJournal);

module.exports = router;