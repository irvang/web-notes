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

	app.use(morgan('tiny'));
	// app.use('/', express.static('views'));

	app.get('/', (req, res) => {
		Note.find(function (err, noteCollection) {
			if (err) return console.error(err);
			console.log(noteCollection);
			res.status(200).render('notes', { notesInEjs: noteCollection });
		});
		// res.status(200).render('notes', { notesInEjs: notes });
	});

	app.post('/notes', (req, res) => {
		notes.push(req.body.note);

		// redirects to '/'; browser will do all process as visting root would do
		res.redirect('/');
	})

	// curl -v -X PUT -d note="Updated note text." http://localhost:3000/notes/1
	app.put('/notes/:id', function (req, res) {
		let { id } = req.params;
		let { note } = req.body;

		if (id < 0 || id >= notes.length) {
			res.status(404).send(`\n There is no note at position ${id} \n\n`);
		} else {
			notes.splice(id, 1, note);// also like this notes[id] = note;
			res.send('note deleted');
		}
	});

	//TEST with: curl -v -X "DELETE" http://localhost:3000/notes/1
	app.delete('/notes/:id', function (req, res) {
		let { id } = req.params;

		if (id >= 0 && id < notes.length) {
			notes.splice(id, 1);
			res.send(`\nnote ${id} deleted! \n\n`);
		} else {
			res.status(404).send(`\n No note not found at index ${id}. \n\n `);
		}
	});
}

//only for populating database
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