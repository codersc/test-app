var path = require('path');
var express = require('express');
var passport = require('passport');
var session = require('express-session');
const mongoose = require('mongoose');
const Yelp = require('yelp');

require('dotenv').load();

require('./config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

const yelp = new Yelp({
	consumer_key: process.env.YELP_KEY,
	consumer_secret: process.env.YELP_SECRET,
	token: process.env.YELP_TOKEN,
	token_secret: process.env.YELP_TOKEN_SECRET
});

var routes = require('./routes/index.js');

const app = express();

app.use(session({
	secret: 'testsecret',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());

//app.use('/dist', express.static(process.cwd() + '/client/dist'));
app.use(express.static(path.join(__dirname, '/client')));
app.use('/css', express.static(path.join(__dirname, 'client/dist/css')));

routes(app, yelp, passport);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}...`)
});
