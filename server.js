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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
passport.use(basicStrategy);
passport.use(jwtStrategy);

mongoose.connect('mongodb://' + process.env.USER_NAME + ':' + process.env.PASSWORD + '@ds157873.mlab.com:57873/travelogue');
console.log(process.env.JWT_EXPIRY);
app.use("/users", userRoutes)
app.use("/journals", journalRoutes)
app.use("/places", placeRoutes)
app.use('/api/auth/', authRouter);

app.get(
    '/api/protected',
    //passport.authenticate('jwt', {session: false}),
    (req, res) => {
    	console.log("req.body")
        return res.json({
            data: 'rosebud'
        });
    }
);

app.listen(process.env.PORT || 3000, function() {
  console.log('server is running on port 3000');
});