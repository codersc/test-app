var express = require('express');
const Yelp = require('yelp');
const mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

require('dotenv').load();

var routes = require('./routes/index.js');

const app = express();

const yelp = new Yelp({
	consumer_key: process.env.YELP_KEY,
	consumer_secret: process.env.YELP_SECRET,
	token: process.env.YELP_TOKEN,
	token_secret: process.env.YELP_TOKEN_SECRET
});

require('./config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

routes(app, yelp);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server listening...');
});