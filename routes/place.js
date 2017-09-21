let express = require('express');
let router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const placeC = require('../controllers/placec');

mongoose.Promise = global.Promise;

router.get("/:uid", passport.authenticate('jwt', {session: false, failWithError: true}), placeC.getUserPlaces);

router.get("/:uid/:state", placeC.getUserPlacesByState);

router.post("/:uid", placeC.newPlace);

router.put("/:pid", placeC.updatePlace);

router.delete("/:pid", placeC.deletePlace);

module.exports = router;
