const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const notes = [
	'http is a protocol',
	'http requests have a url, method, header, and body',
	'this is cool',
	'that is cooool'
];

//assets is 'replaced' with public; assets will point to public
app.use('/assets', express.static('public'));
// app.use('/css', express.static('css'));

// app.get('/', (req, res) => res.send('Hello Worldsssss!'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

// app.use('/', express.static('views'));

app.get('/', (req, res) => {
	res.status(200).render('notes', { notes: notes });
});

app.post('/notes', (req, res)=> {
	console.log(req.body.note);
	notes.push(req.body.note);

	// redirects to '/'; browser will do all process as visting root would do
	res.redirect('/'); 
})

//TEST with: curl -v -X "DELETE" http://localhost:3000/notes/1
app.delete('/notes/:id', (req, res) => {
	let {id} = req.params;
	if (req.params.id >= 0 && req.params.id < notes.length) {
		notes.splice(req.params.id, 1);
		res.send(`\nnote ${req.params.id} deleted \n\n`);
	} else {
		res.status(404).send(`\n No note not found at index ${req.params.id}. \n\n `);
	}
});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!')
});