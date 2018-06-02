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
		Note.find(function (err, noteCollection) {
			if (err) return console.error(err);
			res.status(200).render('notes', { notesInEjs: noteCollection });
		});
	});

	//====POST
	app.post('/notes', (req, res) => {

		const newNote = new Note({ note: req.body.note });
		newNote.save((err, note) => {
			if (err) {
				console.log(err);
			} else {
				console.log('\n=========\nSaved note: ', note, '\n=========');
			}
		});

		// redirects to '/'; browser will do all process as visting root would do
		res.redirect('/');
	})

	//====PUT
	app.put('/notes/:id', function (req, res) {
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
		let { id } = req.params;
		// console.log(id);

		Note.findOneAndRemove(id, function (err, note) {
			if (err) {
				throw error;
			} else {
				// console.log(`\nnote ${note.note} deleted! \n\n`);
				res.send(`\nnote ${note} deleted! \n\n`);
			}
		});
	});
}

//Execute this function to populate database
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

// curl -v -X PUT -d note="Updated note text." http://localhost:3000/notes/1
//TEST with: curl -v -X "DELETE" http://localhost:3000/notes/1