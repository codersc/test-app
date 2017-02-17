'use strict';

module.exports = (app, yelp) => {

	app.route('/api')
		.get((req, res) => {
		    res.json({ msg: 'test successful', req: 'GET /api' });
		});

	app.route('/api/commit/attend')
		.get((req, res) => {
			res.json({ msg: 'test successful', req: 'GET /api/commit/attend' });
		});
		
};