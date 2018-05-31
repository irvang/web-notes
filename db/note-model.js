const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
	note: String
});

const Note = mongoose.model('Note', noteSchema);
const aStr ='abc';

module.exports = Note;
// module.exports = aStr;