let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');

const userC = require('../controllers/userc');

mongoose.Promise = global.Promise;

router.get("/", userC.getUsers);

router.get("/:uid", userC.getUser);

router.post("/", userC.newUser);

router.put("/:uid", userC.updateUser);

router.delete("/:uid", userC.deleteUser);

module.exports = router;