require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const {router: authRouter, basicStrategy, jwtStrategy} = require('./auth');
const cors = require('cors');


const userRoutes = require('./routes/user');
const journalRoutes = require('./routes/journal');
const placeRoutes = require('./routes/place');

const app = express();

mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

// CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
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
app.get("/", (req, res) => {
    res.send("Welcome to Travelogue's Backend!")
})
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

mongoose.connect(process.env.DATABASE_URL, { useMongoClient: true });
app.listen(process.env.PORT || 3001, function() {
  console.log('server is running on port 3001');
});
