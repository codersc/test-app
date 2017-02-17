var express = require('express');
var passport = require('passport');

var session = require('express-session');

const app = express();

require('dotenv').load();

require('./config/passport')(passport);

app.use(session({
	secret: 'testsecret',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', (req, res) => {
	console.log('Callback request recieved...');
	
	passport.authenticate('github', {
		successRedirect: '/',
		failureRedirect: '/'
	});
});

app.listen(3000, () => {
  console.log('Test server listening...');
});