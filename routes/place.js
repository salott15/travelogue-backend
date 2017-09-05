let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');

const placeC = require('../controllers/placec');

mongoose.Promise = global.Promise;

router.get("/:uid", placeC.getUserPlaces);

router.get("/:uid/:state", placeC.getUserPlacesByState);

router.post("/:uid", placeC.newPlace);

router.put("/:pid", placeC.updatePlace);

router.delete("/:pid", placeC.deletePlace);

module.exports = router;