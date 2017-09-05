require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const journalRoutes = require('./routes/journal');
const placeRoutes = require('./routes/place');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://' + process.env.USER_NAME + ':' + process.env.PASSWORD + '@ds157873.mlab.com:57873/travelogue');

app.use("/users", userRoutes)
app.use("/journals", journalRoutes)
app.use("/places", placeRoutes)

app.listen(process.env.PORT || 3000, function() {
  console.log('server is running on port 3000');
});