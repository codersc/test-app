'use strict';

const barHandler = require('../controllers/barHandler.server.js'); 

module.exports = (app, yelp, passport) => {
	const isLoggedIn = (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.status(400).send('Bad Request');
		}
	}

	app.route('/')
		.get((req, res) => {
			res.sendFile(process.cwd() + '/client/dist/index.html');
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback') 
		.get(
			passport.authenticate('github', {	failureRedirect: '/' }),
			(req, res) => {
				res.redirect('/');
			}
		);

	app.route('/api/search/:location')
		.get((req, res) => {
			yelp.search({
				category_filter: 'bars',
				location: req.params.location
			})
			.then((data) => {
				const bars = data.businesses;

				barHandler.updateAttendees(bars, () => {
					res.json(bars);
				});
			})
			.catch((err) => {
				console.error(err);
			});
		});
				

		app.route('/api/commit/attend/:id')
			.post(isLoggedIn, (req, res) => {
				barHandler.commitToAttend(req.params.id, (bar) => {
					res.json(bar);	
				});
			});

		app.route('/api/commit/unattend/:id')
			.post(isLoggedIn, (req, res) => {
				barHandler.commitToUnattend(req.params.id, (bar) => {
					res.json(bar);	
				});
			});
};
