const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 3000;

let notes = [
	'http is a protocol',
	'http requests have a url, method, header, and body',
	'this is cool',
	'that is hot'
];

//assets is 'replaced' with public; assets will point to public
app.use('/assets', express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('tiny'));
// app.use('/', express.static('views'));

app.get('/', (req, res) => {
	// console.log('called again');
	res.status(200).render('notes', { notesInEjs: notes});
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

app.put('/all-notes', function (req, res) {

	if(req.body.notes) {
		notes = req.body.notes;
	} else {
		res.status(404).send('No notes to update');
	}
});

//TEST with: curl -v -X "DELETE" http://localhost:3000/notes/1
app.delete('/notes/:id', function (req, res) {
	let {id} = req.params;

	if (id >= 0 && id < notes.length) {
		notes.splice(id, 1);
		res.send(`\nnote ${id} deleted! \n\n`);
	} else {
		res.status(404).send(`\n No note not found at index ${id}. \n\n `);
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
});