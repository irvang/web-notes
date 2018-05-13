const express = require('express');
const app = express();

//assets is 'replaced' with public; assets will point to public
app.use('/assets', express.static('public'));
// app.use('/css', express.static('css'));

// app.get('/', (req, res) => res.send('Hello Worldsssss!'));
app.set('view engine', 'ejs');

const notes = [
  'http is a protocol',
  'http requests have a url, method, header, and body',
  'this is cool', 
  'that is cooool'
];

// app.use('/', express.static('views'));

app.get('/', (req, res) => {
  res.render('notes', { notes: notes });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});