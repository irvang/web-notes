const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hikes');

const hikeSchema = new mongoose.Schema({
	name: String,
	phone: String,
	closes: String
});

const Hike = mongoose.model('HikingTrail', hikeSchema);

let newHike = new Hike({
	name: 'Blue Hills Reservation',
	closes: '4:00pm',
	phone: '(617) 698-1802'
});

// newHike.save(function (err, hike) {
// 	if (err) {
// 		console.log('SOMETHING WENT WRONG!')
// 	} else {
// 		console.log('I saved my first hike to the database:');
// 		console.log(hike);
// 	}
// });

Hike.find({}, function (err, hike) {
	if (err) {
		console.log('SOMETHING WENT WRONG!')
	} else {
		console.log('I saved my first hike to the database:');
		console.log(hike[0].name);
	}
});