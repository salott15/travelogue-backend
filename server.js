require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const {router: authRouter, basicStrategy, jwtStrategy} = require('./auth');


const userRoutes = require('./routes/user');
const journalRoutes = require('./routes/journal');
const placeRoutes = require('./routes/place');

const app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

// CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.send(204);
    }
    next();
});

passport.use(basicStrategy);
passport.use(jwtStrategy);
app.use(passport.initialize());


app.use("/users", userRoutes)
app.use("/journals", journalRoutes)
app.use("/places", placeRoutes)
app.use('/api/auth/', authRouter);

app.get(
    '/api/protected',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
    	console.log("req.body")
        return res.json({
            data: 'rosebud'
        });
    }
);

mongoose.connect('mongodb://127.0.0.1:27017/travelogue-test', { useMongoClient: true });
app.listen(process.env.PORT || 3000, function() {
  console.log('server is running on port 3000');
});
