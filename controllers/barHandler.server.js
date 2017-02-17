const Bars = require('../models/bars.js');
const forEach = require('async-foreach').forEach;

const barHandler = {
	updateAttendees: (yelpBars, callback) => {
		forEach(yelpBars, function(bar, index) {
			const done = this.async();
			const isLastAsyncOp = index === yelpBars.length - 1; 
			
			Bars
				.findOne({ "id": bar["id"] }, (err, doc) => {
					if (err) { throw err; }

					if (doc) {
						bar["attendees"] = doc["attendees"];
					} else {
						bar["attendees"] = 0;
					}

					done();
					
					if (isLastAsyncOp) {
						return callback();
					}
				});
		})		
	},
	commitToAttend: (id, callback) => {
		Bars.findOneAndUpdate(
			{ "id": id },
			{ $inc: { "attendees": 1 } }
		)
		.exec((err, doc) => {
			if (err) { throw err; }

			if (doc) {
				return callback(doc);
			} else {
				let newBar = new Bars({ 
					"id": id,  
					"attendees": 1
				});

				newBar.save((err, doc) => {
					if (err) { throw err; }

					return callback(doc);
				});
			}
		})
	},
	commitToUnattend: (id, callback) => {
		Bars.findOneAndUpdate(
			{ "id": id }, 
			{ $inc: { "attendees": -1 } }
		)
		.exec((err, doc) => {
			if (err) { throw err; }	

			return callback(doc);
		});
	}
}

module.exports = barHandler;