const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const morgan = require('morgan');
const appController = require('./controllers/app-controller');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/notes');//be sure to start mongodb

//all logic moved to app-controller 
appController(app);

app.listen(port, () => {
	console.log(`Webapp listening on port ${port}!`)
});

/* 
let notes2 = [
	'http is a protocol',
	'http requests have a url, method, header, and body',
	'this is cool',
	'that is hot'
];
 */