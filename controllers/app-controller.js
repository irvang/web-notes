const express = require('express');
// const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Note = require('../db/note-model');

module.exports = function appController(app) {

	//assets is 'replaced' with public; assets will point to public
	app.use('/assets', express.static('public'));

	app.set('view engine', 'ejs');

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// app.use(morgan('tiny'));
	// app.use('/', express.static('views'));

	//====GET
	app.get('/', (req, res) => {
		Note.find({},function (err, noteCollection) {
			if (err) return console.error(err);
			res.status(200).render('notes', { notesInEjs: noteCollection });
		});
	});

	//====POST
	app.post('/notes', (req, res) => {
		Note.create({
			note: req.body.note
		}, (err, note) => {
			if (err) {
				console.log(err);
			} else {
				console.log('\n=========\nSaved note: ', note, '\n=========');
			}
		});

		// const newNote = new Note({ note: req.body.note });
		// newNote.save((err, note) => {
		// 	if (err) {
		// 		console.log(err);
		// 	} else {
		// 		console.log('\n=========\nSaved note: ', note, '\n=========');
		// 	}
		// });
		// redirects to '/'; browser will do all process as visting root would do
		res.redirect('/');
	})

	//====PUT
	app.put('/notes/:id', function (req, res) {
		Note.findByIdAndUpdate(req.params.id, {
			//schema
			note: req.body.note
		}, function (err, noteToEdit) {
			if (err) return console.error(err);
			res.send('Note updated to: ' + noteToEdit);
		});
	});


	app.put('/notesssssssssss/:id', function (req, res) {
		let { id } = req.params;

		Note.findById(id, function (err, noteToEdit) {
			if (err) return console.error(err);

			noteToEdit.note = req.body.note;

			noteToEdit.save((err, note) => {
				if (err) {
					console.log(err);
				} else {
					console.log('Saved note: ', note);
				}
			});

			res.send('note edited ' + noteToEdit.note)
		});
	});

	//====DELETE
	app.delete('/notes/:id', function (req, res) {
		Note.findByIdAndRemove(req.params.id, function (err, note) {
			if (err) {
				throw error;
			} else {
				res.send(`\nnote ${note} deleted! \n\n`);
			}
		});
	});
}

//Execute this function to populate database
// seedNotesDB();

function seedNotesDB() {
	const notes = [new Note({ note: 'http is a protocol' }), new Note({ note: 'http requests have a url, method, header, and body' }), new Note({ note: 'this is cool' }), new Note({ note: 'that is hot' })];

	notes.forEach((note) => {
		note.save((err, note) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Saved note: ', note);
			}
		});
	});
}


/* 
kill mongod: 
mongo admin --eval "db.shutdownServer()"
see: https://stackoverflow.com/questions/21431091/can-i-just-kill-mongod-to-stop-mongo


curl -v -X PUT -d note="Updated note text." http://localhost:3000/notes/1
TEST with: curl -v -X "DELETE" http://localhost:3000/notes/1

*/